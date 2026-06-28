const ui = Object.fromEntries([
  "globeApp", "menuButton", "menuCloseButton", "menuOverlay", "sideMenu",
  "exportProjectButton", "exportMenu",
  "openWorkspaceButton", "returnPreviewButton", "globe", "globeCanvas",
  "newProjectButton", "projectBrowserList", "libraryBrowserList", "boundarySummary", "boundaryLevelList",
  "boundarySearchInput", "boundarySearchButton", "boundarySearchResults",
  "layerEditorTitle", "layerEditorSummary", "layerEditorContent", "layerColorInput", "layerColorPaletteButton", "layerMetaList",
].map((id) => [id, document.getElementById(id)]));

const STORAGE_KEY = "earthmap-projects-v1";
const LEGACY_STORAGE_KEY = "globemap-projects-v1";
const NATURAL_EARTH_ASSET_BASE = "../assets/geojson/natural-earth/";

const GEOMETRY_BASE_REGISTRY = {
  naturalEarthModern: {
    id: "natural-earth-modern",
    label: "Natural Earth · moderne Erde",
    kind: "modern-earth",
    source: "Natural Earth",
    geometryType: "political-and-physical-boundaries",
    detailLevels: [
      { id: "110m", label: "110m", use: "Globale Ansicht", path: `${NATURAL_EARTH_ASSET_BASE}110m/` },
      { id: "50m", label: "50m", use: "Mittlerer Zoom", path: `${NATURAL_EARTH_ASSET_BASE}50m/` },
      { id: "10m", label: "10m", use: "Detailzoom", path: `${NATURAL_EARTH_ASSET_BASE}10m/` },
    ],
  },
};

// Architekturregel: Earth-Map-Projekte referenzieren Boundary-Sets, statt eine
// einzelne Weltgeometrie fest einzubauen. Natural Earth ist die Standardbasis
// für neue moderne Karten. Später können paläogeografische oder andere
// rekonstruierte Grenzräume als eigene Boundary-Sets mit derselben Schnittstelle
// ergänzt werden.
function createDefaultBoundarySets() {
  return [{
    id: `boundary-${Date.now()}`,
    role: "default",
    geometryBaseId: GEOMETRY_BASE_REGISTRY.naturalEarthModern.id,
    label: GEOMETRY_BASE_REGISTRY.naturalEarthModern.label,
    temporalModel: {
      kind: "present-day",
      validAt: "current",
    },
    detailStrategy: GEOMETRY_BASE_REGISTRY.naturalEarthModern.detailLevels.map((level, index) => ({
      ...level,
      minZoom: index === 0 ? 0 : index === 1 ? 2.5 : 5,
    })),
  }];
}

function createDefaultLibraryFolders() {
  return [
    {
      id: "folder-boundary-maps",
      type: "boundary-maps",
      title: "Länderkarten",
      description: "Importierte Länder- und Grenzkarten dieses Projekts.",
      items: [],
    },
    {
      id: "folder-datasets",
      type: "datasets",
      title: "Datenbanken",
      description: "Tabellenwerte, die später auf Grenzlayer projiziert werden.",
      items: [],
    },
    {
      id: "folder-map-collections",
      type: "map-collections",
      title: "Kartensammlungen",
      description: "Zusammenstellungen mehrerer Layer für bestimmte Ansichten.",
      items: [],
    },
  ];
}

function createEarthMapProject(title = "Neues Earth-Map-Projekt") {
  return {
    id: `earthmap-${Date.now()}`,
    title,
    status: "in Vorbereitung",
    activeBoundarySetId: "",
    activeLibraryItemId: "",
    boundarySets: createDefaultBoundarySets(),
    libraryFolders: createDefaultLibraryFolders(),
    dataLayers: [],
    classification: {
      mode: "manual-breaks",
      breaks: [
        { from: 0, to: 10, color: "#d9cc98" },
        { from: 11, to: 50, color: "#b9c59d" },
        { from: 51, to: 200, color: "#6e9388" },
      ],
    },
  };
}

function repairLegacyText(value) {
  if (typeof value !== "string") return value;
  return value
    .replaceAll("Â·", "·")
    .replaceAll("Ã¤", "ä")
    .replaceAll("Ã¶", "ö")
    .replaceAll("Ã¼", "ü")
    .replaceAll("Ã„", "Ä")
    .replaceAll("Ã–", "Ö")
    .replaceAll("Ãœ", "Ü")
    .replaceAll("ÃŸ", "ß");
}

