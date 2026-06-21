const STORAGE_KEY = "schola-grade-profiles-v2";
const SESSION_KEY = "schola-grade-session-v2";

// Die Bezeichnungen folgen dem Bildungsserver Mecklenburg-Vorpommern. Das
// Bundesland ist Profilraum im Maschinenraum; die Brücke zeigt nur die drei
// Entscheidungen, die für eine konkrete Berechnung nötig sind.
const MV_SCHOOL_TYPES = [
  { name: "Grundschule", classes: ["1", "2", "3", "4"] },
  { name: "Schulartunabhängige Orientierungsstufe", classes: ["5", "6"] },
  { name: "Regionale Schule", classes: ["5", "6", "7", "8", "9", "10"] },
  { name: "Gymnasium", classes: ["5", "6", "7", "8", "9", "10", "11", "12"] },
  { name: "Förderschule", classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
  { name: "Gesamtschule", classes: ["5", "6", "7", "8", "9", "10", "11", "12"] },
  { name: "Berufliche Schulen", classes: ["Berufliche Bildung"] },
  { name: "Schulen in freier Trägerschaft", classes: ["nach Schulart"] },
  { name: "Abendgymnasium", classes: ["Einführungsphase", "Qualifikationsphase"] },
];

const grade6Labels = [
  ["1", "sehr gut"], ["2", "gut"], ["3", "befriedigend"],
  ["4", "ausreichend"], ["5", "mangelhaft"], ["6", "ungenügend"],
];
const point15Labels = [
  ["15", "1+"], ["14", "1"], ["13", "1−"], ["12", "2+"],
  ["11", "2"], ["10", "2−"], ["09", "3+"], ["08", "3"],
  ["07", "3−"], ["06", "4+"], ["05", "4"], ["04", "4−"],
  ["03", "5+"], ["02", "5"], ["01", "5−"], ["00", "6"],
];

function makeThresholds(labels, percentages) {
  return labels.map(([level, note], index) => ({ level, note, minPercent: percentages[index] }));
}

function createDefaultProfiles() {
  const sourceNote = "Übernommen aus „Notenberechnung B M G.ods“; persönliche Arbeitsgrundlage, noch nicht amtlich verifiziert.";
  const gradeProfile = (id, name, schoolType, classes, assessmentType, percentages) => ({
    id, name, federalState: "Mecklenburg-Vorpommern", authority: "Eigene Ausgangstabelle", schoolType, classes, assessmentType,
    scaleType: "grade6", status: "personal", sourceNote, sourceUrl: "",
    thresholds: makeThresholds(grade6Labels, [...percentages, 0]),
  });
  const pointProfile = (id, name, assessmentType, percentages) => ({
    id, name, federalState: "Mecklenburg-Vorpommern", authority: "Eigene Ausgangstabelle", schoolType: "Gymnasium",
    classes: ["10", "11", "12"], assessmentType,
    scaleType: "points15", status: "personal", sourceNote, sourceUrl: "",
    thresholds: makeThresholds(point15Labels, percentages),
  });
  return [
    gradeProfile("b-class-test", "Regionale Schule · Berufsreife · Klassenarbeit", "Regionale Schule", ["7", "8", "9", "10"], "Klassenarbeit · Berufsreife", [80, 60, 45, 25, 10]),
    gradeProfile("m-class-test", "Regionale Schule · Mittlere Reife · Klassenarbeit", "Regionale Schule", ["7", "8", "9", "10"], "Klassenarbeit · Mittlere Reife", [96, 80, 60, 40, 20]),
    gradeProfile("b-check", "Regionale Schule · Berufsreife · Leistungskontrolle", "Regionale Schule", ["7", "8", "9", "10"], "Leistungskontrolle · Berufsreife", [81, 62, 47, 29, 15]),
    gradeProfile("m-check", "Regionale Schule · Mittlere Reife · Leistungskontrolle", "Regionale Schule", ["7", "8", "9", "10"], "Leistungskontrolle · Mittlere Reife", [97, 82, 62, 46, 30]),
    gradeProfile("gym-sek1-simple", "Gymnasium · Sek. I · einfach", "Gymnasium", ["7", "8", "9"], "einfache Leistung", [80, 60, 45, 25, 10]),
    gradeProfile("gym-sek1-test", "Gymnasium · Sek. I · Klassenarbeit", "Gymnasium", ["7", "8", "9"], "Klassenarbeit", [96, 80, 60, 40, 20]),
    pointProfile("gym-sek2-simple", "Gymnasium · Sek. II · einfach", "einfache Leistung", [100, 98, 96, 91, 86, 80, 73, 66, 60, 53, 46, 40, 33, 26, 20, 0]),
    pointProfile("gym-sek2-exam", "Gymnasium · Sek. II · Klausur", "Klausur", [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 33, 27, 20, 0]),
  ];
}

const ui = Object.fromEntries([
  "gradeApp", "menuButton", "menuCloseButton", "menuOverlay", "sideMenu", "resetScoreButton",
  "openEngineButton", "returnBridgeButton", "schoolTypeSelect", "classLevelSelect", "performanceSelect", "engineProfileSelect",
  "earnedInput", "totalInput", "percentageOutput", "scoreTrackFill", "inputMessage", "resultPrimary",
  "resultSecondary", "pointsNeededOutput", "pointsToWorseOutput", "boundaryList",
  "newProfileButton", "duplicateProfileButton", "deleteProfileButton", "profileNameInput", "authorityInput",
  "schoolTypeInput", "gradeBandInput", "assessmentTypeInput", "scaleTypeSelect", "profileStatusSelect",
  "sourceNoteInput", "sourceUrlInput", "thresholdEditor", "resetProfilesButton",
].map((id) => [id, document.getElementById(id)]));

function clone(value) {
  return typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));
}

