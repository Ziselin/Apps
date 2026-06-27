const ui = Object.fromEntries([
  "globeApp", "menuButton", "menuCloseButton", "menuOverlay", "sideMenu",
  "openWorkspaceButton", "returnPreviewButton", "globe", "globeCanvas",
  "newProjectButton", "projectBrowserList", "boundarySummary", "boundaryLevelList",
].map((id) => [id, document.getElementById(id)]));

const STORAGE_KEY = "globemap-projects-v1";

const GEOMETRY_BASE_REGISTRY = {
  naturalEarthModern: {
    id: "natural-earth-modern",
    label: "Natural Earth · moderne Erde",
    kind: "modern-earth",
    source: "Natural Earth",
    geometryType: "political-and-physical-boundaries",
    detailLevels: [
      { id: "110m", label: "110m", use: "Globale Ansicht", path: "data/natural-earth/110m/" },
      { id: "50m", label: "50m", use: "Mittlerer Zoom", path: "data/natural-earth/50m/" },
      { id: "10m", label: "10m", use: "Detailzoom", path: "data/natural-earth/10m/" },
    ],
  },
};

// Architekturregel: GlobeMap-Projekte referenzieren Boundary-Sets, statt eine
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

function createGlobeMapProject(title = "Neues GlobeMap-Projekt") {
  return {
    id: `globemap-${Date.now()}`,
    title,
    status: "in Vorbereitung",
    activeBoundarySetId: "",
    boundarySets: createDefaultBoundarySets(),
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

function normalizeProject(project) {
  const normalized = {
    ...createGlobeMapProject(project?.title || "GlobeMap-Projekt"),
    ...project,
    boundarySets: Array.isArray(project?.boundarySets) && project.boundarySets.length ? project.boundarySets : createDefaultBoundarySets(),
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
  return normalized;
}

function loadProjects() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(parsed?.projects) && parsed.projects.length) return parsed.projects.map(normalizeProject);
  } catch (error) {
    console.warn("GlobeMap-Projekte konnten nicht gelesen werden.", error);
  }
  return [normalizeProject(createGlobeMapProject("Weltkarte · Grundmodell"))];
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
    console.warn("GlobeMap-Projekte konnten nicht gespeichert werden.", error);
  }
}

function getActiveProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0] || null;
}

function getActiveBoundarySet(project = getActiveProject()) {
  return project?.boundarySets?.find((set) => set.id === project.activeBoundarySetId) || project?.boundarySets?.[0] || null;
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

const ctx = ui.globeCanvas.getContext("2d");
const DEG = Math.PI / 180;

// Geodatenregel: Die sichtbare Weltgeometrie kommt nicht aus handgebauten
// Platzhalterpolygonen, sondern aus dem Geometrie-Basisdatensatz des aktiven
// Projekts. Natural Earth ist hier die erste echte moderne Basis. Die
// Renderer-Schicht arbeitet mit Lon/Lat-Ringen und Oberflächenproben; dadurch
// bleibt die Darstellung auf der Kugeloberfläche stabil und kann später auch
// historische oder paläogeografische Grenzräume mit derselben Schnittstelle anzeigen.

const naturalEarthSource = window.GlobeMapNaturalEarthData?.["110m-land"] || null;

const geoState = {
  detailLevel: "110m",
  landRings: [],
  landSamples: [],
  status: "loading",
  samplesReady: false,
};

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

if (naturalEarthSource) {
  installLandGeoJson(naturalEarthSource);
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
  const lineWidth = Math.max(0.75, radius * 0.0022);
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
    drawProjectedLine(densifyRing(ring, 1.2), radius, center, "rgba(92,96,94,.5)", Math.max(0.7, radius * 0.002));
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
  const size = Math.max(220, Math.floor(Math.min(rect.width, rect.height)));
  ui.globeCanvas.width = Math.floor(size * dpr);
  ui.globeCanvas.height = Math.floor(size * dpr);
  ui.globeCanvas.style.width = `${size}px`;
  ui.globeCanvas.style.height = `${size}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);
  const radius = size * 0.47;
  const center = { x: size / 2, y: size / 2 };
  drawSphere(size, radius, center);
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  drawGraticule(radius, center);
  drawLand(radius, center);
  drawAtmosphere(size, radius, center);
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

function renderBoundaryEditor() {
  const project = getActiveProject();
  const boundarySet = getActiveBoundarySet(project);
  if (!project || !boundarySet) {
    ui.boundarySummary.textContent = "Noch kein GlobeMap-Projekt ausgewählt.";
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

function renderWorkspace() {
  renderProjectBrowser();
  renderBoundaryEditor();
}

ui.menuButton.addEventListener("click", () => setMenuOpen(ui.menuButton.getAttribute("aria-expanded") !== "true"));
ui.menuCloseButton.addEventListener("click", () => setMenuOpen(false));
ui.menuOverlay.addEventListener("click", () => setMenuOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

ui.openWorkspaceButton.addEventListener("click", () => setWorkspaceMode("details"));
ui.returnPreviewButton.addEventListener("click", () => setWorkspaceMode("preview"));
ui.newProjectButton.addEventListener("click", () => {
  const project = normalizeProject(createGlobeMapProject());
  state.projects.push(project);
  state.activeProjectId = project.id;
  persistProjects();
  renderWorkspace();
});
ui.projectBrowserList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-project-id]");
  if (!card) return;
  state.activeProjectId = card.dataset.projectId;
  persistProjects();
  renderWorkspace();
});

ui.globe.addEventListener("pointerdown", (event) => {
  dragState = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, startRotation: { ...rotation } };
  ui.globe.setPointerCapture?.(event.pointerId);
});

ui.globe.addEventListener("pointermove", (event) => {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  rotation.lon = dragState.startRotation.lon + (event.clientX - dragState.startX) * 0.45;
  rotation.lat = clamp(dragState.startRotation.lat + (event.clientY - dragState.startY) * 0.28, -58, 58);
  renderGlobe();
});

["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => {
  ui.globe.addEventListener(type, () => {
    dragState = null;
  });
});

window.addEventListener("resize", renderGlobe);
renderWorkspace();
renderGlobe();
buildLandSamplesDeferred();