function normalizeLibraryItem(item) {
  return {
    id: item?.id || `layer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind: item?.kind || "boundary-map",
    name: repairLegacyText(item?.name || "Unbenannte Karte"),
    source: repairLegacyText(item?.source || ""),
    iso3: String(item?.iso3 || ""),
    adminLevel: repairLegacyText(item?.adminLevel || item?.level || ""),
    detail: repairLegacyText(item?.detail || ""),
    license: repairLegacyText(item?.license || ""),
    sourceUrl: item?.sourceUrl || item?.apiUrl || "",
    importedAt: item?.importedAt || new Date().toISOString(),
    temporalCoverage: {
      label: repairLegacyText(item?.temporalCoverage?.label || "gegenwärtig / aktuell"),
      from: item?.temporalCoverage?.from || "",
      to: item?.temporalCoverage?.to || "",
    },
    display: {
      visible: item?.display?.visible !== false,
      color: item?.display?.color || "#c6a86a",
    },
    geometryRef: item?.geometryRef || null,
  };
}

function normalizeLibraryFolders(folders) {
  const defaults = createDefaultLibraryFolders();
  const incoming = Array.isArray(folders) ? folders : [];
  return defaults.map((folder) => {
    const existing = incoming.find((candidate) => candidate?.type === folder.type || candidate?.id === folder.id) || {};
    return {
      ...folder,
      ...existing,
      title: repairLegacyText(existing.title || folder.title),
      description: repairLegacyText(existing.description || folder.description),
      items: Array.isArray(existing.items) ? existing.items.map(normalizeLibraryItem) : [],
    };
  });
}

function normalizeProject(project) {
  const normalized = {
    ...createEarthMapProject(project?.title || "Earth-Map-Projekt"),
    ...project,
    boundarySets: Array.isArray(project?.boundarySets) && project.boundarySets.length ? project.boundarySets : createDefaultBoundarySets(),
    libraryFolders: normalizeLibraryFolders(project?.libraryFolders),
  };
  normalized.title = repairLegacyText(normalized.title);
  normalized.boundarySets = normalized.boundarySets.map((boundarySet) => ({
    ...boundarySet,
    label: repairLegacyText(boundarySet.label),
    detailStrategy: (boundarySet.detailStrategy || []).map((level) => ({
      ...level,
      label: repairLegacyText(level.label),
      use: repairLegacyText(level.use),
    })),
  }));
  normalized.activeBoundarySetId = normalized.activeBoundarySetId || normalized.boundarySets[0]?.id || "";
  normalized.activeLibraryItemId = String(normalized.activeLibraryItemId || "");
  return normalized;
}

function loadProjects() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(parsed?.projects) && parsed.projects.length) return parsed.projects.map(normalizeProject);
    const legacyParsed = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "null");
    if (Array.isArray(legacyParsed?.projects) && legacyParsed.projects.length) {
      const projects = legacyParsed.projects.map(normalizeProject);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects }));
      return projects;
    }
  } catch (error) {
    console.warn("Earth-Map-Projekte konnten nicht gelesen werden.", error);
  }
  return [normalizeProject(createEarthMapProject("Weltkarte · Grundmodell"))];
}

const state = {
  projects: loadProjects(),
  activeProjectId: "",
};

state.activeProjectId = state.projects[0]?.id || "";

function persistProjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: state.projects }));
  } catch (error) {
    console.warn("Earth-Map-Projekte konnten nicht gespeichert werden.", error);
  }
}

function getActiveProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0] || null;
}

function getActiveBoundarySet(project = getActiveProject()) {
  return project?.boundarySets?.find((set) => set.id === project.activeBoundarySetId) || project?.boundarySets?.[0] || null;
}

function getLibraryFolder(project, folderType) {
  return project?.libraryFolders?.find((folder) => folder.type === folderType) || null;
}

function getActiveLibraryItem(project = getActiveProject()) {
  const activeId = project?.activeLibraryItemId || "";
  if (!activeId) return null;
  for (const folder of project.libraryFolders || []) {
    const item = folder.items?.find((candidate) => candidate.id === activeId);
    if (item) return item;
  }
  return null;
}

function getVisibleBoundaryMapItems(project = getActiveProject()) {
  const folder = getLibraryFolder(project, "boundary-maps");
  return (folder?.items || []).filter((item) => item.display?.visible !== false);
}

function getNaturalEarthCountryFeatureByIso3(iso3) {
  const normalizedIso3 = String(iso3 || "").toUpperCase();
  if (!normalizedIso3) return null;
  const features = window.EarthMapNaturalEarthCountries?.features || [];
  return features.find((feature) => getNaturalEarthIso3(feature).toUpperCase() === normalizedIso3) || null;
}

function hexToRgba(hex, alpha = 1) {
  const value = String(hex || "").trim();
  const match = value.match(/^#?([0-9a-f]{6})$/i);
  if (!match) return `rgba(198,168,106,${alpha})`;
  const intValue = Number.parseInt(match[1], 16);
  const red = (intValue >> 16) & 255;
  const green = (intValue >> 8) & 255;
  const blue = intValue & 255;
  return `rgba(${red},${green},${blue},${alpha})`;
}

function normalizeColorValue(value, fallback = "") {
  const raw = String(value || "").trim();
  const short = raw.match(/^#?([0-9a-f]{3})$/i);
  if (short) {
    return `#${short[1].split("").map((char) => `${char}${char}`).join("")}`.toLowerCase();
  }
  const full = raw.match(/^#?([0-9a-f]{6})$/i);
  if (full) return `#${full[1].toLowerCase()}`;
  return fallback;
}

function isNeutralPaletteColor(color) {
  const normalized = normalizeColorValue(color);
  if (!normalized) return true;
  const intValue = Number.parseInt(normalized.slice(1), 16);
  const red = (intValue >> 16) & 255;
  const green = (intValue >> 8) & 255;
  const blue = intValue & 255;
  const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
  const isBlackish = red <= 20 && green <= 20 && blue <= 20;
  const isWhitish = red >= 235 && green >= 235 && blue >= 235;
  return isBlackish || isWhitish || spread <= 10;
}

function collectProjectPaletteColors(project = getActiveProject(), extraColors = []) {
  const palette = [];
  const seen = new Set();
  const pushColor = (value) => {
    const normalized = normalizeColorValue(value);
    if (!normalized || isNeutralPaletteColor(normalized) || seen.has(normalized)) return;
    seen.add(normalized);
    palette.push(normalized);
  };

  // Farbregel: Earth Map unterscheidet wie TimeMap freie Farbwahl von
  // Projektfarben. Die Palette sammelt deshalb nur Farben, die im aktuellen
  // Projekt bereits semantisch verwendet werden, statt globale Appfarben
  // ungezielt anzubieten.
  pushColor("#c6a86a");
  (project?.classification?.breaks || []).forEach((entry) => pushColor(entry?.color));
  (project?.libraryFolders || []).forEach((folder) => {
    (folder.items || []).forEach((item) => pushColor(item?.display?.color));
  });
  (Array.isArray(extraColors) ? extraColors : [extraColors]).forEach(pushColor);
  return palette.slice(0, 12);
}

function applyLayerColor(value) {
  const project = getActiveProject();
  const item = getActiveLibraryItem(project);
  if (!item) return;
  const color = normalizeColorValue(value, "#c6a86a");
  item.display = { ...(item.display || {}), color };
  if (ui.layerColorInput) ui.layerColorInput.value = color;
  persistProjects();
  renderLibraryBrowser();
  renderGlobe();
}

function setupLayerColorPalette() {
  const button = ui.layerColorPaletteButton;
  const anchor = button?.parentElement;
  if (!button || !anchor) return;
  const palette = document.createElement("div");
  palette.className = "color-palette layer-color-palette";
  palette.hidden = true;
  anchor.appendChild(palette);

  const closePalette = () => {
    if (palette.hidden) return;
    palette.hidden = true;
    document.removeEventListener("mousedown", handleDocumentPointerDown, true);
  };

  function handleDocumentPointerDown(event) {
    if (anchor.contains(event.target)) return;
    closePalette();
  }

  const renderPalette = () => {
    const currentColor = ui.layerColorInput?.value || "";
    const colors = collectProjectPaletteColors(getActiveProject(), [currentColor]);
    if (!colors.length) {
      const note = document.createElement("p");
      note.className = "palette-empty";
      note.textContent = "Noch keine Projektfarben.";
      palette.replaceChildren(note);
      return;
    }
    palette.replaceChildren(...colors.map((color) => {
      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "color-swatch";
      swatch.style.background = color;
      swatch.setAttribute("aria-label", `Farbe ${color}`);
      swatch.classList.toggle("is-active", normalizeColorValue(currentColor) === color);
      swatch.addEventListener("click", (event) => {
        event.preventDefault();
        applyLayerColor(color);
        closePalette();
      });
      return swatch;
    }));
  };

  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (!getActiveLibraryItem()) return;
    if (palette.hidden) {
      renderPalette();
      palette.hidden = false;
      document.addEventListener("mousedown", handleDocumentPointerDown, true);
    } else {
      closePalette();
    }
  });
}

function formatDateTime(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  } catch {
    return value;
  }
}

function slugifyFilename(value, fallback = "earth-map") {
  const slug = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function setWorkspaceMode(mode) {
  ui.globeApp.classList.toggle("workspace-mode-details", mode === "details");
  ui.globeApp.classList.toggle("workspace-mode-preview", mode !== "details");
}

function setMenuOpen(isOpen) {
  if (isOpen) {
    ui.sideMenu.querySelectorAll("details[open]").forEach((details) => {
      details.open = false;
    });
  }
  ui.sideMenu.classList.toggle("is-open", isOpen);
  ui.sideMenu.setAttribute("aria-hidden", String(!isOpen));
  ui.sideMenu.inert = !isOpen;
  ui.menuOverlay.hidden = !isOpen;
  ui.menuButton.setAttribute("aria-expanded", String(isOpen));
}

function setExportMenuOpen(isOpen) {
  if (ui.exportMenu) ui.exportMenu.hidden = !isOpen;
  ui.exportProjectButton?.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function getEarthMapExportTitle() {
  return getActiveProject()?.title || "Earth Map";
}

function getCanvasPngBlob() {
  return new Promise((resolve, reject) => {
    ui.globeCanvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("canvas-export-empty"));
    }, "image/png");
  });
}

async function exportEarthMapPng() {
  renderGlobe();
  const blob = await getCanvasPngBlob();
  downloadBlob(blob, `${slugifyFilename(getEarthMapExportTitle(), "earth-map")}.png`);
}

function cloneCoordinatesForExport(coordinates) {
  if (!Array.isArray(coordinates)) return [];
  if (typeof coordinates[0] === "number") {
    return [Number(coordinates[0]) || 0, Number(coordinates[1]) || 0];
  }
  return coordinates.map(cloneCoordinatesForExport);
}

function cloneGeometryForExport(geometry) {
  if (!geometry || typeof geometry !== "object") return null;
  if (geometry.type === "GeometryCollection") {
    return {
      type: "GeometryCollection",
      geometries: (geometry.geometries || []).map(cloneGeometryForExport).filter(Boolean),
    };
  }
  return {
    type: geometry.type,
    coordinates: cloneCoordinatesForExport(geometry.coordinates),
  };
}

function cloneFeatureForExport(feature) {
  const geometry = cloneGeometryForExport(feature?.geometry || feature);
  return geometry ? { type: "Feature", properties: {}, geometry } : null;
}

function cloneFeatureCollectionForExport(geojson) {
  if (geojson?.type === "FeatureCollection") {
    return {
      type: "FeatureCollection",
      features: (geojson.features || []).map(cloneFeatureForExport).filter(Boolean),
    };
  }
  const feature = cloneFeatureForExport(geojson);
  return { type: "FeatureCollection", features: feature ? [feature] : [] };
}

function getEarthMapHtmlExportState() {
  const project = getActiveProject();
  // Exportregel: Das HTML ist ein eigenständiger, interaktiver Minimalviewer.
  // Dafür betten wir bewusst die leichte Natural-Earth-Grundgeometrie ein.
  // Die hochaufgelösten 10m-Kacheln bleiben App-Arbeitsmaterial; im Export
  // würden sie den Klick auf "HTML" unnötig schwer machen oder scheinbar
  // blockieren, bevor überhaupt ein Download sichtbar wird.
  const land = getLoadedNaturalEarthLand("110m")
    || window.EarthMapNaturalEarthData?.["110m-land"]
    || getInteractiveNaturalEarthSource()
    || activeNaturalEarthSource
    || getLoadedNaturalEarthLand("110m")
    || { type: "FeatureCollection", features: [] };
  const landRings = extractLandRings(land);
  const layers = getVisibleBoundaryMapItems(project).map((item) => {
    const feature = getNaturalEarthCountryFeatureByIso3(item.geometryRef?.iso3 || item.iso3);
    if (!feature) return null;
    const layerFeature = cloneFeatureForExport(feature);
    return {
      id: item.id,
      name: item.name,
      color: normalizeColorValue(item.display?.color, "#c6a86a") || "#c6a86a",
      feature: layerFeature,
      samples: createLandSamples(extractLandRings(layerFeature), 0.55),
    };
  }).filter((layer) => layer?.feature);

  return {
    land: cloneFeatureCollectionForExport(land),
    landSamples: createLandSamples(landRings, 1.15),
    layers,
    rotation: { ...rotation },
    zoom: globeZoom,
  };
}

