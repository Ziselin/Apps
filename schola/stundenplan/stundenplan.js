const app = document.getElementById("scheduleApp");
const calendar = document.getElementById("yearCalendar");
const calendarTitle = document.getElementById("calendarTitle");
const yearLabel = document.getElementById("yearLabel");
const menuButton = document.getElementById("menuButton");
const menuCloseButton = document.getElementById("menuCloseButton");
const menuOverlay = document.getElementById("menuOverlay");
const sideMenu = document.getElementById("sideMenu");
const openSettingsButton = document.getElementById("openSettingsButton");
const returnRenderButton = document.getElementById("returnRenderButton");
const browserActionsButton = document.getElementById("browserActionsButton");
const browserActionsMenu = document.getElementById("browserActionsMenu");
const newProjectButton = document.getElementById("newProjectButton");
const projectBrowserList = document.getElementById("projectBrowserList");
const projectDetail = document.getElementById("projectDetail");
const newProjectDialog = document.getElementById("newProjectDialog");
const newProjectForm = document.getElementById("newProjectForm");
const newProjectName = document.getElementById("newProjectName");
const cancelProjectButton = document.getElementById("cancelProjectButton");
const importProjectButton = document.getElementById("importProjectButton");
const importProjectDialog = document.getElementById("importProjectDialog");
const importProjectForm = document.getElementById("importProjectForm");
const importProjectFile = document.getElementById("importProjectFile");
const importProjectStatus = document.getElementById("importProjectStatus");
const cancelImportProjectButton = document.getElementById("cancelImportProjectButton");
const detailPanelLabel = document.getElementById("detailPanelLabel");
const detailPanelTitle = document.getElementById("detailPanelTitle");
const appointmentGroupDialog = document.getElementById("appointmentGroupDialog");
const appointmentGroupDialogTitle = document.getElementById("appointmentGroupDialogTitle");
const appointmentGroupForm = document.getElementById("appointmentGroupForm");
const appointmentGroupName = document.getElementById("appointmentGroupName");
const appointmentGroupColor = document.getElementById("appointmentGroupColor");
const appointmentGroupColorPalette = document.getElementById("appointmentGroupColorPalette");
const appointmentGroupDialogStatus = document.getElementById("appointmentGroupDialogStatus");
const appointmentGroupSubmitButton = document.getElementById("appointmentGroupSubmitButton");
const cancelAppointmentGroupButton = document.getElementById("cancelAppointmentGroupButton");
const appointmentDialog = document.getElementById("appointmentDialog");
const appointmentDialogTitle = document.getElementById("appointmentDialogTitle");
const appointmentForm = document.getElementById("appointmentForm");
const appointmentName = document.getElementById("appointmentName");
const appointmentDate = document.getElementById("appointmentDate");
const appointmentStartTime = document.getElementById("appointmentStartTime");
const appointmentEndTime = document.getElementById("appointmentEndTime");
const appointmentOverridesLessons = document.getElementById("appointmentOverridesLessons");
const appointmentDialogStatus = document.getElementById("appointmentDialogStatus");
const appointmentSubmitButton = document.getElementById("appointmentSubmitButton");
const cancelAppointmentButton = document.getElementById("cancelAppointmentButton");
const sicknessDialog = document.getElementById("sicknessDialog");
const sicknessDialogTitle = document.getElementById("sicknessDialogTitle");
const sicknessForm = document.getElementById("sicknessForm");
const sicknessStartDate = document.getElementById("sicknessStartDate");
const sicknessEndDate = document.getElementById("sicknessEndDate");
const sicknessDialogStatus = document.getElementById("sicknessDialogStatus");
const sicknessSubmitButton = document.getElementById("sicknessSubmitButton");
const cancelSicknessButton = document.getElementById("cancelSicknessButton");
const classTripDialog = document.getElementById("classTripDialog");
const classTripDialogTitle = document.getElementById("classTripDialogTitle");
const classTripForm = document.getElementById("classTripForm");
const classTripName = document.getElementById("classTripName");
const classTripClass = document.getElementById("classTripClass");
const classTripStartDate = document.getElementById("classTripStartDate");
const classTripEndDate = document.getElementById("classTripEndDate");
const classTripStartTime = document.getElementById("classTripStartTime");
const classTripEndTime = document.getElementById("classTripEndTime");
const classTripOverridesLessons = document.getElementById("classTripOverridesLessons");
const classTripDialogStatus = document.getElementById("classTripDialogStatus");
const cancelClassTripButton = document.getElementById("cancelClassTripButton");
const classTripSubmitButton = document.getElementById("classTripSubmitButton");
const schoolProjectDialog = document.getElementById("schoolProjectDialog");
const schoolProjectDialogTitle = document.getElementById("schoolProjectDialogTitle");
const schoolProjectForm = document.getElementById("schoolProjectForm");
const schoolProjectName = document.getElementById("schoolProjectName");
const schoolProjectDate = document.getElementById("schoolProjectDate");
const schoolProjectEndDate = document.getElementById("schoolProjectEndDate");
const schoolProjectStartTime = document.getElementById("schoolProjectStartTime");
const schoolProjectEndTime = document.getElementById("schoolProjectEndTime");
const schoolProjectOverridesLessons = document.getElementById("schoolProjectOverridesLessons");
const schoolProjectDialogStatus = document.getElementById("schoolProjectDialogStatus");
const cancelSchoolProjectButton = document.getElementById("cancelSchoolProjectButton");
const schoolProjectSubmitButton = document.getElementById("schoolProjectSubmitButton");
const classCatalogDialog = document.getElementById("classCatalogDialog");
const classCatalogDialogTitle = document.getElementById("classCatalogDialogTitle");
const classCatalogForm = document.getElementById("classCatalogForm");
const classCatalogMode = document.getElementById("classCatalogMode");
const classCatalogNameField = document.getElementById("classCatalogNameField");
const classCatalogNameLabel = document.getElementById("classCatalogNameLabel");
const classCatalogName = document.getElementById("classCatalogName");
const classCatalogGradeField = document.getElementById("classCatalogGradeField");
const classCatalogGrade = document.getElementById("classCatalogGrade");
const classCatalogDialogStatus = document.getElementById("classCatalogDialogStatus");
const classCatalogSubmitButton = document.getElementById("classCatalogSubmitButton");
const cancelClassCatalogButton = document.getElementById("cancelClassCatalogButton");
const lessonDialog = document.getElementById("lessonDialog");
const lessonDialogTitle = document.getElementById("lessonDialogTitle");
const lessonForm = document.getElementById("lessonForm");
const lessonDay = document.getElementById("lessonDay");
const lessonDayButtons = [...document.querySelectorAll("[data-lesson-day]")];
const lessonStart = document.getElementById("lessonStart");
const lessonEnd = document.getElementById("lessonEnd");
const lessonGrade = document.getElementById("lessonGrade");
const lessonSubject = document.getElementById("lessonSubject");
const lessonRoom = document.getElementById("lessonRoom");
const lessonColor = document.getElementById("lessonColor");
const lessonColorPalette = document.getElementById("lessonColorPalette");
const lessonTeachingForm = document.getElementById("lessonTeachingForm");
const lessonAbWeekChoice = document.getElementById("lessonAbWeekChoice");
const lessonAbWeekButtons = [...document.querySelectorAll("[data-lesson-ab-week]")];
const lessonEpochHalfChoice = document.getElementById("lessonEpochHalfChoice");
const lessonEpochHalfButtons = [...document.querySelectorAll("[data-lesson-epoch-half]")];
const lessonDialogStatus = document.getElementById("lessonDialogStatus");
const cancelLessonButton = document.getElementById("cancelLessonButton");
const lessonSubmitButton = document.getElementById("lessonSubmitButton");
const deleteLessonButton = document.getElementById("deleteLessonButton");
const lessonPropertiesTab = document.getElementById("lessonPropertiesTab");
const lessonStatisticsTab = document.getElementById("lessonStatisticsTab");
const lessonPropertiesPanel = document.getElementById("lessonPropertiesPanel");
const lessonStatisticsPanel = document.getElementById("lessonStatisticsPanel");
const lessonYearStatistic = document.getElementById("lessonYearStatistic");
const lessonYearStatisticPeriod = document.getElementById("lessonYearStatisticPeriod");
const lessonStatYearTrack = document.getElementById("lessonStatYearTrack");
const lessonStatYearLabels = document.getElementById("lessonStatYearLabels");
const lessonHalfStatisticCard = document.getElementById("lessonHalfStatisticCard");
const lessonHalfStatistic = document.getElementById("lessonHalfStatistic");
const lessonHalfStatisticPeriod = document.getElementById("lessonHalfStatisticPeriod");
const lessonGradingStopStatisticCard = document.getElementById("lessonGradingStopStatisticCard");
const lessonGradingStopStatistic = document.getElementById("lessonGradingStopStatistic");
const lessonGradingStopStatisticPeriod = document.getElementById("lessonGradingStopStatisticPeriod");
const lessonProgressTab = document.getElementById("lessonProgressTab");
const lessonProgressPanel = document.getElementById("lessonProgressPanel");
const lessonPhaseList = document.getElementById("lessonPhaseList");
const addLessonPhaseButton = document.getElementById("addLessonPhaseButton");
const lessonPhaseStatus = document.getElementById("lessonPhaseStatus");
const scheduleDisplayDialog = document.getElementById("scheduleDisplayDialog");
const scheduleDisplayForm = document.getElementById("scheduleDisplayForm");
const scheduleDisplayRows = document.getElementById("scheduleDisplayRows");
const scheduleDisplayStatus = document.getElementById("scheduleDisplayStatus");
const addLessonRowButton = document.getElementById("addLessonRowButton");
const addBreakRowButton = document.getElementById("addBreakRowButton");
const cancelScheduleDisplayButton = document.getElementById("cancelScheduleDisplayButton");
const schoolDayStart = document.getElementById("schoolDayStart");
const schoolDayEnd = document.getElementById("schoolDayEnd");
const defaultLessonDuration = document.getElementById("defaultLessonDuration");
const schedulePresetDialog = document.getElementById("schedulePresetDialog");
const schedulePresetForm = document.getElementById("schedulePresetForm");
const schedulePresetStatus = document.getElementById("schedulePresetStatus");
const cancelSchedulePresetButton = document.getElementById("cancelSchedulePresetButton");
const scheduleDisplayName = document.getElementById("scheduleDisplayName");
const calendarViewButtons = [...document.querySelectorAll("[data-calendar-view]")];
const calendarDateNavigation = document.getElementById("calendarDateNavigation");
const previousCalendarPeriod = document.getElementById("previousCalendarPeriod");
const todayCalendarPeriod = document.getElementById("todayCalendarPeriod");
const nextCalendarPeriod = document.getElementById("nextCalendarPeriod");
const lessonSignalsToggle = document.getElementById("lessonSignalsToggle");
const exportButton = document.getElementById("exportButton");
const exportMenu = document.getElementById("exportMenu");
const calendarExportDialog = document.getElementById("calendarExportDialog");
const calendarExportForm = document.getElementById("calendarExportForm");
const calendarExportChoices = document.getElementById("calendarExportChoices");
const calendarExportStatus = document.getElementById("calendarExportStatus");
const cancelCalendarExportButton = document.getElementById("cancelCalendarExportButton");

const PROJECT_STORAGE_KEY = "schola-stundenplan-projects-v1";
const DISPLAY_PROJECT_STORAGE_KEY = "schola-stundenplan-display-project-v1";
const LESSON_SIGNALS_STORAGE_KEY = "schola-stundenplan-signals-enabled-v1";
const EXPANDED_LAYERS_STORAGE_KEY = "schola-stundenplan-expanded-layers-v1";
const SCHEDULE_DELETE_HOLD_MS = 820;
const HOLIDAY_NORMALIZATION_VERSION = "mv-school-types-2026-07-27-1";
const MV_VOCATIONAL_ONLY_DATES = new Set(["2026-11-26", "2026-11-27"]);
const LESSON_COLORS = [
  ["#bfd2e2", "Kreideblau"],
  ["#b8d6d1", "Kreidetürkis"],
  ["#c6d7bd", "Kreidegrün"],
  ["#e6d8a8", "Kreidegelb"],
  ["#e4c0a8", "Kreideorange"],
  ["#dfb9bd", "Kreiderot"],
  ["#c9c1dd", "Kreideviolett"],
  ["#d7c4b4", "Kreidebraun"]
];
const LAYER_TYPES = [
  { id: "holidays", title: "Schulen", description: "Schulen, Zeitmodelle und zugehörige Ferien" },
  { id: "classCatalog", title: "Klassen", description: "Fächer, Klassenstufen und semantisch eindeutige Einzelklassen" },
  { id: "schedules", title: "Stundenplanlogiken", description: "Mögliche Zeitraster einer Schule, etwa Einzel- und Blockstunden oder unterschiedliche Pausenfolgen" },
  { id: "individual", title: "Persönliche Termine", description: "Urlaub und weitere persönliche Termine" },
  { id: "appointments", title: "Schulische Termine", description: "Termingruppen, Klassenfahrten und Schulprojekte" },
  { id: "classes", title: "Projekttage nach Klassen", description: "Klassenbezogene Projektschichten" },
  { id: "sickness", title: "Krankschreibungen", description: "Zeiträume persönlicher Verhinderung ohne Unterricht" }
];
const FEDERAL_STATES = [
  ["BW", "Baden-Württemberg"],
  ["BY", "Bayern"],
  ["BE", "Berlin"],
  ["BB", "Brandenburg"],
  ["HB", "Bremen"],
  ["HH", "Hamburg"],
  ["HE", "Hessen"],
  ["MV", "Mecklenburg-Vorpommern"],
  ["NI", "Niedersachsen"],
  ["NW", "Nordrhein-Westfalen"],
  ["RP", "Rheinland-Pfalz"],
  ["SL", "Saarland"],
  ["SN", "Sachsen"],
  ["ST", "Sachsen-Anhalt"],
  ["SH", "Schleswig-Holstein"],
  ["TH", "Thüringen"]
];
let projects = loadProjects();
migrateKnownHolidayCorrections(projects);
let activeProjectId = projects[0]?.id ?? null;
let displayedProjectId = projects.some((project) => project.id === localStorage.getItem(DISPLAY_PROJECT_STORAGE_KEY))
  ? localStorage.getItem(DISPLAY_PROJECT_STORAGE_KEY)
  : projects[0]?.id ?? null;
let activeLayerType = null;
let activeSchoolId = null;
let activeClassSchoolId = null;
let activeScheduleId = null;
let displayRowsDraft = [];
let lessonPhasesDraft = [];
let mainCalendarView = "year";
let calendarReferenceDate = new Date();
let scheduleDeleteHoldState = null;
let livePhaseTimer = null;
let currentTimeIndicatorTimer = null;
let lessonSignalsEnabled = localStorage.getItem(LESSON_SIGNALS_STORAGE_KEY) === "true";
let lessonSignalsLastCheck = Date.now();
const playedLessonSignalKeys = new Set();
const lessonStartAudio = new Audio("../../assets/stundenplan-beginn.mp3");
const lessonEndAudio = new Audio("../../assets/stundenplan-ende.mp3");
lessonStartAudio.preload = "auto";
lessonEndAudio.preload = "auto";
const expandedProjectIds = new Set(projects.map((project) => project.id));
const expandableLayerIds = new Set(["holidays", "schedules", "individual", "appointments"]);
const storedExpandedLayerKeys = (() => {
  try { return JSON.parse(localStorage.getItem(EXPANDED_LAYERS_STORAGE_KEY) || "null"); }
  catch { return null; }
})();
const expandedLayerKeys = new Set(Array.isArray(storedExpandedLayerKeys)
  ? storedExpandedLayerKeys
  : projects.flatMap((project) => [...expandableLayerIds].map((layerId) => `${project.id}:${layerId}`)));

const monthNames = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];
const weekdayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function renderYear(startYear, calendarEntries = [], schoolYearMode = false) {
  if (livePhaseTimer) {
    clearInterval(livePhaseTimer);
    livePhaseTimer = null;
  }
  calendar.replaceChildren();
  calendar.className = "year-calendar";
  calendar.closest(".calendar-shell")?.classList.remove("is-timeline-view");
  calendarTitle.textContent = "Jahresübersicht";
  yearLabel.textContent = schoolYearMode
    ? `${startYear}/${String(startYear + 1).slice(-2)}`
    : String(startYear);

  const months = Array.from({ length: 12 }, (_, index) => {
    const absoluteMonth = schoolYearMode ? index + 7 : index;
    return {
      monthIndex: absoluteMonth % 12,
      year: startYear + Math.floor(absoluteMonth / 12)
    };
  });

  months.forEach(({ monthIndex, year }) => {
    const monthName = monthNames[monthIndex];
    const month = document.createElement("section");
    month.className = "month";
    month.setAttribute("aria-label", `${monthName} ${year}`);

    const title = document.createElement("h2");
    title.textContent = monthName;
    month.append(title);

    const grid = document.createElement("div");
    grid.className = "month-grid";

    weekdayNames.forEach((name) => {
      const weekday = document.createElement("span");
      weekday.className = "weekday";
      weekday.textContent = name;
      grid.append(weekday);
    });

    const firstDay = new Date(year, monthIndex, 1);
    const leadingDays = (firstDay.getDay() + 6) % 7;
    const dayCount = new Date(year, monthIndex + 1, 0).getDate();

    for (let index = 0; index < leadingDays; index += 1) {
      const empty = document.createElement("span");
      empty.className = "day is-empty";
      empty.setAttribute("aria-hidden", "true");
      grid.append(empty);
    }

    for (let dayNumber = 1; dayNumber <= dayCount; dayNumber += 1) {
      const day = document.createElement("span");
      const weekday = new Date(year, monthIndex, dayNumber).getDay();
      const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
      const matchingEntries = calendarEntries.filter((entry) => dateKey >= entry.startDate && dateKey <= entry.endDate);
      const nonTeachingTypes = ["school-holiday", "public-holiday", "school-free-day"];
      const matchingHolidays = matchingEntries.filter((entry) => nonTeachingTypes.includes(entry.type));
      const matchingProjects = matchingEntries.filter((entry) => !nonTeachingTypes.includes(entry.type) && entry.type !== "appointment");
      const entryColors = [...new Set(matchingEntries.map((entry) => {
        if (entry.type === "public-holiday") return "#aebfa5";
        if (nonTeachingTypes.includes(entry.type)) return "#c6d7bd";
        if (entry.type === "appointment") return entry.color || "#c9c1dd";
        if (entry.type === "sickness") return "#d8ccca";
        return "#bfd2e2";
      }))];
      day.className = [
        "day",
        weekday === 0 || weekday === 6 ? "is-weekend" : "",
        matchingHolidays.length ? "is-holiday" : "",
        matchingEntries.some((entry) => entry.type === "public-holiday") ? "is-public-holiday" : "",
        matchingProjects.length ? "is-project" : "",
        entryColors.length ? "has-calendar-entry" : "",
        entryColors.length > 1 ? "has-overlap" : ""
      ].filter(Boolean).join(" ");
      if (entryColors.length) {
        day.style.setProperty("--day-color-a", entryColors[0]);
        day.style.setProperty("--day-color-b", entryColors[1] || entryColors[0]);
      }
      day.textContent = String(dayNumber);
      if (matchingEntries.length) {
        const names = getCalendarEntryDisplayNames(matchingEntries);
        day.title = names.join(", ");
        day.setAttribute("aria-label", `${dayNumber}. ${monthName}: ${names.join(", ")}`);
      }
      grid.append(day);
    }

    month.append(grid);
    calendar.append(month);
  });
}

function getFederalStateName(code) {
  return FEDERAL_STATES.find(([value]) => value === code)?.[1] || code || "";
}

function getCalendarEntryDisplayNames(entries) {
  const labels = [];
  const publicHolidayStates = new Map();
  entries.forEach((entry) => {
    if (entry.type === "public-holiday") {
      const states = publicHolidayStates.get(entry.name) || new Set();
      const codes = [entry.federalState, ...(entry.federalStates || [])].filter(Boolean);
      codes.forEach((code) => states.add(getFederalStateName(code)));
      publicHolidayStates.set(entry.name, states);
    } else if (entry.name && !labels.includes(entry.name)) {
      labels.push(entry.name);
    }
  });
  publicHolidayStates.forEach((states, name) => {
    const suffix = [...states].sort((a, b) => a.localeCompare(b, "de")).join(", ");
    labels.push(suffix ? `${name} (${suffix})` : name);
  });
  return labels;
}

function renderActiveCalendar() {
  const project = projects.find((entry) => entry.id === displayedProjectId);
  calendarViewButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.calendarView === mainCalendarView));
  });
  calendarDateNavigation.hidden = mainCalendarView === "year";
  previousCalendarPeriod.setAttribute("aria-label", mainCalendarView === "day" ? "Voriger Tag" : "Vorige Woche");
  nextCalendarPeriod.setAttribute("aria-label", mainCalendarView === "day" ? "Nächster Tag" : "Nächste Woche");
  if (mainCalendarView === "day" || mainCalendarView === "week") {
    renderCombinedScheduleView(mainCalendarView);
    return;
  }
  const holidayLayer = project?.layers?.find((entry) => entry.type === "holidays");
  const individualLayer = project?.layers?.find((entry) => entry.type === "individual");
  const appointmentLayer = project?.layers?.find((entry) => entry.type === "appointments");
  const sicknessLayer = project?.layers?.find((entry) => entry.type === "sickness");
  const appliedSettings = holidayLayer?.appliedSettings || holidayLayer?.settings;
  const semanticSchoolYearStart = Number((project ? getProjectCalendarRange(project).startDate : "")?.slice(0, 4));
  const appointmentEntries = [appointmentLayer, individualLayer]
    .flatMap((entryLayer) => (Array.isArray(entryLayer?.groups) ? entryLayer.groups : []).filter((group) => group.calendarVisible !== false))
    .flatMap((group) => (Array.isArray(group.appointments) ? group.appointments : []).map((appointment) => ({
      id: appointment.id,
      name: `${group.name}: ${appointment.name}`,
      startDate: appointment.date,
      endDate: appointment.date,
      type: "appointment",
      color: group.color || "#c9c1dd"
    })));
  const calendarEntries = [
    ...(Array.isArray(holidayLayer?.entries) ? holidayLayer.entries : []),
    ...(Array.isArray(individualLayer?.appliedEntries) ? individualLayer.appliedEntries : []),
    ...appointmentEntries,
    ...(Array.isArray(sicknessLayer?.entries) ? sicknessLayer.entries : [])
  ];
  if (!project || (!semanticSchoolYearStart && !appliedSettings?.startYear)) {
    renderYear(new Date().getFullYear(), calendarEntries);
    return;
  }
  renderYear(semanticSchoolYearStart || Number(appliedSettings.startYear), calendarEntries, true);
}

function getCombinedSchedules() {
  return projects.filter((project) => project.id === displayedProjectId).flatMap((project) => {
    const layer = project.layers?.find((entry) => entry.type === "schedules");
    return (Array.isArray(layer?.schedules) ? layer.schedules : [])
      .map((schedule) => ({ ...schedule, projectId: project.id, projectName: project.name }));
  });
}

function getCombinedSchoolProjects() {
  return projects.filter((project) => project.id === displayedProjectId).flatMap((project) => {
    const layer = project.layers?.find((entry) => entry.type === "individual");
    return (Array.isArray(layer?.appliedEntries) ? layer.appliedEntries : [])
      .filter((entry) => ["school-project", "class-trip", "vacation", "personal-appointment"].includes(entry.type))
      .map((entry) => ({ ...entry, projectId: project.id, projectName: project.name }));
  });
}

function getCombinedAppointments() {
  return projects.filter((project) => project.id === displayedProjectId).flatMap((project) => {
    return ["appointments", "individual"].flatMap((layerType) => {
      const layer = project.layers?.find((entry) => entry.type === layerType);
      return (Array.isArray(layer?.groups) ? layer.groups : []).filter((group) => group.calendarVisible !== false).flatMap((group) => (
        Array.isArray(group.appointments) ? group.appointments.map((appointment) => ({
        ...appointment,
        groupId: group.id,
        groupName: group.name,
        color: group.color || "#c9c1dd",
        layerType,
        projectId: project.id,
        projectName: project.name
        })) : []
      ));
    });
  });
}

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isScheduleValidOn(schedule, date) {
  const dateKey = getLocalDateKey(date);
  return (!schedule.validFrom || dateKey >= schedule.validFrom)
    && (!schedule.validUntil || dateKey <= schedule.validUntil);
}

function getLessonTeachingForm(lesson) {
  if (lesson.teachingForm === "abWeek" || lesson.teachingForm === "epochal") return lesson.teachingForm;
  return lesson.epochal ? "epochal" : "regular";
}

function isLessonActiveOnDate(lesson, schedule, date) {
  const teachingForm = getLessonTeachingForm(lesson);
  if (teachingForm === "regular") return true;
  const project = projects.find((entry) => entry.id === schedule.projectId);
  if (!project) return true;
  const schoolPeriods = getSchool(project, schedule.schoolId)?.periods || project.periods;
  const dateKey = getLocalDateKey(date);
  if (teachingForm === "abWeek") {
    const weeks = schoolPeriods?.models?.alternatingWeeks?.weeks;
    const week = (Array.isArray(weeks) ? weeks : []).find((entry) => (
      dateKey >= entry.startDate && dateKey <= entry.endDate
    ));
    return !week || week.variant === (lesson.abWeek === "B" ? "B" : "A");
  }
  const halfKey = lesson.epochHalf === "second" ? "second" : "first";
  const half = schoolPeriods?.models?.halves?.[halfKey];
  if (!half?.startDate || !half?.endDate) return true;
  return dateKey >= half.startDate && dateKey <= half.endDate;
}

function getScheduleHolidayScope(schedule) {
  if (schedule.holidayScopeType) return schedule.holidayScopeType;
  return String(schedule.validityPeriodId || "").startsWith("schoolYear.")
    ? String(schedule.validityPeriodId).split(".")[1]
    : null;
}

function isSchoolHolidayForSchedule(schedule, date) {
  const project = projects.find((entry) => entry.id === schedule.projectId);
  const holidayLayer = project?.layers?.find((entry) => entry.type === "holidays");
  const dateKey = getLocalDateKey(date);
  const scopeType = getScheduleHolidayScope(schedule);
  return (Array.isArray(holidayLayer?.entries) ? holidayLayer.entries : []).some((entry) => (
    ["school-holiday", "public-holiday", "school-free-day"].includes(entry.type)
    && (schedule.schoolId
      ? entry.schoolId === schedule.schoolId || entry.schoolIds?.includes(schedule.schoolId)
      : (!scopeType || !entry.scopeType || entry.scopeType === scopeType))
    && dateKey >= entry.startDate
    && dateKey <= entry.endDate
  ));
}

function isSicknessForSchedule(schedule, date) {
  const project = projects.find((entry) => entry.id === schedule.projectId);
  const sicknessLayer = project?.layers?.find((entry) => entry.type === "sickness");
  const dateKey = getLocalDateKey(date);
  return (Array.isArray(sicknessLayer?.entries) ? sicknessLayer.entries : []).some((entry) => (
    dateKey >= entry.startDate && dateKey <= entry.endDate
  ));
}

function updateLessonSignalsToggle() {
  lessonSignalsToggle.setAttribute("aria-pressed", String(lessonSignalsEnabled));
  lessonSignalsToggle.classList.toggle("is-active", lessonSignalsEnabled);
  lessonSignalsToggle.title = lessonSignalsEnabled ? "Stundensignale deaktivieren" : "Stundensignale aktivieren";
  lessonSignalsToggle.setAttribute(
    "aria-label",
    lessonSignalsEnabled ? "Stundensignale sind aktiv. Deaktivieren." : "Stundensignale sind deaktiviert. Aktivieren."
  );
}

function prepareLessonSignalAudio() {
  [lessonStartAudio, lessonEndAudio].forEach((audio) => {
    audio.muted = true;
    const playback = audio.play();
    if (playback?.then) {
      playback.then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
      }).catch(() => {
        audio.muted = false;
      });
    }
  });
}

function playLessonSignal(type) {
  const template = type === "start" ? lessonStartAudio : lessonEndAudio;
  const audio = template.cloneNode(true);
  audio.preload = "auto";
  void audio.play().catch(() => {
    lessonSignalsToggle.classList.add("has-audio-error");
    lessonSignalsToggle.title = "Der Browser hat die Tonwiedergabe blockiert. Signale aus- und wieder einschalten.";
  });
}

function getTodaysLessonSignalEvents(now = new Date()) {
  const dateKey = getLocalDateKey(now);
  const weekday = ((now.getDay() + 6) % 7) + 1;
  const events = [];
  getCombinedSchedules().forEach((schedule) => {
    if (!isScheduleValidOn(schedule, now)
      || isSchoolHolidayForSchedule(schedule, now)
      || isSicknessForSchedule(schedule, now)) return;
    (Array.isArray(schedule.lessons) ? schedule.lessons : [])
      .filter((lesson) => (
        lesson.day === weekday
        && isLessonActiveOnDate(lesson, schedule, now)
        && !isLessonSuppressedByClassProject(
          projects.find((project) => project.id === schedule.projectId),
          lesson,
          now
        )
      ))
      .forEach((lesson) => {
        events.push({
          type: "start",
          timestamp: new Date(`${dateKey}T${lesson.start}:00`).getTime()
        });
        events.push({
          type: "end",
          timestamp: new Date(`${dateKey}T${lesson.end}:00`).getTime()
        });
      });
  });
  return events;
}

function checkLessonSignals() {
  const now = Date.now();
  const previousCheck = Math.max(lessonSignalsLastCheck, now - 2500);
  lessonSignalsLastCheck = now;
  if (!lessonSignalsEnabled) return;
  getTodaysLessonSignalEvents(new Date(now)).forEach((event) => {
    if (event.timestamp <= previousCheck || event.timestamp > now) return;
    const key = `${event.type}:${event.timestamp}`;
    if (playedLessonSignalKeys.has(key)) return;
    playedLessonSignalKeys.add(key);
    playLessonSignal(event.type);
  });
  if (playedLessonSignalKeys.size > 500) playedLessonSignalKeys.clear();
}

function getSchoolHolidaysForDate(date, schedules) {
  const dateKey = getLocalDateKey(date);
  const projectIds = new Set(schedules.map((schedule) => schedule.projectId));
  const holidayEntries = projects
    .filter((project) => !projectIds.size || projectIds.has(project.id))
    .flatMap((project) => {
      const holidayLayer = project.layers?.find((entry) => entry.type === "holidays");
      const projectSchedules = schedules.filter((schedule) => schedule.projectId === project.id);
      return (Array.isArray(holidayLayer?.entries) ? holidayLayer.entries : []).filter((entry) => (
        !entry.schoolId
        || !projectSchedules.length
        || projectSchedules.some((schedule) => schedule.schoolId === entry.schoolId || entry.schoolIds?.includes(schedule.schoolId))
      ));
    })
    .filter((entry) => (
      ["school-holiday", "public-holiday", "school-free-day"].includes(entry.type)
      && dateKey >= entry.startDate
      && dateKey <= entry.endDate
    ))
    .map((entry) => ({
      name: entry.name,
      type: entry.type,
      federalState: entry.federalState,
      federalStates: entry.federalStates
    }));
  return getCalendarEntryDisplayNames(holidayEntries).map((name) => ({
    name,
    type: holidayEntries.some((entry) => entry.type === "public-holiday" && name.startsWith(`${entry.name} (`))
      ? "public-holiday"
      : holidayEntries.find((entry) => entry.name === name)?.type || "school-holiday"
  }));
}

function getScheduleReferenceDate() {
  return new Date(calendarReferenceDate);
}

function updateLivePhaseElement(element, now = new Date()) {
  const lessonStartMs = Number(element.dataset.lessonStartMs);
  const lessonEndMs = Number(element.dataset.lessonEndMs);
  if (!Number.isFinite(lessonStartMs) || !Number.isFinite(lessonEndMs) || now.getTime() < lessonStartMs || now.getTime() >= lessonEndMs) {
    element.hidden = true;
    return;
  }
  const phases = JSON.parse(element.dataset.phases || "[]");
  const elapsedSeconds = Math.floor((now.getTime() - lessonStartMs) / 1000);
  let phaseStartSeconds = 0;
  let phase = phases.at(-1);
  let phaseIndex = Math.max(0, phases.length - 1);
  for (const [index, candidate] of phases.entries()) {
    const phaseEnd = phaseStartSeconds + candidate.durationMinutes * 60;
    if (elapsedSeconds < phaseEnd) {
      phase = candidate;
      phaseIndex = index;
      break;
    }
    phaseStartSeconds = phaseEnd;
  }
  if (!phase) return;
  const phaseDurationSeconds = phase.durationMinutes * 60;
  const elapsedInPhase = Math.max(0, elapsedSeconds - phaseStartSeconds);
  const phaseRemainingSeconds = Math.max(0, phaseDurationSeconds - elapsedInPhase);
  const totalRemainingSeconds = Math.max(0, Math.ceil((lessonEndMs - now.getTime()) / 1000));
  const formatCountdown = (remainingSeconds) => {
    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  element.hidden = false;
  const totalCountdown = formatCountdown(totalRemainingSeconds);
  const phaseCountdown = formatCountdown(phaseRemainingSeconds);
  const countdown = element.querySelector(".live-phase-remaining");
  countdown.querySelector(".live-phase-total").textContent = totalCountdown;
  countdown.querySelector(".live-phase-current").textContent = `(${phaseCountdown})`;
  countdown.setAttribute("aria-label", `Gesamte Stunde: ${totalCountdown} verbleibend. Aktuelle Phase ${phase.name}: ${phaseCountdown} verbleibend.`);
  countdown.title = `Gesamt verbleibend: ${totalCountdown} · Phase verbleibend: ${phaseCountdown}`;
  const progress = element.querySelector(".live-phase-progress");
  const totalPhaseSeconds = phases.reduce((sum, candidate) => sum + Math.max(1, Number(candidate.durationMinutes) * 60), 0);
  const maximumPhaseSeconds = phases.reduce((maximum, candidate) => (
    Math.max(maximum, Math.max(1, Number(candidate.durationMinutes) * 60))
  ), 1);
  const availableWidth = progress.getBoundingClientRect().width;
  progress.classList.toggle("is-dense", phases.length >= 5);
  const segments = phases.map((candidate, index) => {
    const segment = document.createElement("span");
    const durationSeconds = Math.max(1, Number(candidate.durationMinutes) * 60);
    const segmentProgress = index < phaseIndex
      ? 100
      : index === phaseIndex
        ? Math.min(100, (elapsedInPhase / durationSeconds) * 100)
        : 0;
    const estimatedWidth = availableWidth * (durationSeconds / totalPhaseSeconds);
    segment.className = [
      "live-phase-segment",
      index === phaseIndex ? "is-current" : "",
      estimatedWidth > 0 && estimatedWidth < 44 ? "is-label-hidden" : ""
    ].filter(Boolean).join(" ");
    segment.style.flexGrow = String(durationSeconds);
    segment.title = `${candidate.name} · ${candidate.durationMinutes} Min.`;
    segment.setAttribute("aria-label", `${candidate.name}, ${candidate.durationMinutes} Minuten`);
    const label = document.createElement("span");
    label.className = "live-phase-segment-label";
    label.textContent = candidate.name;
    const track = document.createElement("span");
    track.className = "live-phase-segment-track";
    track.style.setProperty("--segment-progress", `${segmentProgress}%`);
    track.style.setProperty("--segment-relative-width", `${(durationSeconds / maximumPhaseSeconds) * 100}%`);
    segment.append(label, track);
    return segment;
  });
  progress.replaceChildren(...segments);
}

function configureLivePhase(card, lesson, date, defaultPhaseName = "Unterricht") {
  if (mainCalendarView !== "day" || !date || getLocalDateKey(date) !== getLocalDateKey(new Date())) return;
  const lessonMinutes = Math.max(0, timeToMinutes(lesson.end) - timeToMinutes(lesson.start));
  const phases = Array.isArray(lesson.phases) && lesson.phases.length
    ? lesson.phases
    : [{ name: defaultPhaseName, durationMinutes: lessonMinutes }];
  card.style.setProperty("--responsive-live-phase-height", `${2.2 + phases.length * 1.35}rem`);
  const live = document.createElement("div");
  live.className = "live-phase";
  live.hidden = true;
  live.dataset.lessonStartMs = String(new Date(`${getLocalDateKey(date)}T${lesson.start}:00`).getTime());
  live.dataset.lessonEndMs = String(new Date(`${getLocalDateKey(date)}T${lesson.end}:00`).getTime());
  live.dataset.phases = JSON.stringify(phases);
  live.innerHTML = "<span class=\"live-phase-copy\"><span class=\"live-phase-remaining\"><span class=\"live-phase-total\"></span> <strong class=\"live-phase-current\"></strong></span></span><span class=\"live-phase-progress\"></span>";
  const phaseSummary = phases.map((phase) => `${phase.name}, ${phase.durationMinutes} Minuten`).join("; ");
  card.setAttribute("aria-description", `Phasen: ${phaseSummary}. Die erste Zeit zeigt die verbleibende Gesamtzeit, die Zeit in Klammern die verbleibende Zeit der aktuellen Phase.`);
  card.title = `${card.title} · Phasen: ${phaseSummary}`;
  card.append(live);
  updateLivePhaseElement(live);
  if (!livePhaseTimer) {
    livePhaseTimer = setInterval(() => {
      document.querySelectorAll(".live-phase").forEach((element) => updateLivePhaseElement(element));
    }, 1000);
  }
}

function renderLessonCard(lesson, schedule, date = null) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = `lesson-card timeline-lesson-card${lesson.epochal ? " is-epochal" : ""}`;
  card.style.setProperty("--lesson-color", lesson.color || "#bfd2e2");
  card.title = `${schedule.projectName} / ${schedule.name}`;
  const heading = document.createElement("span");
  heading.className = "lesson-card-heading";
  const subject = document.createElement("strong");
  subject.textContent = lesson.subject;
  const grade = document.createElement("span");
  grade.textContent = lesson.grade;
  heading.append(subject, grade);
  const time = document.createElement("small");
  time.textContent = `${lesson.start}–${lesson.end}`;
  const room = document.createElement("small");
  room.textContent = lesson.room || "Raum fehlt";
  room.className = lesson.room ? "lesson-card-room" : "lesson-card-room is-missing";
  card.append(heading, time, room);
  configureLivePhase(card, lesson, date);
  card.addEventListener("click", () => {
    const project = projects.find((entry) => entry.id === schedule.projectId);
    const originalSchedule = project?.layers?.find((entry) => entry.type === "schedules")
      ?.schedules?.find((entry) => entry.id === schedule.id);
    const originalLesson = originalSchedule?.lessons?.find((entry) => entry.id === lesson.id);
    if (project && originalSchedule && originalLesson) openExistingLessonDialog(project, originalSchedule, originalLesson);
  });
  return card;
}

function renderSchoolProjectCard(schoolProject, start, end) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "lesson-card timeline-lesson-card timeline-project-card";
  card.style.setProperty("--lesson-color", "#bfd2e2");
  const categoryNames = {
    "class-trip": "Klassenfahrten",
    "school-project": "Schulprojekte",
    vacation: "Urlaub",
    "personal-appointment": "Weitere Termine"
  };
  card.title = `${schoolProject.projectName} / ${categoryNames[schoolProject.type] || "Termine"}`;
  const name = document.createElement("strong");
  name.textContent = schoolProject.name;
  if (schoolProject.type === "class-trip" && schoolProject.className) {
    const classLabel = document.createElement("small");
    classLabel.textContent = `Klasse ${schoolProject.className}`;
    card.append(name, classLabel);
  } else {
    card.append(name);
  }
  const time = document.createElement("small");
  time.textContent = `${minutesToTime(start)}–${minutesToTime(end)}`;
  card.append(time);
  card.addEventListener("click", () => {
    const project = projects.find((entry) => entry.id === schoolProject.projectId);
    const originalEntry = project?.layers?.find((entry) => entry.type === "individual")
      ?.entries?.find((entry) => entry.id === schoolProject.id);
    if (!project || !originalEntry) return;
    if (originalEntry.type === "class-trip") openClassTripDialog(project, originalEntry);
    else openSchoolProjectDialog(project, originalEntry, originalEntry.type);
  });
  return card;
}

function renderAppointmentTimelineCard(appointment, date = null) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "lesson-card timeline-lesson-card timeline-appointment-card";
  card.style.setProperty("--lesson-color", appointment.color || "#c9c1dd");
  card.title = `${appointment.projectName} / ${appointment.groupName}`;
  const name = document.createElement("strong");
  name.textContent = appointment.name;
  const group = document.createElement("small");
  group.textContent = appointment.groupName;
  const time = document.createElement("small");
  time.textContent = `${appointment.startTime}–${appointment.endTime}`;
  card.append(name, group, time);
  configureLivePhase(card, {
    start: appointment.startTime,
    end: appointment.endTime,
    phases: []
  }, date, appointment.name || "Termin");
  card.addEventListener("click", () => {
    const project = projects.find((entry) => entry.id === appointment.projectId);
    const originalGroup = project?.layers?.find((entry) => entry.type === (appointment.layerType || "appointments"))
      ?.groups?.find((entry) => entry.id === appointment.groupId);
    const originalAppointment = originalGroup?.appointments?.find((entry) => entry.id === appointment.id);
    if (project && originalGroup && originalAppointment) {
      openAppointmentDialog(project, originalGroup, originalAppointment, appointment.layerType || "appointments");
    }
  });
  return card;
}

function layoutTimelineEntries(entries) {
  const laneEnds = [];
  const sorted = entries.slice().sort((a, b) => (
    a.lesson.start.localeCompare(b.lesson.start)
    || a.lesson.end.localeCompare(b.lesson.end)
  ));
  sorted.forEach((entry) => {
    const start = timeToMinutes(entry.lesson.start);
    let lane = laneEnds.findIndex((end) => end <= start);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(0);
    }
    laneEnds[lane] = timeToMinutes(entry.lesson.end);
    entry.lane = lane;
  });
  const laneCount = Math.max(1, laneEnds.length);
  sorted.forEach((entry) => { entry.laneCount = laneCount; });
  return sorted;
}

function renderCombinedScheduleView(view) {
  if (livePhaseTimer) {
    clearInterval(livePhaseTimer);
    livePhaseTimer = null;
  }
  const schedules = getCombinedSchedules();
  const schoolProjects = getCombinedSchoolProjects();
  const appointments = getCombinedAppointments();
  const reference = getScheduleReferenceDate(schedules);
  if (reference.getDay() === 0) reference.setDate(reference.getDate() + 1);
  if (reference.getDay() === 6) reference.setDate(reference.getDate() + 2);
  calendarReferenceDate = new Date(reference);
  const monday = new Date(reference);
  monday.setDate(reference.getDate() - ((reference.getDay() + 6) % 7));
  const activeWeekdays = [...new Set(schedules.flatMap(getScheduleActiveDays))].sort((a, b) => a - b);
  if (!activeWeekdays.length) activeWeekdays.push(1, 2, 3, 4, 5);
  const dates = view === "day"
    ? [reference]
    : activeWeekdays.map((weekday) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + weekday - 1);
      return date;
    });
  const holidaysByDate = new Map(dates.map((date) => [
    getLocalDateKey(date),
    getSchoolHolidaysForDate(date, schedules)
  ]));
  const timedLessons = [];
  schedules.forEach((schedule) => {
    (Array.isArray(schedule.lessons) ? schedule.lessons : []).forEach((lesson) => {
      if (dates.some((date) => (
        lesson.day === ((date.getDay() + 6) % 7) + 1
        && isScheduleValidOn(schedule, date)
        && isLessonActiveOnDate(lesson, schedule, date)
        && !isSchoolHolidayForSchedule(schedule, date)
        && !isSicknessForSchedule(schedule, date)
        && !isLessonSuppressedByClassProject(
          projects.find((project) => project.id === schedule.projectId),
          lesson,
          date
        )
      ))) {
        timedLessons.push({ lesson, schedule });
      }
    });
  });
  const visibleSchoolProjects = schoolProjects.filter((schoolProject) => dates.some((date) => {
    const dateKey = getLocalDateKey(date);
    return dateKey >= schoolProject.startDate && dateKey <= schoolProject.endDate;
  }));
  const visibleAppointments = appointments.filter((appointment) => (
    dates.some((date) => getLocalDateKey(date) === appointment.date)
  ));
  calendar.replaceChildren();
  calendar.className = `combined-timeline is-${view}-timeline`;
  calendar.closest(".calendar-shell")?.classList.add("is-timeline-view");
  calendarTitle.textContent = view === "day" ? "Tagesansicht" : "Wochenansicht";
  yearLabel.textContent = view === "day"
    ? dates[0].toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })
    : `${dates[0].toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}–${dates[dates.length - 1].toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}`;
  const configuredStarts = schedules.map((schedule) => schedule.displayDefaults?.dayStart).filter(Boolean).map(timeToMinutes);
  const configuredEnds = schedules.map((schedule) => {
    if (schedule.displayDefaults?.dayEnd) return timeToMinutes(schedule.displayDefaults.dayEnd);
    if (schedule.displayDefaults?.dayStart && schedule.displayDefaults?.schoolDayMinutes) {
      return timeToMinutes(schedule.displayDefaults.dayStart) + Number(schedule.displayDefaults.schoolDayMinutes);
    }
    return null;
  }).filter(Number.isFinite);
  const schoolDayStart = configuredStarts.length ? Math.min(...configuredStarts) : 8 * 60;
  const schoolDayEnd = configuredEnds.length ? Math.max(...configuredEnds) : 16 * 60;
  const timelineStart = 0;
  const timelineEnd = 24 * 60;
  const timelineMinutes = timelineEnd - timelineStart;
  const firstHourMark = 0;
  calendar.style.setProperty("--timeline-columns", `66px repeat(${dates.length}, minmax(${view === "day" ? "280px" : "150px"}, 1fr))`);

  const header = document.createElement("div");
  header.className = "timeline-header";
  const corner = document.createElement("div");
  corner.className = "timeline-corner";
  corner.textContent = "Zeit";
  header.append(corner);
  dates.forEach((date) => {
    const head = document.createElement("div");
    head.className = "timeline-day-head";
    const dateLabel = document.createElement("span");
    dateLabel.className = "timeline-day-date";
    dateLabel.textContent = view === "day"
      ? date.toLocaleDateString("de-DE", { weekday: "long" })
      : date.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" });
    head.append(dateLabel);
    const holidayEntries = holidaysByDate.get(getLocalDateKey(date)) || [];
    if (holidayEntries.length) {
      const holidayLabel = document.createElement("span");
      holidayLabel.className = `timeline-day-holiday${holidayEntries.some((entry) => entry.type === "public-holiday") ? " is-public-holiday" : ""}`;
      holidayLabel.textContent = holidayEntries.map((entry) => entry.name).join(" · ");
      head.append(holidayLabel);
    }
    header.append(head);
  });
  calendar.append(header);

  const body = document.createElement("div");
  body.className = "timeline-body";
  const phaseBearingLessons = timedLessons.filter(({ lesson }) => (
    Array.isArray(lesson.phases) && lesson.phases.length
  ));
  const maximumPhaseCount = phaseBearingLessons.reduce(
    (maximum, { lesson }) => Math.max(maximum, lesson.phases.length),
    1
  );
  const shortestPhaseLessonMinutes = phaseBearingLessons.reduce((minimum, { lesson }) => (
    Math.min(minimum, Math.max(1, timeToMinutes(lesson.end) - timeToMinutes(lesson.start)))
  ), Number.POSITIVE_INFINITY);
  const responsiveCardHeight = 80 + maximumPhaseCount * 24;
  const responsivePixelsPerMinute = Number.isFinite(shortestPhaseLessonMinutes)
    ? Math.min(6.5, responsiveCardHeight / shortestPhaseLessonMinutes)
    : 2.7;
  const pixelsPerMinute = view === "day"
    ? Math.max(2.7, responsivePixelsPerMinute)
    : 1.8;
  const minimumTimelineHeight = view === "day" ? 840 : 720;
  body.style.setProperty("--timeline-body-height", `${Math.max(minimumTimelineHeight, timelineMinutes * pixelsPerMinute)}px`);
  const axis = document.createElement("div");
  axis.className = "timeline-axis";
  axis.dataset.timelineStart = String(timelineStart);
  axis.dataset.timelineEnd = String(timelineEnd);
  for (let minutes = firstHourMark; minutes <= timelineEnd; minutes += 60) {
    const mark = document.createElement("span");
    mark.className = "timeline-hour-mark";
    mark.style.top = `${((minutes - timelineStart) / timelineMinutes) * 100}%`;
    mark.textContent = minutesToTime(minutes);
    axis.append(mark);
  }
  const currentTimeIndicator = document.createElement("span");
  currentTimeIndicator.className = "timeline-current-time";
  currentTimeIndicator.setAttribute("aria-label", "Aktuelle Uhrzeit");
  axis.append(currentTimeIndicator);
  body.append(axis);
  dates.forEach((date) => {
    const weekday = ((date.getDay() + 6) % 7) + 1;
    const holidayEntries = holidaysByDate.get(getLocalDateKey(date)) || [];
    const column = document.createElement("div");
    column.className = `timeline-day-column${holidayEntries.length ? " is-holiday" : ""}${holidayEntries.some((entry) => entry.type === "public-holiday") ? " is-public-holiday" : ""}`;
    for (let minutes = firstHourMark; minutes <= timelineEnd; minutes += 60) {
      const guide = document.createElement("span");
      guide.className = "timeline-hour-guide";
      guide.style.top = `${((minutes - timelineStart) / timelineMinutes) * 100}%`;
      column.append(guide);
    }
    const lessonEntries = timedLessons.filter(({ lesson, schedule }) => (
        lesson.day === weekday
        && isScheduleValidOn(schedule, date)
        && isLessonActiveOnDate(lesson, schedule, date)
        && !isSchoolHolidayForSchedule(schedule, date)
        && !isSicknessForSchedule(schedule, date)
        && !isLessonSuppressedByClassProject(
          projects.find((project) => project.id === schedule.projectId),
          lesson,
          date
        )
      ));
    const projectEntries = visibleSchoolProjects
      .filter((schoolProject) => {
        const dateKey = getLocalDateKey(date);
        return dateKey >= schoolProject.startDate && dateKey <= schoolProject.endDate;
      })
      .map((schoolProject) => {
        const projectStart = schoolProject.startTime ? timeToMinutes(schoolProject.startTime) : schoolDayStart;
        const projectEnd = schoolProject.endTime ? timeToMinutes(schoolProject.endTime) : schoolDayEnd;
        return {
          lesson: {
            start: minutesToTime(projectStart),
            end: minutesToTime(projectEnd)
          },
          schoolProject
        };
      });
    const appointmentEntries = visibleAppointments
      .filter((appointment) => appointment.date === getLocalDateKey(date))
      .map((appointment) => ({
        lesson: {
          start: appointment.startTime,
          end: appointment.endTime
        },
        appointment
      }));
    const entries = layoutTimelineEntries([...lessonEntries, ...projectEntries, ...appointmentEntries]);
    entries.forEach(({ lesson, schedule, schoolProject, appointment, lane, laneCount }) => {
      const card = appointment
        ? renderAppointmentTimelineCard(appointment, date)
        : schoolProject
          ? renderSchoolProjectCard(schoolProject, timeToMinutes(lesson.start), timeToMinutes(lesson.end))
          : renderLessonCard(lesson, schedule, date);
      const top = ((timeToMinutes(lesson.start) - timelineStart) / timelineMinutes) * 100;
      const height = ((timeToMinutes(lesson.end) - timeToMinutes(lesson.start)) / timelineMinutes) * 100;
      card.style.top = `${top}%`;
      card.style.height = `${height}%`;
      card.style.left = `calc(${lane * (100 / laneCount)}% + 3px)`;
      card.style.width = `calc(${100 / laneCount}% - 6px)`;
      column.append(card);
    });
    body.append(column);
  });
  calendar.append(body);
  requestAnimationFrame(() => updateCurrentTimeIndicator());
}

function centerCurrentTimeIndicator(indicator) {
  const timeline = indicator.closest(".combined-timeline");
  const body = indicator.closest(".timeline-body");
  const header = timeline?.querySelector(".timeline-header");
  if (!timeline || !body || !header) return;
  const headerHeight = header.offsetHeight;
  const visibleBodyHeight = Math.max(0, timeline.clientHeight - headerHeight);
  const desiredViewportPosition = headerHeight + visibleBodyHeight / 2;
  const indicatorPosition = body.offsetTop + indicator.offsetTop;
  const maximumScroll = Math.max(0, timeline.scrollHeight - timeline.clientHeight);
  timeline.scrollTop = Math.max(0, Math.min(maximumScroll, indicatorPosition - desiredViewportPosition));
}

function updateCurrentTimeIndicator(now = new Date()) {
  document.querySelectorAll(".timeline-current-time").forEach((indicator) => {
    const axis = indicator.closest(".timeline-axis");
    const timelineStart = Number(axis?.dataset.timelineStart);
    const timelineEnd = Number(axis?.dataset.timelineEnd);
    const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    const isVisible = Number.isFinite(timelineStart)
      && Number.isFinite(timelineEnd)
      && currentMinutes >= timelineStart
      && currentMinutes <= timelineEnd;
    indicator.hidden = !isVisible;
    if (!isVisible) return;
    indicator.style.top = `${((currentMinutes - timelineStart) / (timelineEnd - timelineStart)) * 100}%`;
    centerCurrentTimeIndicator(indicator);
  });
}

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuOverlay.hidden = !isOpen;
  sideMenu.classList.toggle("is-open", isOpen);
  sideMenu.setAttribute("aria-hidden", String(!isOpen));
  if (isOpen) sideMenu.removeAttribute("inert");
  else sideMenu.setAttribute("inert", "");
}

function setWorkspaceMode(mode) {
  const showSettings = mode === "settings";
  app.classList.toggle("workspace-mode-settings", showSettings);
  app.classList.toggle("workspace-mode-render", !showSettings);
}

function loadProjects() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter((project) => project && project.id && project.name) : [];
  } catch {
    return [];
  }
}

function saveProjects() {
  localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
}

function setExportMenuOpen(isOpen) {
  exportMenu.hidden = !isOpen;
  exportButton.setAttribute("aria-expanded", String(isOpen));
}

function makeExportFilename(value) {
  return String(value || "stundenplan")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "stundenplan";
}

function downloadExportFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function exportDisplayedProject() {
  const project = projects.find((entry) => entry.id === displayedProjectId);
  if (!project) {
    window.alert("Bitte wählen Sie zuerst einen Projektordner für die Kalenderanzeige aus.");
    return;
  }
  const payload = {
    type: "schola-stundenplan-project",
    version: 1,
    exportedAt: new Date().toISOString(),
    project: structuredClone(project)
  };
  downloadExportFile(
    JSON.stringify(payload, null, 2),
    `${makeExportFilename(project.name)}.stundenplan.json`,
    "application/json;charset=utf-8"
  );
}

function normalizeImportedProject(payload) {
  if (!payload || payload.type !== "schola-stundenplan-project" || Number(payload.version) !== 1) {
    throw new Error("Die Datei ist kein gültiger Stundenplan-Projektexport.");
  }
  const sourceProject = payload.project;
  if (!sourceProject || typeof sourceProject !== "object" || Array.isArray(sourceProject)) {
    throw new Error("In der Datei fehlt der Projektordner.");
  }
  const name = String(sourceProject.name || "").trim();
  if (!name) throw new Error("Der Projektordner besitzt keinen gültigen Namen.");
  if (!Array.isArray(sourceProject.layers)) {
    throw new Error("Die Kalenderschichten des Projektordners fehlen.");
  }

  const layers = LAYER_TYPES.map(({ id }) => {
    const importedLayer = sourceProject.layers.find((entry) => entry?.type === id);
    const layer = importedLayer && typeof importedLayer === "object"
      ? structuredClone(importedLayer)
      : { type: id, entries: [] };
    layer.type = id;
    if (id === "schedules") layer.schedules = Array.isArray(layer.schedules) ? layer.schedules : [];
    else if (id === "appointments") layer.groups = Array.isArray(layer.groups) ? layer.groups : [];
    else if (id === "classCatalog") layer.subjects = Array.isArray(layer.subjects) ? layer.subjects : [];
    else layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
    if (id === "individual" && !Array.isArray(layer.appliedEntries)) {
      layer.appliedEntries = structuredClone(layer.entries);
    }
    return layer;
  });

  const importedId = String(sourceProject.id || "");
  const id = importedId && !projects.some((project) => project.id === importedId)
    ? importedId
    : globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}`;
  const normalizedProject = {
    ...structuredClone(sourceProject),
    id,
    name,
    layers,
    importedAt: new Date().toISOString(),
    importedFromProjectId: importedId || null
  };
  ensureSchools(normalizedProject);
  return normalizedProject;
}

async function importProjectFromFile(file) {
  if (!file) throw new Error("Bitte wählen Sie eine JSON-Datei aus.");
  if (file.size > 25 * 1024 * 1024) throw new Error("Die Projektdatei ist größer als 25 MB.");
  let payload;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    throw new Error("Die ausgewählte Datei enthält kein gültiges JSON.");
  }
  const project = normalizeImportedProject(payload);
  projects.push(project);
  migrateKnownHolidayCorrections([project]);
  activeProjectId = project.id;
  displayedProjectId = project.id;
  activeLayerType = null;
  activeScheduleId = null;
  expandedProjectIds.add(project.id);
  expandDefaultProjectLayers(project.id);
  localStorage.setItem(DISPLAY_PROJECT_STORAGE_KEY, project.id);
  saveProjects();
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
  return project;
}

function escapeIcalendarText(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatIcalendarDate(dateKey) {
  return String(dateKey).replaceAll("-", "");
}

function formatIcalendarDateTime(dateKey, time) {
  return `${formatIcalendarDate(dateKey)}T${String(time || "00:00").replace(":", "")}00`;
}

function getIcalendarColor(value) {
  const colors = new Map([
    ["#bfd2e2", "lightblue"],
    ["#b8d6d1", "lightcyan"],
    ["#c6d7bd", "lightgreen"],
    ["#e6d8a8", "khaki"],
    ["#e4c0a8", "peachpuff"],
    ["#dfb9bd", "pink"],
    ["#c9c1dd", "thistle"],
    ["#d7c4b4", "tan"]
  ]);
  return colors.get(String(value || "").toLowerCase()) || "";
}

function addDaysToDateKey(dateKey, days = 1) {
  const date = new Date(`${dateKey}T12:00:00`);
  date.setDate(date.getDate() + days);
  return getLocalDateKey(date);
}

function forEachDateKey(startDate, endDate, callback) {
  if (!startDate || !endDate || endDate < startDate) return;
  const cursor = new Date(`${startDate}T12:00:00`);
  const last = new Date(`${endDate}T12:00:00`);
  while (cursor <= last) {
    callback(getLocalDateKey(cursor), new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
}

function createIcalendarEvent({
  uid,
  title,
  description = "",
  location = "",
  startDate,
  endDate = startDate,
  startTime = "",
  endTime = "",
  category = "",
  color = "",
  recurrenceRule = "",
  exclusionDates = []
}) {
  const lines = [
    "BEGIN:VEVENT",
    `UID:${escapeIcalendarText(uid)}@stundenplan.schola`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `SUMMARY:${escapeIcalendarText(title)}`
  ];
  if (startTime && endTime) {
    lines.push(`DTSTART:${formatIcalendarDateTime(startDate, startTime)}`);
    lines.push(`DTEND:${formatIcalendarDateTime(endDate, endTime)}`);
    if (recurrenceRule) lines.push(`RRULE:${recurrenceRule}`);
    for (let index = 0; index < exclusionDates.length; index += 4) {
      lines.push(`EXDATE:${exclusionDates.slice(index, index + 4)
        .map((dateKey) => formatIcalendarDateTime(dateKey, startTime))
        .join(",")}`);
    }
  } else {
    lines.push(`DTSTART;VALUE=DATE:${formatIcalendarDate(startDate)}`);
    lines.push(`DTEND;VALUE=DATE:${formatIcalendarDate(addDaysToDateKey(endDate, 1))}`);
  }
  if (description) lines.push(`DESCRIPTION:${escapeIcalendarText(description)}`);
  if (location) lines.push(`LOCATION:${escapeIcalendarText(location)}`);
  if (category) lines.push(`CATEGORIES:${escapeIcalendarText(category)}`);
  const standardColor = getIcalendarColor(color);
  if (standardColor) lines.push(`COLOR:${standardColor}`);
  if (color) lines.push(`X-SCHOLA-COLOR:${escapeIcalendarText(color)}`);
  lines.push("END:VEVENT");
  return lines;
}

function isLessonSuppressedByClassProject(project, lesson, date) {
  const layer = project?.layers?.find((entry) => entry.type === "classes");
  const dateKey = getLocalDateKey(date);
  const suppressedByClassProject = (Array.isArray(layer?.entries) ? layer.entries : []).some((entry) => {
    if (Array.isArray(entry.schoolIds) && entry.schoolIds.length && lesson.schoolId && !entry.schoolIds.includes(lesson.schoolId)) return false;
    if ((!Array.isArray(entry.schoolIds) || !entry.schoolIds.length) && entry.schoolId && lesson.schoolId && entry.schoolId !== lesson.schoolId) return false;
    const startDate = entry.startDate || entry.date;
    const endDate = entry.endDate || entry.date;
    if (!startDate || !endDate || dateKey < startDate || dateKey > endDate) return false;
    const normalizedEntryClass = String(entry.className || entry.class || "").trim().toLowerCase();
    const normalizedLessonClass = String(lesson.grade || "").trim().toLowerCase();
    const sameClass = Boolean(
      (entry.classId && lesson.classId && entry.classId === lesson.classId)
      || (Array.isArray(entry.classIds) && lesson.classId && entry.classIds.includes(lesson.classId))
      || (normalizedEntryClass && normalizedEntryClass === normalizedLessonClass)
    );
    if (!sameClass) return false;
    const allDay = typeof entry.allDay === "boolean"
      ? entry.allDay
      : !(entry.startTime && entry.endTime);
    if (allDay) return true;
    if (!entry.startTime || !entry.endTime) return false;
    return lesson.start < entry.endTime && lesson.end > entry.startTime;
  });
  if (suppressedByClassProject) return true;
  const overlapsLesson = (entry) => {
    if (!entry?.overridesLessons) return false;
    const startDate = entry.startDate || entry.date;
    const endDate = entry.endDate || entry.date;
    if (!startDate || !endDate || dateKey < startDate || dateKey > endDate) return false;
    if (!entry.startTime || !entry.endTime) return true;
    return lesson.start < entry.endTime && lesson.end > entry.startTime;
  };
  const individualLayer = project?.layers?.find((entry) => entry.type === "individual");
  const schoolAppointmentLayer = project?.layers?.find((entry) => entry.type === "appointments");
  const individualEntries = Array.isArray(individualLayer?.appliedEntries)
    ? individualLayer.appliedEntries
    : (Array.isArray(individualLayer?.entries) ? individualLayer.entries : []);
  const groupedAppointments = [schoolAppointmentLayer, individualLayer].flatMap((appointmentLayer) => (
    (Array.isArray(appointmentLayer?.groups) ? appointmentLayer.groups : []).filter((group) => group.calendarVisible !== false)
      .flatMap((group) => Array.isArray(group.appointments) ? group.appointments : [])
  ));
  return individualEntries.some(overlapsLesson) || groupedAppointments.some(overlapsLesson);
}

function getCompleteIcalendarSelection(project) {
  const schedulesLayer = project.layers?.find((entry) => entry.type === "schedules");
  const individualLayer = project.layers?.find((entry) => entry.type === "individual");
  const appointmentLayer = project.layers?.find((entry) => entry.type === "appointments");
  const sicknessLayer = project.layers?.find((entry) => entry.type === "sickness");
  const classProjectsLayer = project.layers?.find((entry) => entry.type === "classes");
  return {
    scheduleIds: new Set((schedulesLayer?.schedules || []).map((entry) => entry.id)),
    holidays: true,
    individualEntryIds: new Set((individualLayer?.appliedEntries || []).map((entry) => entry.id)),
    appointmentIds: new Set([appointmentLayer, individualLayer].flatMap((layer) => (
      (layer?.groups || []).flatMap((group) => (group.appointments || []).map((entry) => entry.id))
    ))),
    sicknessIds: new Set((sicknessLayer?.entries || []).map((entry) => entry.id)),
    classProjectIds: new Set((classProjectsLayer?.entries || []).map((entry) => entry.id))
  };
}

function buildProjectIcalendar(project, selection = getCompleteIcalendarSelection(project)) {
  const events = [];
  const schedulesLayer = project.layers?.find((entry) => entry.type === "schedules");
  const individualLayer = project.layers?.find((entry) => entry.type === "individual");
  const holidayLayer = project.layers?.find((entry) => entry.type === "holidays");
  const appointmentLayer = project.layers?.find((entry) => entry.type === "appointments");
  const sicknessLayer = project.layers?.find((entry) => entry.type === "sickness");
  const classProjectsLayer = project.layers?.find((entry) => entry.type === "classes");
  const projectPeriod = getLessonStatisticsPeriod(project);

  (Array.isArray(schedulesLayer?.schedules) ? schedulesLayer.schedules : [])
    .filter((schedule) => selection.scheduleIds.has(schedule.id))
    .forEach((schedule) => {
    const rangeStart = schedule.validFrom || projectPeriod.startDate;
    const rangeEnd = schedule.validUntil || projectPeriod.endDate;
    const combinedSchedule = { ...schedule, projectId: project.id };
    (Array.isArray(schedule.lessons) ? schedule.lessons : []).forEach((lesson) => {
      const occurrenceDates = [];
      const exclusionDates = [];
      forEachDateKey(rangeStart, rangeEnd, (dateKey, date) => {
        const weekday = ((date.getDay() + 6) % 7) + 1;
        if (lesson.day !== weekday) return;
        occurrenceDates.push(dateKey);
        if (
          !isLessonActiveOnDate(lesson, combinedSchedule, date)
          || isSchoolHolidayForSchedule(combinedSchedule, date)
          || isSicknessForSchedule(combinedSchedule, date)
          || isLessonSuppressedByClassProject(project, lesson, date)
        ) {
          exclusionDates.push(dateKey);
        }
      });
      if (!occurrenceDates.length || exclusionDates.length === occurrenceDates.length) return;
      const firstActualDate = occurrenceDates.find((dateKey) => !exclusionDates.includes(dateKey));
      const effectiveExclusionDates = exclusionDates.filter((dateKey) => dateKey >= firstActualDate);
      const className = lesson.grade || "";
      events.push(...createIcalendarEvent({
        uid: `lesson-series-${schedule.id}-${lesson.id}`,
        title: [lesson.subject || "Unterricht", className].filter(Boolean).join(" · "),
        description: `Stundenplan: ${schedule.name}`,
        location: lesson.room || "",
        startDate: firstActualDate,
        startTime: lesson.start,
        endTime: lesson.end,
        category: "Unterricht",
        color: lesson.color || "#bfd2e2",
        recurrenceRule: `FREQ=WEEKLY;UNTIL=${formatIcalendarDateTime(rangeEnd, "23:59").replace(/00$/, "59")}`,
        exclusionDates: effectiveExclusionDates
      }));
    });
  });

  if (selection.holidays) (Array.isArray(holidayLayer?.entries) ? holidayLayer.entries : [])
    .filter((entry) => ["school-holiday", "public-holiday", "school-free-day"].includes(entry.type))
    .forEach((entry) => {
      events.push(...createIcalendarEvent({
        uid: `holiday-${entry.id}`,
        title: entry.name || "Schulfreier Tag",
        startDate: entry.startDate,
        endDate: entry.endDate,
        category: entry.type === "public-holiday" ? "Gesetzlicher Feiertag" : entry.type === "school-free-day" ? "Schulfreier Tag" : "Ferien",
        color: "#c6d7bd"
      }));
    });

  (Array.isArray(individualLayer?.appliedEntries) ? individualLayer.appliedEntries : [])
    .filter((entry) => (
      selection.individualEntryIds.has(entry.id)
      && ["school-project", "class-trip", "vacation", "personal-appointment"].includes(entry.type)
    ))
    .forEach((entry) => {
      forEachDateKey(entry.startDate, entry.endDate || entry.startDate, (dateKey) => {
        events.push(...createIcalendarEvent({
          uid: `${entry.type}-${entry.id}-${dateKey}`,
          title: entry.name || ({ "class-trip": "Klassenfahrt", "school-project": "Schulprojekt", vacation: "Urlaub", "personal-appointment": "Termin" }[entry.type]),
          description: entry.className || entry.class || "",
          startDate: dateKey,
          startTime: entry.startTime,
          endTime: entry.endTime,
          category: ({ "class-trip": "Klassenfahrt", "school-project": "Schulprojekt", vacation: "Urlaub", "personal-appointment": "Persönlicher Termin" }[entry.type]),
          color: entry.color || "#bfd2e2"
        }));
      });
    });

  [appointmentLayer, individualLayer].flatMap((layer) => (Array.isArray(layer?.groups) ? layer.groups : []))
    .forEach((group) => {
    (Array.isArray(group.appointments) ? group.appointments : [])
      .filter((appointment) => selection.appointmentIds.has(appointment.id))
      .forEach((appointment) => {
      events.push(...createIcalendarEvent({
        uid: `appointment-${group.id}-${appointment.id}`,
        title: appointment.name || group.name || "Termin",
        description: group.name || "",
        startDate: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        category: "Termin",
        color: group.color || "#c9c1dd"
      }));
    });
  });

  (Array.isArray(sicknessLayer?.entries) ? sicknessLayer.entries : [])
    .filter((entry) => selection.sicknessIds.has(entry.id))
    .forEach((entry) => {
    events.push(...createIcalendarEvent({
      uid: `sickness-${entry.id}`,
      title: entry.name || "Krankschreibung",
      startDate: entry.startDate,
      endDate: entry.endDate,
      category: "Abwesenheit",
      color: "#d7c4b4"
    }));
  });

  (Array.isArray(classProjectsLayer?.entries) ? classProjectsLayer.entries : [])
    .filter((entry) => selection.classProjectIds.has(entry.id))
    .forEach((entry) => {
      events.push(...createIcalendarEvent({
        uid: `class-project-${entry.id}`,
        title: entry.name || "Projekttag",
        description: (entry.classNames || []).join(", ") || entry.className || entry.class || "",
        startDate: entry.startDate || entry.date,
        endDate: entry.endDate || entry.date,
        startTime: entry.startTime,
        endTime: entry.endTime,
        category: "Projekttag",
        color: entry.color || "#e6d8a8"
      }));
    });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//Schola//Stundenplan//DE",
    `X-WR-CALNAME:${escapeIcalendarText(project.name)}`,
    ...events,
    "END:VCALENDAR",
    ""
  ].join("\r\n");
}

function appendCalendarExportChoiceGroup(title, options) {
  if (!options.length) return;
  const group = document.createElement("section");
  group.className = "calendar-export-choice-group";
  const heading = document.createElement("h3");
  heading.textContent = title;
  group.append(heading);
  options.forEach(({ kind, id, label }) => {
    const choice = document.createElement("label");
    choice.className = "calendar-export-choice";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.dataset.exportKind = kind;
    input.dataset.exportId = id || "";
    const copy = document.createElement("span");
    copy.textContent = label;
    choice.append(input, copy);
    group.append(choice);
  });
  calendarExportChoices.append(group);
}

function renderCalendarExportChoices(project) {
  calendarExportChoices.replaceChildren();
  const schedulesLayer = project.layers?.find((entry) => entry.type === "schedules");
  const holidayLayer = project.layers?.find((entry) => entry.type === "holidays");
  const individualLayer = project.layers?.find((entry) => entry.type === "individual");
  const appointmentLayer = project.layers?.find((entry) => entry.type === "appointments");
  const classProjectsLayer = project.layers?.find((entry) => entry.type === "classes");
  const sicknessLayer = project.layers?.find((entry) => entry.type === "sickness");

  appendCalendarExportChoiceGroup("Stundenpläne", (schedulesLayer?.schedules || []).map((schedule) => ({
    kind: "schedule",
    id: schedule.id,
    label: schedule.name
  })));
  if ((holidayLayer?.entries || []).some((entry) => ["school-holiday", "public-holiday", "school-free-day"].includes(entry.type))) {
    appendCalendarExportChoiceGroup("Ferien und schulfreie Tage", [{
      kind: "holidays",
      id: "",
      label: "Alle Ferien, Feiertage und schulfreien Tage"
    }]);
  }
  appendCalendarExportChoiceGroup("Persönliche Termine, Klassenfahrten und Schulprojekte", (individualLayer?.appliedEntries || [])
    .filter((entry) => ["school-project", "class-trip", "vacation", "personal-appointment"].includes(entry.type))
    .map((entry) => ({
      kind: "individual",
      id: entry.id,
      label: entry.name || ({ "class-trip": "Klassenfahrt", "school-project": "Schulprojekt", vacation: "Urlaub", "personal-appointment": "Termin" }[entry.type])
    })));
  appendCalendarExportChoiceGroup("Schulische und persönliche Termingruppen", [appointmentLayer, individualLayer].flatMap((layer) => (
    (layer?.groups || []).flatMap((group) => (group.appointments || []).map((appointment) => ({
      kind: "appointment",
      id: appointment.id,
      label: `${group.name}: ${appointment.name}`
    })))
  )));
  appendCalendarExportChoiceGroup("Projekttage nach Klassen", (classProjectsLayer?.entries || []).map((entry) => ({
    kind: "classProject",
    id: entry.id,
    label: entry.name || entry.className || entry.class || "Projekttag"
  })));
  appendCalendarExportChoiceGroup("Krankschreibungen", (sicknessLayer?.entries || []).map((entry) => ({
    kind: "sickness",
    id: entry.id,
    label: entry.startDate === entry.endDate
      ? formatGermanDate(entry.startDate)
      : `${formatGermanDate(entry.startDate)}–${formatGermanDate(entry.endDate)}`
  })));

  if (!calendarExportChoices.children.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "In diesem Projektordner sind noch keine exportierbaren Inhalte angelegt.";
    calendarExportChoices.append(empty);
  }
}

function openCalendarExportDialog() {
  const project = projects.find((entry) => entry.id === displayedProjectId);
  if (!project) {
    window.alert("Bitte wählen Sie zuerst einen Projektordner für die Kalenderanzeige aus.");
    return;
  }
  calendarExportForm.reset();
  calendarExportDialog.dataset.projectId = project.id;
  calendarExportStatus.textContent = "";
  renderCalendarExportChoices(project);
  calendarExportChoices.hidden = true;
  calendarExportDialog.showModal();
}

function getCalendarExportSelection(project) {
  const preset = calendarExportForm.elements.calendarExportPreset.value;
  const allSchedules = project.layers?.find((entry) => entry.type === "schedules")?.schedules || [];
  const selection = {
    scheduleIds: new Set(),
    holidays: false,
    individualEntryIds: new Set(),
    appointmentIds: new Set(),
    sicknessIds: new Set(),
    classProjectIds: new Set()
  };
  if (preset === "lessons" || preset === "lessons-holidays") {
    allSchedules.forEach((schedule) => selection.scheduleIds.add(schedule.id));
    selection.holidays = preset === "lessons-holidays";
    return selection;
  }
  calendarExportChoices.querySelectorAll("input[type=\"checkbox\"]:checked").forEach((input) => {
    const id = input.dataset.exportId;
    if (input.dataset.exportKind === "schedule") selection.scheduleIds.add(id);
    if (input.dataset.exportKind === "holidays") selection.holidays = true;
    if (input.dataset.exportKind === "individual") selection.individualEntryIds.add(id);
    if (input.dataset.exportKind === "appointment") selection.appointmentIds.add(id);
    if (input.dataset.exportKind === "sickness") selection.sicknessIds.add(id);
    if (input.dataset.exportKind === "classProject") selection.classProjectIds.add(id);
  });
  return selection;
}

function downloadDisplayedCalendar(selection) {
  const project = projects.find((entry) => entry.id === displayedProjectId);
  if (!project) {
    window.alert("Bitte wählen Sie zuerst einen Projektordner für die Kalenderanzeige aus.");
    return;
  }
  downloadExportFile(
    buildProjectIcalendar(project, selection),
    `${makeExportFilename(project.name)}.ics`,
    "text/calendar;charset=utf-8"
  );
}

function setDisplayedProject(projectId) {
  if (!projects.some((project) => project.id === projectId)) return;
  displayedProjectId = projectId;
  localStorage.setItem(DISPLAY_PROJECT_STORAGE_KEY, projectId);
  renderProjectBrowser();
  renderActiveCalendar();
}

function setBrowserMenuOpen(isOpen) {
  browserActionsButton.setAttribute("aria-expanded", String(isOpen));
  browserActionsMenu.hidden = !isOpen;
}

function closeCardMenus(exceptShell = null) {
  document.querySelectorAll(".schedule-menu-shell").forEach((shell) => {
    if (shell === exceptShell) return;
    const menu = shell.querySelector(".schedule-menu");
    const button = shell.querySelector(".schedule-menu-button");
    if (menu) menu.hidden = true;
    button?.setAttribute("aria-expanded", "false");
  });
}

function selectProject(projectId) {
  activeProjectId = projectId;
  activeLayerType = null;
  activeScheduleId = null;
  activeSchoolId = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectLayer(projectId, layerType) {
  activeProjectId = projectId;
  activeLayerType = layerType;
  activeScheduleId = null;
  activeSchoolId = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectSchool(projectId, schoolId) {
  activeProjectId = projectId;
  activeLayerType = "holidays";
  activeScheduleId = null;
  activeSchoolId = schoolId;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectSchedule(projectId, scheduleId) {
  activeProjectId = projectId;
  activeLayerType = "schedules";
  activeScheduleId = scheduleId;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function toggleLayerExpanded(projectId, layerId) {
  const key = `${projectId}:${layerId}`;
  if (expandedLayerKeys.has(key)) expandedLayerKeys.delete(key);
  else expandedLayerKeys.add(key);
  localStorage.setItem(EXPANDED_LAYERS_STORAGE_KEY, JSON.stringify([...expandedLayerKeys]));
  renderProjectBrowser();
}

function expandDefaultProjectLayers(projectId) {
  expandableLayerIds.forEach((layerId) => expandedLayerKeys.add(`${projectId}:${layerId}`));
  localStorage.setItem(EXPANDED_LAYERS_STORAGE_KEY, JSON.stringify([...expandedLayerKeys]));
}

function setAppointmentGroupCalendarVisibility(project, layerType, groupId, visible) {
  const layer = getProjectLayer(project, layerType);
  const group = (Array.isArray(layer.groups) ? layer.groups : []).find((entry) => entry.id === groupId);
  if (!group) return;
  group.calendarVisible = visible;
  saveProjects();
  renderProjectBrowser();
  renderActiveCalendar(project);
}

function createBrowserGroupRow(project, layerType, group) {
  const row = document.createElement("div");
  row.className = "browser-group-row";
  const select = document.createElement("button");
  select.type = "button";
  select.className = "schedule-tree-row browser-group-select";
  select.textContent = group.name;
  select.addEventListener("click", () => selectLayer(project.id, layerType));
  const visibility = document.createElement("button");
  visibility.type = "button";
  visibility.className = `group-visibility-button${group.calendarVisible === false ? " is-hidden" : ""}`;
  visibility.setAttribute("aria-pressed", String(group.calendarVisible !== false));
  visibility.setAttribute("aria-label", `${group.name} im Kalender ${group.calendarVisible === false ? "einblenden" : "ausblenden"}`);
  visibility.title = group.calendarVisible === false ? "Im Kalender einblenden" : "Im Kalender ausblenden";
  visibility.innerHTML = "<svg aria-hidden=\"true\" viewBox=\"0 0 24 24\"><path d=\"M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z\"/><circle cx=\"12\" cy=\"12\" r=\"2.8\"/><path class=\"eye-slash\" d=\"M4 4l16 16\"/></svg>";
  visibility.addEventListener("click", () => setAppointmentGroupCalendarVisibility(project, layerType, group.id, group.calendarVisible === false));
  row.append(select, visibility);
  return row;
}

function renderProjectBrowser() {
  if (!projects.length) {
    const empty = document.createElement("p");
    empty.className = "project-browser-empty";
    empty.textContent = "Noch keine Projektordner. Legen Sie über das Aktionsmenü ein neues Projekt an.";
    projectBrowserList.replaceChildren(empty);
    return;
  }

  const cards = projects.map((project) => {
    const card = document.createElement("article");
    const expanded = expandedProjectIds.has(project.id);
    card.className = `project-card${project.id === activeProjectId ? " is-active" : ""}`;

    const row = document.createElement("div");
    row.className = "project-row";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "tree-toggle";
    toggle.textContent = expanded ? "▾" : "▸";
    toggle.setAttribute("aria-label", `${project.name} ${expanded ? "zuklappen" : "aufklappen"}`);
    toggle.addEventListener("click", () => {
      if (expanded) expandedProjectIds.delete(project.id);
      else expandedProjectIds.add(project.id);
      renderProjectBrowser();
    });

    const icon = document.createElement("span");
    icon.className = "folder-icon";
    icon.setAttribute("aria-hidden", "true");

    const main = document.createElement("button");
    main.type = "button";
    main.className = "project-main";
    const title = document.createElement("strong");
    title.textContent = project.name;
    main.append(title);
    main.addEventListener("click", () => selectProject(project.id));

    const displayToggle = document.createElement("input");
    displayToggle.type = "checkbox";
    displayToggle.className = "project-display-checkbox";
    displayToggle.checked = project.id === displayedProjectId;
    displayToggle.setAttribute("aria-label", `${project.name} im Kalender anzeigen`);
    displayToggle.title = "Projektinhalte im Kalender anzeigen";
    displayToggle.addEventListener("click", (event) => event.stopPropagation());
    displayToggle.addEventListener("change", () => {
      if (!displayToggle.checked && project.id === displayedProjectId) {
        displayToggle.checked = true;
        return;
      }
      setDisplayedProject(project.id);
    });

    row.append(toggle, icon, main, displayToggle);
    card.append(row);

    if (expanded) {
      const layers = document.createElement("div");
      layers.className = "layer-list";
      LAYER_TYPES.forEach((layer) => {
        const layerKey = `${project.id}:${layer.id}`;
        const isExpandable = expandableLayerIds.has(layer.id);
        const isLayerExpanded = isExpandable && expandedLayerKeys.has(layerKey);
        const layerShell = document.createElement("div");
        layerShell.className = "layer-tree-item";
        const layerHead = document.createElement("div");
        layerHead.className = "layer-tree-head";
        if (isExpandable) {
          const layerToggle = document.createElement("button");
          layerToggle.type = "button";
          layerToggle.className = "layer-tree-toggle";
          layerToggle.textContent = isLayerExpanded ? "−" : "+";
          layerToggle.setAttribute("aria-expanded", String(isLayerExpanded));
          layerToggle.setAttribute("aria-label", `${layer.title} ${isLayerExpanded ? "zuklappen" : "aufklappen"}`);
          layerToggle.addEventListener("click", () => toggleLayerExpanded(project.id, layer.id));
          layerHead.append(layerToggle);
        } else {
          const spacer = document.createElement("span");
          spacer.className = "layer-tree-spacer";
          spacer.setAttribute("aria-hidden", "true");
          layerHead.append(spacer);
        }
        const layerRow = document.createElement("button");
        layerRow.type = "button";
        layerRow.className = `layer-row${project.id === activeProjectId && layer.id === activeLayerType ? " is-active" : ""}`;
        layerRow.textContent = layer.title;
        layerRow.addEventListener("click", () => selectLayer(project.id, layer.id));
        layerHead.append(layerRow);
        layerShell.append(layerHead);
        if (isLayerExpanded && layer.id === "holidays") {
          ensureSchools(project).forEach((school) => {
            const schoolRow = document.createElement("button");
            schoolRow.type = "button";
            schoolRow.className = `schedule-tree-row${project.id === activeProjectId && school.id === activeSchoolId ? " is-active" : ""}`;
            schoolRow.textContent = school.name;
            schoolRow.addEventListener("click", () => selectSchool(project.id, school.id));
            layerShell.append(schoolRow);
          });
        }
        if (isLayerExpanded && layer.id === "schedules") {
          const scheduleLayer = getProjectLayer(project, "schedules");
          scheduleLayer.schedules = Array.isArray(scheduleLayer.schedules) ? scheduleLayer.schedules : [];
          scheduleLayer.schedules.forEach((schedule) => {
            const scheduleRow = document.createElement("button");
            scheduleRow.type = "button";
            scheduleRow.className = `schedule-tree-row${project.id === activeProjectId && schedule.id === activeScheduleId ? " is-active" : ""}`;
            scheduleRow.textContent = schedule.name;
            scheduleRow.addEventListener("click", () => selectSchedule(project.id, schedule.id));
            layerShell.append(scheduleRow);
          });
        }
        if (isLayerExpanded && (layer.id === "appointments" || layer.id === "individual")) {
          const appointmentLayer = getProjectLayer(project, layer.id);
          appointmentLayer.groups = Array.isArray(appointmentLayer.groups) ? appointmentLayer.groups : [];
          appointmentLayer.groups.forEach((group) => layerShell.append(createBrowserGroupRow(project, layer.id, group)));
        }
        layers.append(layerShell);
      });
      card.append(layers);
    }
    return card;
  });
  projectBrowserList.replaceChildren(...cards);
}

function renderProjectDetail() {
  const project = projects.find((entry) => entry.id === activeProjectId);
  if (!project) {
    detailPanelLabel.textContent = "Einstellungen";
    detailPanelTitle.textContent = "Stundenplan";
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Wählen Sie links einen Projektordner aus oder legen Sie ein neues Projekt an.";
    projectDetail.replaceChildren(empty);
    return;
  }

  if (activeLayerType === "holidays") {
    renderHolidayProperties(project);
    return;
  }

  if (activeLayerType === "individual") {
    renderIndividualProjectsProperties(project);
    return;
  }

  if (activeLayerType === "classes") {
    renderClassProjectsIntroduction(project);
    return;
  }

  if (activeLayerType === "appointments") {
    renderAppointmentsProperties(project);
    return;
  }

  if (activeLayerType === "sickness") {
    renderSicknessProperties(project);
    return;
  }

  if (activeLayerType === "classCatalog") {
    renderClassCatalogProperties(project);
    return;
  }

  if (activeLayerType === "schedules") {
    renderSchedulesProperties(project);
    return;
  }

  renderProjectSettings(project);
}

function createGradeLevelSelect(value, label) {
  const select = document.createElement("select");
  select.setAttribute("aria-label", label);
  for (let grade = 1; grade <= 13; grade += 1) {
    const option = document.createElement("option");
    option.value = String(grade);
    option.textContent = String(grade);
    option.selected = String(value || 1) === String(grade);
    select.append(option);
  }
  return select;
}

function renderHalfYearConfiguration(panel, halvesDraft, periodDefinitions = [
  ["first", "1. Halbjahr"],
  ["second", "2. Halbjahr"]
], customIntro = "") {
  const render = () => {
    panel.replaceChildren();
    const intro = document.createElement("p");
    intro.textContent = "Legen Sie die Grenzen beider Halbjahre und bei Bedarf Zensurenstopps für bestimmte Klassenstufen fest.";
    if (customIntro) intro.textContent = customIntro;
    panel.append(intro);

    periodDefinitions.forEach(([key, title]) => {
      const half = halvesDraft[key];
      half.gradingStops = Array.isArray(half.gradingStops) ? half.gradingStops : [];
      const section = document.createElement("section");
      section.className = "half-year-period";
      const heading = document.createElement("h4");
      heading.textContent = title;
      const range = document.createElement("div");
      range.className = "half-year-range";
      const startLabel = document.createElement("label");
      startLabel.textContent = "von";
      const start = document.createElement("input");
      start.type = "date";
      start.value = half.startDate || "";
      start.addEventListener("input", () => { half.startDate = start.value; });
      startLabel.append(start);
      const endLabel = document.createElement("label");
      endLabel.textContent = "bis";
      const end = document.createElement("input");
      end.type = "date";
      end.value = half.endDate || "";
      end.addEventListener("input", () => { half.endDate = end.value; });
      endLabel.append(end);
      range.append(startLabel, endLabel);

      const stopHeading = document.createElement("h5");
      stopHeading.className = "grading-stop-heading";
      stopHeading.textContent = "Zensurenstopp";
      const stopList = document.createElement("div");
      stopList.className = "grading-stop-list";
      half.gradingStops.forEach((stop, index) => {
        const row = document.createElement("div");
        row.className = "grading-stop-row";
        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Datum";
        const date = document.createElement("input");
        date.type = "date";
        date.value = stop.date || "";
        date.addEventListener("input", () => { stop.date = date.value; });
        dateLabel.append(date);
        const grades = document.createElement("div");
        grades.className = "grading-stop-grades";
        const fromLabel = document.createElement("label");
        fromLabel.textContent = "Klassenstufe von";
        const gradeFrom = createGradeLevelSelect(stop.gradeFrom, `Klassenstufe von für Zensurenstopp ${index + 1}`);
        gradeFrom.addEventListener("change", () => { stop.gradeFrom = Number(gradeFrom.value); });
        fromLabel.append(gradeFrom);
        const untilLabel = document.createElement("label");
        untilLabel.textContent = "bis";
        const gradeUntil = createGradeLevelSelect(stop.gradeUntil, `Klassenstufe bis für Zensurenstopp ${index + 1}`);
        gradeUntil.addEventListener("change", () => { stop.gradeUntil = Number(gradeUntil.value); });
        untilLabel.append(gradeUntil);
        grades.append(fromLabel, untilLabel);
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "display-row-delete grading-stop-delete";
        remove.textContent = "Löschen";
        remove.addEventListener("click", () => {
          half.gradingStops.splice(index, 1);
          render();
        });
        row.append(dateLabel, grades, remove);
        stopList.append(row);
      });

      const addStop = document.createElement("button");
      addStop.type = "button";
      addStop.className = "secondary-button grading-stop-add";
      addStop.textContent = "Zensurenstopp hinzufügen";
      addStop.addEventListener("click", () => {
        half.gradingStops.push({
          id: globalThis.crypto?.randomUUID?.() ?? `grading-stop-${Date.now()}-${half.gradingStops.length}`,
          date: "",
          gradeFrom: 1,
          gradeUntil: 13
        });
        render();
      });
      section.append(heading, range, stopHeading, stopList, addStop);
      panel.append(section);
    });
  };
  render();
}

function renderPeriodRanges(panel, draft, definitions, introText) {
  const intro = document.createElement("p");
  intro.textContent = introText;
  panel.append(intro);

  definitions.forEach(([key, title]) => {
    const period = draft[key];
    const section = document.createElement("section");
    section.className = "half-year-period";
    const heading = document.createElement("h4");
    heading.textContent = title;
    const range = document.createElement("div");
    range.className = "half-year-range";
    const startLabel = document.createElement("label");
    startLabel.textContent = "von";
    const start = document.createElement("input");
    start.type = "date";
    start.value = period.startDate;
    const syncStart = () => { period.startDate = start.value; };
    start.addEventListener("input", syncStart);
    start.addEventListener("change", syncStart);
    startLabel.append(start);
    const endLabel = document.createElement("label");
    endLabel.textContent = "bis";
    const end = document.createElement("input");
    end.type = "date";
    end.value = period.endDate;
    const syncEnd = () => { period.endDate = end.value; };
    end.addEventListener("input", syncEnd);
    end.addEventListener("change", syncEnd);
    endLabel.append(end);
    range.append(startLabel, endLabel);
    section.append(heading, range);
    panel.append(section);
  });
}

function getIsoWeekDetails(date) {
  const thursday = new Date(date);
  const weekday = thursday.getDay() || 7;
  thursday.setDate(thursday.getDate() + 4 - weekday);
  const isoYear = thursday.getFullYear();
  const yearStart = new Date(isoYear, 0, 1, 12);
  const week = Math.ceil((((thursday - yearStart) / 86400000) + 1) / 7);
  return { isoYear, week };
}

function getSchoolYearWeeks(startDate, endDate) {
  if (!startDate || !endDate || endDate < startDate) return [];
  const firstDate = new Date(`${startDate}T12:00:00`);
  const lastDate = new Date(`${endDate}T12:00:00`);
  const firstWeekday = firstDate.getDay() || 7;
  const monday = new Date(firstDate);
  monday.setDate(monday.getDate() - firstWeekday + 1);
  const weeks = [];
  while (monday <= lastDate) {
    const sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);
    const { isoYear, week } = getIsoWeekDetails(monday);
    weeks.push({
      key: `${isoYear}-W${String(week).padStart(2, "0")}`,
      isoYear,
      week,
      startDate: getLocalDateKey(monday),
      endDate: getLocalDateKey(sunday)
    });
    monday.setDate(monday.getDate() + 7);
  }
  return weeks;
}

function syncAlternatingWeekDraft(draft, startDate, endDate) {
  const existing = new Map((Array.isArray(draft.weeks) ? draft.weeks : []).map((week) => [week.key, week]));
  draft.weeks = getSchoolYearWeeks(startDate, endDate).map((week, index) => ({
    ...week,
    variant: existing.get(week.key)?.variant === "B" ? "B" : existing.get(week.key)?.variant === "A" ? "A" : index % 2 ? "B" : "A"
  }));
  if (draft.mode === "alternating" && draft.weeks.length) {
    const firstVariant = draft.weeks[0].variant;
    draft.weeks.forEach((week, index) => {
      week.variant = index % 2 ? (firstVariant === "A" ? "B" : "A") : firstVariant;
    });
  }
}

function renderAlternatingWeeksConfiguration(panel, draft, getSchoolYearRange) {
  const render = (listScrollTop = 0) => {
    const { startDate, endDate } = getSchoolYearRange();
    syncAlternatingWeekDraft(draft, startDate, endDate);
    panel.replaceChildren();

    const intro = document.createElement("p");
    intro.textContent = "Ordnen Sie den Kalenderwochen des Schuljahres eine A- oder B-Woche zu. Ferien unterbrechen den Wechsel nicht.";
    const modeGroup = document.createElement("div");
    modeGroup.className = "ab-week-mode";
    modeGroup.setAttribute("role", "group");
    modeGroup.setAttribute("aria-label", "Logik der A- und B-Wochen");
    [["alternating", "Abwechselnd"], ["individual", "Individuell"]].forEach(([mode, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.setAttribute("aria-pressed", String(draft.mode === mode));
      button.addEventListener("click", () => {
        if (draft.mode === mode) return;
        const currentScrollTop = panel.querySelector(".ab-week-list")?.scrollTop || 0;
        if (mode === "alternating" && draft.hasIndividualChanges) {
          const confirmed = globalThis.confirm("Beim Umschalten auf „Abwechselnd“ werden Ihre individuellen A/B-Einstellungen entfernt. Möchten Sie fortfahren?");
          if (!confirmed) return;
        }
        draft.mode = mode;
        if (mode === "alternating") draft.hasIndividualChanges = false;
        render(currentScrollTop);
      });
      modeGroup.append(button);
    });

    const modeHint = document.createElement("p");
    modeHint.className = "ab-week-mode-hint";
    modeHint.textContent = draft.mode === "alternating"
      ? "Eine Änderung setzt alle Kalenderwochen wieder in einen durchgängigen A/B-Wechsel."
      : "Jede Kalenderwoche kann unabhängig eingestellt werden.";
    const list = document.createElement("div");
    list.className = "ab-week-list";
    if (!draft.weeks.length) {
      const empty = document.createElement("p");
      empty.className = "ab-week-empty";
      empty.textContent = "Legen Sie zuerst gültige Schuljahresgrenzen fest.";
      list.append(empty);
    }
    draft.weeks.forEach((week, index) => {
      const row = document.createElement("div");
      row.className = "ab-week-row";
      const calendarWeek = document.createElement("strong");
      calendarWeek.textContent = `KW ${week.week}`;
      const dates = document.createElement("span");
      dates.textContent = `${formatGermanDate(week.startDate)}–${formatGermanDate(week.endDate)}`;
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "ab-week-toggle";
      toggle.setAttribute("role", "switch");
      toggle.setAttribute("aria-checked", String(week.variant === "B"));
      toggle.setAttribute("aria-label", `Kalenderwoche ${week.week}: ${week.variant}-Woche`);
      ["A", "B"].forEach((variant) => {
        const option = document.createElement("span");
        option.textContent = variant;
        option.classList.toggle("is-active", week.variant === variant);
        toggle.append(option);
      });
      toggle.addEventListener("click", () => {
        const currentScrollTop = list.scrollTop;
        const nextVariant = week.variant === "A" ? "B" : "A";
        if (draft.mode === "alternating") {
          draft.weeks.forEach((entry, entryIndex) => {
            const sameParity = Math.abs(entryIndex - index) % 2 === 0;
            entry.variant = sameParity ? nextVariant : (nextVariant === "A" ? "B" : "A");
          });
        } else {
          week.variant = nextVariant;
          draft.hasIndividualChanges = true;
        }
        render(currentScrollTop);
      });
      row.append(calendarWeek, dates, toggle);
      list.append(row);
    });
    panel.append(intro, modeGroup, modeHint, list);
    list.scrollTop = listScrollTop;
  };
  render();
  return {
    refresh: render,
    sync: () => {
      const { startDate, endDate } = getSchoolYearRange();
      syncAlternatingWeekDraft(draft, startDate, endDate);
    }
  };
}

function renderProjectFolderSettings(project) {
  detailPanelLabel.textContent = "Projektordner";
  detailPanelTitle.textContent = "Projekteinstellungen";
  const schools = ensureSchools(project);
  const automaticStarts = schools.map((school) => school.periods.schoolYear.startDate).filter(Boolean).sort();
  const automaticEnds = schools.map((school) => school.periods.schoolYear.endDate).filter(Boolean).sort();
  const range = getProjectCalendarRange(project);
  const sheet = document.createElement("section");
  sheet.className = "project-summary";
  const heading = document.createElement("h3");
  heading.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Die fachlichen Zeiträume werden bei den Schulen gepflegt. Hier bestimmen Sie nur den übergreifenden Kalenderrahmen des Projektordners.";
  const form = document.createElement("form");
  form.className = "property-section";
  const nameRow = document.createElement("label");
  nameRow.className = "property-row";
  nameRow.innerHTML = "<span>Projekttitel</span>";
  const name = document.createElement("input");
  name.required = true;
  name.maxLength = 100;
  name.value = project.name;
  nameRow.append(name);
  const rangeTitle = document.createElement("h3");
  rangeTitle.textContent = "Maximaler Kalenderzeitraum";
  const rangeNote = document.createElement("p");
  rangeNote.className = "project-period-intro";
  rangeNote.textContent = automaticStarts.length
    ? `Aus allen Schulen ermittelt: ${formatGermanDate(automaticStarts[0])}–${formatGermanDate(automaticEnds.at(-1))}. Die Grenzen können hier abweichend festgelegt werden.`
    : "Sobald Schulen angelegt sind, wird hier deren größtmögliche gemeinsame Zeitspanne vorgeschlagen.";
  const rangeRow = document.createElement("div");
  rangeRow.className = "property-row project-school-year-row";
  const rangeLabel = document.createElement("span");
  rangeLabel.textContent = "Kalenderrahmen";
  const rangeFields = document.createElement("div");
  rangeFields.className = "project-school-year-fields";
  const fromLabel = document.createElement("label");
  fromLabel.textContent = "von";
  const from = document.createElement("input");
  from.type = "date";
  from.required = true;
  from.value = range.startDate;
  fromLabel.append(from);
  const untilLabel = document.createElement("label");
  untilLabel.textContent = "bis";
  const until = document.createElement("input");
  until.type = "date";
  until.required = true;
  until.value = range.endDate;
  untilLabel.append(until);
  rangeFields.append(fromLabel, untilLabel);
  rangeRow.append(rangeLabel, rangeFields);
  const status = document.createElement("p");
  status.className = "property-status";
  let autosaveTimer = null;
  const saveProjectSettings = () => {
    if (!name.value.trim() || !from.value || !until.value || until.value < from.value) {
      status.className = "property-status is-error";
      status.textContent = "Bitte Projekttitel und Kalenderrahmen vollständig und gültig angeben.";
      return;
    }
    project.name = name.value.trim();
    project.calendarRange = { startDate: from.value, endDate: until.value, manuallyAdjusted: true };
    project.periods = project.periods || {};
    project.periods.schoolYear = { startDate: from.value, endDate: until.value, source: "project-calendar-range" };
    saveProjects();
    renderProjectBrowser();
    renderActiveCalendar(project);
    heading.textContent = project.name;
    status.className = "property-status is-success";
    status.textContent = "Automatisch gespeichert ✓";
  };
  const scheduleProjectAutosave = () => {
    clearTimeout(autosaveTimer);
    status.className = "property-status";
    status.textContent = "Wird gespeichert …";
    autosaveTimer = setTimeout(saveProjectSettings, 400);
  };
  form.addEventListener("input", scheduleProjectAutosave);
  form.addEventListener("change", scheduleProjectAutosave);
  form.addEventListener("submit", (event) => event.preventDefault());
  form.append(nameRow, rangeTitle, rangeNote, rangeRow, status);
  sheet.append(heading, intro, form);
  projectDetail.replaceChildren(sheet);
}

function renderProjectSettings(project) {
  renderProjectFolderSettings(project);
  return;
  detailPanelLabel.textContent = "Projektordner";
  detailPanelTitle.textContent = "Projekteinstellungen";

  const summary = document.createElement("section");
  summary.className = "project-summary";
  const titleLine = document.createElement("div");
  titleLine.className = "schedule-title-line";
  const title = document.createElement("h3");
  title.textContent = project.name;

  const menuShell = document.createElement("div");
  menuShell.className = "schedule-menu-shell";
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "schedule-menu-button";
  menuButton.setAttribute("aria-label", `Menü für ${project.name}`);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "schedule-menu-delete";
  deleteButton.textContent = "Löschen";
  deleteButton.dataset.projectId = project.id;
  deleteButton.dataset.projectFolderId = project.id;
  deleteButton.setAttribute("aria-label", `${project.name} löschen – gedrückt halten`);
  deleteButton.addEventListener("pointerdown", beginScheduleDeleteHold);
  deleteButton.addEventListener("pointerup", finishScheduleDeleteHold);
  deleteButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
  deleteButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
  menuButton.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(deleteButton);
  menuShell.append(menuButton, menu);
  titleLine.append(title, menuShell);

  const note = document.createElement("p");
  note.textContent = "Hier ändern Sie die grundlegenden Einstellungen dieses Projektordners.";
  const form = document.createElement("form");
  form.className = "property-section";
  const nameRow = document.createElement("label");
  nameRow.className = "property-row";
  const nameLabel = document.createElement("span");
  nameLabel.textContent = "Projekttitel";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.maxLength = 100;
  nameInput.required = true;
  nameInput.value = project.name;
  nameRow.append(nameLabel, nameInput);

  const periodSettings = ensureProjectPeriodSettings(project);
  const storedHalves = periodSettings.models.halves || {};
  const normalizeHalf = (value = {}) => ({
    startDate: value.startDate || "",
    endDate: value.endDate || "",
    gradingStops: (Array.isArray(value.gradingStops) ? value.gradingStops : []).map((stop) => ({
      id: stop.id || globalThis.crypto?.randomUUID?.() || `grading-stop-${Date.now()}`,
      date: stop.date || "",
      gradeFrom: Number(stop.gradeFrom) || 1,
      gradeUntil: Number(stop.gradeUntil ?? stop.gradeTo) || 13
    }))
  });
  const halvesDraft = {
    first: normalizeHalf(storedHalves.first),
    second: normalizeHalf(storedHalves.second)
  };
  const normalizePeriod = (value = {}) => ({
    startDate: value.startDate || "",
    endDate: value.endDate || ""
  });
  const storedSemesters = periodSettings.models.semesters || {};
  const semestersDraft = {
    first: normalizePeriod(storedSemesters.first),
    second: normalizePeriod(storedSemesters.second)
  };
  const storedTrimesters = periodSettings.models.trimesters || {};
  const trimestersDraft = {
    first: normalizePeriod(storedTrimesters.first),
    second: normalizePeriod(storedTrimesters.second),
    third: normalizePeriod(storedTrimesters.third)
  };
  const storedAlternatingWeeks = periodSettings.models.alternatingWeeks || {};
  const alternatingWeeksDraft = {
    mode: storedAlternatingWeeks.mode === "individual" ? "individual" : "alternating",
    hasIndividualChanges: Boolean(storedAlternatingWeeks.hasIndividualChanges),
    weeks: (Array.isArray(storedAlternatingWeeks.weeks) ? storedAlternatingWeeks.weeks : []).map((week) => ({
      key: week.key,
      isoYear: Number(week.isoYear),
      week: Number(week.week),
      startDate: week.startDate,
      endDate: week.endDate,
      variant: week.variant === "B" ? "B" : "A"
    }))
  };
  const periodsSection = document.createElement("section");
  periodsSection.className = "property-section project-period-section";
  const periodsTitle = document.createElement("h3");
  periodsTitle.textContent = "Zeiträume";
  const periodsIntro = document.createElement("p");
  periodsIntro.className = "project-period-intro";
  periodsIntro.textContent = "Das Schuljahr bildet den übergeordneten Zeitraum für Stundenpläne und spätere zeitliche Unterteilungen.";
  const schoolYearRow = document.createElement("div");
  schoolYearRow.className = "property-row project-school-year-row";
  const schoolYearLabel = document.createElement("span");
  schoolYearLabel.textContent = "Schuljahr";
  const schoolYearFields = document.createElement("div");
  schoolYearFields.className = "project-school-year-fields";
  const startLabel = document.createElement("label");
  startLabel.textContent = "Beginn";
  const schoolYearStart = document.createElement("input");
  schoolYearStart.type = "date";
  schoolYearStart.required = true;
  schoolYearStart.value = periodSettings.schoolYear.startDate;
  startLabel.append(schoolYearStart);
  const endLabel = document.createElement("label");
  endLabel.textContent = "Ende";
  const schoolYearEnd = document.createElement("input");
  schoolYearEnd.type = "date";
  schoolYearEnd.required = true;
  schoolYearEnd.value = periodSettings.schoolYear.endDate;
  endLabel.append(schoolYearEnd);
  schoolYearFields.append(startLabel, endLabel);
  schoolYearRow.append(schoolYearLabel, schoolYearFields);

  const periodTabs = document.createElement("div");
  periodTabs.className = "project-period-tabs";
  periodTabs.setAttribute("role", "tablist");
  periodTabs.setAttribute("aria-label", "Unterteilung des Schuljahres");
  const periodPanels = document.createElement("div");
  periodPanels.className = "project-period-panels";
  const tabDefinitions = [
    ["halves", "Halbjahre", "Die Grenzen der beiden Schulhalbjahre werden hier im nächsten Schritt festgelegt."],
    ["semesters", "Semester", "Legen Sie Beginn und Ende des ersten und zweiten Semesters fest."],
    ["trimesters", "Trimester", "Legen Sie Beginn und Ende der drei Trimester fest."],
    ["alternatingWeeks", "A/B-Woche", "Der Wechsel zwischen A- und B-Wochen wird hier im nächsten Schritt konfiguriert."]
  ];
  let alternatingWeeksController = null;
  const selectPeriodTab = (tabId) => {
    periodSettings.activeTab = tabId;
    [...periodTabs.children].forEach((button) => {
      button.setAttribute("aria-selected", String(button.dataset.periodTab === tabId));
    });
    [...periodPanels.children].forEach((panel) => {
      panel.hidden = panel.dataset.periodPanel !== tabId;
    });
  };
  tabDefinitions.forEach(([id, label, description]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.periodTab = id;
    button.setAttribute("role", "tab");
    button.textContent = label;
    button.addEventListener("click", () => {
      selectPeriodTab(id);
      saveProjects();
    });
    const panel = document.createElement("section");
    panel.className = "project-period-panel";
    panel.dataset.periodPanel = id;
    panel.setAttribute("role", "tabpanel");
    if (id === "halves") renderHalfYearConfiguration(panel, halvesDraft);
    else if (id === "semesters") {
      renderPeriodRanges(panel, semestersDraft, [
        ["first", "Erstes Semester"],
        ["second", "Zweites Semester"]
      ], description);
    } else if (id === "trimesters") {
      renderPeriodRanges(panel, trimestersDraft, [
        ["first", "Erstes Trimester"],
        ["second", "Zweites Trimester"],
        ["third", "Drittes Trimester"]
      ], description);
    } else if (id === "alternatingWeeks") {
      alternatingWeeksController = renderAlternatingWeeksConfiguration(panel, alternatingWeeksDraft, () => ({
        startDate: schoolYearStart.value,
        endDate: schoolYearEnd.value
      }));
    } else {
      const panelText = document.createElement("p");
      panelText.textContent = description;
      panel.append(panelText);
    }
    periodTabs.append(button);
    periodPanels.append(panel);
  });
  schoolYearStart.addEventListener("input", () => alternatingWeeksController?.refresh());
  schoolYearEnd.addEventListener("input", () => alternatingWeeksController?.refresh());
  selectPeriodTab(periodSettings.activeTab);
  periodsSection.append(periodsTitle, periodsIntro, schoolYearRow, periodTabs, periodPanels);

  const status = document.createElement("p");
  status.className = "property-status";
  status.setAttribute("role", "status");
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "secondary-button primary-action holiday-load-button";
  saveButton.textContent = "Änderungen speichern";
  const markSettingsDirty = () => {
    saveButton.classList.remove("is-save-success", "is-save-error");
    saveButton.textContent = "Änderungen speichern";
    if (status.classList.contains("is-success")) {
      status.className = "property-status";
      status.textContent = "Nicht gespeicherte Änderungen.";
    }
  };
  form.addEventListener("input", markSettingsDirty);
  form.addEventListener("change", markSettingsDirty);
  const showSaveError = (message, tabId = null, focusTarget = null) => {
    if (tabId) selectPeriodTab(tabId);
    status.className = "property-status is-error";
    status.textContent = message;
    saveButton.classList.remove("is-save-success");
    saveButton.classList.add("is-save-error");
    saveButton.textContent = "Bitte Angaben prüfen";
    focusTarget?.focus();
    status.scrollIntoView({ block: "nearest" });
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveButton.classList.remove("is-save-success", "is-save-error");
    saveButton.textContent = "Änderungen speichern";
    const nextName = nameInput.value.trim();
    if (!nextName) {
      showSaveError("Bitte einen Projekttitel eingeben.", null, nameInput);
      return;
    }
    if (!schoolYearStart.value || !schoolYearEnd.value || schoolYearEnd.value < schoolYearStart.value) {
      showSaveError("Bitte einen gültigen Zeitraum für das Schuljahr festlegen.", null, schoolYearStart);
      return;
    }
    for (const [label, half] of [["1. Halbjahr", halvesDraft.first], ["2. Halbjahr", halvesDraft.second]]) {
      const hasPartialRange = Boolean(half.startDate) !== Boolean(half.endDate);
      if (hasPartialRange || (half.startDate && half.endDate < half.startDate)) {
        showSaveError(`Bitte für das ${label} einen gültigen Zeitraum von bis eintragen.`, "halves");
        return;
      }
      const invalidStop = half.gradingStops.find((stop) => (
        !stop.date || Number(stop.gradeFrom) > Number(stop.gradeUntil)
      ));
      if (invalidStop) {
        showSaveError(`Bitte die Zensurenstopps im ${label} vollständig und mit aufsteigenden Klassenstufen eintragen.`, "halves");
        return;
      }
    }
    for (const [label, period, tabId] of [
      ["das erste Semester", semestersDraft.first, "semesters"],
      ["das zweite Semester", semestersDraft.second, "semesters"],
      ["das erste Trimester", trimestersDraft.first, "trimesters"],
      ["das zweite Trimester", trimestersDraft.second, "trimesters"],
      ["das dritte Trimester", trimestersDraft.third, "trimesters"]
    ]) {
      const hasPartialRange = Boolean(period.startDate) !== Boolean(period.endDate);
      if (hasPartialRange || (period.startDate && period.endDate < period.startDate)) {
        showSaveError(`Bitte für ${label} einen gültigen Zeitraum von bis eintragen.`, tabId);
        return;
      }
    }
    project.name = nextName;
    project.periods.schoolYear = {
      startDate: schoolYearStart.value,
      endDate: schoolYearEnd.value,
      source: "project-settings"
    };
    project.periods.models.halves = structuredClone(halvesDraft);
    project.periods.models.semesters = structuredClone(semestersDraft);
    project.periods.models.trimesters = structuredClone(trimestersDraft);
    alternatingWeeksController?.sync();
    project.periods.models.alternatingWeeks = structuredClone(alternatingWeeksDraft);
    syncScheduleValidityPeriods(project);
    saveProjects();
    renderProjectBrowser();
    renderActiveCalendar();
    title.textContent = project.name;
    status.className = "property-status is-success";
    status.textContent = "Änderungen gespeichert. Die Zeiträume stehen jetzt auch im Ferienbereich zur Verfügung.";
    saveButton.classList.add("is-save-success");
    saveButton.textContent = "Gespeichert ✓";
  });
  form.append(nameRow, periodsSection, status, saveButton);
  summary.append(titleLine, note, form);
  projectDetail.replaceChildren(summary);
  saveProjects();
}

function openLegacyClassProjectDialog(project, classInfo, entry = null) {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog class-project-dialog";
  if (entry?.id) dialog.dataset.classProjectId = entry.id;
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  const label = document.createElement("span");
  label.className = "label";
  label.textContent = `Projekttage · ${classInfo.name}`;
  const title = document.createElement("h2");
  title.textContent = entry ? "Projekt bearbeiten" : "Projekt hinzufügen";
  heading.append(label, title);

  const fields = document.createElement("div");
  fields.className = "class-trip-dialog-grid";
  const nameLabel = document.createElement("label");
  nameLabel.className = "dialog-field";
  nameLabel.innerHTML = "<span>Titel</span>";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.maxLength = 100;
  nameInput.required = true;
  nameInput.placeholder = "z. B. Projekttag";
  nameInput.value = entry?.name || "";
  nameLabel.append(nameInput);

  const dateFields = document.createElement("div");
  dateFields.className = "class-trip-date-fields";
  const startLabel = document.createElement("label");
  startLabel.className = "dialog-field";
  startLabel.innerHTML = "<span>Datum von</span>";
  const startInput = document.createElement("input");
  startInput.type = "date";
  startInput.required = true;
  startInput.value = entry?.startDate || entry?.date || "";
  startLabel.append(startInput);
  const endLabel = document.createElement("label");
  endLabel.className = "dialog-field";
  endLabel.innerHTML = "<span>bis</span>";
  const endInput = document.createElement("input");
  endInput.type = "date";
  endInput.required = true;
  endInput.value = entry?.endDate || entry?.date || "";
  endLabel.append(endInput);
  dateFields.append(startLabel, endLabel);

  let isAllDay = entry
    ? (typeof entry.allDay === "boolean" ? entry.allDay : !(entry.startTime && entry.endTime))
    : true;
  const durationField = document.createElement("fieldset");
  durationField.className = "class-project-dialog-duration";
  const durationLegend = document.createElement("legend");
  durationLegend.textContent = "Dauer";
  const durationChoice = document.createElement("div");
  durationChoice.className = "lesson-form-choice";
  const timeFields = document.createElement("div");
  timeFields.className = "event-time-fields";
  timeFields.hidden = isAllDay;
  [["true", "Ganztägig"], ["false", "Nicht ganztägig"]].forEach(([value, text]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    button.setAttribute("aria-pressed", String(isAllDay === (value === "true")));
    button.addEventListener("click", () => {
      isAllDay = value === "true";
      [...durationChoice.querySelectorAll("button")].forEach((choice) => {
        choice.setAttribute("aria-pressed", String(choice === button));
      });
      timeFields.hidden = isAllDay;
      timeStart.required = !isAllDay;
      timeEnd.required = !isAllDay;
    });
    durationChoice.append(button);
  });
  durationField.append(durationLegend, durationChoice);

  const timeStartLabel = document.createElement("label");
  timeStartLabel.className = "dialog-field";
  timeStartLabel.innerHTML = "<span>Zeit von</span>";
  const timeStart = document.createElement("input");
  timeStart.type = "time";
  timeStart.step = "60";
  timeStart.required = !isAllDay;
  timeStart.value = entry?.startTime || "";
  timeStartLabel.append(timeStart);
  const timeEndLabel = document.createElement("label");
  timeEndLabel.className = "dialog-field";
  timeEndLabel.innerHTML = "<span>bis</span>";
  const timeEnd = document.createElement("input");
  timeEnd.type = "time";
  timeEnd.step = "60";
  timeEnd.required = !isAllDay;
  timeEnd.value = entry?.endTime || "";
  timeEndLabel.append(timeEnd);
  timeFields.append(timeStartLabel, timeEndLabel);
  fields.append(nameLabel, dateFields, durationField, timeFields);

  const status = document.createElement("p");
  status.className = "property-status";
  status.setAttribute("role", "status");
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  if (entry) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "secondary-button lesson-delete-button class-project-dialog-delete";
    deleteButton.textContent = "Projekt löschen";
    deleteButton.dataset.projectId = project.id;
    deleteButton.dataset.classProjectId = entry.id;
    deleteButton.title = "Zum Löschen gedrückt halten";
    deleteButton.addEventListener("pointerdown", beginScheduleDeleteHold);
    deleteButton.addEventListener("pointerup", finishScheduleDeleteHold);
    deleteButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
    deleteButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
    actions.append(deleteButton);
  }
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "secondary-button";
  cancel.textContent = "Abbrechen";
  cancel.addEventListener("click", () => dialog.close());
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "secondary-button primary-action";
  submit.textContent = entry ? "Änderungen speichern" : "Projekt hinzufügen";
  actions.append(cancel, submit);
  form.append(heading, fields, status, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (endInput.value < startInput.value) {
      status.textContent = "Das Enddatum darf nicht vor dem Anfangsdatum liegen.";
      return;
    }
    if (!isAllDay && timeEnd.value <= timeStart.value) {
      status.textContent = "Das Ende muss nach dem Beginn liegen.";
      return;
    }
    const layer = getProjectLayer(project, "classes");
    layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
    const values = {
      type: "class-project",
      name: nameInput.value.trim(),
      schoolId: classInfo.schoolId,
      className: classInfo.name,
      classIds: [...classInfo.classIds],
      startDate: startInput.value,
      endDate: endInput.value,
      allDay: isAllDay,
      startTime: isAllDay ? "" : timeStart.value,
      endTime: isAllDay ? "" : timeEnd.value,
      color: "#e6d8a8"
    };
    if (entry) Object.assign(entry, values);
    else layer.entries.push({
      id: globalThis.crypto?.randomUUID?.() ?? `class-project-${Date.now()}`,
      ...values
    });
    saveProjects();
    dialog.close();
    renderClassProjectsIntroduction(project);
    renderActiveCalendar(project);
  });
  dialog.showModal();
  nameInput.focus();
}

function renderLegacyClassProjectsIntroduction(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Projekttage nach Klassen";
  const layer = getProjectLayer(project, "classes");
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const catalog = getProjectLayer(project, "classCatalog");
  const classesByName = new Map();
  (Array.isArray(catalog.subjects) ? catalog.subjects : []).forEach((subject) => {
    (Array.isArray(subject?.grades) ? subject.grades : []).forEach((grade) => {
      (Array.isArray(grade?.classes) ? grade.classes : []).forEach((classEntry) => {
        const name = String(classEntry?.name || "").trim();
        if (!name) return;
        const schoolId = subject.schoolId || "";
        const classKey = name.toLocaleLowerCase("de");
        const key = `${schoolId}|${classKey}`;
        const item = classesByName.get(key) || {
          key: classKey,
          name,
          schoolId,
          schoolName: getSchool(project, schoolId)?.name || "Schule",
          classIds: [],
          subjects: []
        };
        if (classEntry.id && !item.classIds.includes(classEntry.id)) item.classIds.push(classEntry.id);
        if (subject?.name && !item.subjects.includes(subject.name)) item.subjects.push(subject.name);
        classesByName.set(key, item);
      });
    });
  });
  const configuredClasses = [...classesByName.values()]
    .sort((a, b) => a.name.localeCompare(b.name, "de", { numeric: true, sensitivity: "base" }));

  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Hier werden Abwesenheiten erfasst, die nur einzelne Klassen betreffen.";
  head.append(title, intro);

  const section = document.createElement("section");
  section.className = "property-section";
  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = "Klassenbezogene Unterrichtsausfälle";
  const explanation = document.createElement("p");
  explanation.textContent = "Einzelne Klassen haben zeitweise keinen regulären Unterricht, etwa weil sie ohne Ihre Begleitung auf Klassenfahrt sind oder an einem anderen schulischen Projekt teilnehmen.";
  const effect = document.createElement("p");
  effect.textContent = "Für den eingetragenen Zeitraum entfernt der Kalender ausschließlich die Unterrichtsstunden der betroffenen Klasse. Der Unterricht aller anderen Klassen bleibt unverändert sichtbar.";
  section.append(sectionTitle, explanation, effect);

  const classList = document.createElement("div");
  classList.className = "class-project-class-list";
  if (!configuredClasses.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.append("Es sind noch keine Klassen eingerichtet. Legen Sie diese zunächst unter ");
    const link = document.createElement("button");
    link.type = "button";
    link.className = "schedule-setup-link";
    link.textContent = "Klassen";
    link.addEventListener("click", () => selectLayer(project.id, "classCatalog"));
    empty.append(link, " an.");
    classList.append(empty);
  } else {
    configuredClasses.forEach((classInfo) => {
      const classCard = document.createElement("section");
      classCard.className = "class-project-class-card";
      const classHead = document.createElement("div");
      classHead.className = "class-project-class-head";
      const classHeading = document.createElement("div");
      const classTitle = document.createElement("h3");
      classTitle.textContent = classInfo.name;
      const classMeta = document.createElement("span");
      classMeta.textContent = `${classInfo.schoolName} · ${classInfo.subjects.join(" · ")}`;
      classHeading.append(classTitle, classMeta);
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.className = "secondary-button";
      addButton.textContent = "Projekt hinzufügen";
      addButton.addEventListener("click", () => openClassProjectDialog(project, classInfo));
      classHead.append(classHeading, addButton);

      const entries = layer.entries.filter((entry) => {
        if (!entry || typeof entry !== "object") return false;
        if (entry.schoolId && entry.schoolId !== classInfo.schoolId) return false;
        const entryName = String(entry.className || entry.class || "").trim().toLocaleLowerCase("de");
        return entryName === classInfo.key
          || (Array.isArray(entry.classIds) && entry.classIds.some((id) => classInfo.classIds.includes(id)));
      });
      const projectList = document.createElement("div");
      projectList.className = "class-project-entry-list";
      entries.forEach((entry) => {
        entry.className = classInfo.name;
        entry.classIds = [...classInfo.classIds];
        entry.allDay = typeof entry.allDay === "boolean" ? entry.allDay : !(entry.startTime && entry.endTime);
        const projectRow = document.createElement("button");
        projectRow.type = "button";
        projectRow.className = "holiday-entry class-project-summary";
        projectRow.dataset.classProjectId = entry.id;
        projectRow.setAttribute("aria-label", `${entry.name || "Projekt"} bearbeiten`);
        const projectTitle = document.createElement("strong");
        projectTitle.textContent = entry.name || "Projekt";
        const projectDates = document.createElement("span");
        const startDate = entry.startDate || entry.date;
        const endDate = entry.endDate || entry.date;
        const dateText = !startDate || !endDate
          ? "Datum noch nicht vollständig"
          : startDate === endDate
            ? formatGermanDate(startDate)
            : `${formatGermanDate(startDate)}–${formatGermanDate(endDate)}`;
        const projectTime = document.createElement("span");
        projectTime.textContent = entry.allDay
          ? "ganztägig"
          : `${entry.startTime || "–"}–${entry.endTime || "–"}`;
        projectDates.textContent = dateText;
        projectRow.addEventListener("click", () => openClassProjectDialog(project, classInfo, entry));
        projectRow.append(projectTitle, projectDates, projectTime);
        projectList.append(projectRow);
      });
      if (!entries.length) {
        const empty = document.createElement("p");
        empty.className = "class-project-empty";
        empty.textContent = "Noch keine Projekte eingetragen.";
        projectList.append(empty);
      }
      classCard.append(classHead, projectList);
      classList.append(classCard);
    });
  }

  section.append(classList);
  sheet.append(head, section);
  projectDetail.replaceChildren(sheet);
  saveProjects();
}

function getConfiguredClassGroups(project) {
  const catalog = getProjectLayer(project, "classCatalog");
  const groups = new Map();
  (catalog.subjects || []).forEach((subject) => {
    (subject.grades || []).forEach((grade) => {
      (grade.classes || []).forEach((classEntry) => {
        const name = String(classEntry.name || "").trim();
        if (!name) return;
        const schoolId = subject.schoolId || "";
        const key = `${schoolId}|${name.toLocaleLowerCase("de")}`;
        const group = groups.get(key) || {
          key,
          name,
          schoolId,
          schoolName: getSchool(project, schoolId)?.name || "Schule",
          classIds: [],
          subjects: []
        };
        if (classEntry.id && !group.classIds.includes(classEntry.id)) group.classIds.push(classEntry.id);
        if (subject.name && !group.subjects.includes(subject.name)) group.subjects.push(subject.name);
        groups.set(key, group);
      });
    });
  });
  return [...groups.values()].sort((a, b) => (
    a.schoolName.localeCompare(b.schoolName, "de", { sensitivity: "base" })
    || a.name.localeCompare(b.name, "de", { numeric: true, sensitivity: "base" })
  ));
}

function openClassProjectDialog(project, entry = null) {
  const classGroups = getConfiguredClassGroups(project);
  if (!classGroups.length) return;
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog class-project-dialog";
  if (entry?.id) dialog.dataset.classProjectId = entry.id;
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  heading.innerHTML = `<span class="label">Projekttage nach Klassen</span><h2>${entry ? "Projekt bearbeiten" : "Projekt hinzufügen"}</h2>`;
  const fields = document.createElement("div");
  fields.className = "class-trip-dialog-grid";
  const makeField = (text, control) => {
    const label = document.createElement("label"); label.className = "dialog-field";
    const span = document.createElement("span"); span.textContent = text;
    label.append(span, control); return label;
  };
  const name = document.createElement("input"); name.type = "text"; name.required = true; name.maxLength = 100;
  name.placeholder = "z. B. Projekttag"; name.value = entry?.name || "";
  const dates = document.createElement("div"); dates.className = "class-trip-date-fields";
  const start = document.createElement("input"); start.type = "date"; start.required = true; start.value = entry?.startDate || entry?.date || "";
  const end = document.createElement("input"); end.type = "date"; end.required = true; end.value = entry?.endDate || entry?.date || "";
  dates.append(makeField("Datum von", start), makeField("bis", end));

  const selectedKeys = entry?.classGroups?.map((group) => group.key)
    || classGroups.filter((group) => (entry?.classIds || []).some((id) => group.classIds.includes(id))).map((group) => group.key);
  if (!selectedKeys.length) selectedKeys.push(classGroups[0].key);
  const classSection = document.createElement("fieldset"); classSection.className = "class-project-class-picker";
  const classLegend = document.createElement("legend"); classLegend.textContent = "Beteiligte Klassen";
  const classRows = document.createElement("div"); classRows.className = "class-project-class-picker-list";
  const renderClassRows = () => {
    classRows.replaceChildren();
    selectedKeys.forEach((selectedKey, index) => {
      const row = document.createElement("div"); row.className = "class-project-class-picker-row";
      const select = document.createElement("select"); select.setAttribute("aria-label", `Klasse ${index + 1}`);
      classGroups
        .filter((group) => group.key === selectedKey || !selectedKeys.includes(group.key))
        .forEach((group) => {
          const option = new Option(`${group.schoolName} · ${group.name}`, group.key, false, group.key === selectedKey);
          select.add(option);
        });
      select.addEventListener("change", () => { selectedKeys[index] = select.value; renderClassRows(); });
      const remove = document.createElement("button"); remove.type = "button"; remove.className = "display-row-delete"; remove.textContent = "Entfernen";
      remove.disabled = selectedKeys.length === 1;
      remove.addEventListener("click", () => { selectedKeys.splice(index, 1); renderClassRows(); addClass.disabled = false; });
      row.append(select, remove); classRows.append(row);
    });
  };
  renderClassRows();
  const addClass = document.createElement("button"); addClass.type = "button"; addClass.className = "secondary-button"; addClass.textContent = "Weitere Klasse auswählen";
  addClass.disabled = selectedKeys.length >= classGroups.length;
  addClass.addEventListener("click", () => {
    const next = classGroups.find((group) => !selectedKeys.includes(group.key));
    if (!next) return;
    selectedKeys.push(next.key); renderClassRows(); addClass.disabled = selectedKeys.length >= classGroups.length;
  });
  classSection.append(classLegend, classRows, addClass);

  let allDay = entry ? (typeof entry.allDay === "boolean" ? entry.allDay : !(entry.startTime && entry.endTime)) : true;
  const duration = document.createElement("fieldset"); duration.className = "class-project-dialog-duration";
  const durationLegend = document.createElement("legend"); durationLegend.textContent = "Dauer";
  const durationChoice = document.createElement("div"); durationChoice.className = "lesson-form-choice";
  const times = document.createElement("div"); times.className = "event-time-fields"; times.hidden = allDay;
  const timeStart = document.createElement("input"); timeStart.type = "time"; timeStart.step = "60"; timeStart.value = entry?.startTime || "";
  const timeEnd = document.createElement("input"); timeEnd.type = "time"; timeEnd.step = "60"; timeEnd.value = entry?.endTime || "";
  [[true, "Ganztägig"], [false, "Nicht ganztägig"]].forEach(([value, text]) => {
    const button = document.createElement("button"); button.type = "button"; button.textContent = text;
    button.setAttribute("aria-pressed", String(allDay === value));
    button.addEventListener("click", () => {
      allDay = value;
      [...durationChoice.children].forEach((choice) => choice.setAttribute("aria-pressed", String(choice === button)));
      times.hidden = allDay; timeStart.required = !allDay; timeEnd.required = !allDay;
    });
    durationChoice.append(button);
  });
  duration.append(durationLegend, durationChoice);
  times.append(makeField("Zeit von", timeStart), makeField("bis", timeEnd));
  fields.append(makeField("Titel", name), dates, classSection, duration, times);

  const status = document.createElement("p"); status.className = "property-status";
  const actions = document.createElement("div"); actions.className = "dialog-actions";
  if (entry) {
    const remove = document.createElement("button"); remove.type = "button"; remove.className = "secondary-button lesson-delete-button class-project-dialog-delete";
    remove.textContent = "Projekt löschen"; remove.title = "Zum Löschen gedrückt halten";
    remove.dataset.projectId = project.id; remove.dataset.classProjectId = entry.id;
    remove.addEventListener("pointerdown", beginScheduleDeleteHold); remove.addEventListener("pointerup", finishScheduleDeleteHold);
    remove.addEventListener("pointercancel", cancelScheduleDeleteHold); remove.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
    actions.append(remove);
  }
  const cancel = document.createElement("button"); cancel.type = "button"; cancel.className = "secondary-button"; cancel.textContent = "Abbrechen"; cancel.addEventListener("click", () => dialog.close());
  const submit = document.createElement("button"); submit.type = "submit"; submit.className = "secondary-button primary-action";
  submit.textContent = entry ? "Änderungen speichern" : "Projekt hinzufügen";
  actions.append(cancel, submit); form.append(heading, fields, status, actions); dialog.append(form); document.body.append(dialog);
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (end.value < start.value || (!allDay && timeEnd.value <= timeStart.value)) {
      status.textContent = end.value < start.value ? "Das Enddatum darf nicht vor dem Anfangsdatum liegen." : "Das Ende muss nach dem Beginn liegen.";
      return;
    }
    const chosenGroups = selectedKeys.map((key) => classGroups.find((group) => group.key === key)).filter(Boolean);
    const values = {
      type: "class-project", name: name.value.trim(),
      classGroups: chosenGroups.map((group) => ({ key: group.key, schoolId: group.schoolId, schoolName: group.schoolName, className: group.name, classIds: [...group.classIds] })),
      classIds: [...new Set(chosenGroups.flatMap((group) => group.classIds))],
      classNames: chosenGroups.map((group) => group.name),
      schoolIds: [...new Set(chosenGroups.map((group) => group.schoolId).filter(Boolean))],
      startDate: start.value, endDate: end.value, allDay,
      startTime: allDay ? "" : timeStart.value, endTime: allDay ? "" : timeEnd.value,
      color: "#e6d8a8"
    };
    const layer = getProjectLayer(project, "classes"); layer.entries = layer.entries || [];
    if (entry) Object.assign(entry, values); else layer.entries.push({ id: globalThis.crypto?.randomUUID?.() ?? `class-project-${Date.now()}`, ...values });
    saveProjects(); dialog.close(); renderClassProjectsIntroduction(project); renderActiveCalendar(project);
  });
  dialog.showModal(); name.focus();
}

function renderClassProjectsIntroduction(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Projekttage nach Klassen";
  const layer = getProjectLayer(project, "classes"); layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const classGroups = getConfiguredClassGroups(project);
  const sheet = document.createElement("section"); sheet.className = "property-sheet";
  const head = document.createElement("div"); head.className = "property-sheet-head";
  const title = document.createElement("h3"); title.textContent = project.name;
  const intro = document.createElement("p"); intro.textContent = "Legen Sie ein Projekt einmal an und ordnen Sie ihm alle beteiligten Klassen zu. Deren Unterricht wird im gewählten Zeitraum ausgeblendet.";
  head.append(title, intro);
  const section = document.createElement("section"); section.className = "property-section";
  const add = document.createElement("button"); add.type = "button"; add.className = "secondary-button primary-action"; add.textContent = "Projekt hinzufügen";
  add.disabled = !classGroups.length; add.addEventListener("click", () => openClassProjectDialog(project));
  const list = document.createElement("div"); list.className = "class-project-entry-list class-project-overview-list";
  layer.entries.forEach((entry) => {
    const selectedGroups = entry.classGroups?.length
      ? entry.classGroups
      : classGroups.filter((group) => (entry.classIds || []).some((id) => group.classIds.includes(id)));
    entry.classGroups = selectedGroups.map((group) => ({
      key: group.key,
      schoolId: group.schoolId,
      schoolName: group.schoolName || getSchool(project, group.schoolId)?.name || "Schule",
      className: group.className || group.name,
      classIds: [...group.classIds]
    }));
    entry.classIds = [...new Set(entry.classGroups.flatMap((group) => group.classIds))];
    entry.schoolIds = [...new Set(entry.classGroups.map((group) => group.schoolId).filter(Boolean))];
    const row = document.createElement("button"); row.type = "button"; row.className = "holiday-entry class-project-summary class-project-overview-row";
    const name = document.createElement("strong"); name.textContent = entry.name || "Projekt";
    const classes = document.createElement("span");
    classes.textContent = entry.classGroups.map((group) => `${group.schoolName} · ${group.className}`).join(", ") || "Keine Klasse";
    const dates = document.createElement("span");
    dates.textContent = !entry.startDate || !entry.endDate
      ? "Datum noch nicht vollständig"
      : entry.startDate === entry.endDate ? formatGermanDate(entry.startDate) : `${formatGermanDate(entry.startDate)}–${formatGermanDate(entry.endDate)}`;
    const time = document.createElement("span"); time.textContent = entry.allDay !== false ? "ganztägig" : `${entry.startTime || "–"}–${entry.endTime || "–"}`;
    row.append(name, classes, dates, time); row.addEventListener("click", () => openClassProjectDialog(project, entry)); list.append(row);
  });
  if (!classGroups.length) {
    const empty = document.createElement("p"); empty.className = "empty-state";
    empty.append("Es sind noch keine Klassen eingerichtet. Legen Sie diese zunächst unter ");
    const link = document.createElement("button"); link.type = "button"; link.className = "schedule-setup-link"; link.textContent = "Klassen";
    link.addEventListener("click", () => selectLayer(project.id, "classCatalog")); empty.append(link, " an."); list.append(empty);
  } else if (!layer.entries.length) {
    const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = "Noch kein klassenbezogenes Projekt angelegt."; list.append(empty);
  }
  section.append(add, list); sheet.append(head, section); projectDetail.replaceChildren(sheet); saveProjects();
}

function setAppointmentGroupColor(value) {
  appointmentGroupColor.value = value;
  [...appointmentGroupColorPalette.querySelectorAll(".lesson-color-swatch")].forEach((swatch) => {
    const isActive = swatch.dataset.color === value;
    swatch.classList.toggle("is-active", isActive);
    swatch.setAttribute("aria-pressed", String(isActive));
  });
}

function renderAppointmentGroupColorPalette() {
  const swatches = LESSON_COLORS.map(([color, name]) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "lesson-color-swatch";
    swatch.dataset.color = color;
    swatch.style.setProperty("--swatch-color", color);
    swatch.setAttribute("aria-label", name);
    swatch.addEventListener("click", () => setAppointmentGroupColor(color));
    return swatch;
  });
  appointmentGroupColorPalette.replaceChildren(...swatches);
  setAppointmentGroupColor(appointmentGroupColor.value || "#c9c1dd");
}

function openAppointmentGroupDialog(project, group = null, layerType = "appointments") {
  appointmentGroupForm.reset();
  appointmentGroupDialogStatus.textContent = "";
  appointmentGroupDialog.dataset.projectId = project.id;
  appointmentGroupDialog.dataset.layerType = layerType;
  if (group) {
    appointmentGroupDialog.dataset.groupId = group.id;
    appointmentGroupDialogTitle.textContent = "Gruppe bearbeiten";
    appointmentGroupSubmitButton.textContent = "Änderungen speichern";
    appointmentGroupName.value = group.name || "";
    setAppointmentGroupColor(group.color || "#c9c1dd");
  } else {
    delete appointmentGroupDialog.dataset.groupId;
    appointmentGroupDialogTitle.textContent = "Gruppe hinzufügen";
    appointmentGroupSubmitButton.textContent = "Gruppe hinzufügen";
    setAppointmentGroupColor("#c9c1dd");
  }
  appointmentGroupDialog.showModal();
  appointmentGroupName.focus();
}

function openAppointmentDialog(project, group, appointment = null, layerType = "appointments") {
  appointmentForm.reset();
  appointmentDialogStatus.textContent = "";
  appointmentDialog.dataset.projectId = project.id;
  appointmentDialog.dataset.groupId = group.id;
  appointmentDialog.dataset.layerType = layerType;
  if (appointment) {
    appointmentDialog.dataset.appointmentId = appointment.id;
    appointmentDialogTitle.textContent = "Termin bearbeiten";
    appointmentSubmitButton.textContent = "Änderungen speichern";
    appointmentName.value = appointment.name || "";
    appointmentDate.value = appointment.date || "";
    appointmentStartTime.value = appointment.startTime || "";
    appointmentEndTime.value = appointment.endTime || "";
    appointmentOverridesLessons.checked = Boolean(appointment.overridesLessons);
  } else {
    delete appointmentDialog.dataset.appointmentId;
    appointmentDialogTitle.textContent = "Termin hinzufügen";
    appointmentSubmitButton.textContent = "Termin hinzufügen";
  }
  appointmentDialog.showModal();
  appointmentName.focus();
}

function createAppointmentMenu(project, group, appointment = null, layerType = "appointments") {
  const menuShell = document.createElement("div");
  menuShell.className = "schedule-menu-shell";
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "schedule-menu-button";
  menuButton.setAttribute("aria-label", `Menü für ${appointment?.name || group.name}`);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "Bearbeiten";
  editButton.addEventListener("click", () => {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    if (appointment) openAppointmentDialog(project, group, appointment, layerType);
    else openAppointmentGroupDialog(project, group, layerType);
  });
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "schedule-menu-delete";
  deleteButton.textContent = "Löschen";
  deleteButton.dataset.projectId = project.id;
  deleteButton.dataset.appointmentGroupId = group.id;
  deleteButton.dataset.appointmentLayerType = layerType;
  if (appointment) deleteButton.dataset.appointmentId = appointment.id;
  deleteButton.setAttribute("aria-label", `${appointment?.name || group.name} löschen – gedrückt halten`);
  deleteButton.addEventListener("pointerdown", beginScheduleDeleteHold);
  deleteButton.addEventListener("pointerup", finishScheduleDeleteHold);
  deleteButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
  deleteButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
  menuButton.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(editButton, deleteButton);
  menuShell.append(menuButton, menu);
  return menuShell;
}

function createMovedProjectSection(project, type, titleText, buttonText, emptyText) {
  const individualLayer = getProjectLayer(project, "individual");
  individualLayer.entries = Array.isArray(individualLayer.entries) ? individualLayer.entries : [];
  const entries = individualLayer.entries.filter((entry) => entry.type === type);
  const section = document.createElement("section");
  section.className = "property-section";
  const title = document.createElement("h3");
  title.textContent = titleText;
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "secondary-button primary-action trip-add-button";
  addButton.textContent = buttonText;
  addButton.addEventListener("click", () => {
    if (type === "class-trip") openClassTripDialog(project);
    else openSchoolProjectDialog(project, null, type);
  });
  const list = document.createElement("div");
  list.className = "trip-entry-list";
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = emptyText;
    list.append(empty);
  } else {
    entries.slice().sort((a, b) => a.startDate.localeCompare(b.startDate)).forEach((entry) => {
      const row = document.createElement("article");
      row.className = "trip-entry";
      const copy = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = entry.name;
      const schedule = document.createElement("span");
      schedule.textContent = formatIndividualEventSchedule(entry);
      copy.append(name);
      if (entry.className) {
        const classLabel = document.createElement("span");
        classLabel.textContent = `Klasse ${entry.className}`;
        copy.append(classLabel);
      }
      copy.append(schedule);
      const menuShell = document.createElement("div");
      menuShell.className = "schedule-menu-shell";
      const menuButton = document.createElement("button");
      menuButton.type = "button";
      menuButton.className = "schedule-menu-button";
      menuButton.setAttribute("aria-label", `Menü für ${entry.name}`);
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
      const menu = document.createElement("div");
      menu.className = "schedule-menu trip-entry-menu";
      menu.hidden = true;
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.textContent = "Bearbeiten";
      editButton.addEventListener("click", () => {
        menu.hidden = true;
        menuButton.setAttribute("aria-expanded", "false");
        if (type === "class-trip") openClassTripDialog(project, entry);
        else openSchoolProjectDialog(project, entry, type);
      });
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "schedule-menu-delete";
      deleteButton.textContent = "Löschen";
      deleteButton.dataset.projectId = project.id;
      deleteButton.dataset.tripId = entry.id;
      deleteButton.setAttribute("aria-label", `${entry.name} löschen – gedrückt halten`);
      deleteButton.addEventListener("pointerdown", beginScheduleDeleteHold);
      deleteButton.addEventListener("pointerup", finishScheduleDeleteHold);
      deleteButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
      deleteButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
      menuButton.addEventListener("click", () => {
        menu.hidden = !menu.hidden;
        menuButton.setAttribute("aria-expanded", String(!menu.hidden));
      });
      menu.append(editButton, deleteButton);
      menuShell.append(menuButton, menu);
      row.append(copy, menuShell);
      list.append(row);
    });
  }
  section.append(title, addButton, list);
  return section;
}

function renderAppointmentsProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Schulische Termine";
  const layer = getProjectLayer(project, "appointments");
  layer.groups = Array.isArray(layer.groups) ? layer.groups : [];

  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = "Termine organisieren";
  const intro = document.createElement("p");
  intro.textContent = "Bündeln Sie unregelmäßig wiederkehrende Termine in Gruppen und verwalten Sie hier auch Klassenfahrten und Schulprojekte.";
  head.append(title, intro);
  const addGroupButton = document.createElement("button");
  addGroupButton.type = "button";
  addGroupButton.className = "secondary-button primary-action appointment-add-group";
  addGroupButton.textContent = "Gruppe hinzufügen";
  addGroupButton.addEventListener("click", () => openAppointmentGroupDialog(project));

  const groupList = document.createElement("div");
  groupList.className = "appointment-group-list";
  if (!layer.groups.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch keine Termingruppe angelegt.";
    groupList.append(empty);
  } else {
    layer.groups.forEach((group) => {
      group.appointments = Array.isArray(group.appointments) ? group.appointments : [];
      const groupCard = document.createElement("section");
      groupCard.className = "appointment-group-card";
      groupCard.style.setProperty("--appointment-group-color", group.color || "#c9c1dd");
      const groupHead = document.createElement("div");
      groupHead.className = "appointment-group-head";
      const groupTitle = document.createElement("h3");
      groupTitle.textContent = group.name;
      groupHead.append(groupTitle, createAppointmentMenu(project, group));
      const addAppointmentButton = document.createElement("button");
      addAppointmentButton.type = "button";
      addAppointmentButton.className = "secondary-button appointment-add-button";
      addAppointmentButton.textContent = "Termin hinzufügen";
      addAppointmentButton.addEventListener("click", () => openAppointmentDialog(project, group));
      const appointmentList = document.createElement("div");
      appointmentList.className = "appointment-entry-list";
      if (!group.appointments.length) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "In dieser Gruppe sind noch keine Termine eingetragen.";
        appointmentList.append(empty);
      } else {
        group.appointments
          .slice()
          .sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`))
          .forEach((appointment) => {
            const row = document.createElement("article");
            row.className = "appointment-entry";
            const copy = document.createElement("div");
            const name = document.createElement("strong");
            name.textContent = appointment.name;
            const date = document.createElement("span");
            date.textContent = `${formatGermanDate(appointment.date)} · ${appointment.startTime}–${appointment.endTime}`;
            copy.append(name, date);
            row.append(copy, createAppointmentMenu(project, group, appointment));
            appointmentList.append(row);
          });
      }
      groupCard.append(groupHead, addAppointmentButton, appointmentList);
      groupList.append(groupCard);
    });
  }
  const classTrips = createMovedProjectSection(project, "class-trip", "Klassenfahrten", "Klassenfahrt hinzufügen", "Noch keine Klassenfahrt eingetragen.");
  const schoolProjects = createMovedProjectSection(project, "school-project", "Schulprojekte", "Schulprojekt hinzufügen", "Noch kein Schulprojekt eingetragen.");
  sheet.append(head, addGroupButton, groupList, classTrips, schoolProjects);
  projectDetail.replaceChildren(sheet);
  saveProjects();
}

function openSicknessDialog(project, sickness = null) {
  sicknessForm.reset();
  sicknessDialogStatus.textContent = "";
  sicknessDialog.dataset.projectId = project.id;
  if (sickness) {
    sicknessDialog.dataset.sicknessId = sickness.id;
    sicknessDialogTitle.textContent = "Krankschreibung bearbeiten";
    sicknessSubmitButton.textContent = "Änderungen speichern";
    sicknessStartDate.value = sickness.startDate || "";
    sicknessEndDate.value = sickness.endDate || "";
  } else {
    delete sicknessDialog.dataset.sicknessId;
    sicknessDialogTitle.textContent = "Krankschreibung hinzufügen";
    sicknessSubmitButton.textContent = "Krankschreibung hinzufügen";
  }
  sicknessDialog.showModal();
  sicknessStartDate.focus();
}

function createSicknessMenu(project, sickness) {
  const menuShell = document.createElement("div");
  menuShell.className = "schedule-menu-shell";
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "schedule-menu-button";
  menuButton.setAttribute("aria-label", "Menü für Krankschreibung");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "Bearbeiten";
  editButton.addEventListener("click", () => openSicknessDialog(project, sickness));
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "schedule-menu-delete";
  deleteButton.textContent = "Löschen";
  deleteButton.dataset.projectId = project.id;
  deleteButton.dataset.sicknessId = sickness.id;
  deleteButton.setAttribute("aria-label", "Krankschreibung löschen – gedrückt halten");
  deleteButton.addEventListener("pointerdown", beginScheduleDeleteHold);
  deleteButton.addEventListener("pointerup", finishScheduleDeleteHold);
  deleteButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
  deleteButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
  menuButton.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(editButton, deleteButton);
  menuShell.append(menuButton, menu);
  return menuShell;
}

function renderSicknessProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Krankschreibungen";
  const layer = getProjectLayer(project, "sickness");
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];

  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Erfassen Sie Zeitspannen, in denen Sie verhindert waren. Unterrichtsstunden dieses Projekts werden währenddessen automatisch aus der Tages- und Wochenansicht entfernt.";
  head.append(title, intro);
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "secondary-button primary-action";
  addButton.textContent = "Krankschreibung hinzufügen";
  addButton.addEventListener("click", () => openSicknessDialog(project));

  const list = document.createElement("div");
  list.className = "sickness-entry-list";
  if (!layer.entries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch keine Krankschreibung eingetragen.";
    list.append(empty);
  } else {
    layer.entries
      .slice()
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .forEach((sickness) => {
        const row = document.createElement("article");
        row.className = "sickness-entry";
        const copy = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = "Krankschreibung";
        const dates = document.createElement("span");
        dates.textContent = sickness.startDate === sickness.endDate
          ? formatGermanDate(sickness.startDate)
          : `${formatGermanDate(sickness.startDate)}–${formatGermanDate(sickness.endDate)}`;
        copy.append(name, dates);
        row.append(copy, createSicknessMenu(project, sickness));
        list.append(row);
      });
  }
  sheet.append(head, addButton, list);
  projectDetail.replaceChildren(sheet);
  saveProjects();
}

function openClassCatalogDialog(project, mode, subject = null, grade = null, classEntry = null) {
  classCatalogForm.reset();
  classCatalogDialogStatus.textContent = "";
  classCatalogDialog.dataset.projectId = project.id;
  classCatalogDialog.dataset.subjectId = subject?.id || "";
  classCatalogDialog.dataset.gradeId = grade?.id || "";
  classCatalogDialog.dataset.classId = classEntry?.id || "";
  classCatalogMode.value = mode;
  classCatalogGrade.replaceChildren(...Array.from({ length: 13 }, (_, index) => {
    const option = document.createElement("option");
    option.value = String(index + 1);
    option.textContent = `${index + 1}. Klassenstufe`;
    return option;
  }));
  classCatalogNameField.hidden = mode === "grade";
  classCatalogGradeField.hidden = mode !== "grade";
  if (mode === "subject") {
    classCatalogDialogTitle.textContent = subject ? "Fach bearbeiten" : "Fach hinzufügen";
    classCatalogNameLabel.textContent = "Fach";
    classCatalogName.placeholder = "z. B. Deutsch";
    classCatalogName.value = subject?.name || "";
  } else if (mode === "grade") {
    classCatalogDialogTitle.textContent = grade ? "Klassenstufe bearbeiten" : "Klassenstufe hinzufügen";
    classCatalogGrade.value = grade?.name || "1";
  } else {
    classCatalogDialogTitle.textContent = classEntry ? "Klasse bearbeiten" : "Klasse hinzufügen";
    classCatalogNameLabel.textContent = "Bezeichnung der Klasse";
    classCatalogName.placeholder = `z. B. ${grade?.name || "8"}a`;
    classCatalogName.value = classEntry?.name || "";
  }
  const isEditing = (mode === "subject" && Boolean(subject))
    || (mode === "grade" && Boolean(grade))
    || (mode === "class" && Boolean(classEntry));
  classCatalogSubmitButton.textContent = isEditing ? "Änderungen speichern" : "Hinzufügen";
  classCatalogDialog.showModal();
  requestAnimationFrame(() => (mode === "grade" ? classCatalogGrade : classCatalogName).focus());
}

function createClassCatalogMenu(project, type, subject, grade = null, classEntry = null) {
  const target = classEntry || grade || subject;
  const shell = document.createElement("div");
  shell.className = "schedule-menu-shell";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "schedule-menu-button";
  button.setAttribute("aria-label", `Menü für ${target.name}`);
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const edit = document.createElement("button");
  edit.type = "button";
  edit.textContent = "Bearbeiten";
  edit.addEventListener("click", () => openClassCatalogDialog(project, type, subject, grade, classEntry));
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "schedule-menu-delete";
  remove.textContent = "Löschen";
  remove.dataset.projectId = project.id;
  remove.dataset.catalogType = type;
  remove.dataset.catalogSubjectId = subject.id;
  if (grade) remove.dataset.catalogGradeId = grade.id;
  if (classEntry) remove.dataset.catalogClassId = classEntry.id;
  remove.setAttribute("aria-label", `${target.name} löschen – gedrückt halten`);
  remove.addEventListener("pointerdown", beginScheduleDeleteHold);
  remove.addEventListener("pointerup", finishScheduleDeleteHold);
  remove.addEventListener("pointercancel", cancelScheduleDeleteHold);
  remove.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
  button.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    button.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(edit, remove);
  shell.append(button, menu);
  return shell;
}

function renderClassCatalogProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Klassen";
  const layer = getProjectLayer(project, "classCatalog");
  layer.subjects = Array.isArray(layer.subjects) ? layer.subjects : [];
  const schools = ensureSchools(project);
  if (!schools.some((school) => school.id === activeClassSchoolId)) activeClassSchoolId = schools[0]?.id || null;
  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Legen Sie Fächer als Gruppen an und ordnen Sie darin Klassenstufen und Einzelklassen. Diese eindeutige Struktur bildet später die Grundlage für Unterrichtsstatistiken je Fach und Klasse.";
  head.append(title, intro);
  const schoolField = document.createElement("label");
  schoolField.className = "property-field";
  const schoolLabel = document.createElement("span");
  schoolLabel.textContent = "Schule";
  const schoolSelect = document.createElement("select");
  schools.forEach((school) => schoolSelect.add(new Option(school.name, school.id, false, school.id === activeClassSchoolId)));
  schoolSelect.disabled = !schools.length;
  schoolSelect.addEventListener("change", () => {
    activeClassSchoolId = schoolSelect.value;
    renderClassCatalogProperties(project);
  });
  schoolField.append(schoolLabel, schoolSelect);
  const addSubject = document.createElement("button");
  addSubject.type = "button";
  addSubject.className = "secondary-button primary-action";
  addSubject.disabled = !activeClassSchoolId;
  addSubject.textContent = "Fach hinzufügen";
  addSubject.addEventListener("click", () => openClassCatalogDialog(project, "subject"));
  const subjectList = document.createElement("div");
  subjectList.className = "class-catalog-subject-list";
  const visibleSubjects = layer.subjects.filter((subject) => subject.schoolId === activeClassSchoolId);
  if (!visibleSubjects.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch kein Fach angelegt.";
    subjectList.append(empty);
  } else {
    visibleSubjects.forEach((subject) => {
      subject.grades = Array.isArray(subject.grades) ? subject.grades : [];
      const subjectCard = document.createElement("section");
      subjectCard.className = "class-catalog-subject";
      const subjectHead = document.createElement("div");
      subjectHead.className = "appointment-group-head";
      const subjectTitle = document.createElement("h3");
      subjectTitle.textContent = subject.name;
      subjectHead.append(subjectTitle, createClassCatalogMenu(project, "subject", subject));
      const addGrade = document.createElement("button");
      addGrade.type = "button";
      addGrade.className = "secondary-button";
      addGrade.textContent = "Klassenstufe hinzufügen";
      addGrade.addEventListener("click", () => openClassCatalogDialog(project, "grade", subject));
      const gradeList = document.createElement("div");
      gradeList.className = "class-catalog-grade-list";
      subject.grades
        .slice()
        .sort((a, b) => Number(a.name) - Number(b.name))
        .forEach((grade) => {
          grade.classes = Array.isArray(grade.classes) ? grade.classes : [];
          const gradeCard = document.createElement("section");
          gradeCard.className = "class-catalog-grade";
          const gradeHead = document.createElement("div");
          gradeHead.className = "class-catalog-grade-head";
          const gradeTitle = document.createElement("strong");
          gradeTitle.textContent = `${grade.name}. Klassenstufe`;
          gradeHead.append(gradeTitle, createClassCatalogMenu(project, "grade", subject, grade));
          const classList = document.createElement("div");
          classList.className = "class-catalog-class-list";
          grade.classes.forEach((classEntry) => {
            const row = document.createElement("div");
            row.className = "class-catalog-class";
            const name = document.createElement("span");
            name.textContent = classEntry.name;
            row.append(name, createClassCatalogMenu(project, "class", subject, grade, classEntry));
            classList.append(row);
          });
          const addClass = document.createElement("button");
          addClass.type = "button";
          addClass.className = "secondary-button class-catalog-add-class";
          addClass.textContent = "Klasse hinzufügen";
          addClass.addEventListener("click", () => openClassCatalogDialog(project, "class", subject, grade));
          gradeCard.append(gradeHead, classList, addClass);
          gradeList.append(gradeCard);
        });
      subjectCard.append(subjectHead, addGrade, gradeList);
      subjectList.append(subjectCard);
    });
  }
  sheet.append(head, schoolField, addSubject, subjectList);
  projectDetail.replaceChildren(sheet);
  saveProjects();
}

function syncLessonCatalogLabels(project) {
  const catalog = project.layers?.find((entry) => entry.type === "classCatalog");
  const schedules = project.layers?.find((entry) => entry.type === "schedules")?.schedules;
  if (!Array.isArray(catalog?.subjects) || !Array.isArray(schedules)) return;
  schedules.forEach((schedule) => {
    (Array.isArray(schedule.lessons) ? schedule.lessons : []).forEach((lesson) => {
      const subject = catalog.subjects.find((entry) => entry.id === lesson.subjectId);
      if (!subject) return;
      lesson.subject = subject.name;
      for (const grade of Array.isArray(subject.grades) ? subject.grades : []) {
        const classEntry = (Array.isArray(grade.classes) ? grade.classes : []).find((entry) => entry.id === lesson.classId);
        if (!classEntry) continue;
        lesson.grade = classEntry.name;
        lesson.gradeLevelId = grade.id;
        break;
      }
    });
  });
}

function getProjectLayer(project, layerType) {
  let layer = project.layers?.find((entry) => entry.type === layerType);
  if (!layer) {
    project.layers = Array.isArray(project.layers) ? project.layers : [];
    layer = { type: layerType, entries: [] };
    project.layers.push(layer);
  }
  return layer;
}

function createSchoolPeriods(source = {}, startDate = "", endDate = "") {
  const models = source.models && typeof source.models === "object" ? source.models : {};
  const range = (value = {}) => ({ startDate: value.startDate || "", endDate: value.endDate || "" });
  const half = (value = {}) => ({ ...range(value), gradingStops: structuredClone(value.gradingStops || []) });
  return {
    schoolYear: {
      startDate: source.schoolYear?.startDate || startDate,
      endDate: source.schoolYear?.endDate || endDate
    },
    models: {
      halves: { first: half(models.halves?.first), second: half(models.halves?.second) },
      semesters: { first: half(models.semesters?.first), second: half(models.semesters?.second) },
      trimesters: {
        first: range(models.trimesters?.first),
        second: range(models.trimesters?.second),
        third: range(models.trimesters?.third)
      },
      alternatingWeeks: {
        mode: models.alternatingWeeks?.mode || "alternating",
        hasIndividualChanges: Boolean(models.alternatingWeeks?.hasIndividualChanges),
        weeks: structuredClone(models.alternatingWeeks?.weeks || [])
      }
    },
    activeTab: source.activeTab || "halves"
  };
}

function syncHalfYearOuterBounds(periods) {
  const schoolYear = periods?.schoolYear;
  const halves = periods?.models?.halves;
  if (!schoolYear || !halves) return;
  halves.first = halves.first || { startDate: "", endDate: "", gradingStops: [] };
  halves.second = halves.second || { startDate: "", endDate: "", gradingStops: [] };
  halves.first.startDate = schoolYear.startDate || "";
  halves.second.endDate = schoolYear.endDate || "";
}

function rebuildSchoolHolidayEntries(layer) {
  const unique = new Map();
  (Array.isArray(layer.schools) ? layer.schools : []).flatMap((school) => (
    [
      ...(Array.isArray(school.holidayEntries) ? school.holidayEntries : []),
      ...(Array.isArray(school.publicHolidayEntries) ? school.publicHolidayEntries : []),
      ...(Array.isArray(school.movableSchoolFreeDays) ? school.movableSchoolFreeDays : [])
    ].map((entry) => ({
      ...entry,
      schoolId: school.id,
      schoolIds: [school.id],
      scopeType: school.type,
      federalState: school.federalState || ""
    }))
  )).forEach((entry) => {
    const key = [entry.type, entry.name, entry.startDate, entry.endDate, entry.federalState].join("|");
    const existing = unique.get(key);
    if (existing) existing.schoolIds.push(entry.schoolId);
    else unique.set(key, entry);
  });
  layer.entries = [...unique.values()];
}

function ensureSchools(project) {
  const layer = getProjectLayer(project, "holidays");
  if (!Array.isArray(layer.schools)) {
    const settings = ensureScopedHolidaySettings(project, layer);
    const legacyPeriods = ensureProjectPeriodSettings(project);
    layer.schools = settings.scopeTypes.map((scopeType, index) => {
      const config = settings.scopeConfigs[scopeType] || {};
      const startYear = Number(config.startYear) || new Date().getFullYear();
      const endYear = Number(config.endYear) || startYear + 1;
      return {
        id: globalThis.crypto?.randomUUID?.() ?? `school-${Date.now()}-${index}`,
        name: getHolidayScopeLabel(scopeType),
        type: scopeType,
        federalState: config.federalState || "MV",
        periods: createSchoolPeriods(legacyPeriods, `${startYear}-08-01`, `${endYear}-07-31`),
        higherEducationBreaks: structuredClone(config.higherEducationBreaks || {}),
        holidayEntries: structuredClone(layer.scopeData?.[scopeType]?.appliedEntries || []),
        holidayPreviewEntries: structuredClone(layer.scopeData?.[scopeType]?.previewEntries || []),
        provenance: structuredClone(layer.scopeData?.[scopeType]?.provenance || {})
      };
    });
    layer.schoolsMigrationVersion = 1;
  }
  layer.schools.forEach((school) => {
    school.name = String(school.name || getHolidayScopeLabel(school.type)).trim();
    school.type = ["general", "vocational", "university"].includes(school.type) ? school.type : "general";
    school.federalState = school.federalState || "MV";
    school.periods = createSchoolPeriods(school.periods || {}, school.startDate || "", school.endDate || "");
    school.holidayEntries = Array.isArray(school.holidayEntries) ? school.holidayEntries : [];
    school.publicHolidayEntries = Array.isArray(school.publicHolidayEntries) ? school.publicHolidayEntries : [];
    school.movableSchoolFreeDays = Array.isArray(school.movableSchoolFreeDays) ? school.movableSchoolFreeDays : [];
    school.higherEducationBreaks = school.higherEducationBreaks && typeof school.higherEducationBreaks === "object"
      ? school.higherEducationBreaks
      : {};
  });
  const firstSchool = layer.schools[0];
  const scheduleLayer = project.layers?.find((entry) => entry.type === "schedules");
  (scheduleLayer?.schedules || []).forEach((schedule) => {
    if (!schedule.schoolId) {
      schedule.schoolId = layer.schools.find((school) => school.type === getScheduleHolidayScope(schedule))?.id
        || firstSchool?.id
        || null;
    }
    (schedule.lessons || []).forEach((lesson) => {
      if (!lesson.schoolId) lesson.schoolId = schedule.schoolId;
    });
  });
  const catalog = project.layers?.find((entry) => entry.type === "classCatalog");
  (catalog?.subjects || []).forEach((subject) => {
    if (!subject.schoolId) subject.schoolId = firstSchool?.id || null;
  });
  rebuildSchoolHolidayEntries(layer);
  return layer.schools;
}

function getSchool(project, schoolId) {
  return ensureSchools(project).find((school) => school.id === schoolId) || null;
}

function getProjectCalendarRange(project) {
  const schools = ensureSchools(project);
  const starts = schools.map((school) => school.periods?.schoolYear?.startDate).filter(Boolean).sort();
  const ends = schools.map((school) => school.periods?.schoolYear?.endDate).filter(Boolean).sort();
  project.calendarRange = project.calendarRange && typeof project.calendarRange === "object" ? project.calendarRange : {};
  const manual = project.calendarRange.manuallyAdjusted;
  return {
    startDate: (manual && project.calendarRange.startDate) || starts[0] || ensureProjectPeriodSettings(project).schoolYear.startDate,
    endDate: (manual && project.calendarRange.endDate) || ends.at(-1) || ensureProjectPeriodSettings(project).schoolYear.endDate
  };
}

function createSchoolYearOptions(selectedStartYear) {
  const fragment = document.createDocumentFragment();
  const currentYear = new Date().getFullYear();
  for (let year = currentYear - 3; year <= currentYear + 8; year += 1) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = `${year}/${String(year + 1).slice(-2)}`;
    option.selected = year === selectedStartYear;
    fragment.append(option);
  }
  return fragment;
}

function createSelectShell(select) {
  const shell = document.createElement("span");
  shell.className = "property-select-shell";
  const caret = document.createElement("span");
  caret.className = "property-select-caret";
  caret.setAttribute("aria-hidden", "true");
  shell.append(select, caret);
  return shell;
}

function getHolidaySchoolYearPeriod(project) {
  const holidayLayer = project.layers?.find((entry) => entry.type === "holidays");
  const schoolYear = holidayLayer?.appliedSettings || holidayLayer?.settings;
  const scopeTypes = Array.isArray(schoolYear?.scopeTypes) ? schoolYear.scopeTypes : [schoolYear?.schoolType];
  const schoolScopeType = scopeTypes.find((type) => type === "general" || type === "vocational" || type === "all");
  if (!schoolScopeType) return null;
  const scopeConfig = schoolYear?.scopeConfigs?.[schoolScopeType] || schoolYear;
  const startYear = Number(scopeConfig?.startYear);
  const endYear = Number(scopeConfig?.endYear) || startYear + 1;
  if (!startYear) return null;
  return {
    startDate: `${startYear}-08-01`,
    endDate: `${endYear}-07-31`,
    source: "holidays"
  };
}

function ensureProjectPeriodSettings(project) {
  project.periods = project.periods && typeof project.periods === "object" ? project.periods : {};
  const holidayPeriod = getHolidaySchoolYearPeriod(project);
  if (!project.periods.schoolYear?.startDate || !project.periods.schoolYear?.endDate) {
    const fallback = holidayPeriod || (() => {
      const today = new Date();
      return {
        startDate: today.toISOString().slice(0, 10),
        endDate: `${today.getFullYear() + 1}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
        source: "default"
      };
    })();
    project.periods.schoolYear = fallback;
  }
  project.periods.models = project.periods.models && typeof project.periods.models === "object"
    ? project.periods.models
    : { halves: {}, semesters: {}, trimesters: {}, alternatingWeeks: {} };
  project.periods.activeTab = ["halves", "semesters", "trimesters", "alternatingWeeks"].includes(project.periods.activeTab)
    ? project.periods.activeTab
    : "halves";
  return project.periods;
}

function getDefaultScheduleValidity(project, schoolId = null) {
  const school = getSchool(project, schoolId) || ensureSchools(project)[0];
  const period = school?.periods?.schoolYear || getProjectCalendarRange(project);
  return { validFrom: period.startDate || "", validUntil: period.endDate || "" };
}

function getScheduleValidityPeriods(project, schoolId = null) {
  const school = getSchool(project, schoolId) || ensureSchools(project)[0];
  if (!school) return [];
  const periods = school.periods;
  const options = [];
  const addPeriod = (id, label, value) => {
    if (!value?.startDate || !value?.endDate || value.endDate < value.startDate) return;
    options.push({
      id: `school:${school.id}:${id}`,
      label,
      startDate: value.startDate,
      endDate: value.endDate,
      schoolId: school.id,
      scopeType: school.type
    });
  };
  addPeriod("schoolYear", "Schuljahr", periods.schoolYear);
  addPeriod("halves.first", "1. Halbjahr", periods.models.halves?.first);
  addPeriod("halves.second", "2. Halbjahr", periods.models.halves?.second);
  addPeriod("semesters.first", "Erstes Semester", periods.models.semesters?.first);
  addPeriod("semesters.second", "Zweites Semester", periods.models.semesters?.second);
  addPeriod("trimesters.first", "Erstes Trimester", periods.models.trimesters?.first);
  addPeriod("trimesters.second", "Zweites Trimester", periods.models.trimesters?.second);
  addPeriod("trimesters.third", "Drittes Trimester", periods.models.trimesters?.third);
  return options;
}

function resolveScheduleValidityPeriod(schedule, project) {
  const options = getScheduleValidityPeriods(project, schedule.schoolId);
  return options.find((option) => option.id === schedule.validityPeriodId)
    || options.find((option) => option.startDate === schedule.validFrom && option.endDate === schedule.validUntil)
    || options.find((option) => option.id.endsWith(":schoolYear") || option.id.startsWith("schoolYear"))
    || options[0]
    || null;
}

function isFullSchoolYearValidityPeriod(period) {
  const id = String(period?.id || "");
  return id === "schoolYear"
    || id.endsWith(":schoolYear")
    || id.startsWith("schoolYear.");
}

function applyScheduleValidityPeriod(schedule, period) {
  if (!period) return;
  schedule.validityPeriodId = period.id;
  schedule.validFrom = period.startDate;
  schedule.validUntil = period.endDate;
  schedule.schoolId = period.schoolId || schedule.schoolId || null;
  schedule.holidayScopeType = period.scopeType || schedule.holidayScopeType || null;
}

function syncScheduleValidityPeriods(project) {
  const scheduleLayer = project.layers?.find((layer) => layer.type === "schedules");
  (scheduleLayer?.schedules || []).forEach((schedule) => {
    if (!schedule.validityPeriodId) return;
    const period = getScheduleValidityPeriods(project, schedule.schoolId).find((option) => option.id === schedule.validityPeriodId)
      || resolveScheduleValidityPeriod(schedule, project);
    if (period) applyScheduleValidityPeriod(schedule, period);
  });
}

function getScheduleActiveDays(schedule) {
  const configured = Array.isArray(schedule.activeDays)
    ? schedule.activeDays.map(Number).filter((day) => day >= 1 && day <= 7)
    : [1, 2, 3, 4, 5];
  const lessonDays = (Array.isArray(schedule.lessons) ? schedule.lessons : [])
    .map((lesson) => Number(lesson.day))
    .filter((day) => day >= 1 && day <= 7);
  return [...new Set([...configured, ...lessonDays])].sort((a, b) => a - b);
}

function getDefaultDisplayRows(dayStart = "07:00", dayEndValue = "18:00", lessonMinutes = 45) {
  const rows = [];
  const pauseMinutes = 15;
  const dayEnd = timeToMinutes(dayEndValue);
  let cursor = timeToMinutes(dayStart);
  let lessonNumber = 1;
  while (cursor < dayEnd) {
    const remaining = dayEnd - cursor;
    let lessonEnd = Math.min(cursor + lessonMinutes, dayEnd);
    if (dayEnd - lessonEnd <= pauseMinutes) lessonEnd = dayEnd;
    rows.push({
      id: globalThis.crypto?.randomUUID?.() ?? `display-${Date.now()}-${rows.length}`,
      type: "lesson",
      label: `${lessonNumber}. Stunde`,
      start: minutesToTime(cursor),
      end: minutesToTime(lessonEnd)
    });
    lessonNumber += 1;
    cursor = lessonEnd;
    if (cursor >= dayEnd) break;
    const pauseEnd = Math.min(cursor + pauseMinutes, dayEnd);
    rows.push({
      id: globalThis.crypto?.randomUUID?.() ?? `display-${Date.now()}-${rows.length}`,
      type: "break",
      label: "Pause",
      start: minutesToTime(cursor),
      end: minutesToTime(pauseEnd)
    });
    cursor = pauseEnd;
  }
  return rows;
}

function resetScheduleDeleteHold() {
  if (!scheduleDeleteHoldState) return;
  const { button, frame, pointerId } = scheduleDeleteHoldState;
  if (frame) cancelAnimationFrame(frame);
  button.classList.remove("is-hold-active", "is-hold-ready");
  button.style.removeProperty("--hold-progress");
  if (Number.isFinite(pointerId) && button.hasPointerCapture?.(pointerId)) {
    try {
      button.releasePointerCapture(pointerId);
    } catch {
      // Pointer capture may already have been released.
    }
  }
  scheduleDeleteHoldState = null;
}

function tickScheduleDeleteHold() {
  if (!scheduleDeleteHoldState) return;
  const progress = Math.max(0, Math.min(1, (performance.now() - scheduleDeleteHoldState.startedAt) / SCHEDULE_DELETE_HOLD_MS));
  scheduleDeleteHoldState.button.style.setProperty("--hold-progress", `${progress * 100}%`);
  if (progress >= 1) {
    scheduleDeleteHoldState.armed = true;
    scheduleDeleteHoldState.button.classList.add("is-hold-ready");
    scheduleDeleteHoldState.frame = null;
    return;
  }
  scheduleDeleteHoldState.frame = requestAnimationFrame(tickScheduleDeleteHold);
}

function deleteSchedule(projectId, scheduleId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "schedules");
  if (!project || !layer || !Array.isArray(layer.schedules)) return;
  layer.schedules = layer.schedules.filter((entry) => entry.id !== scheduleId);
  if (activeScheduleId === scheduleId) activeScheduleId = null;
  activeProjectId = project.id;
  activeLayerType = "schedules";
  saveProjects();
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function deleteHolidayScope(projectId, scopeType) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "holidays");
  if (!project || !layer) return;
  const settings = ensureScopedHolidaySettings(project, layer);
  if (!settings.scopeTypes.includes(scopeType)) return;

  settings.scopeTypes = settings.scopeTypes.filter((entry) => entry !== scopeType);
  delete settings.scopeConfigs[scopeType];
  delete layer.scopeData?.[scopeType];
  settings.activeScopeType = settings.scopeTypes[0] || null;
  settings.schoolType = settings.activeScopeType;
  settings.isAddingScope = !settings.activeScopeType;
  rebuildScopedHolidayEntries(layer);
  syncScheduleValidityPeriods(project);
  saveProjects();
  renderProjectBrowser();
  renderHolidayProperties(project);
  renderActiveCalendar(project);
}

function deleteClassProject(projectId, classProjectId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "classes");
  if (!project || !layer || !Array.isArray(layer.entries)) return;
  layer.entries = layer.entries.filter((entry) => entry.id !== classProjectId);
  document.querySelector(`dialog.class-project-dialog[data-class-project-id="${classProjectId}"]`)?.close();
  saveProjects();
  renderClassProjectsIntroduction(project);
  renderActiveCalendar(project);
}

function deleteSchool(projectId, schoolId) {
  const project = projects.find((entry) => entry.id === projectId);
  const schoolLayer = project?.layers?.find((entry) => entry.type === "holidays");
  if (!project || !schoolLayer) return;
  const schedules = project.layers?.find((entry) => entry.type === "schedules")?.schedules || [];
  const subjects = project.layers?.find((entry) => entry.type === "classCatalog")?.subjects || [];
  if (schedules.some((entry) => entry.schoolId === schoolId) || subjects.some((entry) => entry.schoolId === schoolId)) {
    window.alert("Die Schule wird noch von Stundenplänen oder Klassen verwendet und kann deshalb nicht gelöscht werden.");
    return;
  }
  schoolLayer.schools = ensureSchools(project).filter((entry) => entry.id !== schoolId);
  rebuildSchoolHolidayEntries(schoolLayer);
  activeSchoolId = null;
  saveProjects();
  renderProjectBrowser();
  renderSchoolsProperties(project);
  renderActiveCalendar(project);
}

function deleteLesson(projectId, scheduleId, lessonId) {
  const project = projects.find((entry) => entry.id === projectId);
  const schedule = project?.layers
    ?.find((entry) => entry.type === "schedules")
    ?.schedules?.find((entry) => entry.id === scheduleId);
  if (!project || !schedule || !Array.isArray(schedule.lessons)) return;
  schedule.lessons = schedule.lessons.filter((entry) => entry.id !== lessonId);
  lessonDialog.close();
  saveProjects();
  renderProjectBrowser();
  renderSchedulesProperties(project);
  renderActiveCalendar(project);
}

function deleteProjectFolder(projectId) {
  if (!projects.some((project) => project.id === projectId)) return;
  projects = projects.filter((project) => project.id !== projectId);
  expandedProjectIds.delete(projectId);
  [...expandedLayerKeys].filter((key) => key.startsWith(`${projectId}:`)).forEach((key) => expandedLayerKeys.delete(key));
  localStorage.setItem(EXPANDED_LAYERS_STORAGE_KEY, JSON.stringify([...expandedLayerKeys]));

  if (displayedProjectId === projectId) {
    displayedProjectId = projects[0]?.id ?? null;
    if (displayedProjectId) localStorage.setItem(DISPLAY_PROJECT_STORAGE_KEY, displayedProjectId);
    else localStorage.removeItem(DISPLAY_PROJECT_STORAGE_KEY);
  }
  if (activeProjectId === projectId) {
    activeProjectId = displayedProjectId ?? projects[0]?.id ?? null;
    activeLayerType = null;
    activeScheduleId = null;
  }
  saveProjects();
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function deleteClassTrip(projectId, tripId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "individual");
  if (!project || !layer || !Array.isArray(layer.entries)) return;
  layer.entries = layer.entries.filter((entry) => entry.id !== tripId);
  if (Array.isArray(layer.appliedEntries)) {
    layer.appliedEntries = layer.appliedEntries.filter((entry) => entry.id !== tripId);
  }
  saveProjects();
  if (activeLayerType === "appointments") renderAppointmentsProperties(project);
  else renderIndividualProjectsProperties(project);
  renderActiveCalendar(project);
}

function deleteAppointmentGroup(projectId, groupId, layerType = "appointments") {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === layerType);
  if (!project || !layer || !Array.isArray(layer.groups)) return;
  layer.groups = layer.groups.filter((entry) => entry.id !== groupId);
  saveProjects();
  if (layerType === "individual") renderIndividualProjectsProperties(project);
  else renderAppointmentsProperties(project);
  renderActiveCalendar(project);
}

function deleteAppointment(projectId, groupId, appointmentId, layerType = "appointments") {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === layerType);
  const group = layer?.groups?.find((entry) => entry.id === groupId);
  if (!project || !group || !Array.isArray(group.appointments)) return;
  group.appointments = group.appointments.filter((entry) => entry.id !== appointmentId);
  saveProjects();
  if (layerType === "individual") renderIndividualProjectsProperties(project);
  else renderAppointmentsProperties(project);
  renderActiveCalendar(project);
}

function deleteSickness(projectId, sicknessId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "sickness");
  if (!project || !layer || !Array.isArray(layer.entries)) return;
  layer.entries = layer.entries.filter((entry) => entry.id !== sicknessId);
  saveProjects();
  renderSicknessProperties(project);
  renderActiveCalendar(project);
}

function deleteClassCatalogEntry(projectId, type, subjectId, gradeId, classId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "classCatalog");
  if (!project || !layer || !Array.isArray(layer.subjects)) return;
  if (type === "subject") layer.subjects = layer.subjects.filter((entry) => entry.id !== subjectId);
  else {
    const subject = layer.subjects.find((entry) => entry.id === subjectId);
    if (!subject || !Array.isArray(subject.grades)) return;
    if (type === "grade") subject.grades = subject.grades.filter((entry) => entry.id !== gradeId);
    else {
      const grade = subject.grades.find((entry) => entry.id === gradeId);
      if (!grade || !Array.isArray(grade.classes)) return;
      grade.classes = grade.classes.filter((entry) => entry.id !== classId);
    }
  }
  saveProjects();
  renderClassCatalogProperties(project);
}

function beginScheduleDeleteHold(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  event.preventDefault();
  event.stopPropagation();
  resetScheduleDeleteHold();
  scheduleDeleteHoldState = {
    button,
    projectId: button.dataset.projectId,
    projectFolderId: button.dataset.projectFolderId,
    scheduleId: button.dataset.scheduleId,
    lessonId: button.dataset.lessonId,
    tripId: button.dataset.tripId,
    appointmentGroupId: button.dataset.appointmentGroupId,
    appointmentId: button.dataset.appointmentId,
    appointmentLayerType: button.dataset.appointmentLayerType,
    sicknessId: button.dataset.sicknessId,
    catalogType: button.dataset.catalogType,
    catalogSubjectId: button.dataset.catalogSubjectId,
    catalogGradeId: button.dataset.catalogGradeId,
    catalogClassId: button.dataset.catalogClassId,
    holidayScopeType: button.dataset.holidayScopeType,
    classProjectId: button.dataset.classProjectId,
    schoolId: button.dataset.schoolId,
    pointerId: Number.isFinite(event.pointerId) ? event.pointerId : null,
    startedAt: performance.now(),
    armed: false,
    frame: null
  };
  button.setPointerCapture?.(event.pointerId);
  button.classList.add("is-hold-active");
  button.style.setProperty("--hold-progress", "0%");
  scheduleDeleteHoldState.frame = requestAnimationFrame(tickScheduleDeleteHold);
}

function finishScheduleDeleteHold(event) {
  if (!scheduleDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  const {
    button,
    projectId,
    projectFolderId,
    scheduleId,
    lessonId,
    tripId,
    appointmentGroupId,
    appointmentId,
    appointmentLayerType,
    sicknessId,
    catalogType,
    catalogSubjectId,
    catalogGradeId,
    catalogClassId,
    holidayScopeType,
    classProjectId,
    schoolId,
    armed
  } = scheduleDeleteHoldState;
  const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
  const releasedOnButton = Boolean(releaseTarget && (releaseTarget === button || button.contains(releaseTarget)));
  resetScheduleDeleteHold();
  if (!armed || !releasedOnButton) return;
  if (projectFolderId) deleteProjectFolder(projectFolderId);
  else if (schoolId) deleteSchool(projectId, schoolId);
  else if (holidayScopeType) deleteHolidayScope(projectId, holidayScopeType);
  else if (classProjectId) deleteClassProject(projectId, classProjectId);
  else if (lessonId) deleteLesson(projectId, scheduleId, lessonId);
  else if (catalogType) deleteClassCatalogEntry(projectId, catalogType, catalogSubjectId, catalogGradeId, catalogClassId);
  else if (sicknessId) deleteSickness(projectId, sicknessId);
  else if (appointmentId) deleteAppointment(projectId, appointmentGroupId, appointmentId, appointmentLayerType);
  else if (appointmentGroupId) deleteAppointmentGroup(projectId, appointmentGroupId, appointmentLayerType);
  else if (tripId) deleteClassTrip(projectId, tripId);
  else deleteSchedule(projectId, scheduleId);
}

function cancelScheduleDeleteHold(event) {
  if (!scheduleDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  resetScheduleDeleteHold();
}

function openSchedulePresetDialog(project) {
  schedulePresetForm.reset();
  schoolDayStart.value = "07:00";
  schoolDayEnd.value = "18:00";
  defaultLessonDuration.value = "45";
  schedulePresetStatus.textContent = "";
  schedulePresetDialog.dataset.projectId = project.id;
  schedulePresetDialog.showModal();
  requestAnimationFrame(() => schoolDayStart.focus());
}

function renderSchedulesProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Stundenplanlogiken";
  const layer = getProjectLayer(project, "schedules");
  const schools = ensureSchools(project);
  layer.schedules = Array.isArray(layer.schedules) ? layer.schedules : [];
  const schedule = layer.schedules.find((entry) => entry.id === activeScheduleId);

  if (!schedule) {
    const sheet = document.createElement("section");
    sheet.className = "property-sheet";
    const head = document.createElement("div");
    head.className = "property-sheet-head";
    const intro = document.createElement("p");
    intro.textContent = "Legen Sie die möglichen Zeitlogiken Ihrer Schule an – beispielsweise ein Raster aus Einzelstunden, Blockstunden oder abweichenden Stunden- und Pausenfolgen. Die konkreten Unterrichtsstunden werden anschließend innerhalb der gewählten Logik eingetragen.";
    head.append(intro);
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "secondary-button primary-action schedule-add-button";
    addButton.textContent = "Stundenplanlogik hinzufügen";
    addButton.disabled = !schools.length;
    if (!schools.length) addButton.title = "Bitte zuerst eine Schule anlegen.";
    addButton.addEventListener("click", () => {
      openSchedulePresetDialog(project);
    });
    const scheduleList = document.createElement("div");
    scheduleList.className = "schedule-overview-list";
    if (layer.schedules.length) {
      layer.schedules.forEach((entry) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "schedule-overview-card";
        const representativeColor = entry.lessons?.find((lesson) => lesson.color)?.color || "#bfd2e2";
        card.style.setProperty("--schedule-card-color", representativeColor);
        const name = document.createElement("strong");
        name.textContent = entry.name;
        const schoolName = getSchool(project, entry.schoolId)?.name;
        const validity = document.createElement("span");
        validity.textContent = schoolName || "Schule noch nicht zugeordnet";
        const lessonCount = document.createElement("small");
        const count = Array.isArray(entry.lessons) ? entry.lessons.length : 0;
        lessonCount.textContent = `${count} ${count === 1 ? "Unterrichtsstunde" : "Unterrichtsstunden"}`;
        card.append(name, validity, lessonCount);
        card.addEventListener("click", () => selectSchedule(project.id, entry.id));
        scheduleList.append(card);
      });
    }
    sheet.append(head, addButton, scheduleList);
    projectDetail.replaceChildren(sheet);
    return;
  }

  schedule.lessons = Array.isArray(schedule.lessons) ? schedule.lessons : [];
  schedule.displayRows = Array.isArray(schedule.displayRows) && schedule.displayRows.length
    ? schedule.displayRows
    : getDefaultDisplayRows();
  const sheet = document.createElement("section");
  sheet.className = "schedule-editor";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const setupNotice = document.createElement("p");
  setupNotice.className = "schedule-setup-notice";
  setupNotice.append("Bevor Kurse angelegt werden, müssen alle benötigten Klassen unter ");
  const classCatalogLink = document.createElement("button");
  classCatalogLink.type = "button";
  classCatalogLink.className = "schedule-setup-link";
  classCatalogLink.textContent = "Klassen";
  classCatalogLink.addEventListener("click", () => selectLayer(project.id, "classCatalog"));
  setupNotice.append(classCatalogLink, " hinzugefügt sein.");
  const titleLine = document.createElement("div");
  titleLine.className = "schedule-title-line";
  const title = document.createElement("h3");
  title.textContent = schedule.name;
  const menuShell = document.createElement("div");
  menuShell.className = "schedule-menu-shell";
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "schedule-menu-button";
  menuButton.setAttribute("aria-label", `Menü für ${schedule.name}`);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const displayButton = document.createElement("button");
  displayButton.type = "button";
  displayButton.textContent = "Darstellung anpassen";
  displayButton.addEventListener("click", () => {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    openScheduleDisplayDialog(project, schedule);
  });
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "schedule-menu-delete";
  deleteButton.textContent = "Löschen";
  deleteButton.dataset.projectId = project.id;
  deleteButton.dataset.scheduleId = schedule.id;
  deleteButton.setAttribute("aria-label", `${schedule.name} löschen – gedrückt halten`);
  deleteButton.addEventListener("pointerdown", beginScheduleDeleteHold);
  deleteButton.addEventListener("pointerup", finishScheduleDeleteHold);
  deleteButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
  deleteButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
  menuButton.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(displayButton, deleteButton);
  menuShell.append(menuButton, menu);
  titleLine.append(title, menuShell);
  const intro = document.createElement("p");
  intro.textContent = "Für eine neue Stunde in das Wochenraster klicken.";
  head.append(setupNotice, titleLine, intro);

  const validity = document.createElement("div");
  validity.className = "schedule-validity";
  const schoolLabel = document.createElement("label");
  const schoolText = document.createElement("span");
  schoolText.textContent = "Schule";
  const schoolSelect = document.createElement("select");
  schoolSelect.setAttribute("aria-label", "Schule des Stundenplans");
  schools.forEach((school) => {
    const option = document.createElement("option");
    option.value = school.id;
    option.textContent = school.name;
    option.selected = school.id === schedule.schoolId;
    schoolSelect.append(option);
  });
  if (!schedule.schoolId && schools[0]) schedule.schoolId = schools[0].id;
  schoolLabel.append(schoolText, createSelectShell(schoolSelect));
  const selectedValidityPeriod = getScheduleValidityPeriods(project, schedule.schoolId)[0];
  const previousValidity = `${schedule.validityPeriodId || ""}|${schedule.validFrom || ""}|${schedule.validUntil || ""}`;
  applyScheduleValidityPeriod(schedule, selectedValidityPeriod);
  if (previousValidity !== `${schedule.validityPeriodId || ""}|${schedule.validFrom || ""}|${schedule.validUntil || ""}`) saveProjects();
  schoolSelect.addEventListener("change", () => {
    schedule.schoolId = schoolSelect.value;
    applyScheduleValidityPeriod(schedule, getScheduleValidityPeriods(project, schedule.schoolId)[0]);
    saveProjects();
    renderSchedulesProperties(project);
    renderActiveCalendar(project);
  });
  validity.append(schoolLabel);

  schedule.activeDays = getScheduleActiveDays(schedule);
  const activeDaysField = document.createElement("fieldset");
  activeDaysField.className = "schedule-active-days";
  const activeDaysLegend = document.createElement("legend");
  activeDaysLegend.textContent = "Wochentage";
  const activeDaysButtons = document.createElement("div");
  activeDaysButtons.className = "lesson-day-buttons";
  const activeDaysStatus = document.createElement("p");
  activeDaysStatus.className = "property-status schedule-active-days-status";
  activeDaysStatus.setAttribute("role", "status");
  weekdayNames.forEach((name, index) => {
    const day = index + 1;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name;
    button.dataset.scheduleDay = String(day);
    button.setAttribute("aria-pressed", String(schedule.activeDays.includes(day)));
    const hasLessons = schedule.lessons.some((lesson) => Number(lesson.day) === day);
    if (hasLessons) {
      button.setAttribute("aria-disabled", "true");
      button.title = `${name} kann nicht ausgeblendet werden, solange dort eine Stunde liegt.`;
    }
    button.addEventListener("click", () => {
      const isActive = schedule.activeDays.includes(day);
      if (isActive && hasLessons) {
        activeDaysStatus.textContent = `${name} kann erst ausgeblendet werden, wenn alle Stunden dieses Tages entfernt wurden.`;
        return;
      }
      if (isActive && schedule.activeDays.length === 1) {
        activeDaysStatus.textContent = "Mindestens ein Wochentag muss sichtbar bleiben.";
        return;
      }
      schedule.activeDays = isActive
        ? schedule.activeDays.filter((entry) => entry !== day)
        : [...schedule.activeDays, day].sort((a, b) => a - b);
      saveProjects();
      renderSchedulesProperties(project);
      renderActiveCalendar(project);
    });
    activeDaysButtons.append(button);
  });
  activeDaysField.append(activeDaysLegend, activeDaysButtons, activeDaysStatus);

  const week = document.createElement("div");
  week.className = "schedule-week schedule-editor-timeline";
  const editorDays = getScheduleActiveDays(schedule);
  week.style.setProperty("--schedule-editor-days", String(editorDays.length));
  const editorRows = schedule.displayRows.filter((row) => row.start && row.end && row.end > row.start);
  const editorStart = Math.min(...editorRows.map((row) => timeToMinutes(row.start)));
  const editorEnd = Math.max(...editorRows.map((row) => timeToMinutes(row.end)));
  const editorMinutes = Math.max(1, editorEnd - editorStart);
  week.style.setProperty("--schedule-editor-height", `${Math.max(520, editorMinutes * 1.4)}px`);

  const weekHeader = document.createElement("div");
  weekHeader.className = "schedule-editor-week-header";
  const corner = document.createElement("div");
  corner.className = "schedule-week-corner";
  corner.textContent = "Zeit";
  weekHeader.append(corner);
  ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
    .filter((_, index) => editorDays.includes(index + 1))
    .forEach((name) => {
      const dayHead = document.createElement("div");
      dayHead.className = "schedule-day-head";
      dayHead.textContent = name;
      weekHeader.append(dayHead);
    });
  week.append(weekHeader);

  const weekBody = document.createElement("div");
  weekBody.className = "schedule-editor-week-body";
  const axis = document.createElement("div");
  axis.className = "schedule-editor-axis";
  editorRows.forEach((displayRow) => {
    const time = document.createElement("div");
    time.className = `schedule-time${displayRow.type === "break" ? " is-break" : ""}`;
    time.style.top = `${((timeToMinutes(displayRow.start) - editorStart) / editorMinutes) * 100}%`;
    time.style.height = `${((timeToMinutes(displayRow.end) - timeToMinutes(displayRow.start)) / editorMinutes) * 100}%`;
    const timeLabel = document.createElement("strong");
    timeLabel.textContent = displayRow.label;
    const timeRange = document.createElement("span");
    timeRange.textContent = `${displayRow.start}–${displayRow.end}`;
    time.append(timeLabel, timeRange);
    axis.append(time);
  });
  weekBody.append(axis);

  editorDays.forEach((day) => {
    const dayColumn = document.createElement("div");
    dayColumn.className = "schedule-editor-day";
    editorRows.forEach((displayRow) => {
      const top = ((timeToMinutes(displayRow.start) - editorStart) / editorMinutes) * 100;
      const height = ((timeToMinutes(displayRow.end) - timeToMinutes(displayRow.start)) / editorMinutes) * 100;
      if (displayRow.type === "break") {
        const pause = document.createElement("div");
        pause.className = "schedule-break-cell";
        pause.textContent = "Pause";
        pause.style.top = `${top}%`;
        pause.style.height = `${height}%`;
        dayColumn.append(pause);
        return;
      }
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "schedule-cell";
      cell.setAttribute("aria-label", `${weekdayNames[day - 1]}, ${displayRow.label}: Stunde hinzufügen`);
      cell.style.top = `${top}%`;
      cell.style.height = `${height}%`;
      cell.addEventListener("click", () => openLessonDialog(project, schedule, day, displayRow));
      dayColumn.append(cell);
    });
    const dayLessons = layoutTimelineEntries(
      schedule.lessons.filter((lesson) => lesson.day === day).map((lesson) => ({ lesson, schedule }))
    );
    dayLessons.forEach(({ lesson, lane, laneCount }) => {
      const card = renderLessonCard(lesson, { ...schedule, projectId: project.id, projectName: project.name });
      const top = ((timeToMinutes(lesson.start) - editorStart) / editorMinutes) * 100;
      const height = ((timeToMinutes(lesson.end) - timeToMinutes(lesson.start)) / editorMinutes) * 100;
      card.classList.add("schedule-editor-lesson-card");
      card.style.top = `${top}%`;
      card.style.height = `${height}%`;
      card.style.left = `calc(${lane * (100 / laneCount)}% + 3px)`;
      card.style.width = `calc(${100 / laneCount}% - 6px)`;
      dayColumn.append(card);
    });
    weekBody.append(dayColumn);
  });
  week.append(weekBody);
  sheet.append(head, validity, activeDaysField, week);
  projectDetail.replaceChildren(sheet);
  saveProjects();
}

function setLessonDialogTab(tab) {
  const showStatistics = tab === "statistics";
  const showProgress = tab === "progress";
  lessonPropertiesTab.setAttribute("aria-selected", String(!showStatistics && !showProgress));
  lessonStatisticsTab.setAttribute("aria-selected", String(showStatistics));
  lessonProgressTab.setAttribute("aria-selected", String(showProgress));
  lessonPropertiesPanel.hidden = showStatistics || showProgress;
  lessonStatisticsPanel.hidden = !showStatistics;
  lessonProgressPanel.hidden = !showProgress;
  lessonSubmitButton.hidden = showStatistics;
  if (showStatistics) renderLessonStatisticsForSchool();
  if (showProgress) renderLessonPhaseEditor();
}

function getLessonDialogDuration() {
  return Math.max(0, timeToMinutes(lessonEnd.value) - timeToMinutes(lessonStart.value));
}

function renderLessonPhaseEditor() {
  lessonPhaseStatus.textContent = "";
  if (!lessonPhasesDraft.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Keine Phasen eingestellt: Die gesamte Stunde gilt als eine Phase.";
    lessonPhaseList.replaceChildren(empty);
    return;
  }
  const rows = lessonPhasesDraft.map((phase, index) => {
    const row = document.createElement("div");
    row.className = "lesson-phase-row";
    const name = document.createElement("input");
    name.type = "text";
    name.maxLength = 80;
    name.value = phase.name;
    name.setAttribute("aria-label", `Bezeichnung von Phase ${index + 1}`);
    name.addEventListener("input", () => { phase.name = name.value; });
    const durationShell = document.createElement("label");
    durationShell.className = "lesson-phase-duration";
    const duration = document.createElement("input");
    duration.type = "number";
    duration.min = "1";
    duration.max = "240";
    duration.step = "1";
    duration.value = String(phase.durationMinutes);
    duration.setAttribute("aria-label", `Dauer von Phase ${index + 1} in Minuten`);
    duration.addEventListener("input", () => { phase.durationMinutes = Number(duration.value); });
    const unit = document.createElement("span");
    unit.textContent = "Min.";
    durationShell.append(duration, unit);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "display-row-delete";
    remove.textContent = "Löschen";
    remove.addEventListener("click", () => {
      lessonPhasesDraft.splice(index, 1);
      renderLessonPhaseEditor();
    });
    row.append(name, durationShell, remove);
    return row;
  });
  lessonPhaseList.replaceChildren(...rows);
  const assignedMinutes = lessonPhasesDraft.reduce((sum, phase) => sum + Number(phase.durationMinutes || 0), 0);
  lessonPhaseStatus.textContent = `${assignedMinutes} von ${getLessonDialogDuration()} Minuten auf Phasen verteilt.`;
}

function addLessonPhase() {
  const assignedMinutes = lessonPhasesDraft.reduce((sum, phase) => sum + Number(phase.durationMinutes || 0), 0);
  const remainingMinutes = Math.max(1, getLessonDialogDuration() - assignedMinutes);
  lessonPhasesDraft.push({
    id: globalThis.crypto?.randomUUID?.() ?? `phase-${Date.now()}`,
    name: `Phase ${lessonPhasesDraft.length + 1}`,
    durationMinutes: remainingMinutes
  });
  renderLessonPhaseEditor();
}

function getLessonStatisticsPeriod(project, schoolId = null) {
  const schoolPeriod = getSchool(project, schoolId)?.periods?.schoolYear;
  if (schoolPeriod?.startDate && schoolPeriod?.endDate) {
    return { startDate: schoolPeriod.startDate, endDate: schoolPeriod.endDate };
  }
  const projectPeriod = project.periods?.schoolYear;
  if (projectPeriod?.startDate && projectPeriod?.endDate) {
    return { startDate: projectPeriod.startDate, endDate: projectPeriod.endDate };
  }
  const holidayLayer = project.layers?.find((entry) => entry.type === "holidays");
  const settings = holidayLayer?.appliedSettings || holidayLayer?.settings;
  if (Number(settings?.startYear)) {
    const startYear = Number(settings.startYear);
    return { startDate: `${startYear}-08-01`, endDate: `${startYear + 1}-07-31` };
  }
  const schedules = project.layers?.find((entry) => entry.type === "schedules")?.schedules || [];
  const starts = schedules.map((entry) => entry.validFrom).filter(Boolean).sort();
  const ends = schedules.map((entry) => entry.validUntil).filter(Boolean).sort();
  if (starts.length && ends.length) return { startDate: starts[0], endDate: ends.at(-1) };
  const year = new Date().getFullYear();
  return { startDate: `${year}-01-01`, endDate: `${year}-12-31` };
}

function isSameCatalogLesson(candidate, reference) {
  if (reference.subjectId && reference.classId) {
    return candidate.subjectId === reference.subjectId && candidate.classId === reference.classId;
  }
  return candidate.subject === reference.subject && candidate.grade === reference.grade;
}

function renderLessonStatistics() {
  const project = projects.find((entry) => entry.id === lessonDialog.dataset.projectId);
  const schedules = project?.layers?.find((entry) => entry.type === "schedules")?.schedules || [];
  const sourceSchedule = schedules.find((entry) => entry.id === lessonDialog.dataset.scheduleId);
  const referenceLesson = sourceSchedule?.lessons?.find((entry) => entry.id === lessonDialog.dataset.lessonId);
  if (!project || !referenceLesson) {
    lessonYearStatistic.textContent = "Noch keine Statistik verfügbar";
    lessonYearStatisticPeriod.textContent = "Die Stunde muss zuerst gespeichert werden.";
    return;
  }
  const { startDate, endDate } = getLessonStatisticsPeriod(project, sourceSchedule.schoolId);
  const today = new Date();
  const todayKey = getLocalDateKey(today);
  const currentMinutes = today.getHours() * 60 + today.getMinutes();
  let total = 0;
  let given = 0;
  let totalMinutes = 0;
  let givenMinutes = 0;
  const durations = new Set();
  const cursor = new Date(`${startDate}T12:00:00`);
  const last = new Date(`${endDate}T12:00:00`);
  while (cursor <= last) {
    const dateKey = getLocalDateKey(cursor);
    const weekday = ((cursor.getDay() + 6) % 7) + 1;
    schedules.forEach((schedule) => {
      const combinedSchedule = { ...schedule, projectId: project.id };
      if (!isScheduleValidOn(combinedSchedule, cursor)
        || isSchoolHolidayForSchedule(combinedSchedule, cursor)
        || isSicknessForSchedule(combinedSchedule, cursor)) return;
      (Array.isArray(schedule.lessons) ? schedule.lessons : [])
        .filter((lesson) => (
          lesson.day === weekday
          && isLessonActiveOnDate(lesson, combinedSchedule, cursor)
          && !isLessonSuppressedByClassProject(project, lesson, cursor)
          && isSameCatalogLesson(lesson, referenceLesson)
        ))
        .forEach((lesson) => {
          const duration = Math.max(0, timeToMinutes(lesson.end) - timeToMinutes(lesson.start));
          const wasGiven = dateKey < todayKey || (dateKey === todayKey && timeToMinutes(lesson.end) <= currentMinutes);
          total += 1;
          totalMinutes += duration;
          durations.add(duration);
          if (wasGiven) {
            given += 1;
            givenMinutes += duration;
          }
        });
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  const [uniformDuration] = durations;
  const referenceDuration = Math.max(0, timeToMinutes(referenceLesson.end) - timeToMinutes(referenceLesson.start));
  const formatLessonUnits = (minutes) => new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 2
  }).format(minutes / 45);
  lessonYearStatistic.textContent = durations.size <= 1
    ? `${given} von ${total} × ${uniformDuration || referenceDuration} min gegeben`
    : `${formatLessonUnits(givenMinutes)} von ${formatLessonUnits(totalMinutes)} × 45 min gegeben`;
  lessonYearStatisticPeriod.textContent = `${formatGermanDate(startDate)}–${formatGermanDate(endDate)} · 1 Unterrichtsstunde = 45 min. Ferien und Krankschreibungen sind abgezogen.`;
}

function calculateLessonRangeStatistics(project, schedules, referenceLesson, schoolId, startDate, endDate) {
  const today = new Date();
  const todayKey = getLocalDateKey(today);
  const currentMinutes = today.getHours() * 60 + today.getMinutes();
  const result = { total: 0, given: 0, totalMinutes: 0, givenMinutes: 0, durations: new Set() };
  if (!startDate || !endDate || endDate < startDate) return result;
  const cursor = new Date(`${startDate}T12:00:00`);
  const last = new Date(`${endDate}T12:00:00`);
  while (cursor <= last) {
    const dateKey = getLocalDateKey(cursor);
    const weekday = ((cursor.getDay() + 6) % 7) + 1;
    schedules.filter((schedule) => !schoolId || schedule.schoolId === schoolId).forEach((schedule) => {
      const combinedSchedule = { ...schedule, projectId: project.id };
      if (!isScheduleValidOn(combinedSchedule, cursor)
        || isSchoolHolidayForSchedule(combinedSchedule, cursor)
        || isSicknessForSchedule(combinedSchedule, cursor)) return;
      (schedule.lessons || []).filter((lesson) => (
        lesson.day === weekday
        && isLessonActiveOnDate(lesson, combinedSchedule, cursor)
        && !isLessonSuppressedByClassProject(project, lesson, cursor)
        && isSameCatalogLesson(lesson, referenceLesson)
      )).forEach((lesson) => {
        const duration = Math.max(0, timeToMinutes(lesson.end) - timeToMinutes(lesson.start));
        const wasGiven = dateKey < todayKey || (dateKey === todayKey && timeToMinutes(lesson.end) <= currentMinutes);
        result.total += 1;
        result.totalMinutes += duration;
        result.durations.add(duration);
        if (wasGiven) {
          result.given += 1;
          result.givenMinutes += duration;
        }
      });
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

function formatLessonStatistic(result, referenceLesson) {
  const units = (minutes) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(minutes / 45);
  return `${units(result.givenMinutes)}/${units(result.totalMinutes)} USt.`;
}

function formatRemainingLessonStatistic(result, referenceLesson) {
  return `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(Math.max(0, result.totalMinutes - result.givenMinutes) / 45)} USt. verbleibend`;
}

function getLessonGradeLevel(project, lesson) {
  const subject = project.layers?.find((entry) => entry.type === "classCatalog")?.subjects
    ?.find((entry) => entry.id === lesson.subjectId);
  const grade = subject?.grades?.find((entry) => entry.id === lesson.gradeLevelId
    || (entry.classes || []).some((classEntry) => classEntry.id === lesson.classId));
  return Number(grade?.name) || Number(String(lesson.grade || "").match(/\d+/)?.[0]) || null;
}

function renderLessonStatisticsTimeline(schoolYear, validHalves, gradeLevel) {
  lessonStatYearTrack.replaceChildren();
  lessonStatYearLabels.replaceChildren();
  const startMs = new Date(`${schoolYear.startDate}T12:00:00`).getTime();
  const endMs = new Date(`${schoolYear.endDate}T12:00:00`).getTime();
  const duration = Math.max(1, endMs - startMs);
  const position = (date) => Math.max(0, Math.min(100, ((new Date(`${date}T12:00:00`).getTime() - startMs) / duration) * 100));
  const todayPosition = position(getLocalDateKey(new Date()));
  const elapsed = document.createElement("span");
  elapsed.className = "lesson-stat-year-elapsed";
  elapsed.style.width = `${todayPosition}%`;
  lessonStatYearTrack.append(elapsed);
  const todayMarker = document.createElement("span");
  todayMarker.className = "lesson-stat-today-marker";
  if (todayPosition <= 3) todayMarker.classList.add("is-start-edge");
  if (todayPosition >= 97) todayMarker.classList.add("is-end-edge");
  todayMarker.style.left = `${todayPosition}%`;
  todayMarker.setAttribute("aria-label", "Heute");
  lessonStatYearTrack.append(todayMarker);
  validHalves.forEach(([label, half], index) => {
    const left = position(half.startDate);
    const right = position(half.endDate);
    const segment = document.createElement("span");
    segment.className = "lesson-stat-half-segment";
    segment.style.left = `${left}%`;
    segment.style.width = `${Math.max(0, right - left)}%`;
    segment.title = `${label}: ${formatGermanDate(half.startDate)}–${formatGermanDate(half.endDate)}`;
    lessonStatYearTrack.append(segment);
    const labelElement = document.createElement("span");
    labelElement.textContent = label;
    labelElement.style.left = `${left}%`;
    labelElement.style.width = `${Math.max(0, right - left)}%`;
    lessonStatYearLabels.append(labelElement);
    const stop = (half.gradingStops || [])
      .filter((entry) => entry.date && gradeLevel && gradeLevel >= Number(entry.gradeFrom) && gradeLevel <= Number(entry.gradeUntil))
      .sort((a, b) => a.date.localeCompare(b.date))[0];
    if (!stop) return;
    const nextHalfStart = validHalves[index + 1]?.[1]?.startDate || half.endDate;
    const redStart = position(stop.date);
    const redEnd = position(nextHalfStart);
    const stopRange = document.createElement("span");
    stopRange.className = "lesson-stat-stop-range";
    stopRange.style.left = `${redStart}%`;
    stopRange.style.width = `${Math.max(0, redEnd - redStart)}%`;
    stopRange.title = `Zensurenstopp ${formatGermanDate(stop.date)} bis ${label === "1. Halbjahr" ? "zum 2. Halbjahr" : "zum Schuljahresende"}`;
    lessonStatYearTrack.append(stopRange);
    const stopMarker = document.createElement("span");
    stopMarker.className = "lesson-stat-stop-marker";
    stopMarker.style.left = `${redStart}%`;
    stopMarker.setAttribute("aria-label", `Zensurenstopp am ${formatGermanDate(stop.date)}`);
    lessonStatYearTrack.append(stopMarker);
  });
}

function renderLessonStatisticsForSchool() {
  const project = projects.find((entry) => entry.id === lessonDialog.dataset.projectId);
  const schedules = project?.layers?.find((entry) => entry.type === "schedules")?.schedules || [];
  const sourceSchedule = schedules.find((entry) => entry.id === lessonDialog.dataset.scheduleId);
  const referenceLesson = sourceSchedule?.lessons?.find((entry) => entry.id === lessonDialog.dataset.lessonId);
  if (!project || !sourceSchedule || !referenceLesson) {
    lessonYearStatistic.textContent = "Noch keine Statistik verfügbar";
    lessonYearStatisticPeriod.textContent = "Die Stunde muss zuerst gespeichert werden.";
    return;
  }
  const school = getSchool(project, sourceSchedule.schoolId);
  const schoolYear = school?.periods?.schoolYear || getLessonStatisticsPeriod(project, sourceSchedule.schoolId);
  const yearResult = calculateLessonRangeStatistics(project, schedules, referenceLesson, sourceSchedule.schoolId, schoolYear.startDate, schoolYear.endDate);
  lessonYearStatistic.textContent = formatLessonStatistic(yearResult, referenceLesson);
  lessonYearStatisticPeriod.textContent = `endet ${formatGermanDate(schoolYear.endDate)} · ${formatRemainingLessonStatistic(yearResult, referenceLesson)}`;

  const halves = school?.periods?.models?.halves;
  const todayKey = getLocalDateKey(new Date());
  const validHalves = [["1. Halbjahr", halves?.first], ["2. Halbjahr", halves?.second]]
    .filter(([, half]) => half?.startDate && half?.endDate && half.endDate >= half.startDate);
  const gradeLevel = getLessonGradeLevel(project, referenceLesson);
  renderLessonStatisticsTimeline(schoolYear, validHalves, gradeLevel);
  const currentHalf = validHalves.find(([, half]) => todayKey >= half.startDate && todayKey <= half.endDate)
    || validHalves.find(([, half]) => half.endDate >= todayKey)
    || validHalves.at(-1);
  if (!currentHalf) {
    lessonHalfStatisticCard.classList.add("is-unavailable");
    lessonHalfStatistic.textContent = "–";
    lessonHalfStatisticPeriod.textContent = "Für diese Schule sind noch keine vollständigen Halbjahresgrenzen festgelegt.";
    lessonGradingStopStatisticCard.classList.add("is-unavailable");
    lessonGradingStopStatistic.textContent = "–";
    lessonGradingStopStatisticPeriod.textContent = "Ohne Halbjahresgrenzen kann kein Zensurenstopp zugeordnet werden.";
    return;
  }
  const [halfLabel, half] = currentHalf;
  const halfResult = calculateLessonRangeStatistics(project, schedules, referenceLesson, sourceSchedule.schoolId, half.startDate, half.endDate);
  lessonHalfStatisticCard.classList.remove("is-unavailable");
  lessonHalfStatistic.textContent = formatLessonStatistic(halfResult, referenceLesson);
  lessonHalfStatisticPeriod.textContent = `${halfLabel} · endet ${formatGermanDate(half.endDate)} · ${formatRemainingLessonStatistic(halfResult, referenceLesson)}`;

  const gradingStop = (half.gradingStops || [])
    .filter((stop) => stop.date && (!gradeLevel || (gradeLevel >= Number(stop.gradeFrom) && gradeLevel <= Number(stop.gradeUntil))))
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  if (!gradingStop) {
    lessonGradingStopStatisticCard.classList.add("is-unavailable");
    lessonGradingStopStatistic.textContent = "–";
    lessonGradingStopStatisticPeriod.textContent = gradeLevel
      ? `Für die ${gradeLevel}. Klassenstufe ist in diesem Halbjahr kein Zensurenstopp eingetragen.`
      : "Die Klassenstufe konnte keinem Zensurenstopp zugeordnet werden.";
    return;
  }
  const stopEnd = gradingStop.date < half.endDate ? gradingStop.date : half.endDate;
  const stopResult = calculateLessonRangeStatistics(project, schedules, referenceLesson, sourceSchedule.schoolId, half.startDate, stopEnd);
  lessonGradingStopStatisticCard.classList.remove("is-unavailable");
  lessonGradingStopStatistic.textContent = `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(Math.max(0, stopResult.totalMinutes - stopResult.givenMinutes) / 45)} USt.`;
  lessonGradingStopStatisticPeriod.textContent = "";
}

function populateLessonClasses(project, lesson = null, schoolId = null) {
  const layer = project?.layers?.find((entry) => entry.type === "classCatalog");
  const subject = layer?.subjects?.find((entry) => entry.id === lessonSubject.value && (!schoolId || entry.schoolId === schoolId));
  const options = [];
  if (subject) {
    (Array.isArray(subject.grades) ? subject.grades : []).forEach((grade) => {
      (Array.isArray(grade.classes) ? grade.classes : []).forEach((classEntry) => {
        const option = document.createElement("option");
        option.value = classEntry.id;
        option.textContent = `${classEntry.name} · ${grade.name}. Klassenstufe`;
        option.dataset.name = classEntry.name;
        option.dataset.gradeId = grade.id;
        options.push(option);
      });
    });
  }
  if (lesson?.grade && !options.some((option) => option.value === lesson.classId)) {
    const legacy = document.createElement("option");
    legacy.value = lesson.classId || `legacy-class:${lesson.grade}`;
    legacy.textContent = `${lesson.grade} · bisheriger Eintrag`;
    legacy.dataset.name = lesson.grade;
    legacy.dataset.gradeId = lesson.gradeLevelId || "";
    options.push(legacy);
  }
  if (!options.length) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = subject ? "In diesem Fach ist noch keine Klasse angelegt" : "Zuerst ein Fach auswählen";
    options.push(empty);
  }
  lessonGrade.replaceChildren(...options);
  lessonGrade.value = lesson?.classId || options[0].value;
}

function populateLessonCatalog(project, lesson = null, schoolId = null) {
  const layer = project?.layers?.find((entry) => entry.type === "classCatalog");
  const subjects = (Array.isArray(layer?.subjects) ? layer.subjects : []).filter((subject) => !schoolId || subject.schoolId === schoolId);
  const options = subjects.map((subject) => {
    const option = document.createElement("option");
    option.value = subject.id;
    option.textContent = subject.name;
    option.dataset.name = subject.name;
    return option;
  });
  if (lesson?.subject && !options.some((option) => option.value === lesson.subjectId)) {
    const legacy = document.createElement("option");
    legacy.value = lesson.subjectId || `legacy-subject:${lesson.subject}`;
    legacy.textContent = `${lesson.subject} · bisheriger Eintrag`;
    legacy.dataset.name = lesson.subject;
    options.push(legacy);
  }
  if (!options.length) {
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Zuerst unter „Klassen“ ein Fach anlegen";
    options.push(empty);
  }
  lessonSubject.replaceChildren(...options);
  lessonSubject.value = lesson?.subjectId || options[0].value;
  populateLessonClasses(project, lesson, schoolId);
}

function setLessonDays(days) {
  const selectedDays = new Set(days.map(Number));
  lessonDayButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(selectedDays.has(Number(button.dataset.lessonDay))));
  });
  lessonDay.value = [...selectedDays].sort((a, b) => a - b).join(",");
}

function getSelectedLessonDays() {
  return lessonDayButtons
    .filter((button) => button.getAttribute("aria-pressed") === "true")
    .map((button) => Number(button.dataset.lessonDay))
    .sort((a, b) => a - b);
}

function configureLessonDayAvailability(schedule) {
  const activeDays = new Set(getScheduleActiveDays(schedule));
  lessonDayButtons.forEach((button) => {
    button.hidden = !activeDays.has(Number(button.dataset.lessonDay));
  });
}

function setLessonFormChoice(buttons, attribute, value) {
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset[attribute] === value));
  });
}

function getLessonFormChoice(buttons, attribute, fallback) {
  return buttons.find((button) => button.getAttribute("aria-pressed") === "true")?.dataset[attribute] || fallback;
}

function updateLessonTeachingFormFields() {
  lessonAbWeekChoice.hidden = lessonTeachingForm.value !== "abWeek";
  lessonEpochHalfChoice.hidden = lessonTeachingForm.value !== "epochal";
}

function configureLessonTeachingForm(project, schedule, lesson = null) {
  const options = [
    ["regular", "Wöchentlich"],
    ["abWeek", "A/B-Woche"]
  ];
  if (isFullSchoolYearValidityPeriod(resolveScheduleValidityPeriod(schedule, project))) {
    options.push(["epochal", "Epochal"]);
  }
  lessonTeachingForm.replaceChildren(...options.map(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    return option;
  }));
  const storedForm = lesson ? getLessonTeachingForm(lesson) : "regular";
  lessonTeachingForm.value = options.some(([value]) => value === storedForm) ? storedForm : "regular";
  setLessonFormChoice(lessonAbWeekButtons, "lessonAbWeek", lesson?.abWeek === "B" ? "B" : "A");
  setLessonFormChoice(lessonEpochHalfButtons, "lessonEpochHalf", lesson?.epochHalf === "second" ? "second" : "first");
  updateLessonTeachingFormFields();
}

function openLessonDialog(project, schedule, day, displayRow) {
  lessonForm.reset();
  lessonPhasesDraft = [];
  delete lessonDialog.dataset.lessonId;
  lessonStatisticsTab.hidden = true;
  setLessonDialogTab("properties");
  lessonDialogTitle.textContent = "Stunde hinzufügen";
  lessonSubmitButton.textContent = "Stunde hinzufügen";
  deleteLessonButton.hidden = true;
  delete deleteLessonButton.dataset.projectId;
  delete deleteLessonButton.dataset.scheduleId;
  delete deleteLessonButton.dataset.lessonId;
  setLessonColor("#bfd2e2");
  configureLessonDayAvailability(schedule);
  setLessonDays([day]);
  lessonStart.value = displayRow.start;
  lessonEnd.value = displayRow.end;
  lessonDialogStatus.textContent = "";
  lessonDialog.dataset.projectId = project.id;
  lessonDialog.dataset.scheduleId = schedule.id;
  configureLessonTeachingForm(project, schedule);
  populateLessonCatalog(project, null, schedule.schoolId);
  lessonDialog.showModal();
  requestAnimationFrame(() => lessonStart.focus());
}

function openExistingLessonDialog(project, schedule, lesson) {
  lessonForm.reset();
  lessonPhasesDraft = structuredClone(Array.isArray(lesson.phases) ? lesson.phases : []);
  lessonStatisticsTab.hidden = false;
  setLessonDialogTab("properties");
  lessonDialogTitle.textContent = "Stunde bearbeiten";
  lessonSubmitButton.textContent = "Änderungen speichern";
  deleteLessonButton.hidden = false;
  deleteLessonButton.dataset.projectId = project.id;
  deleteLessonButton.dataset.scheduleId = schedule.id;
  deleteLessonButton.dataset.lessonId = lesson.id;
  deleteLessonButton.setAttribute("aria-label", `${lesson.subject || "Stunde"} löschen – gedrückt halten`);
  configureLessonDayAvailability(schedule);
  setLessonDays([lesson.day]);
  lessonStart.value = lesson.start;
  lessonEnd.value = lesson.end;
  lessonRoom.value = lesson.room || "";
  setLessonColor(lesson.color || "#bfd2e2");
  lessonDialogStatus.textContent = "";
  lessonDialog.dataset.projectId = project.id;
  lessonDialog.dataset.scheduleId = schedule.id;
  lessonDialog.dataset.lessonId = lesson.id;
  configureLessonTeachingForm(project, schedule, lesson);
  populateLessonCatalog(project, lesson, schedule.schoolId);
  lessonDialog.showModal();
  requestAnimationFrame(() => lessonSubject.focus());
}

lessonSubject.addEventListener("change", () => {
  const project = projects.find((entry) => entry.id === lessonDialog.dataset.projectId);
  const schedule = project?.layers?.find((entry) => entry.type === "schedules")?.schedules?.find((entry) => entry.id === lessonDialog.dataset.scheduleId);
  if (project) populateLessonClasses(project, null, schedule?.schoolId || null);
});
lessonDayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedDays = new Set(getSelectedLessonDays());
    const day = Number(button.dataset.lessonDay);
    if (selectedDays.has(day)) selectedDays.delete(day);
    else selectedDays.add(day);
    setLessonDays([...selectedDays]);
    lessonDialogStatus.textContent = "";
  });
});
lessonTeachingForm.addEventListener("change", updateLessonTeachingFormFields);
lessonAbWeekButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLessonFormChoice(lessonAbWeekButtons, "lessonAbWeek", button.dataset.lessonAbWeek);
  });
});
lessonEpochHalfButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLessonFormChoice(lessonEpochHalfButtons, "lessonEpochHalf", button.dataset.lessonEpochHalf);
  });
});

function setLessonColor(value) {
  lessonColor.value = value;
  [...lessonColorPalette.querySelectorAll(".lesson-color-swatch")].forEach((swatch) => {
    const isActive = swatch.dataset.color === value;
    swatch.classList.toggle("is-active", isActive);
    swatch.setAttribute("aria-pressed", String(isActive));
  });
}

function renderLessonColorPalette() {
  const swatches = LESSON_COLORS.map(([color, name]) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "lesson-color-swatch";
    swatch.dataset.color = color;
    swatch.style.setProperty("--swatch-color", color);
    swatch.setAttribute("aria-label", name);
    swatch.addEventListener("click", () => setLessonColor(color));
    return swatch;
  });
  lessonColorPalette.replaceChildren(...swatches);
  setLessonColor(lessonColor.value || "#bfd2e2");
}

function openScheduleDisplayDialog(project, schedule) {
  displayRowsDraft = structuredClone(schedule.displayRows);
  if (!schedule.pauseDefaultsInitialized) insertMissingPauseRows();
  scheduleDisplayName.value = schedule.name;
  scheduleDisplayDialog.dataset.projectId = project.id;
  scheduleDisplayDialog.dataset.scheduleId = schedule.id;
  scheduleDisplayStatus.textContent = "";
  renderScheduleDisplayRows();
  scheduleDisplayDialog.showModal();
}

function insertMissingPauseRows() {
  for (let index = 0; index < displayRowsDraft.length - 1; index += 1) {
    const current = displayRowsDraft[index];
    const next = displayRowsDraft[index + 1];
    if (current.type !== "lesson" || next.type !== "lesson") continue;
    const pause = {
      id: globalThis.crypto?.randomUUID?.() ?? `display-${Date.now()}-${index}`,
      type: "break",
      label: "Pause",
      start: current.end,
      end: minutesToTime(timeToMinutes(current.end) + 15)
    };
    displayRowsDraft.splice(index + 1, 0, pause);
    index += 1;
  }
}

function timeToMinutes(value) {
  const [hours, minutes] = String(value).split(":").map(Number);
  return hours * 60 + minutes;
}

function isValidTimeValue(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value));
}

function minutesToTime(value) {
  const safeMinutes = Math.max(0, Math.min(value, 23 * 60 + 45));
  return `${String(Math.floor(safeMinutes / 60)).padStart(2, "0")}:${String(safeMinutes % 60).padStart(2, "0")}`;
}

function createFiveMinuteTimeControl(input) {
  const initialParts = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(input.value) || ["", "00", "00"];
  input.type = "hidden";
  input.removeAttribute("step");
  const shell = document.createElement("span");
  shell.className = "five-minute-time-control";
  const manual = document.createElement("span");
  manual.className = "five-minute-time-manual";
  const hourInput = document.createElement("input");
  hourInput.type = "text";
  hourInput.inputMode = "numeric";
  hourInput.maxLength = 2;
  hourInput.value = initialParts[1];
  hourInput.setAttribute("aria-label", "Stunde");
  hourInput.autocomplete = "off";
  const separator = document.createElement("span");
  separator.textContent = ":";
  separator.setAttribute("aria-hidden", "true");
  const minuteInput = document.createElement("input");
  minuteInput.type = "text";
  minuteInput.inputMode = "numeric";
  minuteInput.maxLength = 2;
  minuteInput.value = initialParts[2];
  minuteInput.setAttribute("aria-label", "Minute");
  minuteInput.autocomplete = "off";
  [hourInput, minuteInput].forEach((segment) => segment.addEventListener("focus", () => segment.select()));
  const syncManualValue = () => {
    let hour = hourInput.value.replace(/\D/g, "").slice(0, 2);
    let minute = minuteInput.value.replace(/\D/g, "").slice(0, 2);
    if (hour.length === 2 && Number(hour) > 23) hour = "23";
    if (minute.length === 2 && Number(minute) > 59) minute = "59";
    hourInput.value = hour;
    minuteInput.value = minute;
    input.value = hour.length === 2 && minute.length === 2 ? `${hour}:${minute}` : "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };
  hourInput.addEventListener("input", () => {
    syncManualValue();
    if (hourInput.value.length === 2) minuteInput.select();
  });
  minuteInput.addEventListener("input", syncManualValue);
  [hourInput, minuteInput].forEach((segment) => segment.addEventListener("blur", () => {
    if (segment.value.length === 1) segment.value = segment.value.padStart(2, "0");
    syncManualValue();
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }));
  manual.append(hourInput, separator, minuteInput);
  const pickerButton = document.createElement("button");
  pickerButton.type = "button";
  pickerButton.className = "five-minute-time-button";
  pickerButton.setAttribute("aria-label", "Uhrzeit auswählen");
  pickerButton.setAttribute("aria-expanded", "false");
  pickerButton.innerHTML = "<svg aria-hidden=\"true\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"8\"/><path d=\"M12 7v5l3 2\"/></svg>";
  const picker = document.createElement("span");
  picker.className = "five-minute-time-picker";
  picker.hidden = true;
  const hourList = document.createElement("span");
  hourList.className = "five-minute-time-column";
  hourList.setAttribute("role", "listbox");
  hourList.setAttribute("aria-label", "Stunde");
  const minuteList = document.createElement("span");
  minuteList.className = "five-minute-time-column";
  minuteList.setAttribute("role", "listbox");
  minuteList.setAttribute("aria-label", "Minute");
  const currentParts = () => /^([01]\d|2[0-3]):([0-5]\d)$/.exec(input.value) || ["", "00", "00"];
  const selectValue = (kind, value) => {
    const parts = currentParts();
    const hour = kind === "hour" ? value : parts[1];
    const minute = kind === "minute" ? value : parts[2];
    input.value = `${hour}:${minute}`;
    hourInput.value = hour;
    minuteInput.value = minute;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    [...picker.querySelectorAll("button")].forEach((button) => {
      const selected = button.dataset[kind] === value;
      if (button.dataset[kind]) button.classList.toggle("is-selected", selected);
    });
    if (kind === "minute") {
      picker.hidden = true;
      pickerButton.setAttribute("aria-expanded", "false");
      minuteInput.focus();
    }
  };
  for (let hour = 0; hour < 24; hour += 1) {
    const value = String(hour).padStart(2, "0");
    const option = document.createElement("button");
    option.type = "button";
    option.dataset.hour = value;
    option.textContent = value;
    option.setAttribute("role", "option");
    option.addEventListener("click", () => selectValue("hour", value));
    hourList.append(option);
  }
  for (let minute = 0; minute < 60; minute += 5) {
    const value = String(minute).padStart(2, "0");
    const option = document.createElement("button");
    option.type = "button";
    option.dataset.minute = value;
    option.textContent = value;
    option.setAttribute("role", "option");
    option.addEventListener("click", () => selectValue("minute", value));
    minuteList.append(option);
  }
  picker.append(hourList, minuteList);
  pickerButton.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelectorAll(".five-minute-time-picker").forEach((other) => { if (other !== picker) other.hidden = true; });
    picker.hidden = !picker.hidden;
    pickerButton.setAttribute("aria-expanded", String(!picker.hidden));
    if (!picker.hidden) {
      picker.querySelectorAll(".is-selected").forEach((option) => option.classList.remove("is-selected"));
      const [, hour, minute] = currentParts();
      const roundedMinute = String(Math.min(55, Math.round(Number(minute) / 5) * 5)).padStart(2, "0");
      const hourOption = hourList.querySelector(`[data-hour="${hour}"]`);
      const minuteOption = minuteList.querySelector(`[data-minute="${roundedMinute}"]`);
      hourOption?.classList.add("is-selected");
      minuteOption?.classList.add("is-selected");
      requestAnimationFrame(() => hourOption?.scrollIntoView({ block: "center" }));
      requestAnimationFrame(() => minuteOption?.scrollIntoView({ block: "center" }));
    }
  });
  picker.addEventListener("click", (event) => event.stopPropagation());
  shell.append(input, manual, pickerButton, picker);
  return shell;
}

document.addEventListener("click", () => {
  document.querySelectorAll(".five-minute-time-picker").forEach((picker) => { picker.hidden = true; });
  document.querySelectorAll(".five-minute-time-button").forEach((button) => button.setAttribute("aria-expanded", "false"));
});

[schoolDayStart, schoolDayEnd].forEach((input) => {
  const parent = input?.parentNode;
  if (!parent || input.closest(".five-minute-time-control")) return;
  const nextSibling = input.nextSibling;
  const control = createFiveMinuteTimeControl(input);
  parent.insertBefore(control, nextSibling);
});

function renderScheduleDisplayRows() {
  const rows = displayRowsDraft.map((row, index) => {
    const item = document.createElement("div");
    const hasConflict = index > 0 && row.start !== displayRowsDraft[index - 1].end;
    item.className = [
      "display-row-item",
      row.type === "break" ? "is-break" : "",
      hasConflict ? "has-time-conflict" : ""
    ].filter(Boolean).join(" ");
    if (hasConflict) {
      const relation = row.start < displayRowsDraft[index - 1].end ? "Überschneidung" : "Zeitlücke";
      item.title = `${relation}: Der Beginn stimmt nicht mit dem Ende des vorherigen Feldes überein.`;
    }
    const kind = document.createElement("span");
    kind.className = "display-row-kind";
    kind.textContent = row.type === "break" ? "Pause" : "Stunde";
    const label = document.createElement("input");
    label.type = "text";
    label.value = row.label;
    label.maxLength = 50;
    label.setAttribute("aria-label", `Bezeichnung für ${kind.textContent}`);
    label.addEventListener("input", () => { row.label = label.value; });
    const start = document.createElement("input");
    start.type = "time";
    start.step = "300";
    start.value = row.start;
    start.required = true;
    start.setAttribute("aria-label", `${kind.textContent} Beginn`);
    start.addEventListener("input", () => {
      row.start = start.value;
      updateScheduleDisplayConflicts();
    });
    const end = document.createElement("input");
    end.type = "time";
    end.step = "300";
    end.value = row.end;
    end.required = true;
    end.setAttribute("aria-label", `${kind.textContent} Ende`);
    end.addEventListener("input", () => {
      row.end = end.value;
      updateScheduleDisplayConflicts();
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "display-row-delete";
    remove.textContent = "Löschen";
    remove.setAttribute("aria-label", `${row.label || kind.textContent} löschen`);
    remove.addEventListener("click", () => {
      displayRowsDraft.splice(index, 1);
      renderScheduleDisplayRows();
    });
    item.append(kind, label, createFiveMinuteTimeControl(start), createFiveMinuteTimeControl(end), remove);
    return item;
  });
  scheduleDisplayRows.replaceChildren(...rows);
}

function updateScheduleDisplayConflicts() {
  [...scheduleDisplayRows.querySelectorAll(".display-row-item")].forEach((item, index) => {
    const row = displayRowsDraft[index];
    const previous = displayRowsDraft[index - 1];
    const hasConflict = Boolean(previous && row?.start && row.start !== previous.end);
    item.classList.toggle("has-time-conflict", hasConflict);
    if (!hasConflict) {
      item.removeAttribute("title");
      return;
    }
    const relation = row.start < previous.end ? "Überschneidung" : "Zeitlücke";
    item.title = `${relation}: Der Beginn stimmt nicht mit dem Ende des vorherigen Feldes überein.`;
  });
}

function addScheduleDisplayRow(type) {
  let previous = displayRowsDraft.at(-1);
  if (type === "lesson" && previous?.type === "lesson") {
    const pauseStart = previous.end;
    const pauseEnd = minutesToTime(timeToMinutes(pauseStart) + 15);
    displayRowsDraft.push({
      id: globalThis.crypto?.randomUUID?.() ?? `display-${Date.now()}-pause`,
      type: "break",
      label: "Pause",
      start: pauseStart,
      end: pauseEnd
    });
    previous = displayRowsDraft.at(-1);
  }
  const start = previous?.end || "07:00";
  const [hours, minutes] = start.split(":").map(Number);
  const duration = type === "break" ? 15 : 45;
  const endMinutes = hours * 60 + minutes + duration;
  displayRowsDraft.push({
    id: globalThis.crypto?.randomUUID?.() ?? `display-${Date.now()}`,
    type,
    label: type === "break" ? "Pause" : `${displayRowsDraft.filter((row) => row.type === "lesson").length + 1}. Stunde`,
    start,
    end: `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`
  });
  renderScheduleDisplayRows();
  scheduleDisplayRows.lastElementChild?.scrollIntoView({ block: "nearest" });
}

function getIndividualEventTimeDefaults(project) {
  const schedules = project.layers?.find((entry) => entry.type === "schedules")?.schedules || [];
  const starts = schedules
    .map((schedule) => schedule.displayDefaults?.dayStart)
    .filter(Boolean)
    .map(timeToMinutes);
  const ends = schedules
    .map((schedule) => schedule.displayDefaults?.dayEnd)
    .filter(Boolean)
    .map(timeToMinutes);
  return {
    start: minutesToTime(starts.length ? Math.min(...starts) : 8 * 60),
    end: minutesToTime(ends.length ? Math.max(...ends) : 16 * 60)
  };
}

function openClassTripDialog(project, trip = null) {
  classTripForm.reset();
  classTripEndDate.min = "";
  classTripDialogStatus.textContent = "";
  classTripDialog.dataset.projectId = project.id;
  const timeDefaults = getIndividualEventTimeDefaults(project);
  if (trip) {
    classTripDialog.dataset.tripId = trip.id;
    classTripDialogTitle.textContent = "Klassenfahrt bearbeiten";
    classTripSubmitButton.textContent = "Änderungen speichern";
    classTripName.value = trip.name || "";
    classTripClass.value = trip.className || "";
    classTripStartDate.value = trip.startDate || trip.date || "";
    classTripEndDate.value = trip.endDate || trip.startDate || trip.date || "";
    classTripEndDate.min = classTripStartDate.value;
    classTripStartTime.value = trip.startTime || timeDefaults.start;
    classTripEndTime.value = trip.endTime || timeDefaults.end;
    classTripOverridesLessons.checked = Boolean(trip.overridesLessons);
  } else {
    delete classTripDialog.dataset.tripId;
    classTripDialogTitle.textContent = "Klassenfahrt hinzufügen";
    classTripSubmitButton.textContent = "Klassenfahrt hinzufügen";
    classTripStartTime.value = timeDefaults.start;
    classTripEndTime.value = timeDefaults.end;
    classTripOverridesLessons.checked = false;
  }
  classTripStartDate.onchange = () => {
    classTripEndDate.min = classTripStartDate.value;
    if (!classTripEndDate.value || classTripEndDate.value < classTripStartDate.value) {
      classTripEndDate.value = classTripStartDate.value;
    }
  };
  classTripDialog.showModal();
  classTripName.focus();
}

function openSchoolProjectDialog(project, schoolProject = null, entryType = "school-project") {
  schoolProjectForm.reset();
  schoolProjectEndDate.min = "";
  schoolProjectDialogStatus.textContent = "";
  schoolProjectDialog.dataset.projectId = project.id;
  schoolProjectDialog.dataset.entryType = schoolProject?.type || entryType;
  const dialogLabels = {
    "school-project": ["Schulprojekt", "Schulprojekt"],
    vacation: ["Urlaub", "Urlaub"],
    "personal-appointment": ["Weiteren Termin", "Termin"]
  };
  const [noun, buttonNoun] = dialogLabels[schoolProjectDialog.dataset.entryType] || dialogLabels["school-project"];
  const dialogLabel = schoolProjectDialog.querySelector(".label");
  if (dialogLabel) dialogLabel.textContent = schoolProjectDialog.dataset.entryType === "school-project" ? "Termine" : "Persönliche Termine";
  schoolProjectName.placeholder = schoolProjectDialog.dataset.entryType === "vacation"
    ? "z. B. Sommerurlaub"
    : schoolProjectDialog.dataset.entryType === "personal-appointment"
      ? "z. B. Arzttermin"
      : "z. B. Theaterprojekt";
  const timeDefaults = getIndividualEventTimeDefaults(project);
  if (schoolProject) {
    schoolProjectDialog.dataset.entryId = schoolProject.id;
    schoolProjectDialogTitle.textContent = `${noun} bearbeiten`;
    schoolProjectSubmitButton.textContent = "Änderungen speichern";
    schoolProjectName.value = schoolProject.name || "";
    schoolProjectDate.value = schoolProject.startDate || "";
    schoolProjectEndDate.value = schoolProject.endDate || schoolProject.startDate || "";
    schoolProjectStartTime.value = schoolProject.startTime || timeDefaults.start;
    schoolProjectEndTime.value = schoolProject.endTime || timeDefaults.end;
    schoolProjectOverridesLessons.checked = Boolean(schoolProject.overridesLessons);
  } else {
    delete schoolProjectDialog.dataset.entryId;
    schoolProjectDialogTitle.textContent = `${noun} hinzufügen`;
    schoolProjectSubmitButton.textContent = `${buttonNoun} hinzufügen`;
    schoolProjectStartTime.value = timeDefaults.start;
    schoolProjectEndTime.value = timeDefaults.end;
    schoolProjectOverridesLessons.checked = false;
  }
  schoolProjectEndDate.min = schoolProjectDate.value;
  schoolProjectDialog.showModal();
  schoolProjectName.focus();
}

function formatIndividualEventSchedule(entry) {
  const dateText = entry.startDate === entry.endDate
    ? formatGermanDate(entry.startDate)
    : `${formatGermanDate(entry.startDate)}–${formatGermanDate(entry.endDate)}`;
  return entry.startTime && entry.endTime
    ? `${dateText} · ${entry.startTime}–${entry.endTime}`
    : dateText;
}

function createPersonalAppointmentGroupsSection(project, layer) {
  layer.groups = Array.isArray(layer.groups) ? layer.groups : [];
  const section = document.createElement("section");
  section.className = "property-section";
  const title = document.createElement("h3");
  title.textContent = "Weitere Termine";
  const intro = document.createElement("p");
  intro.textContent = "Organisieren Sie persönliche Termine in eigenen Gruppen.";
  const addGroupButton = document.createElement("button");
  addGroupButton.type = "button";
  addGroupButton.className = "secondary-button primary-action appointment-add-group";
  addGroupButton.textContent = "Gruppe hinzufügen";
  addGroupButton.addEventListener("click", () => openAppointmentGroupDialog(project, null, "individual"));
  const list = document.createElement("div");
  list.className = "appointment-group-list";
  if (!layer.groups.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch keine persönliche Termingruppe angelegt.";
    list.append(empty);
  } else {
    layer.groups.forEach((group) => {
      group.appointments = Array.isArray(group.appointments) ? group.appointments : [];
      const card = document.createElement("section");
      card.className = "appointment-group-card";
      card.style.setProperty("--appointment-group-color", group.color || "#c9c1dd");
      const head = document.createElement("div");
      head.className = "appointment-group-head";
      const name = document.createElement("h3");
      name.textContent = group.name;
      head.append(name, createAppointmentMenu(project, group, null, "individual"));
      const add = document.createElement("button");
      add.type = "button";
      add.className = "secondary-button appointment-add-button";
      add.textContent = "Termin hinzufügen";
      add.addEventListener("click", () => openAppointmentDialog(project, group, null, "individual"));
      const entries = document.createElement("div");
      entries.className = "appointment-entry-list";
      if (!group.appointments.length) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "In dieser Gruppe sind noch keine Termine eingetragen.";
        entries.append(empty);
      } else {
        group.appointments.slice().sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`)).forEach((appointment) => {
          const row = document.createElement("article");
          row.className = "appointment-entry";
          const copy = document.createElement("div");
          const entryName = document.createElement("strong");
          entryName.textContent = appointment.name;
          const date = document.createElement("span");
          date.textContent = `${formatGermanDate(appointment.date)} · ${appointment.startTime}–${appointment.endTime}`;
          copy.append(entryName, date);
          row.append(copy, createAppointmentMenu(project, group, appointment, "individual"));
          entries.append(row);
        });
      }
      card.append(head, add, entries);
      list.append(card);
    });
  }
  section.append(title, intro, addGroupButton, list);
  return section;
}

function renderIndividualProjectsProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Persönliche Termine";

  const layer = getProjectLayer(project, "individual");
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const trips = layer.entries.filter((entry) => entry.type === "vacation");

  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Erfassen Sie Urlaub und weitere persönliche Termine als eigene Kalendereinträge.";
  head.append(title, intro);

  const section = document.createElement("section");
  section.className = "property-section";
  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = "Urlaub";

  const form = document.createElement("form");
  form.className = "trip-form";
  const fields = document.createElement("div");
  fields.className = "property-list";

  const nameRow = document.createElement("label");
  nameRow.className = "property-row";
  const nameLabel = document.createElement("span");
  nameLabel.textContent = "Bezeichnung";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.maxLength = 100;
  nameInput.required = true;
  nameInput.autocomplete = "off";
  nameInput.placeholder = "z. B. Klassenfahrt 8a";
  nameRow.append(nameLabel, nameInput);

  const dateRow = document.createElement("div");
  dateRow.className = "property-row";
  const dateLabel = document.createElement("span");
  dateLabel.textContent = "Datum von / bis";
  const dateFields = document.createElement("div");
  dateFields.className = "trip-date-fields";
  const startInput = document.createElement("input");
  startInput.type = "date";
  startInput.required = true;
  startInput.setAttribute("aria-label", "Klassenfahrt von");
  const endInput = document.createElement("input");
  endInput.type = "date";
  endInput.required = true;
  endInput.setAttribute("aria-label", "Klassenfahrt bis");
  dateFields.append(startInput, endInput);
  dateRow.append(dateLabel, dateFields);

  const status = document.createElement("p");
  status.className = "property-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.className = "secondary-button primary-action trip-add-button";
  addButton.textContent = "Weitere Klassenfahrt hinzufügen";

  fields.append(nameRow, dateRow);
  form.append(fields, addButton, status);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (!name || !startInput.value || !endInput.value) {
      status.textContent = "Bitte Bezeichnung sowie Anfangs- und Enddatum eintragen.";
      return;
    }
    if (endInput.value < startInput.value) {
      status.textContent = "Das Enddatum darf nicht vor dem Anfangsdatum liegen.";
      endInput.focus();
      return;
    }
    layer.entries.push({
      id: globalThis.crypto?.randomUUID?.() ?? `class-trip-${Date.now()}`,
      type: "class-trip",
      name,
      startDate: startInput.value,
      endDate: endInput.value,
      createdAt: new Date().toISOString()
    });
    saveProjects();
    renderIndividualProjectsProperties(project);
  });

  const launcherButton = document.createElement("button");
  launcherButton.type = "button";
  launcherButton.className = "secondary-button primary-action trip-add-button";
  launcherButton.textContent = "Urlaub hinzufügen";
  launcherButton.addEventListener("click", () => openSchoolProjectDialog(project, null, "vacation"));

  const list = document.createElement("div");
  list.className = "trip-entry-list";
  if (!trips.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch kein Urlaub eingetragen.";
    list.append(empty);
  } else {
    trips
      .slice()
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .forEach((trip) => {
        const row = document.createElement("article");
        row.className = "trip-entry";
        const copy = document.createElement("div");
        const tripName = document.createElement("strong");
        tripName.textContent = trip.name;
        const dates = document.createElement("span");
        dates.textContent = formatIndividualEventSchedule(trip);
        copy.append(tripName);
        if (trip.className) {
          const classLabel = document.createElement("span");
          classLabel.textContent = `Klasse ${trip.className}`;
          copy.append(classLabel);
        }
        copy.append(dates);
        const menuShell = document.createElement("div");
        menuShell.className = "schedule-menu-shell";
        const menuButton = document.createElement("button");
        menuButton.type = "button";
        menuButton.className = "schedule-menu-button";
        menuButton.setAttribute("aria-label", `Menü für ${trip.name}`);
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
        const menu = document.createElement("div");
        menu.className = "schedule-menu trip-entry-menu";
        menu.hidden = true;
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Bearbeiten";
        editButton.addEventListener("click", () => {
          menu.hidden = true;
          menuButton.setAttribute("aria-expanded", "false");
          openSchoolProjectDialog(project, trip, "vacation");
        });
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "schedule-menu-delete";
        deleteButton.textContent = "Löschen";
        deleteButton.dataset.projectId = project.id;
        deleteButton.dataset.tripId = trip.id;
        deleteButton.setAttribute("aria-label", `${trip.name} löschen – gedrückt halten`);
        deleteButton.addEventListener("pointerdown", beginScheduleDeleteHold);
        deleteButton.addEventListener("pointerup", finishScheduleDeleteHold);
        deleteButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
        deleteButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
        menuButton.addEventListener("click", () => {
          menu.hidden = !menu.hidden;
          menuButton.setAttribute("aria-expanded", String(!menu.hidden));
        });
        menu.append(editButton, deleteButton);
        menuShell.append(menuButton, menu);
        row.append(copy, menuShell);
        list.append(row);
      });
  }

  layer.appliedEntries = structuredClone(layer.entries);
  layer.appliedAt = new Date().toISOString();

  section.append(sectionTitle, launcherButton, list);
  const appointmentGroups = createPersonalAppointmentGroupsSection(project, layer);
  sheet.append(head, section, appointmentGroups);
  projectDetail.replaceChildren(sheet);
  saveProjects();
  renderActiveCalendar(project);
}

function getConfiguredHigherEducationPeriods(project) {
  const models = ensureProjectPeriodSettings(project).models;
  const periods = [
    ["semesters.first", "Erstes Semester", "Semesterferien", models.semesters?.first],
    ["semesters.second", "Zweites Semester", "Semesterferien", models.semesters?.second],
    ["trimesters.first", "Erstes Trimester", "Trimesterferien", models.trimesters?.first],
    ["trimesters.second", "Zweites Trimester", "Trimesterferien", models.trimesters?.second],
    ["trimesters.third", "Drittes Trimester", "Trimesterferien", models.trimesters?.third]
  ];
  return periods
    .filter(([, , , period]) => period?.startDate && period?.endDate && period.endDate >= period.startDate)
    .map(([id, label, holidayLabel, period]) => ({
      id,
      label,
      holidayLabel,
      startDate: period.startDate,
      endDate: period.endDate
    }));
}

function getHigherEducationHolidayEntries(project, settings) {
  return getConfiguredHigherEducationPeriods(project).flatMap((period) => {
    const holiday = settings.higherEducationBreaks?.[period.id];
    if (!holiday?.startDate || !holiday?.endDate || holiday.endDate < holiday.startDate) return [];
    return [{
      id: `higher-education-${period.id}`,
      name: `${period.holidayLabel} · ${period.label}`,
      startDate: holiday.startDate,
      endDate: holiday.endDate,
      type: "school-holiday",
      sourceId: `manual:${period.id}`
    }];
  });
}

function getSchoolTypeLabel(type) {
  return getHolidayScopeLabel(type);
}

function getSchoolAllowedPeriodTabs(type) {
  if (type === "university") return ["semesters", "trimesters"];
  if (type === "vocational") return ["halves", "alternatingWeeks"];
  return ["halves", "semesters", "alternatingWeeks"];
}

function getSchoolHigherEducationEntries(school) {
  const definitions = [
    ["semesters.first", "Semesterferien · Erstes Semester", school.periods.models.semesters?.first],
    ["semesters.second", "Semesterferien · Zweites Semester", school.periods.models.semesters?.second],
    ["trimesters.first", "Trimesterferien · Erstes Trimester", school.periods.models.trimesters?.first],
    ["trimesters.second", "Trimesterferien · Zweites Trimester", school.periods.models.trimesters?.second],
    ["trimesters.third", "Trimesterferien · Drittes Trimester", school.periods.models.trimesters?.third]
  ];
  return definitions.flatMap(([id, name]) => {
    const range = school.higherEducationBreaks?.[id];
    if (!range?.startDate || !range?.endDate || range.endDate < range.startDate) return [];
    return [{
      id: `higher-education-${school.id}-${id}`,
      name,
      startDate: range.startDate,
      endDate: range.endDate,
      type: "school-holiday",
      sourceId: `manual:${id}`
    }];
  });
}

async function refreshSchoolHolidayEntries(project, school) {
  if (school.type === "university") {
    school.holidayEntries = getSchoolHigherEducationEntries(school);
  } else {
    const startYear = Number(school.periods.schoolYear.startDate?.slice(0, 4));
    const endYear = Number(school.periods.schoolYear.endDate?.slice(0, 4));
    if (!startYear || !endYear) throw new Error("Bitte zuerst gültige Schuljahresgrenzen festlegen.");
    school.holidayEntries = (await fetchSchoolHolidays({
      federalState: school.federalState,
      startYear,
      endYear,
      schoolType: school.type,
      scopeTypes: [school.type]
    })).map((entry) => ({ ...entry, schoolId: school.id, scopeType: school.type }));
  }
  if (school.federalState) {
    try {
      school.publicHolidayEntries = (await fetchPublicHolidays({
        federalState: school.federalState,
        validFrom: school.periods.schoolYear.startDate,
        validTo: school.periods.schoolYear.endDate
      })).map((entry) => ({ ...entry, schoolId: school.id, scopeType: school.type }));
      delete school.publicHolidayError;
    } catch (error) {
      school.publicHolidayError = error instanceof Error ? error.message : "Feiertage konnten nicht geladen werden.";
    }
  } else {
    school.publicHolidayEntries = [];
  }
  rebuildSchoolHolidayEntries(getProjectLayer(project, "holidays"));
}

function openSchoolDialog(project, school = null) {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog school-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const head = document.createElement("div");
  head.innerHTML = `<span class="label">Schulen</span><h2>${school ? "Schule bearbeiten" : "Schule hinzufügen"}</h2>`;
  const grid = document.createElement("div");
  grid.className = "class-trip-dialog-grid";
  const makeField = (labelText, control) => {
    const label = document.createElement("label");
    label.className = "dialog-field";
    const span = document.createElement("span");
    span.textContent = labelText;
    label.append(span, control);
    return label;
  };
  const type = document.createElement("select");
  type.required = true;
  HOLIDAY_SCOPE_OPTIONS.forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    option.selected = value === (school?.type || "general");
    type.append(option);
  });
  const name = document.createElement("input");
  name.required = true;
  name.maxLength = 100;
  name.placeholder = "z. B. Goethe-Gymnasium";
  name.value = school?.name || "";
  const state = document.createElement("select");
  FEDERAL_STATES.forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    option.selected = value === (school?.federalState || "MV");
    state.append(option);
  });
  const stateField = makeField("Bundesland / Geltungsraum", state);
  const selectedSchoolYear = Number(school?.periods?.schoolYear?.startDate?.slice(0, 4)) || new Date().getFullYear();
  const schoolYear = document.createElement("select");
  schoolYear.required = true;
  schoolYear.append(createSchoolYearOptions(selectedSchoolYear));
  const dates = document.createElement("div");
  dates.className = "class-trip-date-fields";
  const start = document.createElement("input");
  start.type = "date";
  start.required = true;
  start.value = school?.periods?.schoolYear?.startDate || `${selectedSchoolYear}-08-01`;
  const end = document.createElement("input");
  end.type = "date";
  end.required = true;
  end.value = school?.periods?.schoolYear?.endDate || `${selectedSchoolYear + 1}-07-31`;
  dates.append(makeField("Zeitraum von", start), makeField("bis", end));
  const status = document.createElement("p");
  status.className = "property-status";
  let rangeRequestId = 0;
  const syncSchoolYearDates = async () => {
    const year = Number(schoolYear.value);
    if (!year) return;
    start.value = `${year}-08-01`;
    end.value = `${year + 1}-07-31`;
    if (type.value === "university") return;
    const requestId = ++rangeRequestId;
    status.className = "property-status";
    status.textContent = "Schuljahreszeitraum wird aus den Ferien des Bundeslands ermittelt …";
    try {
      const holidays = await fetchSchoolHolidays({
        federalState: state.value,
        startYear: year,
        endYear: year + 1,
        schoolType: type.value,
        scopeTypes: [type.value],
        validFrom: `${year}-06-01`,
        validTo: `${year + 1}-09-30`
      });
      if (requestId !== rangeRequestId) return;
      const summerBreaks = holidays
        .filter((entry) => /sommerferien/i.test(entry.name))
        .sort((a, b) => a.startDate.localeCompare(b.startDate));
      if (summerBreaks.length >= 2) {
        start.value = addDaysToDateKey(summerBreaks[0].endDate, 1);
        end.value = addDaysToDateKey(summerBreaks[1].startDate, -1);
        status.textContent = "Der Zeitraum wurde anhand der Sommerferien vorausgefüllt und kann geändert werden.";
      } else {
        status.textContent = "Der Zeitraum wurde mit den allgemeinen Schuljahresgrenzen vorausgefüllt und kann geändert werden.";
      }
    } catch {
      if (requestId === rangeRequestId) status.textContent = "Der Zeitraum wurde mit den allgemeinen Schuljahresgrenzen vorausgefüllt und kann geändert werden.";
    }
  };
  schoolYear.addEventListener("change", syncSchoolYearDates);
  state.addEventListener("change", syncSchoolYearDates);
  const syncType = (refreshRange = false) => {
    stateField.hidden = false;
    if (refreshRange) syncSchoolYearDates();
  };
  type.addEventListener("change", () => syncType(true));
  syncType();
  grid.append(
    makeField("Schulart", type),
    makeField("Bezeichnung der Schule", name),
    stateField,
    makeField("Schuljahr", schoolYear),
    dates
  );
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "secondary-button";
  cancel.textContent = "Abbrechen";
  cancel.addEventListener("click", () => dialog.close());
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "secondary-button primary-action";
  submit.textContent = school ? "Änderungen speichern" : "Schule hinzufügen";
  actions.append(cancel, submit);
  form.append(head, grid, status, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (end.value < start.value) {
      status.className = "property-status is-error";
      status.textContent = "Das Ende des Schuljahres muss nach dessen Beginn liegen.";
      return;
    }
    const target = school || {
      id: globalThis.crypto?.randomUUID?.() ?? `school-${Date.now()}`,
      periods: createSchoolPeriods({}, start.value, end.value),
      higherEducationBreaks: {},
      holidayEntries: []
    };
    target.name = name.value.trim();
    target.type = type.value;
    target.federalState = state.value;
    target.periods.schoolYear = { startDate: start.value, endDate: end.value };
    syncHalfYearOuterBounds(target.periods);
    if (!school) getProjectLayer(project, "holidays").schools.push(target);
    activeSchoolId = target.id;
    try {
      await refreshSchoolHolidayEntries(project, target);
    } catch (error) {
      target.holidayError = error instanceof Error ? error.message : "Ferien konnten noch nicht geladen werden.";
    }
    syncScheduleValidityPeriods(project);
    saveProjects();
    dialog.close();
    renderProjectBrowser();
    renderSchoolsProperties(project);
    renderActiveCalendar(project);
  });
  dialog.showModal();
  name.focus();
}

function appendHigherEducationBreakFields(panel, breaksDraft, definitions) {
  definitions.forEach(([id, label]) => {
    const section = document.createElement("section");
    section.className = "half-year-period school-break-period";
    const title = document.createElement("h4");
    title.textContent = label;
    const range = document.createElement("div");
    range.className = "half-year-range";
    const current = breaksDraft[id] || { startDate: "", endDate: "" };
    breaksDraft[id] = current;
    [["von", "startDate"], ["bis", "endDate"]].forEach(([text, key]) => {
      const field = document.createElement("label");
      field.textContent = text;
      const input = document.createElement("input");
      input.type = "date";
      input.value = current[key] || "";
      input.addEventListener("input", () => { current[key] = input.value; });
      input.addEventListener("change", () => { current[key] = input.value; });
      field.append(input);
      range.append(field);
    });
    section.append(title, range);
    panel.append(section);
  });
}

function renderSchoolEditor(project, school) {
  syncHalfYearOuterBounds(school.periods);
  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const titleLine = document.createElement("div");
  titleLine.className = "schedule-title-line";
  const title = document.createElement("h3");
  title.textContent = school.name;
  const menuShell = document.createElement("div");
  menuShell.className = "schedule-menu-shell";
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "schedule-menu-button";
  menuButton.setAttribute("aria-label", `Menü für ${school.name}`);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const edit = document.createElement("button");
  edit.type = "button";
  edit.textContent = "Stammdaten bearbeiten";
  edit.addEventListener("click", () => {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    openSchoolDialog(project, school);
  });
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "schedule-menu-delete";
  remove.textContent = "Schule löschen";
  remove.title = "Zum Löschen gedrückt halten";
  remove.dataset.projectId = project.id;
  remove.dataset.schoolId = school.id;
  remove.addEventListener("pointerdown", beginScheduleDeleteHold);
  remove.addEventListener("pointerup", finishScheduleDeleteHold);
  remove.addEventListener("pointercancel", cancelScheduleDeleteHold);
  remove.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
  menuButton.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(edit, remove);
  menuShell.append(menuButton, menu);
  titleLine.append(title, menuShell);
  const meta = document.createElement("p");
  meta.textContent = `${getSchoolTypeLabel(school.type)}${school.federalState ? ` · ${FEDERAL_STATES.find(([code]) => code === school.federalState)?.[1] || school.federalState}` : ""}`;
  head.append(titleLine, meta);
  const draft = structuredClone(school.periods);
  const breaksDraft = structuredClone(school.higherEducationBreaks || {});
  const movableDaysDraft = structuredClone(school.movableSchoolFreeDays || []);
  const section = document.createElement("section");
  section.className = "property-section project-period-section";
  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = "Gültigkeitszeiten";
  const yearRow = document.createElement("div");
  yearRow.className = "property-row project-school-year-row";
  const yearLabel = document.createElement("span");
  yearLabel.textContent = "Schuljahr";
  const yearFields = document.createElement("div");
  yearFields.className = "project-school-year-fields";
  const start = document.createElement("input"); start.type = "date"; start.value = draft.schoolYear.startDate;
  const end = document.createElement("input"); end.type = "date"; end.value = draft.schoolYear.endDate;
  const startLabel = document.createElement("label"); startLabel.textContent = "von"; startLabel.append(start);
  const endLabel = document.createElement("label"); endLabel.textContent = "bis"; endLabel.append(end);
  yearFields.append(startLabel, endLabel); yearRow.append(yearLabel, yearFields);
  const tabs = document.createElement("div");
  tabs.className = "project-period-tabs";
  tabs.setAttribute("role", "tablist");
  const panels = document.createElement("div");
  const allowed = getSchoolAllowedPeriodTabs(school.type);
  let abController = null;
  const selectTab = (id) => {
    draft.activeTab = id;
    [...tabs.children].forEach((button) => button.setAttribute("aria-selected", String(button.dataset.periodTab === id)));
    [...panels.children].forEach((panel) => { panel.hidden = panel.dataset.periodPanel !== id; });
  };
  const definitions = {
    halves: ["Halbjahre", [["first", "1. Halbjahr"], ["second", "2. Halbjahr"]]],
    semesters: ["Semester", [["first", "Erstes Semester"], ["second", "Zweites Semester"]]],
    trimesters: ["Trimester", [["first", "Erstes Trimester"], ["second", "Zweites Trimester"], ["third", "Drittes Trimester"]]],
    alternatingWeeks: ["A/B-Woche", []]
  };
  allowed.forEach((id) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.periodTab = id;
    button.textContent = definitions[id][0];
    button.addEventListener("click", () => selectTab(id));
    const panel = document.createElement("section");
    panel.className = "project-period-panel";
    panel.dataset.periodPanel = id;
    if (id === "halves") renderHalfYearConfiguration(panel, draft.models.halves);
    else if (id === "semesters" && school.type === "general") {
      renderHalfYearConfiguration(
        panel,
        draft.models.semesters,
        definitions.semesters[1],
        "Legen Sie die Grenzen beider Semester und bei Bedarf Zensurenstopps für bestimmte Klassenstufen fest."
      );
    }
    else if (id === "semesters" || id === "trimesters") {
      renderPeriodRanges(panel, draft.models[id], definitions[id][1], `Legen Sie die Grenzen für ${definitions[id][0]} fest.`);
      if (school.type === "university") appendHigherEducationBreakFields(panel, breaksDraft,
        definitions[id][1].map(([key, text]) => [`${id}.${key}`, `${id === "semesters" ? "Semesterferien" : "Trimesterferien"} · ${text}`]));
    } else {
      abController = renderAlternatingWeeksConfiguration(panel, draft.models.alternatingWeeks, () => ({ startDate: start.value, endDate: end.value }));
    }
    tabs.append(button); panels.append(panel);
  });
  selectTab(allowed.includes(draft.activeTab) ? draft.activeTab : allowed[0]);
  section.append(sectionTitle, yearRow, tabs, panels);
  const holidaySection = document.createElement("section");
  holidaySection.className = "property-section";
  const holidayTitle = document.createElement("h3");
  holidayTitle.textContent = school.type === "university" ? "Hochschulferien" : "Ferien";
  const holidayList = document.createElement("div");
  holidayList.className = "holiday-entry-list";
  (school.holidayEntries || []).forEach((entry) => {
    const row = document.createElement("div"); row.className = "holiday-entry";
    const name = document.createElement("strong"); name.textContent = entry.name;
    const dates = document.createElement("span"); dates.textContent = `${formatGermanDate(entry.startDate)}–${formatGermanDate(entry.endDate)}`;
    row.append(name, dates); holidayList.append(row);
  });
  if (!holidayList.children.length) {
    const empty = document.createElement("p"); empty.className = "empty-state";
    empty.textContent = school.holidayError || "Noch keine Ferienzeiten gespeichert."; holidayList.append(empty);
  }
  holidaySection.append(holidayTitle, holidayList);
  const publicHolidaySection = document.createElement("section");
  publicHolidaySection.className = "property-section";
  const publicHolidayTitle = document.createElement("h3");
  publicHolidayTitle.textContent = "Gesetzliche Feiertage";
  const publicHolidayList = document.createElement("div");
  publicHolidayList.className = "holiday-entry-list";
  (school.publicHolidayEntries || []).forEach((entry) => {
    const row = document.createElement("div"); row.className = "holiday-entry";
    const name = document.createElement("strong"); name.textContent = entry.name;
    const dates = document.createElement("span"); dates.textContent = formatGermanDate(entry.startDate);
    row.append(name, dates); publicHolidayList.append(row);
  });
  if (!publicHolidayList.children.length) {
    const empty = document.createElement("p"); empty.className = "empty-state";
    empty.textContent = school.publicHolidayError || "Noch keine gesetzlichen Feiertage gespeichert.";
    publicHolidayList.append(empty);
  }
  publicHolidaySection.append(publicHolidayTitle, publicHolidayList);

  const movableSection = document.createElement("section");
  movableSection.className = "property-section";
  const movableTitle = document.createElement("h3");
  movableTitle.textContent = "Bewegliche schulfreie Tage";
  const movableList = document.createElement("div");
  movableList.className = "holiday-entry-list";
  const renderMovableDays = () => {
    movableList.replaceChildren();
    movableDaysDraft.forEach((entry, index) => {
      const row = document.createElement("div"); row.className = "holiday-entry school-movable-day-row";
      const name = document.createElement("input"); name.type = "text"; name.placeholder = "Bezeichnung"; name.value = entry.name || "";
      name.addEventListener("input", () => { entry.name = name.value; });
      const date = document.createElement("input"); date.type = "date"; date.value = entry.startDate || "";
      date.addEventListener("input", () => { entry.startDate = date.value; entry.endDate = date.value; });
      const remove = document.createElement("button"); remove.type = "button"; remove.className = "display-row-delete"; remove.textContent = "Löschen";
      remove.addEventListener("click", () => { movableDaysDraft.splice(index, 1); renderMovableDays(); });
      row.append(name, date, remove); movableList.append(row);
    });
    if (!movableDaysDraft.length) {
      const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = "Noch kein beweglicher schulfreier Tag eingetragen."; movableList.append(empty);
    }
  };
  renderMovableDays();
  const addMovable = document.createElement("button"); addMovable.type = "button"; addMovable.className = "secondary-button"; addMovable.textContent = "Schulfreien Tag hinzufügen";
  addMovable.addEventListener("click", () => {
    movableDaysDraft.push({ id: globalThis.crypto?.randomUUID?.() ?? `school-free-${Date.now()}`, name: "", startDate: "", endDate: "", type: "school-free-day" });
    renderMovableDays();
  });
  movableSection.append(movableTitle, movableList, addMovable);
  const status = document.createElement("p"); status.className = "property-status";
  let schoolAutosaveTimer = null;
  let schoolAutosaveVersion = 0;
  let savedHolidayKey = JSON.stringify([school.periods.schoolYear, school.higherEducationBreaks]);
  const saveSchoolSettings = async () => {
    const version = ++schoolAutosaveVersion;
    if (!start.value || !end.value || end.value < start.value) {
      status.className = "property-status is-error"; status.textContent = "Bitte gültige Schuljahresgrenzen eintragen."; return;
    }
    draft.schoolYear = { startDate: start.value, endDate: end.value };
    syncHalfYearOuterBounds(draft);
    abController?.sync();
    school.periods = structuredClone(draft);
    school.higherEducationBreaks = structuredClone(breaksDraft);
    school.movableSchoolFreeDays = movableDaysDraft
      .filter((entry) => entry.name.trim() && entry.startDate)
      .map((entry) => ({ ...entry, endDate: entry.startDate, type: "school-free-day" }));
    const nextHolidayKey = JSON.stringify([school.periods.schoolYear, school.higherEducationBreaks]);
    if (nextHolidayKey !== savedHolidayKey) {
      try { await refreshSchoolHolidayEntries(project, school); delete school.holidayError; savedHolidayKey = nextHolidayKey; }
      catch (error) { school.holidayError = error instanceof Error ? error.message : "Ferien konnten nicht geladen werden."; }
    } else {
      rebuildSchoolHolidayEntries(getProjectLayer(project, "holidays"));
    }
    if (version !== schoolAutosaveVersion) return;
    syncScheduleValidityPeriods(project); saveProjects(); renderProjectBrowser(); renderActiveCalendar(project);
    status.className = "property-status is-success"; status.textContent = "Automatisch gespeichert ✓";
  };
  const scheduleSchoolAutosave = () => {
    clearTimeout(schoolAutosaveTimer);
    status.className = "property-status";
    status.textContent = "Wird gespeichert …";
    schoolAutosaveTimer = setTimeout(saveSchoolSettings, 450);
  };
  sheet.addEventListener("input", scheduleSchoolAutosave);
  sheet.addEventListener("change", scheduleSchoolAutosave);
  sheet.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("button") : null;
    if (button && !button.closest(".schedule-menu-shell") && button !== addMovable) setTimeout(scheduleSchoolAutosave, 0);
  });
  addMovable.addEventListener("click", () => setTimeout(scheduleSchoolAutosave, 0));
  sheet.append(head, section, holidaySection, publicHolidaySection, movableSection, status);
  projectDetail.replaceChildren(sheet);
}

function renderSchoolsProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Schulen";
  const schools = ensureSchools(project);
  if (activeSchoolId) {
    const school = schools.find((entry) => entry.id === activeSchoolId);
    if (school) { renderSchoolEditor(project, school); return; }
    activeSchoolId = null;
  }
  const sheet = document.createElement("section"); sheet.className = "property-sheet";
  const head = document.createElement("div"); head.className = "property-sheet-head";
  const title = document.createElement("h3"); title.textContent = project.name;
  const intro = document.createElement("p"); intro.textContent = "Schulen bündeln Schulart, Bundesland, Schuljahr, Zeitmodelle und Ferien.";
  head.append(title, intro);
  const add = document.createElement("button"); add.type = "button"; add.className = "secondary-button primary-action school-add-button"; add.textContent = "Schule hinzufügen";
  add.addEventListener("click", () => openSchoolDialog(project));
  const list = document.createElement("div"); list.className = "schedule-overview-list school-overview-list";
  schools.forEach((school) => {
    const card = document.createElement("button"); card.type = "button"; card.className = "schedule-overview-card school-overview-card";
    const name = document.createElement("strong"); name.textContent = school.name;
    const type = document.createElement("span"); type.textContent = getSchoolTypeLabel(school.type);
    const dates = document.createElement("small"); dates.textContent = `${formatGermanDate(school.periods.schoolYear.startDate)}–${formatGermanDate(school.periods.schoolYear.endDate)}`;
    card.append(name, type, dates); card.addEventListener("click", () => selectSchool(project.id, school.id)); list.append(card);
  });
  if (!schools.length) { const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = "Noch keine Schule angelegt."; list.append(empty); }
  sheet.append(head, add, list); projectDetail.replaceChildren(sheet);
}

const HOLIDAY_SCOPE_OPTIONS = [
  ["general", "Allgemeinbildende Schule"],
  ["vocational", "Berufliche Schule"],
  ["university", "Hochschule"]
];

function getHolidayScopeLabel(scopeType) {
  return HOLIDAY_SCOPE_OPTIONS.find(([value]) => value === scopeType)?.[1] || scopeType;
}

function ensureScopedHolidaySettings(project, layer) {
  const currentYear = new Date().getFullYear();
  const settings = layer.settings && typeof layer.settings === "object" ? layer.settings : {};
  const legacyType = settings.schoolType === "vocational"
    ? "vocational"
    : settings.schoolType === "university"
      ? "university"
      : settings.schoolType === "general" || settings.schoolType === "all" ? "general" : null;
  const initialScopeTypes = Array.isArray(settings.scopeTypes)
    ? settings.scopeTypes
    : legacyType ? [legacyType] : Array.isArray(layer.entries) && layer.entries.length ? ["general"] : [];
  const scopeTypes = [...new Set(
    initialScopeTypes
      .map((type) => type === "all" ? "general" : type)
      .filter((type) => HOLIDAY_SCOPE_OPTIONS.some(([value]) => value === type))
  )];
  settings.scopeTypes = HOLIDAY_SCOPE_OPTIONS
    .map(([value]) => value)
    .filter((value) => scopeTypes.includes(value));
  const isAddingScope = Boolean(settings.isAddingScope || !settings.scopeTypes.length);
  settings.activeScopeType = isAddingScope
    ? null
    : settings.scopeTypes.includes(settings.activeScopeType)
      ? settings.activeScopeType
      : settings.scopeTypes[0] || null;
  settings.isAddingScope = isAddingScope;
  settings.scopeConfigs = settings.scopeConfigs && typeof settings.scopeConfigs === "object"
    ? settings.scopeConfigs
    : {};
  settings.scopeTypes.forEach((scopeType) => {
    const existing = settings.scopeConfigs[scopeType] || {};
    settings.scopeConfigs[scopeType] = {
      federalState: existing.federalState || settings.federalState || "MV",
      startYear: Number(existing.startYear ?? settings.startYear) || currentYear,
      endYear: Number(existing.endYear ?? settings.endYear) || currentYear + 1,
      higherEducationBreaks: existing.higherEducationBreaks && typeof existing.higherEducationBreaks === "object"
        ? existing.higherEducationBreaks
        : settings.higherEducationBreaks && typeof settings.higherEducationBreaks === "object"
          ? settings.higherEducationBreaks
          : {}
    };
  });
  settings.schoolType = settings.activeScopeType;
  layer.settings = settings;
  layer.scopeData = layer.scopeData && typeof layer.scopeData === "object" ? layer.scopeData : {};
  settings.scopeTypes.forEach((scopeType) => {
    layer.scopeData[scopeType] = layer.scopeData[scopeType] && typeof layer.scopeData[scopeType] === "object"
      ? layer.scopeData[scopeType]
      : {};
  });
  if (!layer.scopedEntriesMigrationVersion && Array.isArray(layer.entries) && layer.entries.length) {
    settings.scopeTypes.forEach((scopeType) => {
      layer.scopeData[scopeType].appliedEntries = [];
    });
    const defaultSchoolScope = settings.scopeTypes.find((scopeType) => scopeType === "general" || scopeType === "vocational")
      || settings.scopeTypes[0];
    layer.entries.forEach((entry) => {
      const inferredScope = entry.scopeType
        || (String(entry.sourceId || "").startsWith("manual:") && settings.scopeTypes.includes("university")
          ? "university"
          : defaultSchoolScope);
      const scopeState = layer.scopeData[inferredScope] || layer.scopeData[defaultSchoolScope];
      scopeState.appliedEntries = Array.isArray(scopeState.appliedEntries) ? scopeState.appliedEntries : [];
      scopeState.appliedEntries.push({ ...entry, scopeType: inferredScope });
    });
    layer.scopedEntriesMigrationVersion = 1;
  }
  if (!layer.scopedEntriesMigrationVersion) layer.scopedEntriesMigrationVersion = 1;
  return settings;
}

function rebuildScopedHolidayEntries(layer) {
  const scopeTypes = layer.settings?.scopeTypes || [];
  layer.entries = scopeTypes.flatMap((scopeType) => (
    (layer.scopeData?.[scopeType]?.appliedEntries || []).map((entry) => ({ ...entry, scopeType }))
  ));
}

async function refreshScopedHolidayPreview(project, layer, scopeType, settingsKey) {
  const scopeState = layer.scopeData[scopeType];
  const config = structuredClone(layer.settings.scopeConfigs[scopeType]);
  scopeState.previewLoadingKey = settingsKey;
  delete scopeState.previewError;
  try {
    const entries = scopeType === "university"
      ? getHigherEducationHolidayEntries(project, config)
      : await fetchSchoolHolidays({ ...config, schoolType: scopeType, scopeTypes: [scopeType] });
    if (getHolidaySettingsKey({ ...layer.settings.scopeConfigs[scopeType], schoolType: scopeType, scopeTypes: [scopeType] }) !== settingsKey) return;
    scopeState.previewEntries = entries.map((entry) => ({ ...entry, scopeType }));
    scopeState.previewKey = settingsKey;
    scopeState.previewProvenance = {
      provider: scopeType === "university" ? "Manuelle Hochschulferien" : "OpenHolidays API",
      providerUrl: scopeType === "university" ? "" : "https://openholidaysapi.org/",
      officialReferenceUrl: scopeType === "university" ? "" : "https://www.kmk.org/service/ferienregelung/ferienkalender.html",
      retrievedAt: new Date().toISOString(),
      federalState: scopeType === "university" ? "" : `DE-${config.federalState}`,
      schoolYear: `${config.startYear}/${String(config.endYear).slice(-2)}`,
      schoolType: scopeType,
      groupCode: getHolidayGroupCode({ ...config, schoolType: scopeType }),
      corrections: getKnownHolidayCorrections({ ...config, schoolType: scopeType })
    };
    delete scopeState.previewLoadingKey;
    delete scopeState.previewErrorKey;
    saveProjects();
  } catch (error) {
    delete scopeState.previewLoadingKey;
    scopeState.previewError = error instanceof Error ? error.message : "Die Ferientermine konnten nicht geladen werden.";
    scopeState.previewErrorKey = settingsKey;
  }
  if (activeProjectId === project.id && activeLayerType === "holidays") renderHolidayProperties(project);
}

function renderScopedHolidayProperties(project, layer) {
  const settings = ensureScopedHolidaySettings(project, layer);
  const activeScopeType = settings.activeScopeType;
  const config = activeScopeType ? settings.scopeConfigs[activeScopeType] : null;
  const scopeState = activeScopeType ? layer.scopeData[activeScopeType] : null;
  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Jeder Geltungsbereich verwaltet seine Einstellungen und Ferientermine getrennt.";
  head.append(title, intro);

  const scopeSection = document.createElement("section");
  scopeSection.className = "property-section";
  const scopeTitle = document.createElement("h3");
  scopeTitle.textContent = "Geltungsbereiche";
  const tabs = document.createElement("div");
  tabs.className = "project-period-tabs holiday-scope-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Geltungsbereiche");
  settings.scopeTypes.forEach((scopeType) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(scopeType === activeScopeType));
    tab.textContent = getHolidayScopeLabel(scopeType);
    tab.addEventListener("click", () => {
      settings.activeScopeType = scopeType;
      settings.schoolType = scopeType;
      settings.isAddingScope = false;
      saveProjects();
      renderHolidayProperties(project);
    });
    tabs.append(tab);
  });
  if (settings.isAddingScope) {
    const emptyTab = document.createElement("button");
    emptyTab.type = "button";
    emptyTab.className = "holiday-empty-scope-tab";
    emptyTab.setAttribute("role", "tab");
    emptyTab.setAttribute("aria-label", "Neuer Geltungsbereich");
    emptyTab.setAttribute("aria-selected", "true");
    emptyTab.innerHTML = "&nbsp;";
    tabs.append(emptyTab);
  }
  const addScopeButton = document.createElement("button");
  addScopeButton.type = "button";
  addScopeButton.className = "secondary-button holiday-add-scope";
  addScopeButton.textContent = "Weiteren Geltungsbereich hinzufügen";
  addScopeButton.disabled = settings.scopeTypes.length >= HOLIDAY_SCOPE_OPTIONS.length || settings.isAddingScope;
  addScopeButton.addEventListener("click", () => {
    if (settings.scopeTypes.length >= HOLIDAY_SCOPE_OPTIONS.length) return;
    settings.activeScopeType = null;
    settings.schoolType = null;
    settings.isAddingScope = true;
    saveProjects();
    renderHolidayProperties(project);
  });
  scopeSection.append(scopeTitle, tabs, addScopeButton);

  const content = document.createElement("section");
  content.className = "property-section holiday-scope-content";
  if (!activeScopeType) {
    const picker = document.createElement("label");
    picker.className = "property-row holiday-scope-picker";
    const label = document.createElement("span");
    label.textContent = "Geltungsbereich";
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Geltungsbereich auswählen");
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Bitte auswählen";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.append(placeholder);
    HOLIDAY_SCOPE_OPTIONS
      .filter(([value]) => !settings.scopeTypes.includes(value))
      .forEach(([value, text]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        select.append(option);
      });
    select.addEventListener("change", () => {
      if (!select.value) return;
      settings.scopeTypes.push(select.value);
      settings.activeScopeType = select.value;
      settings.schoolType = select.value;
      settings.isAddingScope = false;
      ensureScopedHolidaySettings(project, layer);
      syncScheduleValidityPeriods(project);
      saveProjects();
      renderHolidayProperties(project);
    });
    picker.append(label, createSelectShell(select));
    content.append(picker);
    sheet.append(head, scopeSection, content);
    projectDetail.replaceChildren(sheet);
    saveProjects();
    return;
  }
  const contentTitle = document.createElement("h3");
  contentTitle.textContent = getHolidayScopeLabel(activeScopeType);
  const settingsList = document.createElement("div");
  settingsList.className = "property-list";

  if (activeScopeType !== "university") {
    const stateRow = document.createElement("label");
    stateRow.className = "property-row";
    const stateLabel = document.createElement("span");
    stateLabel.textContent = "Bundesland";
    const stateSelect = document.createElement("select");
    stateSelect.setAttribute("aria-label", "Bundesland");
    FEDERAL_STATES.forEach(([code, name]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = name;
      option.selected = code === config.federalState;
      stateSelect.append(option);
    });
    stateSelect.addEventListener("change", () => {
      config.federalState = stateSelect.value;
      const otherSchoolType = settings.scopeTypes.find((type) => type !== activeScopeType && type !== "university");
      if (otherSchoolType) settings.scopeConfigs[otherSchoolType].federalState = stateSelect.value;
      delete scopeState.previewKey;
      syncScheduleValidityPeriods(project);
      saveProjects();
      renderHolidayProperties(project);
    });
    stateRow.append(stateLabel, createSelectShell(stateSelect));
    const yearRow = document.createElement("label");
    yearRow.className = "property-row";
    const yearLabel = document.createElement("span");
    yearLabel.textContent = "Schuljahr";
    const yearSelect = document.createElement("select");
    yearSelect.setAttribute("aria-label", "Schuljahr");
    yearSelect.append(createSchoolYearOptions(config.startYear));
    yearSelect.addEventListener("change", () => {
      config.startYear = Number(yearSelect.value);
      config.endYear = config.startYear + 1;
      delete scopeState.previewKey;
      syncScheduleValidityPeriods(project);
      saveProjects();
      renderHolidayProperties(project);
    });
    yearRow.append(yearLabel, createSelectShell(yearSelect));
    settingsList.append(stateRow, yearRow);
  } else {
    const configuredPeriods = getConfiguredHigherEducationPeriods(project);
    if (!configuredPeriods.length) {
      const note = document.createElement("p");
      note.className = "empty-state";
      note.append("Im ");
      const link = document.createElement("button");
      link.type = "button";
      link.className = "schedule-setup-link";
      link.textContent = "Projektordner";
      link.addEventListener("click", () => selectProject(project.id));
      note.append(link, " sind noch keine vollständigen Semester- oder Trimestergrenzen eingerichtet.");
      settingsList.append(note);
    } else {
      configuredPeriods.forEach((period) => {
        const card = document.createElement("section");
        card.className = "half-year-period higher-education-period";
        const heading = document.createElement("h4");
        heading.textContent = period.label;
        const boundary = document.createElement("p");
        boundary.className = "higher-education-boundary";
        boundary.textContent = `${formatGermanDate(period.startDate)}–${formatGermanDate(period.endDate)}`;
        const holidayTitle = document.createElement("strong");
        holidayTitle.className = "higher-education-holiday-title";
        holidayTitle.textContent = period.holidayLabel;
        const range = document.createElement("div");
        range.className = "half-year-range";
        const stored = config.higherEducationBreaks[period.id] || {};
        const fromLabel = document.createElement("label");
        fromLabel.textContent = "von";
        const from = document.createElement("input");
        from.type = "date";
        from.value = stored.startDate || "";
        const untilLabel = document.createElement("label");
        untilLabel.textContent = "bis";
        const until = document.createElement("input");
        until.type = "date";
        until.value = stored.endDate || "";
        const update = () => {
          config.higherEducationBreaks[period.id] = { startDate: from.value, endDate: until.value };
          delete scopeState.previewKey;
          saveProjects();
          renderHolidayProperties(project);
        };
        from.addEventListener("change", update);
        until.addEventListener("change", update);
        fromLabel.append(from);
        untilLabel.append(until);
        range.append(fromLabel, untilLabel);
        card.append(heading, boundary, holidayTitle, range);
        settingsList.append(card);
      });
    }
  }

  const settingsKey = getHolidaySettingsKey({ ...config, schoolType: activeScopeType, scopeTypes: [activeScopeType] });
  const previewIsCurrent = scopeState.previewKey === settingsKey && Array.isArray(scopeState.previewEntries);
  const previewEntries = previewIsCurrent ? scopeState.previewEntries : [];
  const result = document.createElement("div");
  result.className = "holiday-result";
  if (previewEntries.length) {
    const resultList = document.createElement("div");
    resultList.className = "holiday-entry-list";
    previewEntries.forEach((entry) => {
      const row = document.createElement("div");
      row.className = "holiday-entry";
      const name = document.createElement("strong");
      name.textContent = entry.name;
      const dates = document.createElement("span");
      dates.textContent = `${formatGermanDate(entry.startDate)}–${formatGermanDate(entry.endDate)}`;
      row.append(name, dates);
      resultList.append(row);
    });
    result.append(resultList);
  } else {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = scopeState.previewError || (activeScopeType === "university"
      ? "Noch keine Semester- oder Trimesterferien eingetragen."
      : "Ferientermine werden automatisch abgerufen …");
    result.append(empty);
  }
  const source = document.createElement("div");
  source.className = "holiday-source";
  source.textContent = activeScopeType === "university"
    ? "Manuell eingetragene Hochschulferien auf Grundlage der Projektzeiträume."
    : "Ferienquelle: OpenHolidays · Prüfreferenz: Kultusministerkonferenz";
  const status = document.createElement("p");
  status.className = "property-status";
  status.setAttribute("role", "status");
  const applyButton = document.createElement("button");
  applyButton.type = "button";
  applyButton.className = "secondary-button primary-action holiday-load-button";
  applyButton.textContent = "Einstellungen übernehmen";
  applyButton.disabled = !previewEntries.length;
  applyButton.addEventListener("click", () => {
    scopeState.appliedEntries = structuredClone(previewEntries).map((entry) => ({ ...entry, scopeType: activeScopeType }));
    scopeState.provenance = structuredClone(scopeState.previewProvenance);
    scopeState.appliedConfig = structuredClone(config);
    rebuildScopedHolidayEntries(layer);
    syncScheduleValidityPeriods(project);
    saveProjects();
    renderActiveCalendar(project);
    status.textContent = "Einstellungen übernommen und Kalenderansicht aktualisiert.";
  });
  const actions = document.createElement("div");
  actions.className = "holiday-scope-actions";
  const deleteScopeButton = document.createElement("button");
  deleteScopeButton.type = "button";
  deleteScopeButton.className = "secondary-button lesson-delete-button holiday-scope-delete";
  deleteScopeButton.textContent = "Geltungsbereich löschen";
  deleteScopeButton.dataset.projectId = project.id;
  deleteScopeButton.dataset.holidayScopeType = activeScopeType;
  deleteScopeButton.title = "Zum Löschen gedrückt halten";
  deleteScopeButton.addEventListener("pointerdown", beginScheduleDeleteHold);
  deleteScopeButton.addEventListener("pointerup", finishScheduleDeleteHold);
  deleteScopeButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
  deleteScopeButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
  actions.append(applyButton, deleteScopeButton);
  content.append(contentTitle, settingsList, result, source, actions, status);
  sheet.append(head, scopeSection, content);
  projectDetail.replaceChildren(sheet);
  saveProjects();
  if (!previewIsCurrent && scopeState.previewLoadingKey !== settingsKey && scopeState.previewErrorKey !== settingsKey) {
    void refreshScopedHolidayPreview(project, layer, activeScopeType, settingsKey);
  }
}

function renderHolidayProperties(project) {
  renderSchoolsProperties(project);
  return;
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Ferien";
  const scopedLayer = getProjectLayer(project, "holidays");
  renderScopedHolidayProperties(project, scopedLayer);
  return;

  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Ferien";

  const layer = getProjectLayer(project, "holidays");
  const currentYear = new Date().getFullYear();
  const previousHolidaySettings = layer.settings || {};
  const legacyScopeType = previousHolidaySettings.schoolType === "vocational"
    ? "vocational"
    : previousHolidaySettings.schoolType === "university" ? "university" : "general";
  const storedScopeTypes = Array.isArray(previousHolidaySettings.scopeTypes)
    ? previousHolidaySettings.scopeTypes.filter((type) => ["general", "vocational", "university"].includes(type))
    : [legacyScopeType];
  layer.settings = {
    federalState: layer.settings?.federalState || "MV",
    schoolType: storedScopeTypes[0] || "general",
    scopeTypes: [...new Set(storedScopeTypes.length ? storedScopeTypes : ["general"])],
    startYear: Number(layer.settings?.startYear) || currentYear,
    endYear: Number(layer.settings?.endYear) || currentYear + 1,
    higherEducationBreaks: layer.settings?.higherEducationBreaks && typeof layer.settings.higherEducationBreaks === "object"
      ? layer.settings.higherEducationBreaks
      : {}
  };

  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Geltungsbereich und Datenabruf der Ferienkalenderschicht.";
  head.append(title, intro);

  const schoolTypeSection = document.createElement("section");
  schoolTypeSection.className = "property-section";
  const schoolTypeTitle = document.createElement("h3");
  schoolTypeTitle.textContent = "Schulart";
  const schoolTypeList = document.createElement("div");
  schoolTypeList.className = "property-list";
  const scopeOptions = [
    ["general", "Allgemeinbildende Schule"],
    ["vocational", "Berufliche Schule"],
    ["university", "Hochschule"]
  ];
  layer.settings.scopeTypes.forEach((scopeType, index) => {
    const row = document.createElement("label");
    row.className = "property-row";
    const label = document.createElement("span");
    label.textContent = layer.settings.scopeTypes.length > 1 ? `Geltungsbereich ${index + 1}` : "Geltungsbereich";
    const select = document.createElement("select");
    select.setAttribute("aria-label", `Geltungsbereich ${index + 1}`);
    const selectedElsewhere = new Set(layer.settings.scopeTypes.filter((_, selectedIndex) => selectedIndex !== index));
    scopeOptions
      .filter(([value]) => value === scopeType || !selectedElsewhere.has(value))
      .forEach(([value, text]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        option.selected = value === scopeType;
        select.append(option);
      });
    select.addEventListener("change", () => {
      layer.settings.scopeTypes[index] = select.value;
      layer.settings.schoolType = layer.settings.scopeTypes[0];
      clearHolidayPreview(layer);
      syncScheduleValidityPeriods(project);
      saveProjects();
      renderHolidayProperties(project);
    });
    row.append(label, createSelectShell(select));
    schoolTypeList.append(row);
  });
  const addScopeButton = document.createElement("button");
  addScopeButton.type = "button";
  addScopeButton.className = "secondary-button holiday-add-scope";
  addScopeButton.textContent = "Weiteren Geltungsbereich hinzufügen";
  addScopeButton.disabled = layer.settings.scopeTypes.length >= scopeOptions.length;
  addScopeButton.addEventListener("click", () => {
    const availableOptions = scopeOptions.filter(([value]) => !layer.settings.scopeTypes.includes(value));
    if (!availableOptions.length) return;
    const row = document.createElement("label");
    row.className = "property-row";
    const label = document.createElement("span");
    label.textContent = `Geltungsbereich ${layer.settings.scopeTypes.length + 1}`;
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Weiteren Geltungsbereich auswählen");
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Bitte auswählen";
    placeholder.selected = true;
    placeholder.disabled = true;
    select.append(placeholder);
    availableOptions.forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      select.append(option);
    });
    select.addEventListener("change", () => {
      if (!select.value) return;
      layer.settings.scopeTypes.push(select.value);
      layer.settings.schoolType = layer.settings.scopeTypes[0];
      clearHolidayPreview(layer);
      syncScheduleValidityPeriods(project);
      saveProjects();
      renderHolidayProperties(project);
    });
    row.append(label, createSelectShell(select));
    schoolTypeList.append(row);
    addScopeButton.disabled = true;
  });
  schoolTypeSection.append(schoolTypeTitle, schoolTypeList, addScopeButton);
  const hasUniversityScope = layer.settings.scopeTypes.includes("university");
  const hasSchoolScope = layer.settings.scopeTypes.some((type) => type === "general" || type === "vocational");

  const section = document.createElement("section");
  section.className = "property-section";
  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = hasSchoolScope ? "Schuljahr" : "Hochschulferien";
  const list = document.createElement("div");
  list.className = "property-list";

  const stateRow = document.createElement("label");
  stateRow.className = "property-row";
  const stateLabel = document.createElement("span");
  stateLabel.textContent = "Bundesland";
  const stateSelect = document.createElement("select");
  stateSelect.setAttribute("aria-label", "Bundesland");
  FEDERAL_STATES.forEach(([code, name]) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    option.selected = code === layer.settings.federalState;
    stateSelect.append(option);
  });
  stateSelect.addEventListener("change", () => {
    layer.settings.federalState = stateSelect.value;
    clearHolidayPreview(layer);
    syncScheduleValidityPeriods(project);
    saveProjects();
    renderHolidayProperties(project);
  });
  stateRow.append(stateLabel, createSelectShell(stateSelect));

  const schoolYearRow = document.createElement("label");
  schoolYearRow.className = "property-row";
  const schoolYearLabel = document.createElement("span");
  schoolYearLabel.textContent = "Schuljahr";
  const schoolYearSelect = document.createElement("select");
  schoolYearSelect.setAttribute("aria-label", "Schuljahr");
  schoolYearSelect.append(createSchoolYearOptions(layer.settings.startYear));
  schoolYearRow.append(schoolYearLabel, createSelectShell(schoolYearSelect));

  const status = document.createElement("p");
  status.className = "property-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  schoolYearSelect.addEventListener("change", () => {
    const startYear = Number(schoolYearSelect.value);
    layer.settings.startYear = startYear;
    layer.settings.endYear = startYear + 1;
    clearHolidayPreview(layer);
    syncScheduleValidityPeriods(project);
    saveProjects();
    renderHolidayProperties(project);
  });

  if (hasSchoolScope) list.append(stateRow, schoolYearRow);
  const higherEducationPeriods = document.createElement("div");
  higherEducationPeriods.className = "higher-education-periods";
  if (hasUniversityScope) {
    const configuredPeriods = getConfiguredHigherEducationPeriods(project);
    if (!configuredPeriods.length) {
      const emptyPeriods = document.createElement("p");
      emptyPeriods.className = "empty-state";
      emptyPeriods.append("Im ");
      const projectSettingsLink = document.createElement("button");
      projectSettingsLink.type = "button";
      projectSettingsLink.className = "schedule-setup-link";
      projectSettingsLink.textContent = "Projektordner";
      projectSettingsLink.addEventListener("click", () => selectProject(project.id));
      emptyPeriods.append(projectSettingsLink, " sind noch keine vollständigen Semester- oder Trimestergrenzen eingerichtet.");
      higherEducationPeriods.append(emptyPeriods);
    } else {
      configuredPeriods.forEach((period) => {
        const card = document.createElement("section");
        card.className = "half-year-period higher-education-period";
        const heading = document.createElement("h4");
        heading.textContent = period.label;
        const boundary = document.createElement("p");
        boundary.className = "higher-education-boundary";
        boundary.textContent = `${formatGermanDate(period.startDate)}–${formatGermanDate(period.endDate)}`;
        const holidayHeading = document.createElement("strong");
        holidayHeading.className = "higher-education-holiday-title";
        holidayHeading.textContent = period.holidayLabel;
        const range = document.createElement("div");
        range.className = "half-year-range";
        const storedHoliday = layer.settings.higherEducationBreaks[period.id] || {};
        const fromLabel = document.createElement("label");
        fromLabel.textContent = "von";
        const from = document.createElement("input");
        from.type = "date";
        from.value = storedHoliday.startDate || "";
        const untilLabel = document.createElement("label");
        untilLabel.textContent = "bis";
        const until = document.createElement("input");
        until.type = "date";
        until.value = storedHoliday.endDate || "";
        const updateHoliday = () => {
          layer.settings.higherEducationBreaks[period.id] = {
            startDate: from.value,
            endDate: until.value
          };
          clearHolidayPreview(layer);
          saveProjects();
          renderHolidayProperties(project);
        };
        from.addEventListener("change", updateHoliday);
        until.addEventListener("change", updateHoliday);
        fromLabel.append(from);
        untilLabel.append(until);
        range.append(fromLabel, untilLabel);
        card.append(heading, boundary, holidayHeading, range);
        higherEducationPeriods.append(card);
      });
    }
  }
  const settingsKey = getHolidaySettingsKey(layer.settings);
  if (!hasSchoolScope && hasUniversityScope && layer.previewKey !== settingsKey) {
    layer.previewEntries = getHigherEducationHolidayEntries(project, layer.settings);
    layer.previewKey = settingsKey;
    layer.previewProvenance = {
      provider: "Manuelle Hochschulferien",
      retrievedAt: new Date().toISOString(),
      schoolYear: `${layer.settings.startYear}/${String(layer.settings.endYear).slice(-2)}`,
      schoolType: "university"
    };
    delete layer.previewError;
    delete layer.previewErrorKey;
    delete layer.previewLoadingKey;
  }
  const previewIsCurrent = layer.previewKey === settingsKey && Array.isArray(layer.previewEntries);
  const previewEntries = previewIsCurrent ? layer.previewEntries : [];
  const applyButton = document.createElement("button");
  applyButton.type = "button";
  applyButton.className = "secondary-button primary-action holiday-load-button";
  applyButton.textContent = "Einstellungen übernehmen";
  applyButton.disabled = !previewEntries.length;

  const result = document.createElement("div");
  result.className = "holiday-result";
  if (previewEntries.length) {
    const resultList = document.createElement("div");
    resultList.className = "holiday-entry-list";
    previewEntries.forEach((entry) => {
      const row = document.createElement("div");
      row.className = "holiday-entry";
      const name = document.createElement("strong");
      name.textContent = entry.name;
      const dates = document.createElement("span");
      dates.textContent = `${formatGermanDate(entry.startDate)}–${formatGermanDate(entry.endDate)}`;
      row.append(name, dates);
      resultList.append(row);
    });
    result.append(resultList);
  } else {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = layer.previewError || (!hasSchoolScope && hasUniversityScope
      ? "Noch keine Semester- oder Trimesterferien eingetragen."
      : "Ferientermine werden automatisch abgerufen …");
    result.append(empty);
  }

  const source = document.createElement("div");
  source.className = "holiday-source";
  if (!hasSchoolScope && hasUniversityScope) {
    const manualSource = document.createElement("span");
    manualSource.textContent = "Manuell eingetragene Hochschulferien auf Grundlage der Projektzeiträume.";
    source.append(manualSource);
  } else {
    const sourceLink = document.createElement("a");
    sourceLink.href = "https://www.kmk.org/service/ferienregelung/ferienkalender.html";
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    sourceLink.textContent = "Amtliche Prüfreferenz: Kultusministerkonferenz";
    source.append(sourceLink);
  }
  if (hasUniversityScope && hasSchoolScope) {
    const manualSource = document.createElement("span");
    manualSource.textContent = "Hochschulferien: manuell aus den Projektzeiträumen ergänzt.";
    source.append(manualSource);
  }
  if (layer.previewProvenance?.retrievedAt && hasSchoolScope) {
    const retrieved = document.createElement("span");
    retrieved.textContent = `Daten: OpenHolidays · abgerufen ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(layer.previewProvenance.retrievedAt))}`;
    source.append(retrieved);
  }

  applyButton.addEventListener("click", () => {
    if (!previewEntries.length) return;
    layer.entries = structuredClone(previewEntries);
    layer.provenance = structuredClone(layer.previewProvenance);
    layer.appliedSettings = structuredClone(layer.settings);
    const holidayPeriod = getHolidaySchoolYearPeriod(project);
    if (holidayPeriod && !layer.settings.scopeTypes.includes("university")) {
      project.periods = project.periods && typeof project.periods === "object" ? project.periods : {};
      project.periods.schoolYear = holidayPeriod;
    }
    saveProjects();
    renderActiveCalendar(project);
    status.textContent = "Einstellungen übernommen und Kalenderansicht aktualisiert.";
  });

  section.append(sectionTitle, list, higherEducationPeriods, result, source, applyButton, status);
  sheet.append(head, schoolTypeSection, section);
  projectDetail.replaceChildren(sheet);
  saveProjects();

  if (!previewIsCurrent && layer.previewLoadingKey !== settingsKey && layer.previewErrorKey !== settingsKey) {
    void refreshHolidayPreview(project, layer, settingsKey);
  }
}

function clearHolidayPreview(layer) {
  delete layer.previewEntries;
  delete layer.previewProvenance;
  delete layer.previewKey;
  delete layer.previewError;
  delete layer.previewErrorKey;
  delete layer.previewLoadingKey;
}

function getHolidaySettingsKey(settings) {
  return [
    HOLIDAY_NORMALIZATION_VERSION,
    settings.federalState,
    (settings.scopeTypes || [settings.schoolType]).join(","),
    settings.startYear,
    settings.endYear,
    (settings.scopeTypes || [settings.schoolType]).includes("university")
      ? JSON.stringify(settings.higherEducationBreaks || {})
      : ""
  ].join(":");
}

async function refreshHolidayPreview(project, layer, settingsKey) {
  layer.previewLoadingKey = settingsKey;
  delete layer.previewError;
  try {
    const settingsSnapshot = structuredClone(layer.settings);
    const scopeTypes = Array.isArray(settingsSnapshot.scopeTypes)
      ? settingsSnapshot.scopeTypes
      : [settingsSnapshot.schoolType];
    const schoolScopeTypes = scopeTypes.filter((type) => type === "general" || type === "vocational");
    const schoolEntries = await Promise.all(schoolScopeTypes.map((schoolType) => (
      fetchSchoolHolidays({ ...settingsSnapshot, schoolType, scopeTypes: [schoolType] })
    )));
    const manualEntries = scopeTypes.includes("university")
      ? getHigherEducationHolidayEntries(project, settingsSnapshot)
      : [];
    const uniqueEntries = new Map();
    [...schoolEntries.flat(), ...manualEntries].forEach((entry) => {
      uniqueEntries.set(`${entry.name}|${entry.startDate}|${entry.endDate}`, entry);
    });
    const entries = [...uniqueEntries.values()].sort((a, b) => a.startDate.localeCompare(b.startDate));
    if (getHolidaySettingsKey(layer.settings) !== settingsKey) return;
    layer.previewEntries = entries;
    layer.previewKey = settingsKey;
    layer.previewProvenance = {
      provider: "OpenHolidays API",
      providerUrl: "https://openholidaysapi.org/",
      officialReferenceUrl: "https://www.kmk.org/service/ferienregelung/ferienkalender.html",
      retrievedAt: new Date().toISOString(),
      federalState: `DE-${settingsSnapshot.federalState}`,
      schoolYear: `${settingsSnapshot.startYear}/${String(settingsSnapshot.endYear).slice(-2)}`,
      schoolType: settingsSnapshot.schoolType,
      scopeTypes,
      groupCodes: schoolScopeTypes.map((schoolType) => getHolidayGroupCode({ ...settingsSnapshot, schoolType })).filter(Boolean),
      corrections: schoolScopeTypes.flatMap((schoolType) => getKnownHolidayCorrections({ ...settingsSnapshot, schoolType }))
    };
    delete layer.previewLoadingKey;
    delete layer.previewErrorKey;
    saveProjects();
  } catch (error) {
    if (getHolidaySettingsKey(layer.settings) !== settingsKey) return;
    delete layer.previewLoadingKey;
    layer.previewError = error instanceof Error ? error.message : "Die Ferientermine konnten nicht geladen werden.";
    layer.previewErrorKey = settingsKey;
  }
  if (activeProjectId === project.id && activeLayerType === "holidays") {
    renderHolidayProperties(project);
  }
}

function formatGermanDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(year, month - 1, day));
}

async function fetchSchoolHolidays(settings) {
  const query = new URLSearchParams({
    countryIsoCode: "DE",
    subdivisionCode: `DE-${settings.federalState}`,
    languageIsoCode: "DE",
    validFrom: settings.validFrom || `${settings.startYear}-08-01`,
    validTo: settings.validTo || `${settings.endYear}-09-30`
  });
  const groupCode = getHolidayGroupCode(settings);
  if (groupCode) query.set("groupCode", groupCode);

  const response = await fetch(`https://openholidaysapi.org/SchoolHolidays?${query}`, {
    headers: { Accept: "text/json" }
  });
  if (!response.ok) throw new Error(`Ferienabruf fehlgeschlagen (${response.status}).`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Die Ferienquelle hat ein unerwartetes Datenformat geliefert.");

  const entries = data.map((holiday) => ({
    id: holiday.id,
    name: holiday.name?.find((entry) => entry.language?.toUpperCase() === "DE")?.text
      || holiday.name?.[0]?.text
      || "Schulferien",
    startDate: holiday.startDate,
    endDate: holiday.endDate,
    type: "school-holiday",
    sourceId: holiday.id
  })).filter((holiday) => holiday.startDate && holiday.endDate);

  const normalizedEntries = normalizeHolidayEntries(entries, settings);
  if (!normalizedEntries.length) throw new Error("Für diese Auswahl wurden keine Ferientermine gefunden.");
  return normalizedEntries.sort((a, b) => a.startDate.localeCompare(b.startDate));
}

async function fetchPublicHolidays(settings) {
  const query = new URLSearchParams({
    countryIsoCode: "DE",
    subdivisionCode: `DE-${settings.federalState}`,
    languageIsoCode: "DE",
    validFrom: settings.validFrom,
    validTo: settings.validTo
  });
  const response = await fetch(`https://openholidaysapi.org/PublicHolidays?${query}`, {
    headers: { Accept: "text/json" }
  });
  if (!response.ok) throw new Error(`Feiertagsabruf fehlgeschlagen (${response.status}).`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Die Feiertagsquelle hat ein unerwartetes Datenformat geliefert.");
  return data.map((holiday) => ({
    id: `public-${holiday.id}`,
    name: holiday.name?.find((entry) => entry.language?.toUpperCase() === "DE")?.text
      || holiday.name?.[0]?.text
      || "Gesetzlicher Feiertag",
    startDate: holiday.startDate,
    endDate: holiday.endDate || holiday.startDate,
    type: "public-holiday",
    sourceId: holiday.id
  })).filter((holiday) => holiday.startDate && holiday.endDate)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

function getHolidayGroupCode(settings) {
  if (settings.federalState !== "MV" || settings.schoolType === "university") return null;
  return settings.schoolType === "vocational" ? "DE-MV-BBS" : "DE-MV-ABS";
}

function normalizeHolidayEntries(entries, settings) {
  if (Array.isArray(settings.scopeTypes) && settings.scopeTypes.includes("vocational")) return entries;
  if (settings.federalState !== "MV" || settings.schoolType !== "general") return entries;
  return entries.filter((entry) => !(
    entry.startDate === entry.endDate
    && MV_VOCATIONAL_ONLY_DATES.has(entry.startDate)
  ));
}

function getKnownHolidayCorrections(settings) {
  if (Array.isArray(settings.scopeTypes) && settings.scopeTypes.includes("vocational")) return [];
  if (settings.federalState !== "MV" || settings.schoolType !== "general") return [];
  return [{
    id: "mv-2026-11-vocational-only",
    excludedDates: [...MV_VOCATIONAL_ONLY_DATES],
    reason: "Die Tage gelten laut Bildungsministerium Mecklenburg-Vorpommern ausschließlich für berufliche Schulen.",
    officialReferenceUrl: "https://www.regierung-mv.de/Landesregierung/bm/Schule/Schulorganisation/Ferientermine/",
    reviewedAt: "2026-07-27"
  }];
}

function migrateKnownHolidayCorrections(projectList) {
  let changed = false;
  projectList.forEach((project) => {
    const layer = project.layers?.find((entry) => entry.type === "holidays");
    if (!layer) return;

    const appliedSettings = layer.appliedSettings || layer.settings;
    if (Array.isArray(layer.entries) && appliedSettings) {
      const normalized = normalizeHolidayEntries(layer.entries, appliedSettings);
      if (normalized.length !== layer.entries.length) {
        layer.entries = normalized;
        layer.provenance = layer.provenance || {};
        layer.provenance.corrections = getKnownHolidayCorrections(appliedSettings);
        changed = true;
      }
    }

    if (Array.isArray(layer.previewEntries) && layer.settings) {
      const normalizedPreview = normalizeHolidayEntries(layer.previewEntries, layer.settings);
      if (normalizedPreview.length !== layer.previewEntries.length) {
        layer.previewEntries = normalizedPreview;
        layer.previewProvenance = layer.previewProvenance || {};
        layer.previewProvenance.corrections = getKnownHolidayCorrections(layer.settings);
        layer.previewKey = getHolidaySettingsKey(layer.settings);
        changed = true;
      }
    }
  });
  if (changed) saveProjects();
}

menuButton.addEventListener("click", () => setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true"));
menuCloseButton.addEventListener("click", () => setMenuOpen(false));
menuOverlay.addEventListener("click", () => setMenuOpen(false));
openSettingsButton.addEventListener("click", () => setWorkspaceMode("settings"));
returnRenderButton.addEventListener("click", () => {
  renderActiveCalendar();
  setWorkspaceMode("render");
});
browserActionsButton.addEventListener("click", () => setBrowserMenuOpen(browserActionsButton.getAttribute("aria-expanded") !== "true"));
newProjectButton.addEventListener("click", () => {
  setBrowserMenuOpen(false);
  newProjectForm.reset();
  newProjectDialog.showModal();
  requestAnimationFrame(() => newProjectName.focus());
});
cancelProjectButton.addEventListener("click", () => newProjectDialog.close());
importProjectButton.addEventListener("click", () => {
  setBrowserMenuOpen(false);
  importProjectForm.reset();
  importProjectStatus.textContent = "";
  importProjectDialog.showModal();
  requestAnimationFrame(() => importProjectFile.focus());
});
cancelImportProjectButton.addEventListener("click", () => importProjectDialog.close());
importProjectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  importProjectStatus.textContent = "Projekt wird geprüft und importiert …";
  try {
    await importProjectFromFile(importProjectFile.files?.[0]);
    importProjectDialog.close();
  } catch (error) {
    importProjectStatus.textContent = error instanceof Error
      ? error.message
      : "Das Projekt konnte nicht importiert werden.";
  }
});
calendarViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    mainCalendarView = button.dataset.calendarView;
    renderActiveCalendar();
  });
});
function moveCalendarPeriod(direction) {
  if (mainCalendarView === "week") {
    calendarReferenceDate.setDate(calendarReferenceDate.getDate() + direction * 7);
  } else if (mainCalendarView === "day") {
    calendarReferenceDate.setDate(calendarReferenceDate.getDate() + direction);
    while (calendarReferenceDate.getDay() === 0 || calendarReferenceDate.getDay() === 6) {
      calendarReferenceDate.setDate(calendarReferenceDate.getDate() + direction);
    }
  }
  renderActiveCalendar();
}
previousCalendarPeriod.addEventListener("click", () => moveCalendarPeriod(-1));
nextCalendarPeriod.addEventListener("click", () => moveCalendarPeriod(1));
todayCalendarPeriod.addEventListener("click", () => {
  calendarReferenceDate = new Date();
  renderActiveCalendar();
});
lessonSignalsToggle.addEventListener("click", () => {
  lessonSignalsEnabled = !lessonSignalsEnabled;
  localStorage.setItem(LESSON_SIGNALS_STORAGE_KEY, String(lessonSignalsEnabled));
  lessonSignalsLastCheck = Date.now();
  lessonSignalsToggle.classList.remove("has-audio-error");
  if (lessonSignalsEnabled) prepareLessonSignalAudio();
  updateLessonSignalsToggle();
});
cancelAppointmentGroupButton.addEventListener("click", () => appointmentGroupDialog.close());
appointmentGroupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === appointmentGroupDialog.dataset.projectId);
  const layerType = appointmentGroupDialog.dataset.layerType || "appointments";
  const layer = project && getProjectLayer(project, layerType);
  const name = appointmentGroupName.value.trim();
  if (!project || !layer) return;
  if (!name) {
    appointmentGroupDialogStatus.textContent = "Bitte einen Namen für die Gruppe eintragen.";
    appointmentGroupName.focus();
    return;
  }
  layer.groups = Array.isArray(layer.groups) ? layer.groups : [];
  const existingGroup = layer.groups.find((entry) => entry.id === appointmentGroupDialog.dataset.groupId);
  if (existingGroup) {
    existingGroup.name = name;
    existingGroup.color = appointmentGroupColor.value || "#c9c1dd";
  }
  else {
    layer.groups.push({
      id: globalThis.crypto?.randomUUID?.() ?? `appointment-group-${Date.now()}`,
      name,
      color: appointmentGroupColor.value || "#c9c1dd",
      appointments: [],
      createdAt: new Date().toISOString()
    });
  }
  saveProjects();
  appointmentGroupDialog.close();
  if (layerType === "individual") renderIndividualProjectsProperties(project);
  else renderAppointmentsProperties(project);
  renderActiveCalendar(project);
});
cancelAppointmentButton.addEventListener("click", () => appointmentDialog.close());
appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === appointmentDialog.dataset.projectId);
  const layerType = appointmentDialog.dataset.layerType || "appointments";
  const layer = project && getProjectLayer(project, layerType);
  const group = layer?.groups?.find((entry) => entry.id === appointmentDialog.dataset.groupId);
  const name = appointmentName.value.trim();
  if (!project || !group) return;
  if (!name || !appointmentDate.value || !appointmentStartTime.value || !appointmentEndTime.value) {
    appointmentDialogStatus.textContent = "Bitte Bezeichnung, Datum sowie Beginn und Ende eintragen.";
    return;
  }
  if (appointmentEndTime.value <= appointmentStartTime.value) {
    appointmentDialogStatus.textContent = "Das Ende muss nach dem Beginn liegen.";
    appointmentEndTime.focus();
    return;
  }
  group.appointments = Array.isArray(group.appointments) ? group.appointments : [];
  const appointmentData = {
    name,
    date: appointmentDate.value,
    startTime: appointmentStartTime.value,
    endTime: appointmentEndTime.value,
    overridesLessons: appointmentOverridesLessons.checked
  };
  const existingAppointment = group.appointments.find((entry) => entry.id === appointmentDialog.dataset.appointmentId);
  if (existingAppointment) Object.assign(existingAppointment, appointmentData);
  else {
    group.appointments.push({
      id: globalThis.crypto?.randomUUID?.() ?? `appointment-${Date.now()}`,
      ...appointmentData,
      createdAt: new Date().toISOString()
    });
  }
  saveProjects();
  appointmentDialog.close();
  if (layerType === "individual") renderIndividualProjectsProperties(project);
  else renderAppointmentsProperties(project);
  renderActiveCalendar(project);
});
cancelSicknessButton.addEventListener("click", () => sicknessDialog.close());
sicknessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === sicknessDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "sickness");
  if (!project || !layer) return;
  if (!sicknessStartDate.value || !sicknessEndDate.value) {
    sicknessDialogStatus.textContent = "Bitte Beginn und Ende der Krankschreibung eintragen.";
    return;
  }
  if (sicknessEndDate.value < sicknessStartDate.value) {
    sicknessDialogStatus.textContent = "Das Enddatum darf nicht vor dem Beginn liegen.";
    sicknessEndDate.focus();
    return;
  }
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const sicknessData = {
    name: "Krankschreibung",
    type: "sickness",
    startDate: sicknessStartDate.value,
    endDate: sicknessEndDate.value
  };
  const existingSickness = layer.entries.find((entry) => entry.id === sicknessDialog.dataset.sicknessId);
  if (existingSickness) Object.assign(existingSickness, sicknessData);
  else {
    layer.entries.push({
      id: globalThis.crypto?.randomUUID?.() ?? `sickness-${Date.now()}`,
      ...sicknessData,
      createdAt: new Date().toISOString()
    });
  }
  saveProjects();
  sicknessDialog.close();
  renderSicknessProperties(project);
  renderActiveCalendar(project);
});
cancelClassCatalogButton.addEventListener("click", () => classCatalogDialog.close());
classCatalogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === classCatalogDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "classCatalog");
  if (!project || !layer) return;
  layer.subjects = Array.isArray(layer.subjects) ? layer.subjects : [];
  const mode = classCatalogMode.value;
  const name = mode === "grade" ? classCatalogGrade.value : classCatalogName.value.trim();
  if (!name) {
    classCatalogDialogStatus.textContent = "Bitte eine Bezeichnung eintragen.";
    return;
  }
  const subject = layer.subjects.find((entry) => entry.id === classCatalogDialog.dataset.subjectId);
  const grade = subject?.grades?.find((entry) => entry.id === classCatalogDialog.dataset.gradeId);
  if (mode === "subject") {
    const existing = layer.subjects.find((entry) => entry.id === classCatalogDialog.dataset.subjectId);
    const duplicate = layer.subjects.some((entry) => entry.schoolId === activeClassSchoolId && entry.name.toLocaleLowerCase("de") === name.toLocaleLowerCase("de") && entry.id !== classCatalogDialog.dataset.subjectId);
    if (duplicate) {
      classCatalogDialogStatus.textContent = "Dieses Fach ist bereits vorhanden.";
      return;
    }
    if (existing) existing.name = name;
    else layer.subjects.push({
      id: globalThis.crypto?.randomUUID?.() ?? `subject-${Date.now()}`,
      name,
      schoolId: activeClassSchoolId,
      grades: []
    });
  } else if (mode === "grade" && subject) {
    subject.grades = Array.isArray(subject.grades) ? subject.grades : [];
    const duplicate = subject.grades.some((entry) => entry.name === name && entry.id !== classCatalogDialog.dataset.gradeId);
    if (duplicate) {
      classCatalogDialogStatus.textContent = "Diese Klassenstufe ist in dem Fach bereits vorhanden.";
      return;
    }
    const existing = subject.grades.find((entry) => entry.id === classCatalogDialog.dataset.gradeId);
    if (existing) existing.name = name;
    else subject.grades.push({
      id: globalThis.crypto?.randomUUID?.() ?? `grade-${Date.now()}`,
      name,
      classes: []
    });
  } else if (mode === "class" && subject && grade) {
    grade.classes = Array.isArray(grade.classes) ? grade.classes : [];
    const duplicate = grade.classes.some((entry) => entry.name.toLocaleLowerCase("de") === name.toLocaleLowerCase("de") && entry.id !== classCatalogDialog.dataset.classId);
    if (duplicate) {
      classCatalogDialogStatus.textContent = "Diese Klasse ist in der Klassenstufe bereits vorhanden.";
      return;
    }
    const existing = grade.classes.find((entry) => entry.id === classCatalogDialog.dataset.classId);
    if (existing) existing.name = name;
    else grade.classes.push({
      id: globalThis.crypto?.randomUUID?.() ?? `class-${Date.now()}`,
      name
    });
  } else return;
  syncLessonCatalogLabels(project);
  saveProjects();
  classCatalogDialog.close();
  renderClassCatalogProperties(project);
});
cancelSchoolProjectButton.addEventListener("click", () => schoolProjectDialog.close());
schoolProjectDate.addEventListener("change", () => {
  schoolProjectEndDate.min = schoolProjectDate.value;
  if (!schoolProjectEndDate.value || schoolProjectEndDate.value < schoolProjectDate.value) {
    schoolProjectEndDate.value = schoolProjectDate.value;
  }
});
schoolProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === schoolProjectDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "individual");
  const name = schoolProjectName.value.trim();
  if (!project || !layer) return;
  if (!name || !schoolProjectDate.value || !schoolProjectEndDate.value || !schoolProjectStartTime.value || !schoolProjectEndTime.value) {
    schoolProjectDialogStatus.textContent = "Bitte Bezeichnung, Start- und Enddatum sowie Beginn und Ende eintragen.";
    return;
  }
  if (schoolProjectEndDate.value < schoolProjectDate.value) {
    schoolProjectDialogStatus.textContent = "Das Enddatum darf nicht vor dem Startdatum liegen.";
    schoolProjectEndDate.focus();
    return;
  }
  if (schoolProjectEndTime.value <= schoolProjectStartTime.value) {
    schoolProjectDialogStatus.textContent = "Das Ende muss nach dem Beginn liegen.";
    schoolProjectEndTime.focus();
    return;
  }
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const entryData = {
    name,
    startDate: schoolProjectDate.value,
    endDate: schoolProjectEndDate.value,
    startTime: schoolProjectStartTime.value,
    endTime: schoolProjectEndTime.value,
    overridesLessons: schoolProjectOverridesLessons.checked
  };
  const existingEntry = layer.entries.find((entry) => entry.id === schoolProjectDialog.dataset.entryId);
  if (existingEntry) Object.assign(existingEntry, entryData);
  else {
    layer.entries.push({
      id: globalThis.crypto?.randomUUID?.() ?? `school-project-${Date.now()}`,
      type: schoolProjectDialog.dataset.entryType || "school-project",
      ...entryData,
      createdAt: new Date().toISOString()
    });
  }
  layer.appliedEntries = structuredClone(layer.entries);
  layer.appliedAt = new Date().toISOString();
  saveProjects();
  schoolProjectDialog.close();
  if (activeLayerType === "appointments") renderAppointmentsProperties(project);
  else renderIndividualProjectsProperties(project);
  renderActiveCalendar(project);
});
cancelClassTripButton.addEventListener("click", () => classTripDialog.close());
classTripForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === classTripDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "individual");
  const name = classTripName.value.trim();
  const className = classTripClass.value.trim();
  if (!project || !layer) return;
  if (!name || !className || !classTripStartDate.value || !classTripEndDate.value || !classTripStartTime.value || !classTripEndTime.value) {
    classTripDialogStatus.textContent = "Bitte Bezeichnung, Klasse, Start- und Enddatum sowie Beginn und Ende eintragen.";
    return;
  }
  if (classTripEndDate.value < classTripStartDate.value) {
    classTripDialogStatus.textContent = "Das Enddatum darf nicht vor dem Startdatum liegen.";
    classTripEndDate.focus();
    return;
  }
  if (classTripEndTime.value <= classTripStartTime.value) {
    classTripDialogStatus.textContent = "Das Ende muss nach dem Beginn liegen.";
    classTripEndTime.focus();
    return;
  }
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const tripData = {
    name,
    className,
    startDate: classTripStartDate.value,
    endDate: classTripEndDate.value,
    startTime: classTripStartTime.value,
    endTime: classTripEndTime.value,
    overridesLessons: classTripOverridesLessons.checked
  };
  const existingTrip = layer.entries.find((entry) => entry.id === classTripDialog.dataset.tripId);
  if (existingTrip) Object.assign(existingTrip, tripData);
  else {
    layer.entries.push({
      id: globalThis.crypto?.randomUUID?.() ?? `class-trip-${Date.now()}`,
      type: "class-trip",
      ...tripData,
      createdAt: new Date().toISOString()
    });
  }
  layer.appliedEntries = structuredClone(layer.entries);
  layer.appliedAt = new Date().toISOString();
  saveProjects();
  classTripDialog.close();
  if (activeLayerType === "appointments") renderAppointmentsProperties(project);
  else renderIndividualProjectsProperties(project);
  renderActiveCalendar(project);
});
cancelLessonButton.addEventListener("click", () => lessonDialog.close());
deleteLessonButton.addEventListener("pointerdown", beginScheduleDeleteHold);
deleteLessonButton.addEventListener("pointerup", finishScheduleDeleteHold);
deleteLessonButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
deleteLessonButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
lessonPropertiesTab.addEventListener("click", () => setLessonDialogTab("properties"));
lessonStatisticsTab.addEventListener("click", () => setLessonDialogTab("statistics"));
lessonProgressTab.addEventListener("click", () => setLessonDialogTab("progress"));
addLessonPhaseButton.addEventListener("click", addLessonPhase);
cancelScheduleDisplayButton.addEventListener("click", () => scheduleDisplayDialog.close());
addLessonRowButton.addEventListener("click", () => addScheduleDisplayRow("lesson"));
addBreakRowButton.addEventListener("click", () => addScheduleDisplayRow("break"));
cancelSchedulePresetButton.addEventListener("click", () => schedulePresetDialog.close());
schedulePresetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const lessonMinutes = Math.max(1, Number(defaultLessonDuration.value) || 45);
  if (!isValidTimeValue(schoolDayStart.value) || !isValidTimeValue(schoolDayEnd.value) || schoolDayEnd.value <= schoolDayStart.value) {
    schedulePresetStatus.textContent = "Das Ende des Schultages muss nach seinem Beginn liegen.";
    return;
  }
  const project = projects.find((entry) => entry.id === schedulePresetDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "schedules");
  const school = project && ensureSchools(project)[0];
  if (!project || !layer || !school) return;
  layer.schedules = Array.isArray(layer.schedules) ? layer.schedules : [];
  const defaultValidity = getDefaultScheduleValidity(project, school.id);
  const defaultValidityPeriod = getScheduleValidityPeriods(project, school.id)[0];
  const newSchedule = {
    id: globalThis.crypto?.randomUUID?.() ?? `schedule-${Date.now()}`,
    name: `Planlogik ${layer.schedules.length + 1}`,
    schoolId: school.id,
    validityPeriodId: defaultValidityPeriod?.id || "schoolYear",
    validFrom: defaultValidityPeriod?.startDate || defaultValidity.validFrom,
    validUntil: defaultValidityPeriod?.endDate || defaultValidity.validUntil,
    activeDays: [1, 2, 3, 4, 5],
    displayDefaults: { dayStart: schoolDayStart.value, dayEnd: schoolDayEnd.value, lessonMinutes },
    displayRows: getDefaultDisplayRows(schoolDayStart.value, schoolDayEnd.value, lessonMinutes),
    pauseDefaultsInitialized: true,
    lessons: [],
    createdAt: new Date().toISOString()
  };
  layer.schedules.push(newSchedule);
  activeScheduleId = newSchedule.id;
  saveProjects();
  schedulePresetDialog.close();
  renderProjectBrowser();
  renderSchedulesProperties(project);
  openScheduleDisplayDialog(project, newSchedule);
});
scheduleDisplayForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const scheduleName = scheduleDisplayName.value.trim();
  const invalidIndex = displayRowsDraft.findIndex((row, index) => (
    !row.label.trim()
    || !isValidTimeValue(row.start)
    || !isValidTimeValue(row.end)
    || row.end <= row.start
  ));
  if (!scheduleName) {
    scheduleDisplayStatus.textContent = "Bitte einen Namen für den Kalender eintragen.";
    scheduleDisplayName.focus();
    return;
  }
  if (invalidIndex !== -1 || !displayRowsDraft.some((row) => row.type === "lesson")) {
    scheduleDisplayStatus.textContent = "Bitte für jedes Feld einen Namen sowie einen gültigen Beginn und ein gültiges Ende eintragen.";
    return;
  }
  const project = projects.find((entry) => entry.id === scheduleDisplayDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "schedules");
  const schedule = layer?.schedules?.find((entry) => entry.id === scheduleDisplayDialog.dataset.scheduleId);
  if (!schedule) return;
  schedule.name = scheduleName;
  schedule.displayRows = structuredClone(displayRowsDraft);
  schedule.pauseDefaultsInitialized = true;
  saveProjects();
  scheduleDisplayDialog.close();
  renderProjectBrowser();
  renderSchedulesProperties(project);
  renderActiveCalendar(project);
});
lessonForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedDays = getSelectedLessonDays();
  if (!selectedDays.length) {
    lessonDialogStatus.textContent = "Bitte mindestens einen Wochentag auswählen.";
    return;
  }
  if (!lessonSubject.value || !lessonGrade.value) {
    lessonDialogStatus.textContent = "Bitte ein angelegtes Fach und eine konkrete Klasse auswählen.";
    return;
  }
  if (lessonEnd.value <= lessonStart.value) {
    lessonDialogStatus.textContent = "Das Ende muss nach dem Beginn liegen.";
    lessonEnd.focus();
    return;
  }
  if (lessonPhasesDraft.length) {
    const invalidPhase = lessonPhasesDraft.some((phase) => !phase.name.trim() || !Number.isFinite(Number(phase.durationMinutes)) || Number(phase.durationMinutes) <= 0);
    const assignedMinutes = lessonPhasesDraft.reduce((sum, phase) => sum + Number(phase.durationMinutes || 0), 0);
    if (invalidPhase || assignedMinutes !== getLessonDialogDuration()) {
      lessonPhaseStatus.textContent = invalidPhase
        ? "Jede Phase benötigt eine Bezeichnung und eine positive Dauer."
        : `Die Phasen müssen zusammen genau ${getLessonDialogDuration()} Minuten ergeben.`;
      setLessonDialogTab("progress");
      return;
    }
  }
  const project = projects.find((entry) => entry.id === lessonDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "schedules");
  const schedule = layer?.schedules?.find((entry) => entry.id === lessonDialog.dataset.scheduleId);
  if (!schedule) return;
  const subjectOption = lessonSubject.selectedOptions[0];
  const classOption = lessonGrade.selectedOptions[0];
  const lessonData = {
    schoolId: schedule.schoolId,
    start: lessonStart.value,
    end: lessonEnd.value,
    grade: classOption?.dataset.name || classOption?.textContent || "",
    subject: subjectOption?.dataset.name || subjectOption?.textContent || "",
    subjectId: lessonSubject.value,
    gradeLevelId: classOption?.dataset.gradeId || "",
    classId: lessonGrade.value,
    phases: structuredClone(lessonPhasesDraft),
    room: lessonRoom.value.trim(),
    color: lessonColor.value || "#bfd2e2",
    teachingForm: lessonTeachingForm.value,
    abWeek: getLessonFormChoice(lessonAbWeekButtons, "lessonAbWeek", "A"),
    epochHalf: getLessonFormChoice(lessonEpochHalfButtons, "lessonEpochHalf", "first"),
    epochal: lessonTeachingForm.value === "epochal"
  };
  const existingLesson = schedule.lessons.find((entry) => entry.id === lessonDialog.dataset.lessonId);
  if (existingLesson) {
    const primaryDay = selectedDays.includes(existingLesson.day) ? existingLesson.day : selectedDays[0];
    Object.assign(existingLesson, lessonData, { day: primaryDay });
    selectedDays
      .filter((day) => day !== primaryDay)
      .forEach((day) => {
        schedule.lessons.push({
          id: globalThis.crypto?.randomUUID?.() ?? `lesson-${Date.now()}-${day}`,
          ...structuredClone(lessonData),
          day
        });
      });
  } else {
    selectedDays.forEach((day) => {
      schedule.lessons.push({
        id: globalThis.crypto?.randomUUID?.() ?? `lesson-${Date.now()}-${day}`,
        ...structuredClone(lessonData),
        day
      });
    });
  }
  saveProjects();
  lessonDialog.close();
  renderSchedulesProperties(project);
  renderActiveCalendar(project);
});
newProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = newProjectName.value.trim();
  if (!name) {
    newProjectName.focus();
    return;
  }
  const project = {
    id: globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}`,
    name,
    createdAt: new Date().toISOString(),
    layers: LAYER_TYPES.map((layer) => ({ type: layer.id, entries: [] }))
  };
  projects.push(project);
  activeProjectId = project.id;
  displayedProjectId = project.id;
  localStorage.setItem(DISPLAY_PROJECT_STORAGE_KEY, project.id);
  activeLayerType = null;
  expandedProjectIds.add(project.id);
  expandDefaultProjectLayers(project.id);
  saveProjects();
  renderProjectBrowser();
  renderProjectDetail();
  newProjectDialog.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    setBrowserMenuOpen(false);
    setExportMenuOpen(false);
    closeCardMenus();
  }
});
document.addEventListener("click", (event) => {
  if (!browserActionsMenu.contains(event.target) && !browserActionsButton.contains(event.target)) {
    setBrowserMenuOpen(false);
  }
  if (!exportMenu.contains(event.target) && !exportButton.contains(event.target)) {
    setExportMenuOpen(false);
  }
  const menuToggle = event.target instanceof Element ? event.target.closest(".schedule-menu-button") : null;
  if (menuToggle) closeCardMenus(menuToggle.closest(".schedule-menu-shell"));
  else closeCardMenus();
});
exportButton.addEventListener("click", (event) => {
  event.stopPropagation();
  setExportMenuOpen(exportButton.getAttribute("aria-expanded") !== "true");
});
exportMenu.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("[data-export-format]") : null;
  if (!button) return;
  event.stopPropagation();
  setExportMenuOpen(false);
  if (button.dataset.exportFormat === "json") exportDisplayedProject();
  if (button.dataset.exportFormat === "ics") openCalendarExportDialog();
});
calendarExportForm.addEventListener("change", (event) => {
  if (!(event.target instanceof HTMLInputElement) || event.target.name !== "calendarExportPreset") return;
  calendarExportChoices.hidden = event.target.value !== "custom";
  calendarExportStatus.textContent = "";
});
cancelCalendarExportButton.addEventListener("click", () => calendarExportDialog.close());
calendarExportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === calendarExportDialog.dataset.projectId);
  if (!project) return;
  const selection = getCalendarExportSelection(project);
  const hasSelection = selection.holidays
    || selection.scheduleIds.size
    || selection.individualEntryIds.size
    || selection.appointmentIds.size
    || selection.sicknessIds.size
    || selection.classProjectIds.size;
  if (!hasSelection) {
    calendarExportStatus.textContent = "Bitte mindestens einen Inhalt für den Export auswählen.";
    return;
  }
  calendarExportDialog.close();
  downloadDisplayedCalendar(selection);
});
renderLessonColorPalette();
renderAppointmentGroupColorPalette();
updateLessonSignalsToggle();
setInterval(checkLessonSignals, 500);
currentTimeIndicatorTimer = setInterval(updateCurrentTimeIndicator, 15_000);
window.addEventListener("resize", () => requestAnimationFrame(() => updateCurrentTimeIndicator()));
projects.forEach((project) => ensureSchools(project));
saveProjects();
renderActiveCalendar();
renderProjectBrowser();
renderProjectDetail();
