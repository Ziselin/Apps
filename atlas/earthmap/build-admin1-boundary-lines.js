const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..", "..");
const admin1Dir = path.join(root, "assets", "earthmap-engine", "boundary-sets", "natural-earth", "10m", "admin1");
const chunkDir = path.join(admin1Dir, "chunks-js");
const lineDir = path.join(admin1Dir, "lines-js");

function getFeaturePolygonCoordinates(feature) {
  const geometry = feature?.geometry || {};
  if (geometry.type === "Polygon") return [geometry.coordinates || []];
  if (geometry.type === "MultiPolygon") return geometry.coordinates || [];
  return [];
}

function getNaturalEarthAdmin1CountryIso3(feature) {
  const props = feature?.properties || {};
  return String(props.adm0_a3 || props.sov_a3 || feature?.parent_id || "").toUpperCase();
}

function isPermanentAdmin1BoundaryFeature(feature) {
  const props = feature?.properties || {};
  const iso3 = getNaturalEarthAdmin1CountryIso3(feature);
  const type = String(props.type || "").toLowerCase();
  const typeEn = String(props.type_en || "").toLowerCase();
  const constitutionalStatus = String(
    feature?.constitutional_status
    || feature?.classification?.constitutional_status
    || props.constitutional_status
    || props.ziselin_constitutional_status
    || "",
  ).toLowerCase();
  if (constitutionalStatus === "ordinary") return false;
  if (["federal_subject", "autonomous_region", "constituent_country", "special_region"].includes(constitutionalStatus)) return true;
  if (iso3 === "KAB") return true;
  if (iso3 === "DEU") return type === "land" || typeEn === "state";
  if (iso3 === "USA") return type === "state" || typeEn === "state";
  if (iso3 === "CAN") return type === "province" || typeEn === "province" || type === "territoire" || typeEn === "territory";
  if (iso3 === "AUS") return type === "state" || typeEn === "state" || typeEn === "territory";
  if (iso3 === "AUT") return type === "land" || typeEn === "state";
  if (iso3 === "CHE") return type === "canton" || typeEn === "canton";
  if (iso3 === "BRA") return type === "estado" || typeEn === "state";
  if (iso3 === "MEX") return type === "estado" || typeEn === "state";
  if (iso3 === "RUS") return type === "respublika" || typeEn === "republic" || type.includes("avtonom") || typeEn.includes("autonomous");
  if (iso3 === "GBR") return false;
  return false;
}

function getPointKey(point, precision = 5) {
  const lon = Number(point?.[0]);
  const lat = Number(point?.[1]);
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return "";
  return `${lon.toFixed(precision)},${lat.toFixed(precision)}`;
}

function getSegmentKey(a, b) {
  const aKey = getPointKey(a);
  const bKey = getPointKey(b);
  if (!aKey || !bKey || aKey === bKey) return "";
  return aKey < bKey ? `${aKey}|${bKey}` : `${bKey}|${aKey}`;
}

function getSegmentGroupKey(segment) {
  return `${segment.boundaryClass || "detail"}|${segment.countryIso3 || ""}`;
}

function getOtherSegmentPoint(segment, pointKey) {
  return getPointKey(segment.coordinates[0]) === pointKey ? segment.coordinates[1] : segment.coordinates[0];
}

function stitchSegments(segments) {
  const groups = new Map();
  segments.forEach((segment) => {
    const key = getSegmentGroupKey(segment);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(segment);
  });

  const features = [];
  groups.forEach((groupSegments, groupKey) => {
    const adjacency = new Map();
    const used = new Set();
    groupSegments.forEach((segment, index) => {
      segment._stitchId = `${groupKey}:${index}`;
      const startKey = getPointKey(segment.coordinates[0]);
      const endKey = getPointKey(segment.coordinates[1]);
      if (!adjacency.has(startKey)) adjacency.set(startKey, []);
      if (!adjacency.has(endKey)) adjacency.set(endKey, []);
      adjacency.get(startKey).push(segment);
      adjacency.get(endKey).push(segment);
    });

    const findNext = (pointKey) => (adjacency.get(pointKey) || []).find((segment) => !used.has(segment._stitchId));
    const starts = [...adjacency.entries()]
      .filter(([, connected]) => connected.length !== 2)
      .map(([pointKey]) => pointKey);

    const consumePath = (startSegment, startPointKey) => {
      const coordinates = [];
      let currentSegment = startSegment;
      let currentPointKey = startPointKey;
      let firstSegment = startSegment;
      while (currentSegment && !used.has(currentSegment._stitchId)) {
        used.add(currentSegment._stitchId);
        const otherPoint = getOtherSegmentPoint(currentSegment, currentPointKey);
        const currentPoint = currentSegment.coordinates.find((point) => getPointKey(point) === currentPointKey);
        if (!coordinates.length && currentPoint) coordinates.push(currentPoint);
        coordinates.push(otherPoint);
        firstSegment = firstSegment || currentSegment;
        currentPointKey = getPointKey(otherPoint);
        currentSegment = findNext(currentPointKey);
      }
      return { coordinates, segment: firstSegment || startSegment };
    };

    starts.forEach((startPointKey) => {
      let segment = findNext(startPointKey);
      while (segment) {
        const pathData = consumePath(segment, startPointKey);
        if (pathData.coordinates.length > 1) features.push(createLineFeature(pathData, features.length));
        segment = findNext(startPointKey);
      }
    });

    groupSegments.forEach((segment) => {
      if (used.has(segment._stitchId)) return;
      const pathData = consumePath(segment, getPointKey(segment.coordinates[0]));
      if (pathData.coordinates.length > 1) features.push(createLineFeature(pathData, features.length));
    });
  });
  return features;
}