function buildEarthMapHtmlExport() {
  let stateJson = "";
  try {
    stateJson = JSON.stringify(getEarthMapHtmlExportState()).replace(/</g, "\\u003c");
  } catch (error) {
    console.error("Earth Map export state could not be serialized", error);
    stateJson = JSON.stringify({
      land: { type: "FeatureCollection", features: [] },
      landSamples: [],
      layers: [],
      rotation: { ...rotation },
      zoom: globeZoom,
    });
  }
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Earth Map</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #fff; }
    body { cursor: grab; }
    body.is-dragging { cursor: grabbing; }
    canvas { display: block; width: 100vw; height: 100vh; background: #fff; }
  </style>
</head>
<body>
  <canvas id="earthMapCanvas" aria-label="Interaktiver Earth-Map-Globus"></canvas>
  <script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
  <script>
  (() => {
    const EXPORT_STATE = ${stateJson};
    const canvas = document.getElementById("earthMapCanvas");
    const ctx = canvas.getContext("2d");
    const DEG = Math.PI / 180;
    const WATER = "#f8f8f6";
    const LAND = "#b8b8b4";
    const LAND_STROKE = "#ffffff";
    const SPHERE_STROKE = "#a9aaa7";
    let rotation = {
      lon: Number(EXPORT_STATE.rotation?.lon) || 0,
      lat: Number(EXPORT_STATE.rotation?.lat) || 0,
    };
    let zoom = Math.min(9, Math.max(1, Number(EXPORT_STATE.zoom) || 1));
    let drag = null;
    let view = { width: 1, height: 1, radius: 1, cx: 0, cy: 0 };

    function colorWithAlpha(hex, alpha) {
      const match = String(hex || "").trim().match(/^#?([0-9a-f]{6})$/i);
      if (!match) return "rgba(198,168,106," + alpha + ")";
      const value = parseInt(match[1], 16);
      return "rgba(" + ((value >> 16) & 255) + "," + ((value >> 8) & 255) + "," + (value & 255) + "," + alpha + ")";
    }

    function rotatePoint(lon, lat) {
      const lambda = (lon + rotation.lon) * DEG;
      const phi = lat * DEG;
      const tilt = rotation.lat * DEG;
      const cosPhi = Math.cos(phi);
      const x = cosPhi * Math.sin(lambda);
      const y = Math.sin(phi) * Math.cos(tilt) - cosPhi * Math.cos(lambda) * Math.sin(tilt);
      const z = Math.sin(phi) * Math.sin(tilt) + cosPhi * Math.cos(lambda) * Math.cos(tilt);
      return { x, y, z };
    }

    function projectPosition(position) {
      const point = rotatePoint(Number(position[0]), Number(position[1]));
      if (point.z <= 0.012) return null;
      return {
        x: view.cx + point.x * view.radius,
        y: view.cy - point.y * view.radius,
      };
    }

    function forEachPolygon(geometry, callback) {
      if (!geometry) return;
      if (geometry.type === "Polygon") {
        callback(geometry.coordinates || []);
      } else if (geometry.type === "MultiPolygon") {
        (geometry.coordinates || []).forEach((polygon) => callback(polygon || []));
      } else if (geometry.type === "GeometryCollection") {
        (geometry.geometries || []).forEach((child) => forEachPolygon(child, callback));
      }
    }

    function drawRing(ring) {
      let hasPoint = false;
      let moved = false;
      let previous = null;
      const maxSegmentLength = view.radius * 0.36;
      for (const position of ring || []) {
        const projected = projectPosition(position);
        if (!projected) {
          moved = false;
          previous = null;
          continue;
        }
        if (previous) {
          const dx = projected.x - previous.x;
          const dy = projected.y - previous.y;
          if (Math.hypot(dx, dy) > maxSegmentLength) {
            moved = false;
          }
        }
        hasPoint = true;
        if (!moved) {
          ctx.moveTo(projected.x, projected.y);
          moved = true;
        } else {
          ctx.lineTo(projected.x, projected.y);
        }
        previous = projected;
      }
      return hasPoint;
    }

    function drawFeatureCollection(geojson, fill, stroke, lineWidth) {
      const features = geojson?.type === "FeatureCollection" ? geojson.features : [geojson];
      ctx.beginPath();
      let hasShape = false;
      for (const feature of features || []) {
        forEachPolygon(feature?.geometry || feature, (polygon) => {
          for (const ring of polygon) {
            if (drawRing(ring)) {
              ctx.closePath();
              hasShape = true;
            }
          }
        });
      }
      if (!hasShape) return;
      ctx.fillStyle = fill;
      ctx.fill("evenodd");
      if (stroke && lineWidth > 0) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    }

    function drawFeatureLines(geojson, stroke, lineWidth) {
      const features = geojson?.type === "FeatureCollection" ? geojson.features : [geojson];
      ctx.beginPath();
      let hasLine = false;
      for (const feature of features || []) {
        forEachPolygon(feature?.geometry || feature, (polygon) => {
          for (const ring of polygon) {
            if (drawRing(ring)) hasLine = true;
          }
        });
      }
      if (!hasLine) return;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    function drawSurfaceSamples(samples, fill, radiusFactor, minRadius) {
      const dotRadius = Math.max(minRadius, view.radius * radiusFactor);
      ctx.fillStyle = fill;
      for (const sample of samples || []) {
        const point = projectPosition([sample.lon, sample.lat]);
        if (!point) continue;
        ctx.beginPath();
        ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function createD3Projection() {
      if (!window.d3?.geoOrthographic || !window.d3?.geoPath) return null;
      return window.d3.geoOrthographic()
        .translate([view.cx, view.cy])
        .scale(view.radius)
        .rotate([rotation.lon, rotation.lat])
        .clipAngle(90)
        .precision(0.25);
    }

    function drawD3Feature(geojson, fill, stroke, lineWidth) {
      const projection = createD3Projection();
      if (!projection) return false;
      const path = window.d3.geoPath(projection, ctx);
      ctx.beginPath();
      path(geojson);
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke && lineWidth > 0) {
        ctx.beginPath();
        path(geojson);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      return true;
    }

    function resizeCanvas() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      view.width = width;
      view.height = height;
      view.cx = width / 2;
      view.cy = height / 2;
      view.radius = Math.min(width, height) * 0.47 * zoom;
    }

    function render() {
      resizeCanvas();
      ctx.clearRect(0, 0, view.width, view.height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, view.width, view.height);
      ctx.save();
      ctx.beginPath();
      ctx.arc(view.cx, view.cy, view.radius, 0, Math.PI * 2);
      ctx.fillStyle = WATER;
      ctx.fill();
      ctx.clip();
      const d3Rendered = drawD3Feature(EXPORT_STATE.land, "rgba(184,184,180,.82)", "rgba(126,130,128,.44)", Math.max(.55, view.radius * .001));
      if (!d3Rendered) {
        drawSurfaceSamples(EXPORT_STATE.landSamples, "rgba(184,184,180,.78)", .0068, 1.4);
        drawFeatureLines(EXPORT_STATE.land, "rgba(126,130,128,.44)", Math.max(.55, view.radius * .001));
      }
      for (const layer of EXPORT_STATE.layers || []) {
        const layerRendered = drawD3Feature(layer.feature, colorWithAlpha(layer.color, .78), colorWithAlpha(layer.color, .98), Math.max(.7, view.radius * .0013));
        if (!layerRendered) {
          drawSurfaceSamples(layer.samples, colorWithAlpha(layer.color, .82), .0058, 1.15);
          drawFeatureLines(layer.feature, colorWithAlpha(layer.color, .98), Math.max(.7, view.radius * .0013));
        }
      }
      const gradient = ctx.createRadialGradient(
        view.cx - view.radius * .38,
        view.cy - view.radius * .42,
        view.radius * .05,
        view.cx,
        view.cy,
        view.radius
      );
      gradient.addColorStop(0, "rgba(255,255,255,.42)");
      gradient.addColorStop(.62, "rgba(255,255,255,.02)");
      gradient.addColorStop(1, "rgba(0,0,0,.10)");
      ctx.fillStyle = gradient;
      ctx.fillRect(view.cx - view.radius, view.cy - view.radius, view.radius * 2, view.radius * 2);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(view.cx, view.cy, view.radius, 0, Math.PI * 2);
      ctx.strokeStyle = SPHERE_STROKE;
      ctx.lineWidth = Math.max(1, view.radius * .002);
      ctx.stroke();
    }

    canvas.addEventListener("pointerdown", (event) => {
      drag = { x: event.clientX, y: event.clientY, lon: rotation.lon, lat: rotation.lat };
      document.body.classList.add("is-dragging");
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const sensitivity = 0.42 / Math.sqrt(Math.max(1, zoom));
      rotation.lon = drag.lon + (event.clientX - drag.x) * sensitivity;
      rotation.lat = Math.max(-82, Math.min(82, drag.lat - (event.clientY - drag.y) * sensitivity));
      render();
    });
    canvas.addEventListener("pointerup", (event) => {
      drag = null;
      document.body.classList.remove("is-dragging");
      try { canvas.releasePointerCapture(event.pointerId); } catch (_) {}
    });
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * 0.0012);
      zoom = Math.min(9, Math.max(1, zoom * factor));
      render();
    }, { passive: false });
    window.addEventListener("resize", render);
    function renderWhenReady(attempt = 0) {
      render();
      if (window.d3?.geoOrthographic || attempt >= 30) return;
      window.setTimeout(() => renderWhenReady(attempt + 1), 120);
    }
    renderWhenReady();
  })();
  </script>
</body>
</html>`;
}

function exportEarthMapHtml() {
  try {
    renderGlobe();
    const blob = new Blob([buildEarthMapHtmlExport()], { type: "text/html;charset=utf-8" });
    downloadBlob(blob, `${slugifyFilename(getEarthMapExportTitle(), "earth-map")}.html`);
  } catch (error) {
    console.error("HTML export failed", error);
    window.alert(`HTML-Export fehlgeschlagen: ${error?.message || "unbekannter Fehler"}`);
  }
}

function handleExportFormat(format) {
  setExportMenuOpen(false);
  if (format === "html") {
    exportEarthMapHtml();
  } else if (format === "png") {
    exportEarthMapPng().catch((error) => {
      console.error("PNG export failed", error);
      window.alert("PNG-Export fehlgeschlagen. Bitte versuche es erneut.");
    });
  }
}

const ctx = ui.globeCanvas.getContext("2d");
const DEG = Math.PI / 180;
const hasD3Geo = typeof window.d3?.geoOrthographic === "function" && typeof window.d3?.geoPath === "function";
document.documentElement.dataset.geoEngine = hasD3Geo ? "d3-orthographic" : "canvas-fallback";

// Geodatenregel: Die sichtbare Weltgeometrie kommt nicht aus handgebauten
// Platzhalterpolygonen, sondern aus dem Geometrie-Basisdatensatz des aktiven
// Projekts. Natural Earth ist hier die erste echte moderne Basis. Die
// Renderer-Schicht arbeitet mit Lon/Lat-Ringen und Oberflächenproben; dadurch
// bleibt die Darstellung auf der Kugeloberfläche stabil und kann später auch
// historische oder paläogeografische Grenzräume mit derselben Schnittstelle anzeigen.

const NATURAL_EARTH_LAND_DETAILS = {
  "110m": { key: "110m-land", scriptPath: `${NATURAL_EARTH_ASSET_BASE}110m/ne_110m_land.js?v=20260627a`, minZoom: 1 },
  "50m": { key: "50m-land", scriptPath: `${NATURAL_EARTH_ASSET_BASE}50m/ne_50m_land.js?v=20260627a`, minZoom: 2.35 },
  "10m": { key: "10m-land", scriptPath: `${NATURAL_EARTH_ASSET_BASE}10m/ne_10m_land.js?v=20260628a`, minZoom: 7.05 },
};

let activeNaturalEarthSource = window.EarthMapNaturalEarthData?.["110m-land"] || null;
let pendingNaturalEarthDetail = "";
let activeNaturalEarthTileSignature = "";
const pendingNaturalEarthTiles = new Set();

const geoState = {
  detailLevel: "110m",
  landRings: [],
  landSamples: [],
  status: "loading",
  samplesReady: false,
};

function getLoadedNaturalEarthLand(level) {
  const config = NATURAL_EARTH_LAND_DETAILS[level];
  return config ? window.EarthMapNaturalEarthData?.[config.key] || null : null;
}

function getDesiredNaturalEarthDetailLevel() {
  if (globeZoom >= NATURAL_EARTH_LAND_DETAILS["10m"].minZoom) return "10m";
  if (globeZoom >= NATURAL_EARTH_LAND_DETAILS["50m"].minZoom) return "50m";
  return "110m";
}

function normalizeLongitude(lon) {
  let value = lon;
  while (value < -180) value += 360;
  while (value > 180) value -= 360;
  return value;
}

function getBufferedViewportBounds() {
  const rect = ui.globe.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const baseSize = Math.min(width, height);
  const radius = baseSize * 0.47 * globeZoom;
  const viewportHalfLon = Math.asin(clamp(width / (2 * radius), 0, 1)) / DEG;
  const viewportHalfLat = Math.asin(clamp(height / (2 * radius), 0, 1)) / DEG;
  const bufferedHalfLon = clamp(viewportHalfLon * 3, 8, 180);
  const bufferedHalfLat = clamp(viewportHalfLat * 3, 8, 90);
  const centerLon = normalizeLongitude(-rotation.lon);
  const centerLat = clamp(-rotation.lat, -90, 90);
  const minLat = clamp(centerLat - bufferedHalfLat, -90, 90);
  const maxLat = clamp(centerLat + bufferedHalfLat, -90, 90);
  const minLon = centerLon - bufferedHalfLon;
  const maxLon = centerLon + bufferedHalfLon;
  const lonSegments = minLon < -180
    ? [[minLon + 360, 180], [-180, maxLon]]
    : maxLon > 180
      ? [[minLon, 180], [-180, maxLon - 360]]
      : [[minLon, maxLon]];
  return { minLat, maxLat, lonSegments };
}

function tileIntersectsViewport(tile, bounds) {
  const latIntersects = tile.minLat <= bounds.maxLat && tile.maxLat >= bounds.minLat;
  if (!latIntersects) return false;
  return bounds.lonSegments.some(([minLon, maxLon]) => tile.minLon <= maxLon && tile.maxLon >= minLon);
}

function getVisibleNaturalEarth10mTiles() {
  const index = window.EarthMapNaturalEarthTileIndex?.["10m-land"];
  if (!index?.tiles?.length) return [];
  const bounds = getBufferedViewportBounds();
  return index.tiles.filter((tile) => tileIntersectsViewport(tile, bounds));
}

function buildNaturalEarth10mTileCollection(tiles) {
  const features = [];
  tiles.forEach((tile) => {
    const collection = window.EarthMapNaturalEarthTileData?.[`10m-land-${tile.key}`];
    if (collection?.features?.length) features.push(...collection.features);
  });
  return {
    type: "FeatureCollection",
    name: "ne_10m_land_viewport_tiles",
    features,
  };
}

function featureBboxIntersectsViewport(feature, bounds) {
  const bbox = feature?.bbox || feature?.geometry?.bbox;
  if (!Array.isArray(bbox) || bbox.length < 4 || !bbox.every(Number.isFinite)) return true;
  const latIntersects = bbox[1] <= bounds.maxLat && bbox[3] >= bounds.minLat;
  if (!latIntersects) return false;
  return bounds.lonSegments.some(([minLon, maxLon]) => bbox[0] <= maxLon && bbox[2] >= minLon);
}

function getRenderableNaturalEarthSource(source) {
  if (geoState.detailLevel !== "10m" || source?.type !== "FeatureCollection") return source;
  const bounds = getBufferedViewportBounds();
  // Performance-Regel: 10m bleibt topologisch ungeschnitten, wird aber vor dem
  // Rendern auf den gepufferten Sichtbereich reduziert. So vermeiden wir die
  // früheren Kachel-Schnittartefakte, ohne bei jedem Frame die gesamte 10m-Welt
  // durch D3 laufen zu lassen.
  return {
    type: "FeatureCollection",
    name: `${source.name || "ne_10m_land"}_visible`,
    features: (source.features || []).filter((feature) => featureBboxIntersectsViewport(feature, bounds)),
  };
}

function installNaturalEarthDetail(level, geojson) {
  if (!geojson) return;
  activeNaturalEarthSource = geojson;
  geoState.detailLevel = level;
  if (hasD3Geo) {
    geoState.status = "ready";
    geoState.landRings = [];
    geoState.landSamples = [];
    geoState.samplesReady = false;
    return;
  }
  installLandGeoJson(geojson);
}

function requestNaturalEarthDetailForZoom() {
  const desiredLevel = getDesiredNaturalEarthDetailLevel();
  if (desiredLevel === "10m" && isNavigatingGlobe) {
    scheduleNaturalEarthDetailUpdate(720);
    return;
  }
  activeNaturalEarthTileSignature = "";
  if (desiredLevel === geoState.detailLevel && activeNaturalEarthSource) return;

  const loaded = getLoadedNaturalEarthLand(desiredLevel);
  if (loaded) {
    installNaturalEarthDetail(desiredLevel, loaded);
    return;
  }

  const config = NATURAL_EARTH_LAND_DETAILS[desiredLevel];
  if (!config || pendingNaturalEarthDetail === desiredLevel) return;
  pendingNaturalEarthDetail = desiredLevel;
  const script = document.createElement("script");
  script.src = config.scriptPath;
  script.async = true;
  script.onload = () => {
    pendingNaturalEarthDetail = "";
    const loadedAfterScript = getLoadedNaturalEarthLand(desiredLevel);
    if (loadedAfterScript && getDesiredNaturalEarthDetailLevel() === desiredLevel) {
      installNaturalEarthDetail(desiredLevel, loadedAfterScript);
      scheduleGlobeRender();
    }
  };
  script.onerror = () => {
    pendingNaturalEarthDetail = "";
    console.warn(`Natural-Earth-Detailstufe ${desiredLevel} konnte nicht geladen werden.`);
  };

  const appendScript = () => {
    if (getDesiredNaturalEarthDetailLevel() !== desiredLevel || (desiredLevel === "10m" && isNavigatingGlobe)) {
      pendingNaturalEarthDetail = "";
      scheduleNaturalEarthDetailUpdate(720);
      return;
    }
    document.head.appendChild(script);
  };

  // Performance-Regel: 10m ist ein großer Datensatz und darf nicht während
  // aktiver Navigation in den Hauptthread fallen. Wir starten den Download
  // deshalb erst in einer Ruhephase; niedrigere Detailstufen bleiben direkt.
  if (desiredLevel === "10m") {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(appendScript, { timeout: 1800 });
    } else {
      window.setTimeout(appendScript, 900);
    }
  } else {
    appendScript();
  }
}

function scheduleGlobeRender() {
  if (renderFrameId) return;
  renderFrameId = window.requestAnimationFrame(() => {
    renderFrameId = 0;
    renderGlobe();
  });
}

function scheduleNaturalEarthDetailUpdate(delay = 220) {
  window.clearTimeout(detailLoadTimer);
  detailLoadTimer = window.setTimeout(() => {
    detailLoadTimer = 0;
    requestNaturalEarthDetailForZoom();
    scheduleGlobeRender();
  }, delay);
}

function markGlobeNavigationActive() {
  isNavigatingGlobe = true;
  window.clearTimeout(detailLoadTimer);
  window.clearTimeout(navigationSettledTimer);
  navigationSettledTimer = window.setTimeout(() => {
    isNavigatingGlobe = false;
    scheduleNaturalEarthDetailUpdate(420);
    scheduleGlobeRender();
  }, 180);
}

function getInteractiveNaturalEarthSource() {
  // Interaktionsregel: Bereits geladene stabile Details bleiben sichtbar.
  // Gleichzeitig wird beim Herauszoomen wieder auf die passende gröbere
  // Detailstufe zurückgeschaltet; geladene 50m-Daten dürfen die globale
  // Ansicht nicht dauerhaft schwerer machen.
  const desiredLevel = getDesiredNaturalEarthDetailLevel();
  if (desiredLevel === "10m") {
    if (isNavigatingGlobe) {
      return getLoadedNaturalEarthLand("50m") || getLoadedNaturalEarthLand("110m") || activeNaturalEarthSource;
    }
    return getLoadedNaturalEarthLand("10m") || getLoadedNaturalEarthLand("50m") || getLoadedNaturalEarthLand("110m") || activeNaturalEarthSource;
  }
  if (desiredLevel === "50m") {
    return getLoadedNaturalEarthLand("50m") || getLoadedNaturalEarthLand("110m") || activeNaturalEarthSource;
  }
  return getLoadedNaturalEarthLand("110m") || activeNaturalEarthSource;
}

function sanitizeRing(coordinates) {
  return coordinates
    .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map(([lon, lat]) => [lon, lat]);
}

function extractLandRings(geojson) {
  const rings = [];
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  features.forEach((feature) => {
    const geometry = feature?.geometry;
    if (!geometry) return;
    if (geometry.type === "Polygon") {
      const outerRing = sanitizeRing(geometry.coordinates?.[0] || []);
      if (outerRing.length > 2) rings.push(outerRing);
    }
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates?.forEach((polygon) => {
        const outerRing = sanitizeRing(polygon?.[0] || []);
        if (outerRing.length > 2) rings.push(outerRing);
      });
    }
  });
  return rings;
}

function getRingBounds(ring) {
  const lons = ring.map(([lon]) => lon);
  const lats = ring.map(([, lat]) => lat);
  return {
    minLon: Math.max(-180, Math.min(...lons)),
    maxLon: Math.min(180, Math.max(...lons)),
    minLat: Math.max(-88, Math.min(...lats)),
    maxLat: Math.min(88, Math.max(...lats)),
  };
}

function pointInPolygon(lon, lat, polygon) {
  let inside = false;
  for (let index = 0, previousIndex = polygon.length - 1; index < polygon.length; previousIndex = index, index += 1) {
    const [lonA, latA] = polygon[index];
    const [lonB, latB] = polygon[previousIndex];
    const crosses = (latA > lat) !== (latB > lat);
    const atLon = ((lonB - lonA) * (lat - latA)) / ((latB - latA) || 1) + lonA;
    if (crosses && lon < atLon) inside = !inside;
  }
  return inside;
}

function createLandSamples(rings, step = 1.35) {
  const samples = [];
  rings.forEach((ring) => {
    const bounds = getRingBounds(ring);
    const minLon = Math.floor(bounds.minLon / step) * step;
    const maxLon = Math.ceil(bounds.maxLon / step) * step;
    const minLat = Math.floor(bounds.minLat / step) * step;
    const maxLat = Math.ceil(bounds.maxLat / step) * step;
    for (let lon = minLon; lon <= maxLon; lon += step) {
      for (let lat = minLat; lat <= maxLat; lat += step) {
        const sampleLon = lon + step / 2;
        const sampleLat = lat + step / 2;
        if (!pointInPolygon(sampleLon, sampleLat, ring)) continue;
        samples.push({ lon: sampleLon, lat: sampleLat });
      }
    }
  });
  return samples;
}

function installLandGeoJson(geojson) {
  const landRings = extractLandRings(geojson);
  geoState.landRings = landRings;
  geoState.landSamples = [];
  geoState.samplesReady = false;
  geoState.status = landRings.length ? "ready" : "empty";
}

if (activeNaturalEarthSource) {
  installNaturalEarthDetail("110m", activeNaturalEarthSource);
} else {
  geoState.status = "missing";
}

function buildLandSamplesDeferred() {
  if (geoState.status !== "ready" || geoState.samplesReady) return;
  const rings = [...geoState.landRings];
  let processedRings = 0;
  geoState.landSamples = [];
  geoState.samplesReady = true;
  const processNextRing = () => {
    const ring = rings.shift();
    if (!ring) {
      renderGlobe();
      return;
    }
    geoState.landSamples.push(...createLandSamples([ring], 0.95));
    processedRings += 1;
    if (processedRings % 10 === 0) renderGlobe();
    window.setTimeout(processNextRing, 0);
  };
  window.setTimeout(processNextRing, 80);
}

let dragState = null;
let rotation = { lon: -18, lat: -8 };
let globeZoom = 1;
const MIN_GLOBE_ZOOM = 1;
const MAX_GLOBE_ZOOM = 24;
let renderFrameId = 0;
let detailLoadTimer = 0;
let navigationSettledTimer = 0;
let isNavigatingGlobe = false;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeLonDelta(delta) {
  if (delta > 180) return delta - 360;
  if (delta < -180) return delta + 360;
  return delta;
}

function densifyRing(points, maxStep = 4) {
  const result = [];
  points.forEach(([lon, lat], index) => {
    const [nextLon, nextLat] = points[(index + 1) % points.length];
    const lonDelta = normalizeLonDelta(nextLon - lon);
    const latDelta = nextLat - lat;
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(lonDelta), Math.abs(latDelta)) / maxStep));
    for (let step = 0; step < steps; step += 1) {
      const t = step / steps;
      result.push([lon + lonDelta * t, lat + latDelta * t]);
    }
  });
  return result;
}

function toRotatedUnit(lon, lat) {
  const lambda = (lon + rotation.lon) * DEG;
  const phi = lat * DEG;
  const tilt = rotation.lat * DEG;
  const cosPhi = Math.cos(phi);
  const x0 = cosPhi * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const z0 = cosPhi * Math.cos(lambda);
  const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
  const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
  return { x: x0, y, z };
}

function projectVector(vector, radius, centerX, centerY) {
  return { x: centerX + radius * vector.x, y: centerY - radius * vector.y, z: vector.z };
}

function project(lon, lat, radius, centerX, centerY) {
  return projectVector(toRotatedUnit(lon, lat), radius, centerX, centerY);
}

function getStableGlobeStrokeWidth(radius, factor, minWidth) {
  // Darstellungsregel: Linien sind Annotationen auf der Karte, keine
  // geografischen Flächen. Ihre Stärke folgt deshalb der Startansicht des
  // aktuellen Fensters und nicht der gezoomten Projektionsskala.
  const fittedRadius = radius / Math.max(1, globeZoom);
  return Math.max(minWidth, fittedRadius * factor);
}

function drawSphere(size, radius, center) {
  const sea = ctx.createRadialGradient(center.x - radius * 0.28, center.y - radius * 0.34, radius * 0.12, center.x, center.y, radius);
  sea.addColorStop(0, "#ffffff");
  sea.addColorStop(0.62, "#f3f3f1");
  sea.addColorStop(1, "#dcdeda");
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = sea;
  ctx.fill();
  ctx.lineWidth = Math.max(2, size * 0.006);
  ctx.strokeStyle = "rgba(142,146,142,.72)";
  ctx.stroke();
}

function createOrthographicProjection(radius, center) {
  return window.d3.geoOrthographic()
    .translate([center.x, center.y])
    .scale(radius)
    .rotate([rotation.lon, rotation.lat])
    .clipAngle(90)
    .precision(0.25);
}

function drawGeographicLayer(radius, center) {
  const renderSource = getRenderableNaturalEarthSource(getInteractiveNaturalEarthSource());
  if (!hasD3Geo || !renderSource) return false;

  const projection = createOrthographicProjection(radius, center);
  const path = window.d3.geoPath(projection, ctx);

  // Architekturregel: Ab hier ist GeoJSON im Koordinatensystem WGS84 /
  // lon-lat die einzige Datenquelle für sichtbare Landformen. D3 übernimmt
  // Orthographic Projection und Horizon-Clipping; dadurch liegen Kontinente
  // exakt auf der Kugeloberfläche und werden nicht grafisch verschoben.
  ctx.beginPath();
  path(renderSource);
  ctx.fillStyle = "rgba(178,178,176,.82)";
  ctx.fill();

  ctx.beginPath();
  path(renderSource);
  ctx.strokeStyle = "rgba(92,96,94,.46)";
  ctx.lineWidth = getStableGlobeStrokeWidth(radius, 0.0018, 0.7);
  ctx.stroke();

  return true;
}

function drawProjectBoundaryLayers(radius, center) {
  if (!hasD3Geo) return false;
  const items = getVisibleBoundaryMapItems();
  if (!items.length) return false;
  const projection = createOrthographicProjection(radius, center);
  const path = window.d3.geoPath(projection, ctx);
  let drewLayer = false;

  items.forEach((item) => {
    const provider = item.geometryRef?.provider || "";
    const canUseNaturalEarthFallback = provider === "natural-earth"
      || item.source === "Natural Earth"
      || (provider === "geoboundaries" && String(item.adminLevel || "").toUpperCase() === "ADM0");
    const feature = canUseNaturalEarthFallback
      ? getNaturalEarthCountryFeatureByIso3(item.geometryRef?.iso3 || item.iso3)
      : null;
    if (!feature) return;

    const featureCollection = { type: "FeatureCollection", features: [feature] };
    const color = item.display?.color || "#c6a86a";

    ctx.beginPath();
    path(featureCollection);
    ctx.fillStyle = hexToRgba(color, 0.78);
    ctx.fill();

    ctx.beginPath();
    path(featureCollection);
    ctx.strokeStyle = hexToRgba(color, 0.98);
    ctx.lineWidth = getStableGlobeStrokeWidth(radius, 0.0042, 1.15);
    ctx.stroke();

    drewLayer = true;
  });

  return drewLayer;
}

function drawProjectedLine(points, radius, center, strokeStyle, lineWidth) {
  let drawing = false;
  ctx.beginPath();
  points.forEach(([lon, lat]) => {
    const point = project(lon, lat, radius, center.x, center.y);
    if (point.z <= 0) {
      drawing = false;
      return;
    }
    if (!drawing) {
      ctx.moveTo(point.x, point.y);
      drawing = true;
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawProjectedFill(points, radius, center, fillStyle) {
  let drawing = false;
  let segmentPoints = 0;
  let filled = false;
  ctx.beginPath();
  points.forEach(([lon, lat]) => {
    const point = project(lon, lat, radius, center.x, center.y);
    if (point.z <= 0.006) {
      if (segmentPoints > 2) {
        ctx.closePath();
        filled = true;
      }
      drawing = false;
      segmentPoints = 0;
      return;
    }
    if (!drawing) {
      ctx.moveTo(point.x, point.y);
      drawing = true;
      segmentPoints = 1;
    } else {
      ctx.lineTo(point.x, point.y);
      segmentPoints += 1;
    }
  });
  if (segmentPoints > 2) {
    ctx.closePath();
    filled = true;
  }
  if (!filled) return;
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function ringIsFullyVisible(points, horizonPadding = 0.018) {
  return points.every(([lon, lat]) => toRotatedUnit(lon, lat).z > horizonPadding);
}

function drawGraticule(radius, center) {
  const strokeStyle = "rgba(60,64,63,.26)";
  const lineWidth = getStableGlobeStrokeWidth(radius, 0.0022, 0.75);
  for (let lon = -180; lon <= 180; lon += 30) {
    const points = [];
    for (let lat = -84; lat <= 84; lat += 3) points.push([lon, lat]);
    drawProjectedLine(points, radius, center, strokeStyle, lineWidth);
  }
  for (let lat = -60; lat <= 60; lat += 20) {
    const points = [];
    for (let lon = -180; lon <= 180; lon += 3) points.push([lon, lat]);
    drawProjectedLine(points, radius, center, strokeStyle, lineWidth);
  }
}

function drawLand(radius, center) {
  if (geoState.status !== "ready") {
    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,248,.62)";
    ctx.font = `${Math.max(11, radius * 0.055)}px Source Sans 3, system-ui, sans-serif`;
    ctx.fillText("Geodaten werden vorbereitet", center.x, center.y);
    ctx.restore();
    return;
  }

  geoState.landRings.forEach((ring) => {
    const denseRing = densifyRing(ring, 1.4);
    if (ringIsFullyVisible(denseRing)) {
      drawProjectedFill(denseRing, radius, center, "rgba(176,176,174,.72)");
    }
  });

  if (geoState.samplesReady) {
    const dotRadius = Math.max(1.85, radius * 0.011);
    geoState.landSamples.forEach(({ lon, lat }) => {
      const vector = toRotatedUnit(lon, lat);
      if (vector.z <= 0.01) return;
      const point = projectVector(vector, radius, center.x, center.y);
      const alpha = clamp(0.48 + vector.z * 0.24, 0.44, 0.76);
      ctx.beginPath();
      ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(178,178,176,${alpha})`;
      ctx.fill();
    });
  }

  geoState.landRings.forEach((ring) => {
    drawProjectedLine(densifyRing(ring, 1.2), radius, center, "rgba(92,96,94,.5)", getStableGlobeStrokeWidth(radius, 0.002, 0.7));
  });
}

