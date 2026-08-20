import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../dist/client/index.html", import.meta.url);
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
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/i);
});

test("incluye metadatos sociales y controles accesibles", async () => {
  const html = await readFile(output, "utf8");

  assert.match(html, /property="og:image"/i);
  assert.match(html, /content="https:\/\/[^"]+\/og\.png"/i);
  const css = await readFile(styles, "utf8");
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /aria-label="Abrir menú"/i);
  assert.match(html, /aria-label="Escribir a Byte por WhatsApp"/i);
  assert.match(css, /prefers-reduced-motion/i);
});