function createLineFeature(pathData, index) {
  const segment = pathData.segment || {};
  return {
    type: "Feature",
    id: `admin1-line-${index}`,
    properties: {
      _earthMapAdmin1BoundaryClass: segment.boundaryClass || "detail",
      _earthMapAdmin1CountryIso3: segment.countryIso3 || "",
      _earthMapSharedBoundaryCount: Number(segment.count) || 1,
    },
    geometry: {
      type: "LineString",
      coordinates: pathData.coordinates,
    },
  };
}

function createLineCollection(chunk) {
  const segments = new Map();
  (chunk.features || []).forEach((feature) => {
    const isPermanent = isPermanentAdmin1BoundaryFeature(feature);
    const countryIso3 = getNaturalEarthAdmin1CountryIso3(feature);
    getFeaturePolygonCoordinates(feature).forEach((polygon) => {
      (polygon || []).forEach((ring) => {
        if (!Array.isArray(ring) || ring.length < 2) return;
        for (let index = 0; index < ring.length - 1; index += 1) {
          const start = ring[index];
          const end = ring[index + 1];
          const key = getSegmentKey(start, end);
          if (!key) continue;
          const existing = segments.get(key);
          if (existing) {
            existing.count += 1;
            if (isPermanent && existing.boundaryClass !== "permanent") {
              existing.boundaryClass = "permanent";
              existing.countryIso3 = countryIso3;
            }
            continue;
          }
          segments.set(key, {
            count: 1,
            coordinates: [[Number(start[0]), Number(start[1])], [Number(end[0]), Number(end[1])]],
            boundaryClass: isPermanent ? "permanent" : "detail",
            countryIso3,
          });
        }
      });
    });
  });
  return {
    type: "FeatureCollection",
    schema: "ziselin-boundary-line-chunk-v1",
    id: `${chunk.id || "natural-earth:10m:admin1"}:lines`,
    iso3: chunk.iso3 || chunk.country_iso3 || "",
    source_id: chunk.id || "",
    generated_from: "admin1-polygon-chunk",
    features: stitchSegments([...segments.values()]),
  };
}

function readChunk(file) {
  const code = fs.readFileSync(file, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file });
  const chunks = sandbox.window.EarthMapBoundarySetChunksNaturalEarth10mAdmin1 || {};
  return Object.entries(chunks)[0] || [];
}

function main() {
  fs.mkdirSync(lineDir, { recursive: true });
  const files = fs.readdirSync(chunkDir)
    .filter((file) => /^natural-earth-10m-admin1-[a-z0-9-]+\.js$/i.test(file))
    .sort();
  const index = [];
  files.forEach((file) => {
    const [iso3, chunk] = readChunk(path.join(chunkDir, file));
    if (!iso3 || !chunk) return;
    const collection = createLineCollection({ ...chunk, iso3 });
    const outputName = file.replace("natural-earth-10m-admin1-", "natural-earth-10m-admin1-lines-");
    const output = `window.EarthMapBoundarySetLineChunksNaturalEarth10mAdmin1=window.EarthMapBoundarySetLineChunksNaturalEarth10mAdmin1||{};window.EarthMapBoundarySetLineChunksNaturalEarth10mAdmin1[${JSON.stringify(iso3)}]=${JSON.stringify(collection)};\n`;
    fs.writeFileSync(path.join(lineDir, outputName), output, "utf8");
    index.push({
      iso3,
      file: `lines-js/${outputName}`,
      feature_count: collection.features.length,
      point_count: collection.features.reduce((sum, feature) => sum + (feature.geometry?.coordinates?.length || 0), 0),
      bytes: Buffer.byteLength(output),
    });
  });
  fs.writeFileSync(path.join(admin1Dir, "line-index.json"), `${JSON.stringify({ schema: "ziselin-boundary-line-index-v1", generated_from: "admin1 chunks-js", chunks: index }, null, 2)}\n`, "utf8");
  console.log(`Admin1 line chunks written: ${index.length}`);
}

main();