function drawAtmosphere(size, radius, center) {
  const shade = ctx.createRadialGradient(center.x - radius * 0.34, center.y - radius * 0.36, radius * 0.05, center.x, center.y, radius);
  shade.addColorStop(0, "rgba(255,255,255,.18)");
  shade.addColorStop(0.38, "rgba(255,255,255,.03)");
  shade.addColorStop(0.76, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(80,84,82,.16)");
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = shade;
  ctx.fill();
  ctx.lineWidth = Math.max(1, size * 0.004);
  ctx.strokeStyle = "rgba(92,96,94,.28)";
  ctx.stroke();
}

function renderGlobe() {
  const rect = ui.globe.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  const baseSize = Math.min(width, height);
  ui.globeCanvas.width = Math.floor(width * dpr);
  ui.globeCanvas.height = Math.floor(height * dpr);
  ui.globeCanvas.style.width = `${width}px`;
  ui.globeCanvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  // Darstellungsregel: Zoom 1 ist immer die vollständig sichtbare Startkugel.
  // Alle höheren Zoomstufen skalieren von diesem fensterabhängigen Fit-Radius
  // aus; dadurch bleibt die kleinste Ansicht auch bei Resize zuverlässig zentriert
  // und vollständig im verfügbaren Renderbereich.
  const radius = baseSize * 0.47 * globeZoom;
  const center = { x: width / 2, y: height / 2 };
  drawSphere(baseSize, radius, center);
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  const usedGeographicProjection = drawGeographicLayer(radius, center);
  if (!usedGeographicProjection) {
    drawLand(radius, center);
  }
  drawProjectBoundaryLayers(radius, center);
  drawAtmosphere(baseSize, radius, center);
  ctx.restore();
}

function renderProjectBrowser() {
  ui.projectBrowserList.replaceChildren(...state.projects.map((project) => {
    const boundarySet = getActiveBoundarySet(project);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card";
    if (project.id === state.activeProjectId) card.classList.add("is-active");
    card.dataset.projectId = project.id;
    const title = document.createElement("strong");
    title.textContent = project.title;
    const meta = document.createElement("span");
    meta.textContent = [
      boundarySet?.label || "ohne Grenzgrundlage",
      `${boundarySet?.detailStrategy?.length || 0} Detailstufen`,
      project.status,
    ].join(" · ");
    card.append(title, meta);
    return card;
  }));
}

function renderLibraryBrowser() {
  const project = getActiveProject();
  if (!ui.libraryBrowserList) return;
  if (!project) {
    ui.libraryBrowserList.replaceChildren();
    return;
  }

  const heading = document.createElement("div");
  heading.className = "library-browser-heading";
  heading.innerHTML = "<span class=\"label\">Projektbibliothek</span><strong>Ordner</strong>";

  const folderCards = (project.libraryFolders || []).map((folder) => {
    const wrapper = document.createElement("section");
    wrapper.className = "library-folder-card";

    const head = document.createElement("div");
    head.className = "library-folder-head";
    const title = document.createElement("strong");
    title.textContent = folder.title;
    const meta = document.createElement("span");
    meta.textContent = `${folder.items?.length || 0} Einträge · ${folder.description}`;
    head.append(title, meta);
    wrapper.append(head);

    const list = document.createElement("div");
    list.className = "library-item-list";
    const items = Array.isArray(folder.items) ? folder.items : [];
    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "library-empty";
      empty.textContent = folder.type === "boundary-maps"
        ? "Noch keine Länderkarten hinzugefügt."
        : "Noch leer.";
      list.append(empty);
    } else {
      items.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "library-item-card";
        button.dataset.libraryItemId = item.id;
        button.classList.toggle("is-active", item.id === project.activeLibraryItemId);
        button.style.setProperty("--layer-color", item.display?.color || "#c6a86a");
        const itemTitle = document.createElement("strong");
        itemTitle.textContent = item.name;
        const itemMeta = document.createElement("span");
        itemMeta.textContent = [item.source, item.adminLevel, item.detail].filter(Boolean).join(" · ");
        button.append(itemTitle, itemMeta);
        list.append(button);
      });
    }
    wrapper.append(list);
    return wrapper;
  });

  ui.libraryBrowserList.replaceChildren(heading, ...folderCards);
}

