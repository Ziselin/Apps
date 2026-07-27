const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const admin0IndexPath = path.join(repoRoot, "assets", "earthmap-engine", "boundary-sets", "natural-earth", "10m", "admin0", "index.json");
const geobBase = path.join(repoRoot, "assets", "earthmap-engine", "boundary-sets", "geoboundaries", "current");
const registryPath = path.join(geobBase, "registry.json");
const registryScriptPath = path.join(geobBase, "registry.js");

function parseArgs(argv) {
  const args = {};
  argv.slice(2).forEach((entry) => {
    const match = entry.match(/^--([^=]+)=(.*)$/);
    if (match) args[match[1]] = match[2];
    else if (entry.startsWith("--")) args[entry.slice(2)] = true;
  });
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeRegistryScript(registry) {
  fs.mkdirSync(path.dirname(registryScriptPath), { recursive: true });
  fs.writeFileSync(
    registryScriptPath,
    `window.EarthMapBoundarySetRegistryGeoBoundaries=${JSON.stringify(registry)};\n`,
    "utf8",
  );
}

function getAllIso3s() {
  const index = readJson(admin0IndexPath);
  return [...new Set((index.chunks || [])
    .map((entry) => String(entry.country_iso3 || entry.iso3 || "").toUpperCase())
    .filter((iso3) => /^[A-Z]{3}$/.test(iso3)))]
    .sort();
}

function runNode(script, args, options = {}) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: options.quiet ? "pipe" : "inherit",
  });
  if (result.status !== 0) {
    const message = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(message || `${path.basename(script)} fehlgeschlagen.`);
  }
  return result;
}

function indexPathFor(iso3, adm) {
  return path.join(geobBase, iso3, adm, "index.json");
}

function readDatasetSummary(iso3, adm) {
  const indexFile = indexPathFor(iso3, adm);
  if (!fs.existsSync(indexFile)) return null;
  const index = readJson(indexFile);
  const chunk = index.chunks?.[0] || {};
  return {
    provider: "geoboundaries",
    iso3,
    adm,
    base: "../assets/earthmap-engine/boundary-sets/geoboundaries/current/",
    windowIndex: "EarthMapBoundarySetIndexesGeoBoundaries",
    windowChunks: "EarthMapBoundarySetChunksGeoBoundaries",
    feature_count: Number(chunk.feature_count || index.feature_index?.length || 0),
    bytes: Number(chunk.bytes || 0),
    source: index.source || "",
    generated_at: index.generated_at || "",
  };
}

