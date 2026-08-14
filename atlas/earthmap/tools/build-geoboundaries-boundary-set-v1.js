const fs = require("fs");
const path = require("path");
const https = require("https");

const workspaceRoot = path.resolve(__dirname, "..", "..", "..");
const outputBase = path.join(
  workspaceRoot,
  "assets",
  "earthmap-engine",
  "boundary-sets",
  "geoboundaries",
  "current",
);

const BOUNDARY_SET_INDEX_SCHEMA = "ziselin-boundary-set-index-v1";
const CHUNK_SCHEMA = "ziselin-boundary-set-country-chunk-v1";
const VERSION_LABEL = "geoboundaries-current-reference";

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

function requestText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "EarthMap Boundary Builder/1.0" } }, (response) => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
        response.resume();
        resolve(requestText(new URL(response.headers.location, url).toString()));
        return;
      }
      if (response.statusCode < 200 || response.statusCode >= 300) {
        response.resume();
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      response.setEncoding("utf8");
      let body = "";
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => resolve(body));
    }).on("error", reject);
  });
}

async function requestJson(url) {
  return JSON.parse(await requestText(url));
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

function getGeoBoundariesFeatureTitle(properties = {}, index = 0) {
  return normalizeText(
    properties.shapeName
    || properties.shapeName_de
    || properties.name
    || properties.NAME
    || properties.NAME_1
    || properties.NAME_2
    || properties.shapeISO
    || `Boundary ${index + 1}`,
  );
}

function getGeoBoundariesProviderId(properties = {}, index = 0) {
  return normalizeText(
    properties.shapeID
    || properties.shapeISO
    || properties.ISO3166_2
    || properties.ISO_3166_2
    || properties.HASC_1
    || properties.GID_2
    || properties.GID_3
    || `feature-${index + 1}`,
  );
}

function getGeoBoundariesParentId(properties = {}, iso3 = "") {
  return normalizeText(
    properties.shapeGroup
    || properties.parent_id
    || properties.GID_1
    || properties.ISO3166_2
    || iso3,
  );
}

function getLicenseId(label = "") {
  const normalized = normalizeText(label).toLowerCase();
  if (normalized.includes("cc by")) return "cc-by";
  if (normalized.includes("odbl")) return "odbl-1.0";
  if (normalized.includes("public domain")) return "public-domain";
  return normalized ? slugify(normalized, "source-specific") : "source-specific";
}

function createMatchKeys(properties, stableId, title, wikidataId) {
  return [
    stableId,
    properties.shapeID,
    properties.shapeISO,
    properties.shapeGroup,
    properties.ISO3166_2,
    properties.ISO_3166_2,
    properties.HASC_1,
    properties.GID_1,
    properties.GID_2,
    properties.GID_3,
    properties.name,
    properties.NAME,
    properties.NAME_1,
    properties.NAME_2,
    title,
    wikidataId,
  ]
    .map(normalizeText)
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index);
}

function createEngineFeature(feature, metadata, iso3, adm, index) {
  const properties = feature.properties || {};
  const providerId = getGeoBoundariesProviderId(properties, index);
  const title = getGeoBoundariesFeatureTitle(properties, index);
  const stableId = `geoboundaries:gbopen:${slugify(iso3)}:${slugify(adm)}:${slugify(providerId, `feature-${index + 1}`)}`;
  const validYear = normalizeText(metadata.boundaryYearRepresented);
  const validFrom = /^\d{4}$/.test(validYear) ? `${validYear}-01-01` : "";
  const wikidataId = normalizeWikidataId(properties.wikidata_id || properties.wikidataid || properties.WIKIDATAID);
  const matchTokens = createMatchKeys(properties, stableId, title, wikidataId);
  return {
    type: "Feature",
    id: stableId,
    stable_id: stableId,
    version_id: `${stableId}@${VERSION_LABEL}`,
    name: title,
    wikidata_id: wikidataId,
    parent_id: getGeoBoundariesParentId(properties, iso3),
    rank: Number(adm.replace("ADM", "")) + 1,
    valid_from: validFrom,
    valid_to: null,
    valid_precision: validFrom ? "year" : "unknown",
    temporal_status: validFrom ? "current_reference" : "undated_reference",
    properties: {
      ...properties,
      ziselin_provider: "geoBoundaries",
      ziselin_provider_boundary_id: providerId,
      ziselin_archive_type: normalizeText(metadata.boundaryCanonical || adm),
      ziselin_boundary_year_represented: metadata.boundaryYearRepresented || "",
      ziselin_source_update_date: metadata.sourceDataUpdateDate || "",
    },
    match_tokens: matchTokens,
    bbox: getFeatureBbox(feature),
    geometry: feature.geometry,
  };
}

