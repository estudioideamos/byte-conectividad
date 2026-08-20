import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];

if (!repository) {
  console.log("No GitHub repository detected; keeping root-relative asset paths.");
  process.exit(0);
}

const outputRoot = path.resolve("dist/client");
const textExtensions = new Set([".html", ".rsc", ".js", ".css", ".json", ".txt"]);

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
      const rewritten = source.replaceAll("/_next/", `/${repository}/_next/`);

      if (rewritten !== source) {
        await writeFile(fullPath, rewritten);
      }
    }),
  );
}

await rewriteDirectory(outputRoot);
console.log(`Prepared static assets for /${repository}/ on GitHub Pages.`);