function removeDataset(iso3, adm) {
  const dir = path.join(geobBase, iso3, adm);
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function buildRegistry({ failures = [] } = {}) {
  const levels = [];
  if (fs.existsSync(geobBase)) {
    for (const isoEntry of fs.readdirSync(geobBase, { withFileTypes: true })) {
      if (!isoEntry.isDirectory() || !/^[A-Z]{3}$/.test(isoEntry.name)) continue;
      const iso3 = isoEntry.name;
      const isoDir = path.join(geobBase, iso3);
      for (const admEntry of fs.readdirSync(isoDir, { withFileTypes: true })) {
        if (!admEntry.isDirectory() || !/^ADM\d$/i.test(admEntry.name)) continue;
        const summary = readDatasetSummary(iso3, admEntry.name.toUpperCase());
        if (summary) levels.push(summary);
      }
    }
  }
  levels.sort((a, b) => a.iso3.localeCompare(b.iso3) || a.adm.localeCompare(b.adm));
  const registry = {
    schema: "ziselin-geoboundaries-provider-registry-v1",
    generated_at: new Date().toISOString(),
    rule: "Only normalized and consolidated Boundary-Set-v1 country/ADM datasets are registered for EarthMap provider search.",
    levels,
    failures,
  };
  writeJson(registryPath, registry);
  writeRegistryScript(registry);
  return registry;
}

function verifyRegistry(registry, requestedIso3s, requestedLevels) {
  const present = new Set(registry.levels.map((entry) => `${entry.iso3}:${entry.adm}`));
  const failed = new Set((registry.failures || []).map((entry) => `${entry.iso3}:${entry.adm}`));
  const missing = [];
  requestedIso3s.forEach((iso3) => {
    requestedLevels.forEach((adm) => {
      const key = `${iso3}:${adm}`;
      if (!present.has(key) && !failed.has(key)) missing.push(key);
    });
  });
  return missing;
}

async function main() {
  const args = parseArgs(process.argv);
  const levels = String(args.levels || "ADM2,ADM3")
    .split(",")
    .map((level) => level.trim().toUpperCase().replace(/^ADM[-_ ]?/, "ADM"))
    .filter(Boolean);
  const allIso3s = getAllIso3s();
  const iso3s = args.iso
    ? String(args.iso).split(",").map((iso) => iso.trim().toUpperCase()).filter(Boolean)
    : allIso3s;
  const overwrite = args.overwrite === true || args.overwrite === "true";
  const skipExisting = !overwrite;
  const simplified = args.full === true || args.full === "true" ? "false" : "true";
  const maxBytes = Number(args.maxBytes || 25 * 1024 * 1024);
  const max = Number(args.max || 0);
  const selectedIso3s = max > 0 ? iso3s.slice(0, max) : iso3s;
  const failures = [];
  const builder = path.join("earthmap", "tools", "build-geoboundaries-boundary-set-v1.js");
  const consolidator = path.join("tools", "earthmap-consolidate-geoboundaries-adm.js");

  for (const iso3 of selectedIso3s) {
    for (const adm of levels) {
      const existing = fs.existsSync(indexPathFor(iso3, adm));
      if (existing && skipExisting) {
        const summary = readDatasetSummary(iso3, adm);
        if (summary?.bytes > maxBytes) {
          console.warn(`[too-large] ${iso3} ${adm}: ${summary.bytes} Bytes > ${maxBytes}. Datensatz wird entfernt und als Kachel-Kandidat protokolliert.`);
          removeDataset(iso3, adm);
          failures.push({ iso3, adm, error: `dataset-too-large:${summary.bytes}>${maxBytes}` });
          continue;
        }
        console.log(`[skip] ${iso3} ${adm} existiert bereits.`);
        continue;
      }
      try {
        console.log(`[build] ${iso3} ${adm}`);
        runNode(builder, [`--iso=${iso3}`, `--levels=${adm}`, `--simplified=${simplified}`], { quiet: true });
        runNode(consolidator, [iso3, adm], { quiet: true });
        const summary = readDatasetSummary(iso3, adm);
        if (summary?.bytes > maxBytes) {
          console.warn(`[too-large] ${iso3} ${adm}: ${summary.bytes} Bytes > ${maxBytes}. Datensatz wird entfernt und als Kachel-Kandidat protokolliert.`);
          removeDataset(iso3, adm);
          failures.push({ iso3, adm, error: `dataset-too-large:${summary.bytes}>${maxBytes}` });
          continue;
        }
        console.log(`[ok] ${iso3} ${adm}: ${summary?.feature_count || 0} Features, ${summary?.bytes || 0} Bytes`);
      } catch (error) {
        console.warn(`[fail] ${iso3} ${adm}: ${error.message.split(/\r?\n/)[0]}`);
        failures.push({ iso3, adm, error: error.message.split(/\r?\n/)[0] });
      }
    }
  }

  const registry = buildRegistry({ failures });
  const missing = verifyRegistry(registry, selectedIso3s, levels);
  const report = {
    requested_iso3_count: selectedIso3s.length,
    requested_levels: levels,
    registered_datasets: registry.levels.length,
    failures: failures.length,
    missing_without_failure: missing,
  };
  console.log(JSON.stringify(report, null, 2));
  if (missing.length) process.exitCode = 2;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