function createChunk(metadata, geojson, iso3, adm) {
  const features = (geojson.features || [])
    .map((feature, index) => createEngineFeature(feature, metadata, iso3, adm, index))
    .filter((feature) => feature.geometry);
  const rank = Number(adm.replace("ADM", "")) + 1;
  const validYear = normalizeText(metadata.boundaryYearRepresented);
  const validFrom = /^\d{4}$/.test(validYear) ? `${validYear}-01-01` : "";
  const licenseLabel = normalizeText(metadata.boundaryLicense || "Source-specific license");
  return {
    schema: CHUNK_SCHEMA,
    id: `geoboundaries:gbopen:${slugify(iso3)}:${slugify(adm)}`,
    title: `geoBoundaries ${iso3} ${adm}`,
    provider: "geoBoundaries",
    provider_boundary_id: metadata.boundaryID || `${iso3}-${adm}`,
    boundary_type: "administrative",
    admin_level: adm,
    rank,
    country_iso3: iso3,
    valid_from: validFrom,
    valid_to: null,
    valid_precision: validFrom ? "year" : "unknown",
    temporal_status: validFrom ? "current_reference" : "undated_reference",
    generated_from: metadata.gjDownloadURL || metadata.staticDownloadLink || "",
    source: {
      label: normalizeText(metadata.boundarySource || "geoBoundaries"),
      url: normalizeText(metadata.boundarySourceURL || metadata.gjDownloadURL || "https://www.geoboundaries.org/"),
      accessed_at: new Date().toISOString().slice(0, 10),
      note: normalizeText(metadata.sourceDataUpdateDate ? `Source update: ${metadata.sourceDataUpdateDate}` : ""),
    },
    license: {
      id: getLicenseId(licenseLabel),
      label: licenseLabel,
      url: normalizeText(metadata.licenseSource || ""),
      detail: normalizeText(metadata.licenseDetail || ""),
      compatibility: {
        wikimedia: /cc\s*by|public domain/i.test(licenseLabel),
        openstreetmap: false,
        attribution_required: !/public domain/i.test(licenseLabel),
      },
    },
    data_binding: {
      primary_key: "stable_id",
      provider_key: "provider_boundary_id",
      match_keys: [metadata.boundaryISO, metadata.boundaryName, metadata.boundaryID].map(normalizeText).filter(Boolean),
      preferred_table_keys: ["boundary_key", "stable_id", "provider_boundary_id", "wikidata_id", "boundary_label"],
    },
    metadata,
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

async function buildGeoBoundariesBoundarySet() {
  const args = parseArgs(process.argv);
  const iso3 = normalizeText(args.iso || args.ISO || "").toUpperCase();
  const levels = normalizeText(args.levels || args.level || "ADM2")
    .split(",")
    .map(normalizeAdm)
    .filter(Boolean);
  const useSimplified = args.simplified === true || args.simplified === "true";
  if (!/^[A-Z]{3}$/.test(iso3)) throw new Error("Bitte ISO-3 mit --iso=DEU angeben.");
  if (!levels.length) throw new Error("Bitte mindestens ein Level mit --levels=ADM2,ADM3 angeben.");

  const reports = [];
  for (const adm of levels) {
    const apiUrl = `https://www.geoboundaries.org/api/current/gbOpen/${iso3}/${adm}/`;
    const metadata = await requestJson(apiUrl);
    const geojsonUrl = useSimplified
      ? (metadata.simplifiedGeometryGeoJSON || metadata.gjDownloadURL)
      : (metadata.gjDownloadURL || metadata.simplifiedGeometryGeoJSON);
    if (!geojsonUrl) throw new Error(`geoBoundaries liefert keine GeoJSON-URL für ${iso3} ${adm}.`);
    const geojson = await requestJson(geojsonUrl);
    const chunk = createChunk(metadata, geojson, iso3, adm);
    const outputRoot = path.join(outputBase, iso3, adm);
    const chunksDir = path.join(outputRoot, "chunks");
    const chunkScriptsDir = path.join(outputRoot, "chunks-js");
    fs.mkdirSync(chunksDir, { recursive: true });
    fs.mkdirSync(chunkScriptsDir, { recursive: true });
    const baseName = `geoboundaries-${slugify(iso3)}-${slugify(adm)}`;
    const chunkFile = `chunks/${baseName}.geojson`;
    const scriptFile = `chunks-js/${baseName}.js`;
    writeCompactJson(path.join(outputRoot, chunkFile), chunk);
    writeScript(path.join(outputRoot, scriptFile), "EarthMapBoundarySetChunksGeoBoundaries", `${iso3}:${adm}`, { iso3, adm, ...chunk });
    const chunkBytes = Buffer.byteLength(JSON.stringify(chunk));
    const index = {
      schema: BOUNDARY_SET_INDEX_SCHEMA,
      id: `geoboundaries:gbopen:${slugify(iso3)}:${slugify(adm)}`,
      title: `geoBoundaries ${iso3} ${adm}`,
      boundary_set_schema: CHUNK_SCHEMA,
      generated_at: new Date().toISOString(),
      source: apiUrl,
      chunk_strategy: "one-country-admin-level-chunk",
      provider: "geoBoundaries",
      country_iso3: iso3,
      admin_level: adm,
      rank: chunk.rank,
      chunks: [{
        stable_id: chunk.id,
        title: chunk.title,
        country_iso3: iso3,
        admin_level: adm,
        rank: chunk.rank,
        file: chunkFile,
        scriptFile,
        bytes: chunkBytes,
        feature_count: chunk.features.length,
      }],
      feature_index: chunk.features.map((feature) => createFeatureIndexEntry(feature, chunk, chunkFile, scriptFile)),
      source_metadata: metadata,
    };
    writeJson(path.join(outputRoot, "index.json"), index);
    fs.writeFileSync(
      path.join(outputRoot, "index.js"),
      `window.EarthMapBoundarySetIndexesGeoBoundaries=window.EarthMapBoundarySetIndexesGeoBoundaries||{};window.EarthMapBoundarySetIndexesGeoBoundaries[${JSON.stringify(`${iso3}:${adm}`)}]=${JSON.stringify(index)};\n`,
      "utf8",
    );
    const report = {
      provider: "geoBoundaries",
      iso3,
      adm,
      apiUrl,
      geojsonUrl,
      output: path.relative(workspaceRoot, outputRoot),
      feature_count: chunk.features.length,
      bytes: chunkBytes,
      megabytes: Number((chunkBytes / 1048576).toFixed(3)),
      source: chunk.source,
      license: chunk.license,
    };
    writeJson(path.join(outputRoot, "build-report.json"), report);
    reports.push(report);
  }
  console.log(JSON.stringify(reports, null, 2));
}

buildGeoBoundariesBoundarySet().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