function loadProfiles() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch (error) {
    console.warn("Gespeicherte Bewertungsprofile konnten nicht gelesen werden.", error);
  }
  return createDefaultProfiles();
}

function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null") || {}; }
  catch (error) { return {}; }
}

const storedSession = loadSession();
const state = {
  profiles: loadProfiles(),
  activeProfileId: storedSession.activeProfileId || "gym-sek1-test",
  bridgeProfileId: storedSession.bridgeProfileId || "gym-sek1-test",
  schoolType: storedSession.schoolType || "Gymnasium",
  classLevel: storedSession.classLevel || "7",
  earned: storedSession.earned ?? "46",
  total: storedSession.total ?? "54",
};

function getActiveProfile() {
  return state.profiles.find((profile) => profile.id === state.activeProfileId) || state.profiles[0];
}

function getBridgeProfile() {
  return state.profiles.find((profile) => profile.id === state.bridgeProfileId) || null;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.profiles));
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      activeProfileId: state.activeProfileId,
      bridgeProfileId: state.bridgeProfileId,
      schoolType: state.schoolType,
      classLevel: state.classLevel,
      earned: state.earned,
      total: state.total,
    }));
  } catch (error) {
    console.warn("Der lokale Speicher ist nicht verfügbar.", error);
  }
}

function parseNumber(value) {
  const normalized = String(value ?? "").trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return NaN;
  return Number(normalized);
}

function formatNumber(value, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 0, maximumFractionDigits }).format(value);
}

function getSortedThresholds(profile) {
  return [...(profile?.thresholds || [])].sort((left, right) => Number(right.minPercent) - Number(left.minPercent));
}

function calculate(profile, earned, total) {
  if (!Number.isFinite(earned) || !Number.isFinite(total) || total <= 0 || earned < 0) return null;
  const percent = earned / total * 100;
  const thresholds = getSortedThresholds(profile);
  const matchedIndex = thresholds.findIndex((threshold) => percent >= Number(threshold.minPercent));
  const index = matchedIndex >= 0 ? matchedIndex : Math.max(0, thresholds.length - 1);
  const current = thresholds[index] || thresholds.at(-1);
  const better = index > 0 ? thresholds[index - 1] : null;
  const worse = index < thresholds.length - 1 ? thresholds[index + 1] : null;
  const pointsNeeded = better ? Math.max(0, total * Number(better.minPercent) / 100 - earned) : 0;
  const pointsToWorse = worse ? Math.max(0, earned - total * Number(current.minPercent) / 100) : 0;
  return { percent, thresholds, current, better, worse, pointsNeeded, pointsToWorse };
}

function renderProfileOptions() {
  ui.engineProfileSelect.replaceChildren(...state.profiles.map((profile) => new Option(profile.name, profile.id)));
  ui.engineProfileSelect.value = state.activeProfileId;
}

function profilesForBridgeSelection() {
  return state.profiles.filter((profile) => (
    (profile.federalState || "Mecklenburg-Vorpommern") === "Mecklenburg-Vorpommern"
    && profile.schoolType === state.schoolType
    && (profile.classes || []).includes(state.classLevel)
  ));
}