function renderBoundaryEditor() {
  const project = getActiveProject();
  const boundarySet = getActiveBoundarySet(project);
  if (!project || !boundarySet) {
    ui.boundarySummary.textContent = "Noch kein Earth-Map-Projekt ausgewählt.";
    ui.boundaryLevelList.replaceChildren();
    return;
  }
  ui.boundarySummary.textContent = `${boundarySet.label} ist als Grenzgrundlage dieses Projekts angelegt. Die Detailstufen werden später je nach Zoom automatisch geladen. Das Boundary-Set kann perspektivisch durch andere Geometriebasen ersetzt werden, etwa paläogeografische Rekonstruktionen.`;
  ui.boundaryLevelList.replaceChildren(...(boundarySet.detailStrategy || []).map((level) => {
    const item = document.createElement("div");
    item.className = "boundary-level-item";
    const title = document.createElement("strong");
    title.textContent = level.label;
    const detail = document.createElement("span");
    detail.textContent = `${level.use} · ab Zoom ${level.minZoom} · ${level.path}`;
    item.append(title, detail);
    return item;
  }));
}

function renderLayerEditor() {
  const project = getActiveProject();
  const item = getActiveLibraryItem(project);
  if (!ui.layerEditorTitle || !ui.layerEditorSummary || !ui.layerEditorContent || !ui.layerMetaList) return;
  if (!item) {
    ui.layerEditorTitle.textContent = "Keine Karte ausgewählt";
    ui.layerEditorSummary.textContent = "Wähle links in der Projektbibliothek eine hinzugefügte Länderkarte aus.";
    ui.layerEditorContent.hidden = true;
    if (ui.layerColorPaletteButton) ui.layerColorPaletteButton.disabled = true;
    ui.layerMetaList.replaceChildren();
    return;
  }

  ui.layerEditorTitle.textContent = item.name;
  ui.layerEditorSummary.textContent = "Anzeigeoptionen und Herkunftsdaten dieser Karte.";
  ui.layerEditorContent.hidden = false;
  if (ui.layerColorPaletteButton) ui.layerColorPaletteButton.disabled = false;
  if (ui.layerColorInput) ui.layerColorInput.value = item.display?.color || "#c6a86a";

  const rows = [
    ["Quelle", item.source || "—"],
    ["ISO-3", item.iso3 || "—"],
    ["Ebene", item.adminLevel || "—"],
    ["Detailtiefe", item.detail || "—"],
    ["Zeitspanne", item.temporalCoverage?.label || "gegenwärtig / aktuell"],
    ["Lizenz", item.license || "—"],
    ["Importiert", formatDateTime(item.importedAt) || "—"],
    ["Referenz", item.sourceUrl || item.geometryRef?.path || "—"],
  ];
  ui.layerMetaList.replaceChildren(...rows.flatMap(([term, description]) => {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = description;
    return [dt, dd];
  }));
}

