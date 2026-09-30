<?php
declare(strict_types=1);

// Run only against a temporary copy with NO SMTP configuration or credentials.
$root = sys_get_temp_dir() . '/byte-security-test-' . bin2hex(random_bytes(8));
mkdir($root . '/api', 0700, true);
$source = dirname(__DIR__) . '/public/api';
copy($source . '/contact.php', $root . '/api/contact.php');
mkdir($root . '/api/vendor/PHPMailer/src', 0700, true);
foreach (['Exception.php', 'PHPMailer.php', 'SMTP.php'] as $file) {
    copy($source . '/vendor/PHPMailer/src/' . $file, $root . '/api/vendor/PHPMailer/src/' . $file);
}
$runner = $root . '/runner.php';
file_put_contents($runner, <<<'PHP'
<?php
$input = json_decode(base64_decode($argv[1]), true, 16, JSON_THROW_ON_ERROR);
$_SERVER = $input['server'];
$_POST = $input['post'];
$_FILES = $input['files'] ?? [];
register_shutdown_function(static function () { echo "\nSTATUS:" . http_response_code(); });
require __DIR__ . '/api/contact.php';
PHP);
$baseServer = [
    'REQUEST_METHOD' => 'POST', 'HTTP_ORIGIN' => 'https://byteconectividad.com.ar',
    'CONTENT_TYPE' => 'application/x-www-form-urlencoded', 'CONTENT_LENGTH' => '500',
    'REMOTE_ADDR' => '192.0.2.10',
];
$basePost = [
    'formType' => 'contact', 'startedAt' => (string) (int) (microtime(true) * 1000 - 10000),
    'name' => 'Prueba local', 'phone' => '2355448231', 'email' => 'test@example.invalid',
    'service' => 'Internet de banda ancha', 'location' => 'Lincoln', 'company' => '',
];
function check(string $name, int $status, array $post = [], array $server = [], array $files = []): void {
    global $runner, $baseServer, $basePost;
    $payload = base64_encode(json_encode([
        'post' => array_replace($basePost, $post),
        'server' => array_replace($baseServer, $server), 'files' => $files,
    ], JSON_THROW_ON_ERROR));
    $process = proc_open([PHP_BINARY, $runner, $payload], [
        0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w'],
    ], $pipes);
    fclose($pipes[0]);
    $output = stream_get_contents($pipes[1]);
    $errors = stream_get_contents($pipes[2]);
    fclose($pipes[1]); fclose($pipes[2]);
    $exit = proc_close($process);
    if ($exit !== 0 || !str_ends_with($output, 'STATUS:' . $status)) {
        throw new RuntimeException($name . ' failed: ' . $output . $errors);
    }
    echo "PASS: $name\n";
}
$rateFile = sys_get_temp_dir() . '/byte-contact-v2-' . hash('sha256', $root . '/api') . '.json';
// __DIR__ uses native separators on Windows.
$rateFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'byte-contact-v2-' . hash('sha256', realpath($root . '/api')) . '.json';
try {
    check('untrusted origin', 403, [], ['HTTP_ORIGIN' => 'https://example.invalid']);
    check('missing origin', 403, [], ['HTTP_ORIGIN' => '']);
    check('invalid method', 405, [], ['REQUEST_METHOD' => 'GET']);
    check('oversize request', 413, [], ['CONTENT_LENGTH' => '32769']);
    check('unsupported encoding', 415, [], ['CONTENT_TYPE' => 'application/json']);
    check('array injection', 422, ['name' => ['x']]);
    check('file upload rejected', 422, [], [], ['file' => ['name' => 'x']]);
    check('honeypot', 200, ['company' => 'bot']);
    check('impossible timing', 422, ['startedAt' => '1']);
    check('invalid service', 422, ['service' => 'arbitrary subject']);
    check('email header injection', 422, ['email' => "test@example.invalid\r\nBcc:other@example.invalid"]);
    check('oversize message', 422, ['message' => str_repeat('a', 2001)]);
    check('missing location', 422, ['location' => '']);
    check('missing service address', 422, ['formType' => 'service-request']);
    check('service form reaches config safely', 503, ['formType' => 'service-request', 'address' => 'Calle 123']);
    for ($i = 0; $i < 4; $i++) check('valid input, no SMTP configured ' . $i, 503);
    check('sixth valid request blocked', 429);
    file_put_contents($rateFile, '{corrupt');
    check('corrupt limiter fails closed', 503);
    unlink($rateFile);
    mkdir($rateFile);
    check('unwritable limiter fails closed', 503);
    rmdir($rateFile);
    echo "All security checks passed; no email sent.\n";
} finally {
    if (is_file($rateFile)) unlink($rateFile);
    if (is_dir($rateFile)) rmdir($rateFile);
    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($iterator as $file) {
        $file->isDir() ? rmdir($file->getPathname()) : unlink($file->getPathname());
    }
    rmdir($root);
}