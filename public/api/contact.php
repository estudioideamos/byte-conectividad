<?php

declare(strict_types=1);


use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', '0');
ini_set('log_errors', '1');
set_exception_handler(static function (Throwable $exception): void {
    error_log('Byte contact: unexpected processing failure.');
    respond(503, false, 'El formulario no está disponible en este momento.');
});

require __DIR__ . '/vendor/PHPMailer/src/Exception.php';
require __DIR__ . '/vendor/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/vendor/PHPMailer/src/SMTP.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header('Cache-Control: no-store, max-age=0');

$allowedOrigins = [
    'https://byteconectividad.com.ar',
    'https://www.byteconectividad.com.ar',
    'https://estudioideamos.github.io',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin === '') {
    respond(403, false, 'No se pudo validar el origen de la solicitud.');
}
if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        respond(403, false, 'No se pudo validar el origen de la solicitud.');
    }
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Método no permitido.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 32768) {
    respond(413, false, 'La solicitud es demasiado extensa.');
}

$contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0]));
if (!in_array($contentType, ['multipart/form-data', 'application/x-www-form-urlencoded'], true)) {
    respond(415, false, 'Formato de solicitud no permitido.');
}
if ($_FILES !== []) {
    respond(422, false, 'Este formulario no admite archivos.');
}
foreach ($_POST as $value) {
    if (!is_string($value) || preg_match('//u', $value) !== 1) {
        respond(422, false, 'Los datos del formulario no son válidos.');
    }
}
if (trim((string) ($_POST['company'] ?? '')) !== '') {
    respond(200, true, 'Recibimos tu consulta.');
}

$startedAt = filter_var($_POST['startedAt'] ?? null, FILTER_VALIDATE_INT);
$elapsed = $startedAt ? ((int) round(microtime(true) * 1000) - $startedAt) : 0;
if ($elapsed < 1800 || $elapsed > 86400000) {
    respond(422, false, 'Actualizá la página e intentá nuevamente.');
}



$formType = cleanLine((string) ($_POST['formType'] ?? ''), 40);
if (!in_array($formType, ['contact', 'service-request'], true)) {
    respond(422, false, 'El formulario no es válido.');
}

$name = cleanLine((string) ($_POST['name'] ?? ''), 120);
$phone = cleanLine((string) ($_POST['phone'] ?? ''), 40);
$email = trim((string) ($_POST['email'] ?? ''));
$service = cleanLine((string) ($_POST['service'] ?? ''), 120);
$location = cleanLine((string) ($_POST['location'] ?? ''), 160);
$address = cleanLine((string) ($_POST['address'] ?? ''), 200);
$message = cleanText((string) ($_POST['message'] ?? ''), 2000);

$allowedServices = ['Internet de banda ancha', 'Internet simétrico', 'Zonas WiFi', 'Quiero asesoramiento', 'Asesoramiento personalizado'];
if (!in_array($service, $allowedServices, true)) {
    respond(422, false, 'Seleccioná un servicio válido.');
}
if (textLength((string) ($_POST['message'] ?? '')) > 2000 || preg_match('/[\r\n\x00]/', $email)) {
    respond(422, false, 'Revisá el email y la extensión del mensaje.');
}