function renderWorkspace() {
  renderProjectBrowser();
  renderLibraryBrowser();
  renderBoundaryEditor();
  renderLayerEditor();
}

function setEditorTab(tabName) {
  document.querySelectorAll("[data-editor-tab]").forEach((tab) => {
    const isActive = tab.dataset.editorTab === tabName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll("[data-editor-panel]").forEach((panel) => {
    const isActive = panel.dataset.editorPanel === tabName;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getNaturalEarthCountryName(feature) {
  return feature?.properties?.NAME_DE
    || feature?.properties?.NAME
    || feature?.properties?.ADMIN
    || feature?.properties?.NAME_LONG
    || "Unbenanntes Land";
}

function getNaturalEarthIso3(feature) {
  const props = feature?.properties || {};
  return props.ISO_A3_EH || props.ISO_A3 || props.ADM0_A3 || "";
}

function searchNaturalEarthCountries(query) {
  const normalizedQuery = normalizeSearchText(query);
  const features = window.EarthMapNaturalEarthCountries?.features || [];
  if (!normalizedQuery) return [];
  return features
    .filter((feature) => {
      const props = feature.properties || {};
      const haystack = [
        props.NAME_DE, props.NAME, props.ADMIN, props.NAME_LONG, props.SOVEREIGNT,
        props.ISO_A3, props.ISO_A3_EH, props.ADM0_A3,
      ].map(normalizeSearchText).join(" ");
      return haystack.includes(normalizedQuery);
    })
    .slice(0, 8)
    .map((feature) => ({
      id: `natural-earth-${getNaturalEarthIso3(feature) || getNaturalEarthCountryName(feature)}`,
      name: getNaturalEarthCountryName(feature),
      source: "Natural Earth",
      level: "ADM0 · Land",
      detail: "110m · lokale Grunddaten",
      license: "Public Domain",
      iso3: getNaturalEarthIso3(feature),
      importStatus: "bereit",
    }));
}

function buildGeoBoundariesCandidates(naturalEarthResults, query) {
  const directIso = query.trim().toUpperCase();
  const isoCandidates = new Set();
  if (/^[A-Z]{3}$/.test(directIso)) isoCandidates.add(directIso);
  naturalEarthResults.forEach((result) => {
    if (/^[A-Z]{3}$/.test(result.iso3)) isoCandidates.add(result.iso3);
  });
  return [...isoCandidates].flatMap((iso3) => ["ADM0", "ADM1", "ADM2"].map((adm) => ({
    id: `geoboundaries-${iso3}-${adm}`,
    name: `${iso3} · ${adm}`,
    source: "geoBoundaries",
    level: adm,
    detail: adm === "ADM0" ? "Staatsgrenze" : "Verwaltungsebene",
    license: "gbOpen · CC BY 4.0",
    iso3,
    apiUrl: `https://www.geoboundaries.org/api/current/gbOpen/${iso3}/${adm}/`,
    importStatus: "online abrufbar",
  })));
}

function createLayerItemFromSearchResult(result) {
  const isNaturalEarth = result.source === "Natural Earth";
  return normalizeLibraryItem({
    id: `layer-${result.source.toLowerCase().replace(/\W+/g, "-")}-${result.iso3 || result.id}-${Date.now()}`,
    kind: "boundary-map",
    name: result.name,
    source: result.source,
    iso3: result.iso3,
    adminLevel: result.level,
    detail: result.detail,
    license: result.license,
    sourceUrl: result.apiUrl || (isNaturalEarth ? `${NATURAL_EARTH_ASSET_BASE}110m/ne_110m_admin_0_countries.geojson` : ""),
    temporalCoverage: {
      label: isNaturalEarth ? "gegenwärtige Natural-Earth-Grundkarte" : "gegenwärtige geoBoundaries-Grenzfassung",
      from: "",
      to: "",
    },
    display: {
      visible: true,
      color: "#c6a86a",
    },
    geometryRef: isNaturalEarth
      ? { provider: "natural-earth", detail: "110m", dataset: "admin_0_countries", iso3: result.iso3 }
      : { provider: "geoboundaries", apiUrl: result.apiUrl, iso3: result.iso3, level: result.level },
  });
}

function addBoundaryLayerFromSearchResult(result) {
  const project = getActiveProject();
  const folder = getLibraryFolder(project, "boundary-maps");
  if (!project || !folder) return;
  const item = createLayerItemFromSearchResult(result);
  const duplicate = folder.items.find((candidate) => (
    candidate.source === item.source
    && candidate.iso3 === item.iso3
    && candidate.adminLevel === item.adminLevel
    && candidate.detail === item.detail
  ));
  const activeItem = duplicate || item;
  if (!duplicate) folder.items.push(item);
  project.activeLibraryItemId = activeItem.id;
  persistProjects();
  renderWorkspace();
  renderGlobe();
  setEditorTab("layer-editor");
}

function createBoundarySearchCard(result) {
  const card = document.createElement("article");
  card.className = "search-result-card";
  const head = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = result.name;
  const meta = document.createElement("span");
  meta.textContent = `${result.source} · ${result.level} · ${result.detail}`;
  head.append(title, meta);

  const license = document.createElement("p");
  license.textContent = `Lizenz/Status: ${result.license} · ${result.importStatus}`;

  const action = document.createElement("button");
  action.type = "button";
  action.className = "secondary-button";
  action.textContent = "Hinzufügen";
  action.title = result.apiUrl || "In die Projektbibliothek übernehmen.";
  action.addEventListener("click", () => addBoundaryLayerFromSearchResult(result));

  card.append(head, license, action);
  return card;
}

function renderBoundarySearchResults() {
  const query = ui.boundarySearchInput?.value?.trim() || "";
  const useNaturalEarth = Boolean(document.getElementById("sourceNaturalEarth")?.checked);
  const useGeoBoundaries = Boolean(document.getElementById("sourceGeoBoundaries")?.checked);
  if (!query) {
    const note = document.createElement("p");
    note.className = "empty-state";
    note.textContent = "Bitte Suchbegriff eingeben.";
    ui.boundarySearchResults.replaceChildren(note);
    return;
  }

  const naturalEarthResults = useNaturalEarth ? searchNaturalEarthCountries(query) : [];
  const geoBoundariesResults = useGeoBoundaries ? buildGeoBoundariesCandidates(naturalEarthResults, query) : [];
  const results = [...naturalEarthResults, ...geoBoundariesResults];
  if (!results.length) {
    const note = document.createElement("p");
    note.className = "empty-state";
    note.textContent = "Keine Treffer gefunden. Tipp: Für geoBoundaries kann direkt ein ISO-3-Code wie DEU, FRA oder BRA gesucht werden.";
    ui.boundarySearchResults.replaceChildren(note);
    return;
  }

  ui.boundarySearchResults.replaceChildren(...results.map(createBoundarySearchCard));
}

ui.menuButton.addEventListener("click", () => setMenuOpen(ui.menuButton.getAttribute("aria-expanded") !== "true"));
ui.menuCloseButton.addEventListener("click", () => setMenuOpen(false));
ui.menuOverlay.addEventListener("click", () => setMenuOpen(false));
ui.exportProjectButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  setExportMenuOpen(ui.exportProjectButton.getAttribute("aria-expanded") !== "true");
});
ui.exportMenu?.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("[data-export-format]") : null;
  if (!button) return;
  handleExportFormat(button.dataset.exportFormat);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    setExportMenuOpen(false);
  }
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest(".export-control")) return;
  setExportMenuOpen(false);
});

