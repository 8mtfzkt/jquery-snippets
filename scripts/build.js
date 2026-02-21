// scripts/build.js
const { execFileSync } = require("node:child_process");
const path = require("node:path");
const pkg = require("../package.json");

const src = "src/jquery-snippets.js";
const outLatest = "dist/jquery-snippets.min.js";
const outVersioned = `dist/jquery-snippets-${pkg.version}.min.js`;

// Terser CLI als JS-Datei direkt mit Node ausführen (kein .cmd / kein npx)
const terserCli = path.join(__dirname, "..", "node_modules", "terser", "bin", "terser");

function runTerser(outFile) {
  execFileSync(
    process.execPath,                 // der aktuell laufende Node
    [terserCli, src, "-c", "-m", "-o", outFile],
    { stdio: "inherit" }
  );
}

runTerser(outLatest);
runTerser(outVersioned);

console.log(`Built:\n- ${outLatest}\n- ${outVersioned}`);