function renderBridgeSelectors() {
  ui.schoolTypeSelect.replaceChildren(...MV_SCHOOL_TYPES.map((entry) => new Option(entry.name, entry.name)));
  if (!MV_SCHOOL_TYPES.some((entry) => entry.name === state.schoolType)) state.schoolType = MV_SCHOOL_TYPES[0].name;
  ui.schoolTypeSelect.value = state.schoolType;
  const school = MV_SCHOOL_TYPES.find((entry) => entry.name === state.schoolType) || MV_SCHOOL_TYPES[0];
  ui.classLevelSelect.replaceChildren(...school.classes.map((classLevel) => new Option(classLevel, classLevel)));
  if (!school.classes.includes(state.classLevel)) state.classLevel = school.classes[0];
  ui.classLevelSelect.value = state.classLevel;

  const profiles = profilesForBridgeSelection();
  if (!profiles.some((profile) => profile.id === state.bridgeProfileId)) state.bridgeProfileId = profiles[0]?.id || "";
  if (profiles.length) {
    ui.performanceSelect.replaceChildren(...profiles.map((profile) => new Option(profile.assessmentType || profile.name, profile.id)));
    ui.performanceSelect.value = state.bridgeProfileId;
    ui.performanceSelect.disabled = false;
  } else {
    ui.performanceSelect.replaceChildren(new Option("Noch kein Profil hinterlegt", ""));
    ui.performanceSelect.disabled = true;
  }
}

function renderBridge() {
  const profile = getBridgeProfile();
  const earned = parseNumber(state.earned);
  const total = parseNumber(state.total);
  const result = profile ? calculate(profile, earned, total) : null;
  ui.earnedInput.value = state.earned;
  ui.totalInput.value = state.total;

  ui.inputMessage.classList.remove("is-error");
  if (!result) {
    ui.percentageOutput.textContent = "– %";
    ui.resultPrimary.textContent = "–";
    ui.resultSecondary.textContent = profile ? "Bitte gültige Punktwerte eingeben." : "Kein Bewertungsprofil";
    ui.pointsNeededOutput.textContent = "–";
    ui.pointsToWorseOutput.textContent = "–";
    ui.scoreTrackFill.style.width = "0%";
    ui.inputMessage.textContent = !profile
      ? "Für diese Auswahl muss im Maschinenraum noch ein Profil angelegt werden."
      : total === 0 ? "Die Gesamtpunktzahl muss größer als null sein." : "Bitte Zahlen größer oder gleich null eingeben.";
    ui.inputMessage.classList.add("is-error");
    ui.boundaryList.replaceChildren();
    return;
  }

  ui.percentageOutput.textContent = `${formatNumber(result.percent)} %`;
  ui.scoreTrackFill.style.width = `${Math.min(100, Math.max(0, result.percent))}%`;
  if (earned > total) {
    ui.inputMessage.textContent = "Die erreichte Punktzahl liegt über der Gesamtpunktzahl.";
    ui.inputMessage.classList.add("is-error");
  } else {
    ui.inputMessage.textContent = "";
  }

  const pointScale = profile.scaleType === "points15";
  ui.resultPrimary.textContent = result.current?.level || "–";
  const numericNote = String(pointScale ? result.current?.note : result.current?.level || "").match(/[1-6]/)?.[0] || "";
  ui.resultSecondary.textContent = grade6Labels.find(([grade]) => grade === numericNote)?.[1] || "";
  ui.pointsNeededOutput.textContent = result.better ? `${formatNumber(result.pointsNeeded)} P. mehr` : "Beststufe";
  ui.pointsToWorseOutput.textContent = result.worse ? `> ${formatNumber(result.pointsToWorse)} P. weniger` : "Endstufe";

  ui.boundaryList.replaceChildren(...result.thresholds.map((threshold) => {
    const item = document.createElement("div");
    item.className = "boundary-item";
    if (threshold === result.current) item.classList.add("is-current");
    const minimumPoints = total * Number(threshold.minPercent) / 100;
    const title = document.createElement("strong");
    title.textContent = threshold.level;
    const info = document.createElement("span");
    const percentLine = document.createElement("span");
    percentLine.textContent = `${formatNumber(threshold.minPercent)} %`;
    const pointsLine = document.createElement("span");
    pointsLine.textContent = `${formatNumber(minimumPoints)} P.`;
    info.append(percentLine, pointsLine);
    item.append(title, info);
    return item;
  }));
}