if (textLength($name) < 2 || textLength($phone) < 6 || textLength($service) < 2) {
    respond(422, false, 'Completá los campos obligatorios.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || textLength($email) > 190) {
    respond(422, false, 'Ingresá un email válido.');
}
if ($formType === 'contact' && textLength($location) < 2) {
    respond(422, false, 'Ingresá tu localidad.');
}
if ($formType === 'service-request' && textLength($address) < 4) {
    respond(422, false, 'Ingresá la dirección del servicio.');
}

enforceRateLimit();

$configPath = dirname(__DIR__) . '/.private/mail-config.php';
if (!is_readable($configPath)) {
    error_log('Byte contact: mail configuration is not readable.');
    respond(503, false, 'El formulario no está disponible en este momento.');
}

$config = require $configPath;
$requiredConfig = ['host', 'port', 'username', 'password', 'recipient'];
foreach ($requiredConfig as $key) {
    if (!is_array($config) || empty($config[$key])) {
        error_log('Byte contact: incomplete mail configuration.');
        respond(503, false, 'El formulario no está disponible en este momento.');
    }
}

$details = $formType === 'contact'
    ? [
        'Nombre' => $name,
        'Teléfono' => $phone,
        'Email' => $email,
        'Localidad' => $location,
        'Servicio' => $service,
        'Mensaje' => $message !== '' ? $message : 'Sin mensaje adicional',
    ]
    : [
        'Nombre' => $name,
        'Teléfono' => $phone,
        'Email' => $email,
        'Dirección del servicio' => $address,
        'Servicio' => $service,
    ];

$title = $formType === 'contact' ? 'Nueva consulta desde la web' : 'Nueva solicitud de servicio';
$subject = $title . ' · ' . $service;
$htmlRows = '';
$plainRows = [];
foreach ($details as $label => $value) {
    $safeLabel = htmlspecialchars($label, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $safeValue = nl2br(htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
    $htmlRows .= '<tr><th style="padding:10px 14px;text-align:left;vertical-align:top;color:#667085;border-bottom:1px solid #eaecf0">' . $safeLabel . '</th><td style="padding:10px 14px;color:#101828;border-bottom:1px solid #eaecf0">' . $safeValue . '</td></tr>';
    $plainRows[] = $label . ': ' . $value;
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) $config['host'];
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['username'];
    $mail->Password = (string) $config['password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int) $config['port'];
    $mail->Timeout = 15;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom((string) $config['username'], 'Web Byte Conectividad');
    $mail->addAddress((string) $config['recipient'], 'Byte Conectividad');
    $mail->addReplyTo($email, $name);
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = '<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto"><h1 style="font-size:24px;color:#101828">' . htmlspecialchars($title, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</h1><p style="color:#475467">La persona completó el formulario de Byte Conectividad.</p><table style="width:100%;border-collapse:collapse;border:1px solid #eaecf0">' . $htmlRows . '</table><p style="margin-top:20px;color:#667085;font-size:12px">Respondé este correo para escribirle directamente a ' . htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '.</p></div>';
    $mail->AltBody = $title . "\n\n" . implode("\n", $plainRows);
    $mail->send();
} catch (Throwable $exception) {
    error_log('Byte contact: SMTP delivery failed.');
    respond(502, false, 'No pudimos enviar tu consulta. Intentá nuevamente en unos minutos.');
}

respond(200, true, 'Recibimos tu consulta. Te vamos a contactar a la brevedad.');

function respond(int $status, bool $ok, string $message): never
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function cleanLine(string $value, int $maxLength): string
{
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', strip_tags($value)) ?? '';
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');
    return textLength($value) <= $maxLength ? $value : '';
}

function cleanText(string $value, int $maxLength): string
{
    $value = str_replace(["\r\n", "\r"], "\n", strip_tags($value));
    $value = trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '');
    return textLength($value) <= $maxLength ? $value : '';
}

function enforceRateLimit(): void
{
    // One bounded, locked file per site; do not trust caller-provided proxy/IP headers.
    $path = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR
        . 'byte-contact-v2-' . hash('sha256', __DIR__) . '.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false) {
        error_log('Byte contact: rate-limit storage unavailable.');
        respond(503, false, 'Intentá nuevamente en unos minutos.');
    }
    @chmod($path, 0600);
    if (!flock($handle, LOCK_EX | LOCK_NB)) {
        fclose($handle);
        header('Retry-After: 5');
        respond(503, false, 'Intentá nuevamente en unos segundos.');
    }
    try {
        $size = fstat($handle)['size'] ?? 0;
        if ($size > 131072) {
            throw new RuntimeException('Rate-limit storage too large');
        }
        $contents = stream_get_contents($handle);
        if ($contents === false) {
            throw new RuntimeException('Rate-limit read failed');
        }
        $records = $contents === '' ? [] : json_decode($contents, true, 8, JSON_THROW_ON_ERROR);
        if (!is_array($records)) {
            throw new RuntimeException('Invalid rate-limit storage');
        }
        $now = time();
        $total = 0;
        foreach ($records as $key => $attempts) {
            if (!is_array($attempts)) {
                throw new RuntimeException('Invalid rate-limit entry');
            }
            $attempts = array_values(array_filter($attempts, static fn ($timestamp): bool =>
                is_int($timestamp) && $timestamp > $now - 600 && $timestamp <= $now));
            if ($attempts === []) {
                unset($records[$key]);
            } else {
                $records[$key] = $attempts;
                $total += count($attempts);
            }
        }
        $key = hash('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
        if (count($records[$key] ?? []) >= 5 || $total >= 50) {
            flock($handle, LOCK_UN);
            fclose($handle);
            header('Retry-After: 600');
            respond(429, false, 'Hiciste varios intentos. Esperá unos minutos y volvé a probar.');
        }
        $records[$key][] = $now;
        $encoded = json_encode($records, JSON_THROW_ON_ERROR);
        if (!rewind($handle) || !ftruncate($handle, 0)
            || fwrite($handle, $encoded) !== strlen($encoded) || !fflush($handle)) {
            throw new RuntimeException('Rate-limit write failed');
        }
    } catch (Throwable $exception) {
        flock($handle, LOCK_UN);
        fclose($handle);
        error_log('Byte contact: rate-limit storage failure.');
        respond(503, false, 'Intentá nuevamente en unos minutos.');
    }
    flock($handle, LOCK_UN);
    fclose($handle);
}