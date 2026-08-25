import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../dist/client/index.html", import.meta.url);
const requestOutput = new URL("../dist/client/solicitar-servicio/index.html", import.meta.url);
const requestSource = new URL("../app/solicitar-servicio/ServiceRequestForm.tsx", import.meta.url);
const styles = new URL("../app/globals.css", import.meta.url);

test("exporta la experiencia institucional completa de Byte", async () => {
  const html = await readFile(output, "utf8");

  assert.match(html, /<html lang="es">/i);
  assert.match(html, /Byte Conectividad \| Internet que llega más lejos/i);
  assert.match(html, /Internet de banda ancha/i);
  assert.match(html, /Internet simétrico/i);
  assert.match(html, /Zonas WiFi/i);
  assert.match(html, /General Pinto/i);
  assert.match(html, /Rivadavia 1286/i);
  assert.match(html, /wa\.me\/5492355448231/i);
  assert.match(html, /Accedé a tu cuenta/i);
  assert.match(html, /https:\/\/ap2\.factulinc\.com\.ar\/loginc\/200h1k1q1p1z1k1w1a0h130w220o0v/i);
  assert.match(html, /href="solicitar-servicio\/?"/i);
  assert.doesNotMatch(html, /\\n\s*<canvas/i);
  assert.match(html, /icon-shell/i);
  assert.match(html, /icon-glyph/i);
  assert.doesNotMatch(html, /feature-icon[^>]*>\s*<i/i);
  assert.match(html, /Todos los derechos reservados/i);
  assert.match(html, /Diseño y desarrollo para ir más lejos/i);
  assert.match(html, /https:\/\/ideamos\.com\.ar/i);
  assert.match(html, /aria-controls="footer-explore"/i);
  assert.match(html, /aria-controls="footer-solutions"/i);
  assert.match(html, /Tu mejor conexión empieza con una charla/i);
  assert.ok((html.match(/byte-symbol\.png/g) || []).length >= 2);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/i);
});

test("incluye metadatos sociales y controles accesibles", async () => {
  const html = await readFile(output, "utf8");
  const css = await readFile(styles, "utf8");

  assert.match(html, /property="og:image"/i);
  assert.match(html, /content="https:\/\/[^"]+\/og\.png"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /aria-label="Abrir menú"/i);
  assert.match(html, /aria-label="Escribir a Byte por WhatsApp"/i);
  assert.match(css, /prefers-reduced-motion/i);
});

test("exporta la página individual para solicitar servicio", async () => {
  const html = await readFile(requestOutput, "utf8");

  assert.match(html, /Solicitar servicio \| Byte Conectividad/i);
  assert.match(html, /La conexión que necesitás/i);
  assert.match(html, /Contanos dónde querés conectarte/i);
  assert.match(html, /name="service"/i);
  assert.match(html, /name="name"/i);
  assert.match(html, /name="phone"/i);
  assert.match(html, /name="address"/i);
  assert.match(html, /name="email"/i);
  assert.match(html, /href="\.\.\/#servicios"/i);
  assert.match(html, /href="\.\.\/#cobertura"/i);
  assert.match(html, /href="\.\.\/#nosotros"/i);
  assert.match(html, /href="\.\.\/#contacto"/i);
});

test("mantiene el formulario en modo demo sin envíos externos", async () => {
  const source = await readFile(requestSource, "utf8");

  assert.match(source, /Demo visual: los datos no se envían ni se almacenan/i);
  assert.match(source, /setStatus\("success"\)/i);
  assert.doesNotMatch(source, /fetch\(|FormSubmit|formsubmit\.co|mailto:/i);
});