function renderProfileEditor() {
  const profile = getActiveProfile();
  if (!profile) return;
  ui.profileNameInput.value = profile.name || "";
  ui.authorityInput.value = profile.federalState || "Mecklenburg-Vorpommern";
  ui.schoolTypeInput.replaceChildren(...MV_SCHOOL_TYPES.map((entry) => new Option(entry.name, entry.name)));
  ui.schoolTypeInput.value = profile.schoolType || "";
  ui.gradeBandInput.value = (profile.classes || []).join(", ");
  ui.assessmentTypeInput.value = profile.assessmentType || "";
  ui.scaleTypeSelect.value = profile.scaleType || "grade6";
  ui.profileStatusSelect.value = profile.status || "personal";
  ui.sourceNoteInput.value = profile.sourceNote || "";
  ui.sourceUrlInput.value = profile.sourceUrl || "";

  ui.thresholdEditor.replaceChildren(...getSortedThresholds(profile).map((threshold) => {
    const row = document.createElement("label");
    row.className = "threshold-row";
    const level = document.createElement("output");
    level.textContent = profile.scaleType === "points15" ? `${threshold.level} P.` : threshold.level;
    const note = document.createElement("output");
    note.textContent = profile.scaleType === "points15" ? threshold.note : threshold.note;
    const shell = document.createElement("span");
    shell.className = "percent-field";
    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "decimal";
    input.value = formatNumber(Number(threshold.minPercent));
    input.setAttribute("aria-label", `Mindestprozent für ${threshold.level}`);
    input.addEventListener("change", () => {
      const nextValue = Math.min(100, Math.max(0, parseNumber(input.value)));
      if (!Number.isFinite(nextValue)) {
        input.value = formatNumber(Number(threshold.minPercent));
        return;
      }
      threshold.minPercent = nextValue;
      input.value = formatNumber(nextValue);
      persist();
      renderBridge();
    });
    shell.appendChild(input);
    row.append(level, note, shell);
    return row;
  }));
}

function renderAll() {
  if (!state.profiles.some((profile) => profile.id === state.activeProfileId)) state.activeProfileId = state.profiles[0]?.id || "";
  renderProfileOptions();
  renderBridgeSelectors();
  renderBridge();
  renderProfileEditor();
  persist();
}

function selectProfile(profileId) {
  if (!state.profiles.some((profile) => profile.id === profileId)) return;
  state.activeProfileId = profileId;
  const profile = getActiveProfile();
  state.bridgeProfileId = profile.id;
  state.schoolType = profile.schoolType;
  state.classLevel = profile.classes?.[0] || state.classLevel;
  renderAll();
}

function updateProfileField(field, value) {
  const profile = getActiveProfile();
  if (!profile) return;
  profile[field] = value;
  if (profile.id === state.bridgeProfileId && field === "schoolType") {
    state.schoolType = value;
    state.classLevel = profile.classes?.[0] || state.classLevel;
  }
  if (field === "name") renderProfileOptions();
  renderBridgeSelectors();
  renderBridge();
  persist();
}

function setWorkspaceMode(mode) {
  ui.gradeApp.classList.toggle("workspace-mode-engine", mode === "engine");
  ui.gradeApp.classList.toggle("workspace-mode-bridge", mode !== "engine");
  if (mode === "engine") ui.engineProfileSelect.focus();
  else ui.earnedInput.focus();
}

function setMenuOpen(isOpen) {
  ui.sideMenu.classList.toggle("is-open", isOpen);
  ui.sideMenu.setAttribute("aria-hidden", String(!isOpen));
  ui.sideMenu.inert = !isOpen;
  ui.menuOverlay.hidden = !isOpen;
  ui.menuButton.setAttribute("aria-expanded", String(isOpen));
}

