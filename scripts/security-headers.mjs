import { createHash } from "node:crypto";
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist/client");
async function htmlFiles(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await htmlFiles(file));
    else if (entry.name.endsWith(".html")) result.push(file);
  }
  return result;
}
const files = await htmlFiles(root);
const hashes = new Set();
for (const file of files) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/.test(match[1]) && match[2].trim()) {
      hashes.add("'sha256-" + createHash("sha256").update(match[2]).digest("base64") + "'");
    }
  }
}
if (!hashes.size) throw new Error("No inline scripts found; review the exported HTML before publishing.");
const scripts = "script-src 'self' " + [...hashes].sort().join(" ");
const policy = "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; "
  + scripts + "; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  + " font-src 'self' data:; media-src 'self'; connect-src 'self' https://byteconectividad.com.ar; upgrade-insecure-requests";
for (const file of files) {
  const html = await readFile(file, "utf8");
  const updated = html.replace(/(<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*content=")[^"]*(")/gi, "$1" + policy + "$2");
  if (updated === html && !html.includes(scripts)) throw new Error("CSP meta not found: " + file);
  await writeFile(file, updated);
}
const htaccessPath = path.join(root, ".htaccess");
const htaccess = (await readFile(htaccessPath, "utf8")).replace(/\n# GENERATED CSP[\s\S]*$/, "");
await writeFile(htaccessPath, htaccess + '\n# GENERATED CSP\n<IfModule mod_headers.c>\n  Header always set Content-Security-Policy "' + policy + '; frame-ancestors \'none\'"\n</IfModule>\n');
console.log("CSP generated: " + hashes.size + " approved inline scripts across " + files.length + " HTML files.");