document.querySelectorAll("[data-editor-tab]").forEach((tab) => {
  tab.addEventListener("click", () => setEditorTab(tab.dataset.editorTab));
});

ui.boundarySearchButton?.addEventListener("click", renderBoundarySearchResults);
ui.boundarySearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") renderBoundarySearchResults();
});

ui.openWorkspaceButton.addEventListener("click", () => setWorkspaceMode("details"));
ui.returnPreviewButton.addEventListener("click", () => setWorkspaceMode("preview"));
ui.newProjectButton.addEventListener("click", () => {
  const project = normalizeProject(createEarthMapProject());
  state.projects.push(project);
  state.activeProjectId = project.id;
  persistProjects();
  renderWorkspace();
  renderGlobe();
});
ui.projectBrowserList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-project-id]");
  if (!card) return;
  state.activeProjectId = card.dataset.projectId;
  persistProjects();
  renderWorkspace();
});
ui.libraryBrowserList?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-library-item-id]");
  if (!card) return;
  const project = getActiveProject();
  if (!project) return;
  project.activeLibraryItemId = card.dataset.libraryItemId || "";
  persistProjects();
  renderWorkspace();
  renderGlobe();
  setEditorTab("layer-editor");
});
ui.layerColorInput?.addEventListener("input", () => {
  applyLayerColor(ui.layerColorInput.value || "#c6a86a");
});
setupLayerColorPalette();

