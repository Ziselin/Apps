const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..", "..");
const outputBase = path.join(
  workspaceRoot,
  "assets",
  "earthmap-engine",
  "boundary-sets",
  "osm",
  "europe",
);

const BOUNDARY_SET_INDEX_SCHEMA = "ziselin-boundary-set-index-v1";
const CHUNK_SCHEMA = "ziselin-boundary-set-country-chunk-v1";
const VERSION_LABEL = "osm-normalized-reference";

function parseArgs(argv) {
  const args = {};
  argv.slice(2).forEach((entry) => {
    const match = entry.match(/^--([^=]+)=(.*)$/);
    if (match) args[match[1]] = match[2];
    else if (entry.startsWith("--")) args[entry.slice(2)] = true;
  });
  return args;
}

function normalizeText(value) {
  return String(value ?? "").trim();
}

function slugify(value, fallback = "boundary") {
  const slug = normalizeText(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function normalizeAdm(value) {
  const match = normalizeText(value).toUpperCase().match(/^ADM[-_ ]?([0-9]+)$/);
  return match ? `ADM${match[1]}` : normalizeText(value).toUpperCase();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function writeCompactJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data)}\n`, "utf8");
}

function writeScript(filePath, globalName, key, data) {
  fs.writeFileSync(
    filePath,
    `window.${globalName}=window.${globalName}||{};window.${globalName}[${JSON.stringify(key)}]=${JSON.stringify(data)};\n`,
    "utf8",
  );
}

function getBboxFromCoordinates(coordinates, bbox = [Infinity, Infinity, -Infinity, -Infinity]) {
  if (!Array.isArray(coordinates)) return bbox;
  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
    const lon = Number(coordinates[0]);
    const lat = Number(coordinates[1]);
    if (Number.isFinite(lon) && Number.isFinite(lat)) {
      bbox[0] = Math.min(bbox[0], lon);
      bbox[1] = Math.min(bbox[1], lat);
      bbox[2] = Math.max(bbox[2], lon);
      bbox[3] = Math.max(bbox[3], lat);
    }
    return bbox;
  }
  coordinates.forEach((entry) => getBboxFromCoordinates(entry, bbox));
  return bbox;
}

function getFeatureBbox(feature) {
  const bbox = getBboxFromCoordinates(feature?.geometry?.coordinates);
  return bbox.every(Number.isFinite) ? bbox.map((value) => Number(value.toFixed(6))) : null;
}

function getGeometryPointCount(coordinates) {
  if (!Array.isArray(coordinates)) return 0;
  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") return 1;
  return coordinates.reduce((sum, entry) => sum + getGeometryPointCount(entry), 0);
}

function normalizeWikidataId(value) {
  const match = normalizeText(value).match(/^Q\d+$/i);
  return match ? match[0].toUpperCase() : "";
}

function getOsmProperties(feature = {}) {
  const props = feature.properties || {};
  const tags = props.tags && typeof props.tags === "object" ? props.tags : {};
  return { ...tags, ...props };
}

function getOsmId(properties = {}, index = 0) {
  const raw = normalizeText(properties.osm_id || properties["@id"] || properties.id || properties.relation_id || properties.relation || "");
  if (raw) return raw.replace(/^relation\//i, "");
  return `feature-${index + 1}`;
}

function getOsmTitle(properties = {}, index = 0) {
  return normalizeText(
    properties["name:de"]
    || properties.name
    || properties.official_name
    || properties.short_name
    || properties.ref
    || `OSM Boundary ${index + 1}`,
  );
}

function createMatchKeys(properties, stableId, title, wikidataId) {
  return [
    stableId,
    properties.osm_id,
    properties["@id"],
    properties.relation_id,
    properties.ref,
    properties["ISO3166-2"],
    properties["ISO3166-1:alpha3"],
    properties.wikidata,
    properties.name,
    properties["name:de"],
    properties.official_name,
    title,
    wikidataId,
  ]
    .map(normalizeText)
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index);
}

function createEngineFeature(feature, args, index) {
  const properties = getOsmProperties(feature);
  const osmId = getOsmId(properties, index);
  const title = getOsmTitle(properties, index);
  const iso3 = args.iso3;
  const adm = args.adm;
  const stableId = `osm:relation:${slugify(iso3)}:${slugify(adm)}:${slugify(osmId, `feature-${index + 1}`)}`;
  const validFrom = normalizeText(args.validFrom || properties.start_date || properties.valid_from || "");
  const validTo = normalizeText(args.validTo || properties.end_date || properties.valid_to || "") || null;
  const wikidataId = normalizeWikidataId(properties.wikidata || properties.wikidata_id || properties.WIKIDATAID);
  return {
    type: "Feature",
    id: stableId,
    stable_id: stableId,
    version_id: `${stableId}@${VERSION_LABEL}`,
    name: title,
    wikidata_id: wikidataId,
    parent_id: normalizeText(properties.parent_id || properties["is_in:country_code"] || iso3),
    rank: Number(adm.replace("ADM", "")) + 1,
    valid_from: validFrom,
    valid_to: validTo,
    valid_precision: validFrom ? "day_or_year" : "unknown",
    temporal_status: validFrom || validTo ? "dated_reference" : "undated_reference",
    properties: {
      ...properties,
      ziselin_provider: "OpenStreetMap",
      ziselin_provider_boundary_id: `relation/${osmId}`,
      ziselin_osm_admin_level: normalizeText(args.osmAdminLevel || properties.admin_level || ""),
      ziselin_archive_type: normalizeText(properties.boundary || "administrative"),
    },
    match_tokens: createMatchKeys(properties, stableId, title, wikidataId),
    bbox: getFeatureBbox(feature),
    geometry: feature.geometry,
  };
}

function createChunk(collection, args) {
  const features = (collection.features || [])
    .map((feature, index) => createEngineFeature(feature, args, index))
    .filter((feature) => feature.geometry);
  const rank = Number(args.adm.replace("ADM", "")) + 1;
  return {
    schema: CHUNK_SCHEMA,
    id: `osm:europe:${slugify(args.iso3)}:${slugify(args.adm)}`,
    title: `OpenStreetMap ${args.iso3} ${args.adm}`,
    provider: "OpenStreetMap",
    provider_boundary_id: `osm-europe-${args.iso3}-${args.adm}`,
    boundary_type: "administrative",
    admin_level: args.adm,
    osm_admin_level: args.osmAdminLevel || "",
    rank,
    country_iso3: args.iso3,
    valid_from: args.validFrom || "",
    valid_to: args.validTo || null,
    valid_precision: args.validFrom ? "day_or_year" : "unknown",
    temporal_status: args.validFrom || args.validTo ? "dated_reference" : "undated_reference",
    generated_from: args.input,
    source: {
      label: "OpenStreetMap",
      url: args.sourceUrl || "https://www.openstreetmap.org/",
      accessed_at: new Date().toISOString().slice(0, 10),
      note: "Normalized from a GeoJSON export of OSM administrative boundary relations. Raw OSM relations must be polygonized before this builder is used.",
    },
    license: {
      id: "odbl-1.0",
      label: "Open Database License 1.0",
      url: "https://www.openstreetmap.org/copyright",
      detail: "© OpenStreetMap contributors",
      compatibility: {
        wikimedia: true,
        openstreetmap: true,
        attribution_required: true,
      },
    },
    data_binding: {
      primary_key: "stable_id",
      provider_key: "provider_boundary_id",
      match_keys: [args.iso3, args.adm, args.osmAdminLevel].map(normalizeText).filter(Boolean),
      preferred_table_keys: ["boundary_key", "stable_id", "provider_boundary_id", "wikidata_id", "boundary_label"],
    },
    features,
  };
}

function createFeatureIndexEntry(feature, chunk, chunkFile, scriptFile) {
  const properties = feature.properties || {};
  return {
    stable_id: feature.stable_id,
    version_id: feature.version_id,
    title: feature.name,
    provider_boundary_id: properties.ziselin_provider_boundary_id || "",
    admin_level: chunk.admin_level,
    osm_admin_level: chunk.osm_admin_level || "",
    rank: chunk.rank,
    country_iso3: chunk.country_iso3,
    parent_id: feature.parent_id || "",
    wikidata_id: feature.wikidata_id || "",
    valid_from: feature.valid_from || "",
    valid_to: feature.valid_to,
    file: chunkFile,
    scriptFile,
    bbox: feature.bbox,
    point_count: getGeometryPointCount(feature.geometry?.coordinates),
    match_keys: feature.match_tokens || [],
  };
}

function buildOsmGeojsonBoundarySet() {
  const rawArgs = parseArgs(process.argv);
  const args = {
    input: rawArgs.input,
    iso3: normalizeText(rawArgs.iso || rawArgs.iso3 || "").toUpperCase(),
    adm: normalizeAdm(rawArgs.level || rawArgs.adm || "ADM2"),
    osmAdminLevel: normalizeText(rawArgs.osmAdminLevel || rawArgs.osm_admin_level || ""),
    validFrom: normalizeText(rawArgs.validFrom || rawArgs.valid_from || ""),
    validTo: normalizeText(rawArgs.validTo || rawArgs.valid_to || ""),
    sourceUrl: normalizeText(rawArgs.sourceUrl || rawArgs.source_url || ""),
  };
  if (!args.input) throw new Error("Bitte GeoJSON-Eingabe mit --input=... angeben.");
  if (!/^[A-Z]{3}$/.test(args.iso3)) throw new Error("Bitte ISO-3 mit --iso=DEU angeben.");
  const inputPath = path.resolve(process.cwd(), args.input);
  const collection = readJson(inputPath);
  if (collection.type !== "FeatureCollection") throw new Error("Bitte eine GeoJSON FeatureCollection übergeben.");
  const chunk = createChunk(collection, { ...args, input: path.relative(workspaceRoot, inputPath) });
  const outputRoot = path.join(outputBase, args.iso3, args.adm);
  const chunksDir = path.join(outputRoot, "chunks");
  const chunkScriptsDir = path.join(outputRoot, "chunks-js");
  fs.mkdirSync(chunksDir, { recursive: true });
  fs.mkdirSync(chunkScriptsDir, { recursive: true });
  const baseName = `osm-europe-${slugify(args.iso3)}-${slugify(args.adm)}`;
  const chunkFile = `chunks/${baseName}.geojson`;
  const scriptFile = `chunks-js/${baseName}.js`;
  writeCompactJson(path.join(outputRoot, chunkFile), chunk);
  writeScript(path.join(outputRoot, scriptFile), "EarthMapBoundarySetChunksOsmEurope", `${args.iso3}:${args.adm}`, { iso3: args.iso3, adm: args.adm, ...chunk });
  const chunkBytes = Buffer.byteLength(JSON.stringify(chunk));
  const index = {
    schema: BOUNDARY_SET_INDEX_SCHEMA,
    id: `osm:europe:${slugify(args.iso3)}:${slugify(args.adm)}`,
    title: `OpenStreetMap ${args.iso3} ${args.adm}`,
    boundary_set_schema: CHUNK_SCHEMA,
    generated_at: new Date().toISOString(),
    source: path.relative(workspaceRoot, inputPath),
    chunk_strategy: "one-country-admin-level-chunk",
    provider: "OpenStreetMap",
    country_iso3: args.iso3,
    admin_level: args.adm,
    osm_admin_level: args.osmAdminLevel,
    rank: chunk.rank,
    chunks: [{
      stable_id: chunk.id,
      title: chunk.title,
      country_iso3: args.iso3,
      admin_level: args.adm,
      osm_admin_level: args.osmAdminLevel,
      rank: chunk.rank,
      file: chunkFile,
      scriptFile,
      bytes: chunkBytes,
      feature_count: chunk.features.length,
    }],
    feature_index: chunk.features.map((feature) => createFeatureIndexEntry(feature, chunk, chunkFile, scriptFile)),
  };
  writeJson(path.join(outputRoot, "index.json"), index);
  fs.writeFileSync(
    path.join(outputRoot, "index.js"),
    `window.EarthMapBoundarySetIndexesOsmEurope=window.EarthMapBoundarySetIndexesOsmEurope||{};window.EarthMapBoundarySetIndexesOsmEurope[${JSON.stringify(`${args.iso3}:${args.adm}`)}]=${JSON.stringify(index)};\n`,
    "utf8",
  );
  const report = {
    provider: "OpenStreetMap",
    iso3: args.iso3,
    adm: args.adm,
    osm_admin_level: args.osmAdminLevel,
    output: path.relative(workspaceRoot, outputRoot),
    feature_count: chunk.features.length,
    bytes: chunkBytes,
    megabytes: Number((chunkBytes / 1048576).toFixed(3)),
    source: chunk.source,
    license: chunk.license,
  };
  writeJson(path.join(outputRoot, "build-report.json"), report);
  console.log(JSON.stringify(report, null, 2));
}

try {
  buildOsmGeojsonBoundarySet();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
