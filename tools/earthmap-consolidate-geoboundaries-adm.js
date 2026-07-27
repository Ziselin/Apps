const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function writeJson(relativePath, data) {
  fs.writeFileSync(path.join(repoRoot, relativePath), `${JSON.stringify(data)}\n`, "utf8");
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function getFeatureTitle(feature) {
  return feature?.name || feature?.title || feature?.properties?.shapeName || "";
}

function getFeatureProviderId(feature) {
  return feature?.provider_boundary_id || feature?.properties?.ziselin_provider_boundary_id || feature?.properties?.shapeID || "";
}

function getUnitKey(feature) {
  return [
    normalizeText(getFeatureTitle(feature)),
    feature?.country_iso3 || feature?.properties?.shapeGroup || "",
    feature?.admin_level || feature?.properties?.shapeType || "",
    feature?.valid_from || "",
    feature?.valid_to || "",
    feature?.parent_id || feature?.properties?.ziselin_parent_id || "",
  ].join("|");
}

function bboxArea(bbox) {
  if (!Array.isArray(bbox) || bbox.length < 4) return 0;
  return Math.max(0, Number(bbox[2]) - Number(bbox[0])) * Math.max(0, Number(bbox[3]) - Number(bbox[1]));
}

function unionBbox(features) {
  const boxes = features.map((feature) => feature.bbox).filter((bbox) => Array.isArray(bbox) && bbox.length >= 4);
  if (!boxes.length) return undefined;
  return [
    Math.min(...boxes.map((bbox) => Number(bbox[0]))),
    Math.min(...boxes.map((bbox) => Number(bbox[1]))),
    Math.max(...boxes.map((bbox) => Number(bbox[2]))),
    Math.max(...boxes.map((bbox) => Number(bbox[3]))),
  ];
}

function pointCountForGeometry(geometry) {
  if (!geometry) return 0;
  if (geometry.type === "Polygon") {
    return geometry.coordinates.flat(1).length;
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.flat(2).length;
  }
  if (geometry.type === "GeometryCollection") {
    return (geometry.geometries || []).reduce((sum, item) => sum + pointCountForGeometry(item), 0);
  }
  return 0;
}

function geometryToPolygons(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates || [];
  return [];
}

function mergeGeometry(features) {
  const polygons = features.flatMap((feature) => geometryToPolygons(feature.geometry));
  if (polygons.length) {
    return { type: "MultiPolygon", coordinates: polygons };
  }
  return {
    type: "GeometryCollection",
    geometries: features.map((feature) => feature.geometry).filter(Boolean),
  };
}

function uniqueValues(values) {
  return [...new Set(values.filter((value) => value !== undefined && value !== null && String(value) !== ""))];
}

function mergeFeatureGroup(features) {
  if (features.length === 1) return features[0];
  const ordered = [...features].sort((a, b) => bboxArea(b.bbox) - bboxArea(a.bbox));
  const primary = structuredClone(ordered[0]);
  const mergedProviderIds = uniqueValues(features.map(getFeatureProviderId));
  const mergedStableIds = uniqueValues(features.map((feature) => feature.stable_id || feature.id));
  const mergedVersionIds = uniqueValues(features.map((feature) => feature.version_id));
  const matchTokens = uniqueValues([
    ...(primary.match_tokens || []),
    ...features.flatMap((feature) => feature.match_tokens || []),
    ...mergedStableIds,
    ...mergedProviderIds,
    getFeatureTitle(primary),
  ]);

  primary.geometry = mergeGeometry(features);
  primary.bbox = unionBbox(features);
  primary.point_count = features.reduce((sum, feature) => sum + (Number(feature.point_count) || pointCountForGeometry(feature.geometry)), 0);
  primary.match_tokens = matchTokens;
  primary.properties = {
    ...(primary.properties || {}),
    ziselin_merged_feature_count: features.length,
    ziselin_merged_stable_ids: mergedStableIds,
    ziselin_merged_version_ids: mergedVersionIds,
    ziselin_merged_provider_boundary_ids: mergedProviderIds,
    ziselin_consolidation_note:
      "Mehrere geoBoundaries-Features mit gleicher administrativer Einheit wurden zu einer mehrteiligen Boundary zusammengeführt.",
  };
  return primary;
}

function featureToIndexEntry(feature, chunkEntry) {
  const properties = feature.properties || {};
  return {
    stable_id: feature.stable_id,
    version_id: feature.version_id,
    title: getFeatureTitle(feature),
    provider_boundary_id: getFeatureProviderId(feature),
    admin_level: feature.admin_level || properties.shapeType || "",
    rank: feature.rank,
    country_iso3: feature.country_iso3 || properties.shapeGroup || "",
    parent_id: feature.parent_id || properties.ziselin_parent_id || "",
    wikidata_id: feature.wikidata_id || properties.wikidataid || "",
    valid_from: feature.valid_from || "",
    valid_to: feature.valid_to || null,
    file: chunkEntry.file,
    scriptFile: chunkEntry.scriptFile,
    bbox: feature.bbox,
    point_count: Number(feature.point_count) || pointCountForGeometry(feature.geometry),
    match_keys: uniqueValues(feature.match_tokens || []),
    merged_stable_ids: properties.ziselin_merged_stable_ids || undefined,
    merged_provider_boundary_ids: properties.ziselin_merged_provider_boundary_ids || undefined,
  };
}

function groupFeatures(features) {
  const groups = new Map();
  for (const feature of features) {
    const key = getUnitKey(feature);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(feature);
  }
  return [...groups.values()];
}

function regenerateJsWrapper(relativePath, namespace, key, data) {
  const js = `window.${namespace}=window.${namespace}||{};window.${namespace}[${JSON.stringify(key)}]=${JSON.stringify(data)};\n`;
  fs.writeFileSync(path.join(repoRoot, relativePath), js, "utf8");
}

function main() {
  const countryIso3 = process.argv[2] || "DEU";
  const adm = process.argv[3] || "ADM3";
  const key = `${countryIso3}:${adm}`;
  const base = `assets/earthmap-engine/boundary-sets/geoboundaries/current/${countryIso3}/${adm}`;
  const indexPath = `${base}/index.json`;
  const chunkPath = `${base}/chunks/geoboundaries-${countryIso3.toLowerCase()}-${adm.toLowerCase()}.geojson`;
  const indexJsPath = `${base}/index.js`;
  const chunkJsPath = `${base}/chunks-js/geoboundaries-${countryIso3.toLowerCase()}-${adm.toLowerCase()}.js`;

  const index = readJson(indexPath);
  const chunk = readJson(chunkPath);
  const chunkEntry = index.chunks?.[0];
  if (!chunkEntry) throw new Error(`No chunk entry found in ${indexPath}`);

  const originalCount = chunk.features.length;
  const groups = groupFeatures(chunk.features);
  const duplicateGroups = groups.filter((group) => group.length > 1);
  const mergedFeatures = groups.map(mergeFeatureGroup);

  chunk.features = mergedFeatures;
  if (chunk.metadata?.admUnitCount) chunk.metadata.admUnitCount = String(mergedFeatures.length);

  index.feature_index = mergedFeatures.map((feature) => featureToIndexEntry(feature, chunkEntry));
  index.chunks[0] = {
    ...chunkEntry,
    feature_count: mergedFeatures.length,
  };
  index.source_metadata = {
    ...(index.source_metadata || {}),
    ziselin_consolidated_at: new Date().toISOString(),
    ziselin_consolidated_from_features: originalCount,
    ziselin_consolidated_to_features: mergedFeatures.length,
    ziselin_consolidated_duplicate_groups: duplicateGroups.length,
    ziselin_consolidation_key:
      "title + country_iso3 + admin_level + valid_from + valid_to + parent_id",
  };

  const chunkJson = `${JSON.stringify(chunk)}\n`;
  index.chunks[0].bytes = Buffer.byteLength(chunkJson, "utf8");

  writeJson(chunkPath, chunk);
  writeJson(indexPath, index);
  regenerateJsWrapper(indexJsPath, "EarthMapBoundarySetIndexesGeoBoundaries", key, index);
  regenerateJsWrapper(chunkJsPath, "EarthMapBoundarySetChunksGeoBoundaries", key, chunk);

  console.log(
    JSON.stringify(
      {
        dataset: key,
        originalCount,
        consolidatedCount: mergedFeatures.length,
        duplicateGroups: duplicateGroups.length,
        removedBrowserDuplicates: originalCount - mergedFeatures.length,
      },
      null,
      2,
    ),
  );
}

main();