ui.globe.addEventListener("pointerdown", (event) => {
  markGlobeNavigationActive();
  dragState = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, startRotation: { ...rotation } };
  ui.globe.setPointerCapture?.(event.pointerId);
});

ui.globe.addEventListener("pointermove", (event) => {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  markGlobeNavigationActive();
  // Bedienregel: Beim Orthographic-Zoom wächst die Bildschirmbewegung pro
  // Rotationsgrad mit der Projektionsskala. Die Drag-Übersetzung wird deshalb
  // leicht überlinear gedämpft, damit die Karte auch tief im Zoom unter dem
  // Mauszeiger bleibt und nicht schneller "davonläuft" als die Handbewegung.
  const dragSensitivity = 1 / Math.max(1, globeZoom ** 1.32);
  rotation.lon = dragState.startRotation.lon + (event.clientX - dragState.startX) * 0.45 * dragSensitivity;
  rotation.lat = clamp(dragState.startRotation.lat - (event.clientY - dragState.startY) * 0.28 * dragSensitivity, -58, 58);
  scheduleGlobeRender();
});

ui.globe.addEventListener("wheel", (event) => {
  event.preventDefault();
  markGlobeNavigationActive();
  const zoomFactor = Math.exp(-event.deltaY * 0.0014);
  globeZoom = clamp(globeZoom * zoomFactor, MIN_GLOBE_ZOOM, MAX_GLOBE_ZOOM);
  scheduleGlobeRender();
  scheduleNaturalEarthDetailUpdate(760);
}, { passive: false });

["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => {
  ui.globe.addEventListener(type, () => {
    dragState = null;
    markGlobeNavigationActive();
    scheduleNaturalEarthDetailUpdate(160);
  });
});

window.addEventListener("resize", scheduleGlobeRender);
renderWorkspace();
renderGlobe();
if (!hasD3Geo) buildLandSamplesDeferred();