ui.menuButton.addEventListener("click", () => setMenuOpen(ui.menuButton.getAttribute("aria-expanded") !== "true"));
ui.menuCloseButton.addEventListener("click", () => setMenuOpen(false));
ui.menuOverlay.addEventListener("click", () => setMenuOpen(false));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuOpen(false); });
ui.openEngineButton.addEventListener("click", () => setWorkspaceMode("engine"));
ui.returnBridgeButton.addEventListener("click", () => setWorkspaceMode("bridge"));
ui.engineProfileSelect.addEventListener("change", () => selectProfile(ui.engineProfileSelect.value));
ui.schoolTypeSelect.addEventListener("change", () => {
  state.schoolType = ui.schoolTypeSelect.value;
  state.classLevel = MV_SCHOOL_TYPES.find((entry) => entry.name === state.schoolType)?.classes?.[0] || "";
  state.bridgeProfileId = "";
  renderAll();
});
ui.classLevelSelect.addEventListener("change", () => {
  state.classLevel = ui.classLevelSelect.value;
  state.bridgeProfileId = "";
  renderAll();
});
ui.performanceSelect.addEventListener("change", () => {
  state.bridgeProfileId = ui.performanceSelect.value;
  renderBridge();
  persist();
});

ui.earnedInput.addEventListener("input", () => { state.earned = ui.earnedInput.value; renderBridge(); persist(); });
ui.totalInput.addEventListener("input", () => { state.total = ui.totalInput.value; renderBridge(); persist(); });
ui.resetScoreButton.addEventListener("click", () => {
  state.earned = "";
  state.total = "";
  renderBridge();
  persist();
  ui.earnedInput.focus();
});

[
  [ui.profileNameInput, "name"], [ui.authorityInput, "federalState"], [ui.schoolTypeInput, "schoolType"],
  [ui.assessmentTypeInput, "assessmentType"],
  [ui.profileStatusSelect, "status"], [ui.sourceNoteInput, "sourceNote"], [ui.sourceUrlInput, "sourceUrl"],
].forEach(([element, field]) => element.addEventListener("input", () => updateProfileField(field, element.value)));

ui.gradeBandInput.addEventListener("input", () => {
  const profile = getActiveProfile();
  if (!profile) return;
  profile.classes = ui.gradeBandInput.value.split(/[,;]+/).map((value) => value.trim()).filter(Boolean);
  renderBridgeSelectors();
  renderBridge();
  persist();
});

ui.scaleTypeSelect.addEventListener("change", () => {
  const profile = getActiveProfile();
  if (!profile || profile.scaleType === ui.scaleTypeSelect.value) return;
  const confirmed = window.confirm("Beim Wechsel des Notensystems werden die Prozentgrenzen dieses Profils auf eine neutrale Ausgangsskala gesetzt.");
  if (!confirmed) {
    ui.scaleTypeSelect.value = profile.scaleType;
    return;
  }
  profile.scaleType = ui.scaleTypeSelect.value;
  profile.thresholds = profile.scaleType === "points15"
    ? makeThresholds(point15Labels, [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 35, 25, 15, 0])
    : makeThresholds(grade6Labels, [90, 75, 60, 45, 25, 0]);
  renderAll();
});

ui.newProfileButton.addEventListener("click", () => {
  const profile = clone(getActiveProfile() || createDefaultProfiles()[0]);
  profile.id = `profile-${Date.now()}`;
  profile.name = "Neues Bewertungsprofil";
  profile.status = "draft";
  profile.sourceNote = "";
  profile.sourceUrl = "";
  state.profiles.push(profile);
  state.activeProfileId = profile.id;
  renderAll();
  ui.profileNameInput.select();
});

ui.duplicateProfileButton.addEventListener("click", () => {
  const source = getActiveProfile();
  if (!source) return;
  const profile = clone(source);
  profile.id = `profile-${Date.now()}`;
  profile.name = `${source.name} · Kopie`;
  profile.status = "draft";
  state.profiles.push(profile);
  state.activeProfileId = profile.id;
  renderAll();
});

ui.deleteProfileButton.addEventListener("click", () => {
  if (state.profiles.length <= 1) return;
  const profile = getActiveProfile();
  if (!profile || !window.confirm(`Profil „${profile.name}“ löschen?`)) return;
  state.profiles = state.profiles.filter((entry) => entry.id !== profile.id);
  state.activeProfileId = state.profiles[0].id;
  renderAll();
});

ui.resetProfilesButton.addEventListener("click", () => {
  if (!window.confirm("Alle lokal geänderten Profile durch die Ausgangsprofile aus der ODS-Datei ersetzen?")) return;
  state.profiles = createDefaultProfiles();
  state.activeProfileId = "gym-sek1-test";
  state.bridgeProfileId = "gym-sek1-test";
  state.schoolType = "Gymnasium";
  state.classLevel = "7";
  renderAll();
});

renderAll();
