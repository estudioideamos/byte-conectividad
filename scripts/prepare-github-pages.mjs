import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const outputRoot = path.resolve("dist/client");
const textExtensions = new Set([".html", ".rsc", ".js", ".css", ".json", ".txt"]);

async function createDirectoryRoute(routeName) {
  const sourceBase = path.join(outputRoot, routeName);
  const routeDirectory = path.join(outputRoot, routeName);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(sourceBase + ".html", path.join(routeDirectory, "index.html"));

  try {
    await copyFile(sourceBase + ".rsc", path.join(routeDirectory, "index.rsc"));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

await createDirectoryRoute("solicitar-servicio");

if (!repository) {
  console.log("Prepared directory routes; no GitHub repository detected, so asset paths were unchanged.");
  process.exit(0);
}

async function rewriteDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await rewriteDirectory(fullPath);
        return;
      }

      if (!textExtensions.has(path.extname(entry.name))) {
        return;
      }

      const source = await readFile(fullPath, "utf8");
      const rewritten = source.replaceAll("/_next/", "/" + repository + "/_next/");

      if (rewritten !== source) {
        await writeFile(fullPath, rewritten);
      }
    }),
  );
}

await rewriteDirectory(outputRoot);
console.log("Prepared static assets and directory routes for /" + repository + "/ on GitHub Pages.");
