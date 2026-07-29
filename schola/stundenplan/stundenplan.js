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
const classTripDate = document.getElementById("classTripDate");
const classTripStartTime = document.getElementById("classTripStartTime");
const classTripEndTime = document.getElementById("classTripEndTime");
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
const lessonStart = document.getElementById("lessonStart");
const lessonEnd = document.getElementById("lessonEnd");
const lessonGrade = document.getElementById("lessonGrade");
const lessonSubject = document.getElementById("lessonSubject");
const lessonRoom = document.getElementById("lessonRoom");
const lessonColor = document.getElementById("lessonColor");
const lessonColorPalette = document.getElementById("lessonColorPalette");
const lessonEpochal = document.getElementById("lessonEpochal");
const lessonDialogStatus = document.getElementById("lessonDialogStatus");
const cancelLessonButton = document.getElementById("cancelLessonButton");
const lessonSubmitButton = document.getElementById("lessonSubmitButton");
const lessonPropertiesTab = document.getElementById("lessonPropertiesTab");
const lessonStatisticsTab = document.getElementById("lessonStatisticsTab");
const lessonPropertiesPanel = document.getElementById("lessonPropertiesPanel");
const lessonStatisticsPanel = document.getElementById("lessonStatisticsPanel");
const lessonYearStatistic = document.getElementById("lessonYearStatistic");
const lessonYearStatisticPeriod = document.getElementById("lessonYearStatisticPeriod");
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
const scheduleDisplayName = document.getElementById("scheduleDisplayName");
const calendarViewButtons = [...document.querySelectorAll("[data-calendar-view]")];
const calendarDateNavigation = document.getElementById("calendarDateNavigation");
const previousCalendarPeriod = document.getElementById("previousCalendarPeriod");
const todayCalendarPeriod = document.getElementById("todayCalendarPeriod");
const nextCalendarPeriod = document.getElementById("nextCalendarPeriod");
const lessonSignalsToggle = document.getElementById("lessonSignalsToggle");

const PROJECT_STORAGE_KEY = "schola-stundenplan-projects-v1";
const DISPLAY_PROJECT_STORAGE_KEY = "schola-stundenplan-display-project-v1";
const LESSON_SIGNALS_STORAGE_KEY = "schola-stundenplan-signals-enabled-v1";
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
  { id: "holidays", title: "Ferien", description: "Bundesland- und schuljahrabhängige Kalenderschicht" },
  { id: "individual", title: "Individuelle Projekte", description: "Klassenfahrten, Projekttage und persönliche Beteiligungen" },
  { id: "classes", title: "Projekttage nach Klassen", description: "Klassenbezogene Projektschichten" },
  { id: "schedules", title: "Stundenpläne", description: "Wochenpläne mit Gültigkeitszeitraum und Unterrichtsstunden" },
  { id: "appointments", title: "Termine", description: "Gruppen für unregelmäßig wiederkehrende Termine" },
  { id: "sickness", title: "Krankschreibungen", description: "Zeiträume persönlicher Verhinderung ohne Unterricht" },
  { id: "classCatalog", title: "Klassen", description: "Fächer, Klassenstufen und semantisch eindeutige Einzelklassen" }
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
      const matchingHolidays = matchingEntries.filter((entry) => entry.type === "school-holiday");
      const matchingProjects = matchingEntries.filter((entry) => entry.type !== "school-holiday" && entry.type !== "appointment");
      const entryColors = [...new Set(matchingEntries.map((entry) => {
        if (entry.type === "school-holiday") return "#c6d7bd";
        if (entry.type === "appointment") return entry.color || "#c9c1dd";
        if (entry.type === "sickness") return "#d8ccca";
        return "#bfd2e2";
      }))];
      day.className = [
        "day",
        weekday === 0 || weekday === 6 ? "is-weekend" : "",
        matchingHolidays.length ? "is-holiday" : "",
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
        const names = [...new Set(matchingEntries.map((entry) => entry.name))];
        day.title = names.join(", ");
        day.setAttribute("aria-label", `${dayNumber}. ${monthName}: ${names.join(", ")}`);
      }
      grid.append(day);
    }

    month.append(grid);
    calendar.append(month);
  });
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
  const appointmentEntries = (Array.isArray(appointmentLayer?.groups) ? appointmentLayer.groups : [])
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
  if (!project || !appliedSettings?.startYear) {
    renderYear(new Date().getFullYear(), calendarEntries);
    return;
  }
  renderYear(Number(appliedSettings.startYear), calendarEntries, true);
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
      .filter((entry) => entry.type === "school-project" || entry.type === "class-trip")
      .map((entry) => ({ ...entry, projectId: project.id, projectName: project.name }));
  });
}

function getCombinedAppointments() {
  return projects.filter((project) => project.id === displayedProjectId).flatMap((project) => {
    const layer = project.layers?.find((entry) => entry.type === "appointments");
    return (Array.isArray(layer?.groups) ? layer.groups : []).flatMap((group) => (
      Array.isArray(group.appointments) ? group.appointments.map((appointment) => ({
        ...appointment,
        groupId: group.id,
        groupName: group.name,
        color: group.color || "#c9c1dd",
        projectId: project.id,
        projectName: project.name
      })) : []
    ));
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

function isSchoolHolidayForSchedule(schedule, date) {
  const project = projects.find((entry) => entry.id === schedule.projectId);
  const holidayLayer = project?.layers?.find((entry) => entry.type === "holidays");
  const dateKey = getLocalDateKey(date);
  return (Array.isArray(holidayLayer?.entries) ? holidayLayer.entries : []).some((entry) => (
    entry.type === "school-holiday"
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
      .filter((lesson) => lesson.day === weekday)
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
  const holidayNames = projects
    .filter((project) => !projectIds.size || projectIds.has(project.id))
    .flatMap((project) => {
      const holidayLayer = project.layers?.find((entry) => entry.type === "holidays");
      return Array.isArray(holidayLayer?.entries) ? holidayLayer.entries : [];
    })
    .filter((entry) => (
      entry.type === "school-holiday"
      && dateKey >= entry.startDate
      && dateKey <= entry.endDate
    ))
    .map((entry) => entry.name);
  return [...new Set(holidayNames)];
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
  room.textContent = lesson.room || "–";
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
  card.title = `${schoolProject.projectName} / ${schoolProject.type === "class-trip" ? "Klassenfahrten" : "Schulprojekte"}`;
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
    else openSchoolProjectDialog(project, originalEntry);
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
    const originalGroup = project?.layers?.find((entry) => entry.type === "appointments")
      ?.groups?.find((entry) => entry.id === appointment.groupId);
    const originalAppointment = originalGroup?.appointments?.find((entry) => entry.id === appointment.id);
    if (project && originalGroup && originalAppointment) {
      openAppointmentDialog(project, originalGroup, originalAppointment);
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
  const dates = view === "day"
    ? [reference]
    : Array.from({ length: 5 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
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
        && !isSchoolHolidayForSchedule(schedule, date)
        && !isSicknessForSchedule(schedule, date)
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
    : `${dates[0].toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}–${dates[4].toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}`;
  const hasVisibleHolidays = [...holidaysByDate.values()].some((names) => names.length);
  if (!timedLessons.length && !visibleSchoolProjects.length && !visibleAppointments.length && !hasVisibleHolidays) {
    const empty = document.createElement("p");
    empty.className = "combined-schedule-empty";
    empty.textContent = "Für diese Ansicht sind noch keine Unterrichtsstunden eingetragen.";
    calendar.append(empty);
    return;
  }

  const lessonStarts = timedLessons.map(({ lesson }) => timeToMinutes(lesson.start));
  const lessonEnds = timedLessons.map(({ lesson }) => timeToMinutes(lesson.end));
  const appointmentStarts = visibleAppointments.map((appointment) => timeToMinutes(appointment.startTime));
  const appointmentEnds = visibleAppointments.map((appointment) => timeToMinutes(appointment.endTime));
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
  const rangeStarts = [...lessonStarts, ...appointmentStarts, ...configuredStarts];
  const rangeEnds = [...lessonEnds, ...appointmentEnds, ...configuredEnds];
  const earliestMinutes = rangeStarts.length ? Math.min(...rangeStarts) : 8 * 60;
  const latestMinutes = rangeEnds.length ? Math.max(...rangeEnds) : 16 * 60;
  const timelineStart = Math.max(0, Math.floor(earliestMinutes / 60) * 60 - 30);
  const timelineEnd = Math.min(24 * 60, Math.ceil(latestMinutes / 60) * 60 + 30);
  const timelineMinutes = timelineEnd - timelineStart;
  const firstHourMark = Math.ceil(timelineStart / 60) * 60;
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
    head.textContent = view === "day"
      ? date.toLocaleDateString("de-DE", { weekday: "long" })
      : date.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" });
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
    const holidayNames = holidaysByDate.get(getLocalDateKey(date)) || [];
    const column = document.createElement("div");
    column.className = `timeline-day-column${holidayNames.length ? " is-holiday" : ""}`;
    for (let minutes = firstHourMark; minutes <= timelineEnd; minutes += 60) {
      const guide = document.createElement("span");
      guide.className = "timeline-hour-guide";
      guide.style.top = `${((minutes - timelineStart) / timelineMinutes) * 100}%`;
      column.append(guide);
    }
    if (holidayNames.length) {
      const holidayLabel = document.createElement("div");
      holidayLabel.className = "timeline-holiday-label";
      holidayLabel.textContent = holidayNames.join(" · ");
      column.append(holidayLabel);
    }
    const lessonEntries = timedLessons.filter(({ lesson, schedule }) => (
        lesson.day === weekday
        && isScheduleValidOn(schedule, date)
        && !isSchoolHolidayForSchedule(schedule, date)
        && !isSicknessForSchedule(schedule, date)
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
  updateCurrentTimeIndicator();
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

function selectProject(projectId) {
  activeProjectId = projectId;
  activeLayerType = null;
  activeScheduleId = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectLayer(projectId, layerType) {
  activeProjectId = projectId;
  activeLayerType = layerType;
  activeScheduleId = null;
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
    const meta = document.createElement("span");
    meta.textContent = `${LAYER_TYPES.length} Kalenderschichten`;
    main.append(title, meta);
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
        const layerRow = document.createElement("button");
        layerRow.type = "button";
        layerRow.className = `layer-row${project.id === activeProjectId && layer.id === activeLayerType ? " is-active" : ""}`;
        layerRow.textContent = layer.title;
        layerRow.addEventListener("click", () => selectLayer(project.id, layer.id));
        layers.append(layerRow);
        if (layer.id === "schedules") {
          const scheduleLayer = getProjectLayer(project, "schedules");
          scheduleLayer.schedules = Array.isArray(scheduleLayer.schedules) ? scheduleLayer.schedules : [];
          scheduleLayer.schedules.forEach((schedule) => {
            const scheduleRow = document.createElement("button");
            scheduleRow.type = "button";
            scheduleRow.className = `schedule-tree-row${project.id === activeProjectId && schedule.id === activeScheduleId ? " is-active" : ""}`;
            scheduleRow.textContent = schedule.name;
            scheduleRow.addEventListener("click", () => selectSchedule(project.id, schedule.id));
            layers.append(scheduleRow);
          });
        }
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

function renderProjectSettings(project) {
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
  const status = document.createElement("p");
  status.className = "property-status";
  status.setAttribute("role", "status");
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "secondary-button primary-action holiday-load-button";
  saveButton.textContent = "Änderungen speichern";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextName = nameInput.value.trim();
    if (!nextName) {
      status.textContent = "Bitte einen Projekttitel eingeben.";
      nameInput.focus();
      return;
    }
    project.name = nextName;
    saveProjects();
    renderProjectBrowser();
    renderProjectDetail();
    renderActiveCalendar();
  });
  form.append(nameRow, status, saveButton);
  summary.append(titleLine, note, form);
  projectDetail.replaceChildren(summary);
}

function renderClassProjectsIntroduction(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Projekttage nach Klassen";

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
  explanation.textContent = "Einzelne Klassen haben zeitweise keinen regulären Unterricht, etwa weil sie ohne Ihre Begleitung auf Klassenfahrt sind oder an einem anderen schulischen Projekt teilnehmen. Jeder Eintrag wird deshalb einer Klasse zugeordnet und erhält ein Datum sowie Beginn und Ende.";
  const effect = document.createElement("p");
  effect.textContent = "Für den eingetragenen Zeitraum entfernt der Kalender ausschließlich die Unterrichtsstunden der betroffenen Klasse. Der Unterricht aller anderen Klassen bleibt unverändert sichtbar.";
  section.append(sectionTitle, explanation, effect);

  sheet.append(head, section);
  projectDetail.replaceChildren(sheet);
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

function openAppointmentGroupDialog(project, group = null) {
  appointmentGroupForm.reset();
  appointmentGroupDialogStatus.textContent = "";
  appointmentGroupDialog.dataset.projectId = project.id;
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

function openAppointmentDialog(project, group, appointment = null) {
  appointmentForm.reset();
  appointmentDialogStatus.textContent = "";
  appointmentDialog.dataset.projectId = project.id;
  appointmentDialog.dataset.groupId = group.id;
  if (appointment) {
    appointmentDialog.dataset.appointmentId = appointment.id;
    appointmentDialogTitle.textContent = "Termin bearbeiten";
    appointmentSubmitButton.textContent = "Änderungen speichern";
    appointmentName.value = appointment.name || "";
    appointmentDate.value = appointment.date || "";
    appointmentStartTime.value = appointment.startTime || "";
    appointmentEndTime.value = appointment.endTime || "";
  } else {
    delete appointmentDialog.dataset.appointmentId;
    appointmentDialogTitle.textContent = "Termin hinzufügen";
    appointmentSubmitButton.textContent = "Termin hinzufügen";
  }
  appointmentDialog.showModal();
  appointmentName.focus();
}

function createAppointmentMenu(project, group, appointment = null) {
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
    if (appointment) openAppointmentDialog(project, group, appointment);
    else openAppointmentGroupDialog(project, group);
  });
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "schedule-menu-delete";
  deleteButton.textContent = "Löschen";
  deleteButton.dataset.projectId = project.id;
  deleteButton.dataset.appointmentGroupId = group.id;
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

function renderAppointmentsProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Termine";
  const layer = getProjectLayer(project, "appointments");
  layer.groups = Array.isArray(layer.groups) ? layer.groups : [];

  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Bündeln Sie unregelmäßig wiederkehrende Termine in eigenen Gruppen, zum Beispiel „Fachschaft Deutsch“.";
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
  sheet.append(head, addGroupButton, groupList);
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
  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Legen Sie Fächer als Gruppen an und ordnen Sie darin Klassenstufen und Einzelklassen. Diese eindeutige Struktur bildet später die Grundlage für Unterrichtsstatistiken je Fach und Klasse.";
  head.append(title, intro);
  const addSubject = document.createElement("button");
  addSubject.type = "button";
  addSubject.className = "secondary-button primary-action";
  addSubject.textContent = "Fach hinzufügen";
  addSubject.addEventListener("click", () => openClassCatalogDialog(project, "subject"));
  const subjectList = document.createElement("div");
  subjectList.className = "class-catalog-subject-list";
  if (!layer.subjects.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch kein Fach angelegt.";
    subjectList.append(empty);
  } else {
    layer.subjects.forEach((subject) => {
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
  sheet.append(head, addSubject, subjectList);
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

function getDefaultScheduleValidity(project) {
  const holidayLayer = project.layers?.find((entry) => entry.type === "holidays");
  const schoolYear = holidayLayer?.appliedSettings || holidayLayer?.settings;
  const startYear = Number(schoolYear?.startYear);
  const endYear = Number(schoolYear?.endYear) || startYear + 1;
  if (startYear) {
    return {
      validFrom: `${startYear}-08-01`,
      validUntil: `${endYear}-07-31`
    };
  }
  const today = new Date();
  return {
    validFrom: today.toISOString().slice(0, 10),
    validUntil: `${today.getFullYear() + 1}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  };
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

function deleteProjectFolder(projectId) {
  if (!projects.some((project) => project.id === projectId)) return;
  projects = projects.filter((project) => project.id !== projectId);
  expandedProjectIds.delete(projectId);

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
  renderIndividualProjectsProperties(project);
  renderActiveCalendar(project);
}

function deleteAppointmentGroup(projectId, groupId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "appointments");
  if (!project || !layer || !Array.isArray(layer.groups)) return;
  layer.groups = layer.groups.filter((entry) => entry.id !== groupId);
  saveProjects();
  renderAppointmentsProperties(project);
  renderActiveCalendar(project);
}

function deleteAppointment(projectId, groupId, appointmentId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "appointments");
  const group = layer?.groups?.find((entry) => entry.id === groupId);
  if (!project || !group || !Array.isArray(group.appointments)) return;
  group.appointments = group.appointments.filter((entry) => entry.id !== appointmentId);
  saveProjects();
  renderAppointmentsProperties(project);
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
    tripId: button.dataset.tripId,
    appointmentGroupId: button.dataset.appointmentGroupId,
    appointmentId: button.dataset.appointmentId,
    sicknessId: button.dataset.sicknessId,
    catalogType: button.dataset.catalogType,
    catalogSubjectId: button.dataset.catalogSubjectId,
    catalogGradeId: button.dataset.catalogGradeId,
    catalogClassId: button.dataset.catalogClassId,
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
    tripId,
    appointmentGroupId,
    appointmentId,
    sicknessId,
    catalogType,
    catalogSubjectId,
    catalogGradeId,
    catalogClassId,
    armed
  } = scheduleDeleteHoldState;
  const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
  const releasedOnButton = Boolean(releaseTarget && (releaseTarget === button || button.contains(releaseTarget)));
  resetScheduleDeleteHold();
  if (!armed || !releasedOnButton) return;
  if (projectFolderId) deleteProjectFolder(projectFolderId);
  else if (catalogType) deleteClassCatalogEntry(projectId, catalogType, catalogSubjectId, catalogGradeId, catalogClassId);
  else if (sicknessId) deleteSickness(projectId, sicknessId);
  else if (appointmentId) deleteAppointment(projectId, appointmentGroupId, appointmentId);
  else if (appointmentGroupId) deleteAppointmentGroup(projectId, appointmentGroupId);
  else if (tripId) deleteClassTrip(projectId, tripId);
  else deleteSchedule(projectId, scheduleId);
}

function cancelScheduleDeleteHold(event) {
  if (!scheduleDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  resetScheduleDeleteHold();
}

function renderSchedulesProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Stundenpläne";
  const layer = getProjectLayer(project, "schedules");
  layer.schedules = Array.isArray(layer.schedules) ? layer.schedules : [];
  const schedule = layer.schedules.find((entry) => entry.id === activeScheduleId);

  if (!schedule) {
    const sheet = document.createElement("section");
    sheet.className = "property-sheet";
    const head = document.createElement("div");
    head.className = "property-sheet-head";
    const title = document.createElement("h3");
    title.textContent = project.name;
    const intro = document.createElement("p");
    intro.textContent = "Legen Sie einen Wochenplan an. Er erscheint anschließend unter „Stundenpläne“ im Browser.";
    head.append(title, intro);
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "secondary-button primary-action schedule-add-button";
    addButton.textContent = "Stundenplan hinzufügen";
    addButton.addEventListener("click", () => {
      const defaultValidity = getDefaultScheduleValidity(project);
      const newSchedule = {
        id: globalThis.crypto?.randomUUID?.() ?? `schedule-${Date.now()}`,
        name: `Stundenplan ${layer.schedules.length + 1}`,
        validFrom: defaultValidity.validFrom,
        validUntil: defaultValidity.validUntil,
        displayDefaults: { dayStart: "07:00", dayEnd: "18:00", lessonMinutes: 45 },
        displayRows: getDefaultDisplayRows(),
        pauseDefaultsInitialized: true,
        lessons: [],
        createdAt: new Date().toISOString()
      };
      layer.schedules.push(newSchedule);
      activeScheduleId = newSchedule.id;
      saveProjects();
      renderProjectBrowser();
      renderSchedulesProperties(project);
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
        const validity = document.createElement("span");
        validity.textContent = entry.validFrom && entry.validUntil
          ? `${formatGermanDate(entry.validFrom)}–${formatGermanDate(entry.validUntil)}`
          : "Gültigkeit noch nicht vollständig festgelegt";
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
  intro.textContent = "Gültigkeit festlegen und für eine neue Stunde in das Wochenraster klicken.";
  head.append(titleLine, intro);

  const validity = document.createElement("div");
  validity.className = "schedule-validity";
  const fromLabel = document.createElement("label");
  const fromText = document.createElement("span");
  fromText.textContent = "Gültig von";
  const fromInput = document.createElement("input");
  fromInput.type = "date";
  fromInput.value = schedule.validFrom || "";
  fromLabel.append(fromText, fromInput);
  const untilLabel = document.createElement("label");
  const untilText = document.createElement("span");
  untilText.textContent = "Gültig bis";
  const untilInput = document.createElement("input");
  untilInput.type = "date";
  untilInput.value = schedule.validUntil || "";
  untilLabel.append(untilText, untilInput);
  const saveValidity = () => {
    schedule.validFrom = fromInput.value;
    schedule.validUntil = untilInput.value;
    saveProjects();
    renderActiveCalendar(project);
  };
  fromInput.addEventListener("change", saveValidity);
  untilInput.addEventListener("change", saveValidity);
  validity.append(fromLabel, untilLabel);

  const week = document.createElement("div");
  week.className = "schedule-week schedule-editor-timeline";
  const editorRows = schedule.displayRows.filter((row) => row.start && row.end && row.end > row.start);
  const editorStart = Math.min(...editorRows.map((row) => timeToMinutes(row.start)));
  const editorEnd = Math.max(...editorRows.map((row) => timeToMinutes(row.end)));
  const editorMinutes = Math.max(1, editorEnd - editorStart);
  week.style.setProperty("--schedule-editor-height", `${Math.max(480, editorMinutes * 1.15)}px`);

  const weekHeader = document.createElement("div");
  weekHeader.className = "schedule-editor-week-header";
  const corner = document.createElement("div");
  corner.className = "schedule-week-corner";
  corner.textContent = "Zeit";
  weekHeader.append(corner);
  ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"].forEach((name) => {
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

  for (let day = 1; day <= 5; day += 1) {
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
  }
  week.append(weekBody);
  sheet.append(head, validity, week);
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
  if (showStatistics) renderLessonStatistics();
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

function getLessonStatisticsPeriod(project) {
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
  const { startDate, endDate } = getLessonStatisticsPeriod(project);
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
        .filter((lesson) => lesson.day === weekday && isSameCatalogLesson(lesson, referenceLesson))
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

function populateLessonClasses(project, lesson = null) {
  const layer = project?.layers?.find((entry) => entry.type === "classCatalog");
  const subject = layer?.subjects?.find((entry) => entry.id === lessonSubject.value);
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

function populateLessonCatalog(project, lesson = null) {
  const layer = project?.layers?.find((entry) => entry.type === "classCatalog");
  const subjects = Array.isArray(layer?.subjects) ? layer.subjects : [];
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
  populateLessonClasses(project, lesson);
}

function openLessonDialog(project, schedule, day, displayRow) {
  lessonForm.reset();
  lessonPhasesDraft = [];
  delete lessonDialog.dataset.lessonId;
  lessonStatisticsTab.hidden = true;
  setLessonDialogTab("properties");
  lessonDialogTitle.textContent = "Stunde hinzufügen";
  lessonSubmitButton.textContent = "Stunde hinzufügen";
  setLessonColor("#bfd2e2");
  lessonDay.value = String(day);
  lessonStart.value = displayRow.start;
  lessonEnd.value = displayRow.end;
  lessonDialogStatus.textContent = "";
  lessonDialog.dataset.projectId = project.id;
  lessonDialog.dataset.scheduleId = schedule.id;
  populateLessonCatalog(project);
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
  lessonDay.value = String(lesson.day);
  lessonStart.value = lesson.start;
  lessonEnd.value = lesson.end;
  lessonRoom.value = lesson.room || "";
  setLessonColor(lesson.color || "#bfd2e2");
  lessonEpochal.value = lesson.epochal ? "epochal" : "regular";
  lessonDialogStatus.textContent = "";
  lessonDialog.dataset.projectId = project.id;
  lessonDialog.dataset.scheduleId = schedule.id;
  lessonDialog.dataset.lessonId = lesson.id;
  populateLessonCatalog(project, lesson);
  lessonDialog.showModal();
  requestAnimationFrame(() => lessonSubject.focus());
}

lessonSubject.addEventListener("change", () => {
  const project = projects.find((entry) => entry.id === lessonDialog.dataset.projectId);
  if (project) populateLessonClasses(project);
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
  const firstStart = displayRowsDraft[0]?.start || "07:00";
  const lastEnd = displayRowsDraft.at(-1)?.end || "18:00";
  const firstLesson = displayRowsDraft.find((row) => row.type === "lesson");
  const inferredLessonMinutes = firstLesson
    ? Math.max(15, timeToMinutes(firstLesson.end) - timeToMinutes(firstLesson.start))
    : 45;
  const defaults = schedule.displayDefaults || {};
  scheduleDisplayName.value = schedule.name;
  schoolDayStart.value = defaults.dayStart || firstStart;
  schoolDayEnd.value = defaults.dayEnd || lastEnd;
  defaultLessonDuration.value = String(defaults.lessonMinutes || inferredLessonMinutes);
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

function applyDisplayDefaults() {
  const lessonMinutes = Math.max(15, Number(defaultLessonDuration.value) || 45);
  if (!schoolDayStart.value || !schoolDayEnd.value || schoolDayEnd.value <= schoolDayStart.value) {
    scheduleDisplayStatus.textContent = "Das Ende des Schultages muss nach seinem Beginn liegen.";
    return;
  }
  displayRowsDraft = getDefaultDisplayRows(schoolDayStart.value, schoolDayEnd.value, lessonMinutes);
  scheduleDisplayStatus.textContent = "Voreinstellung aktualisiert. Einzelne Zeiten und Pausen können weiterhin verändert werden.";
  renderScheduleDisplayRows();
}

function timeToMinutes(value) {
  const [hours, minutes] = String(value).split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(value) {
  const safeMinutes = Math.max(0, Math.min(value, 23 * 60 + 45));
  return `${String(Math.floor(safeMinutes / 60)).padStart(2, "0")}:${String(safeMinutes % 60).padStart(2, "0")}`;
}

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
    start.addEventListener("change", () => {
      row.start = start.value;
      renderScheduleDisplayRows();
    });
    const end = document.createElement("input");
    end.type = "time";
    end.step = "300";
    end.value = row.end;
    end.required = true;
    end.setAttribute("aria-label", `${kind.textContent} Ende`);
    end.addEventListener("change", () => {
      row.end = end.value;
      renderScheduleDisplayRows();
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
    item.append(kind, label, start, end, remove);
    return item;
  });
  scheduleDisplayRows.replaceChildren(...rows);
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
  classTripDialogStatus.textContent = "";
  classTripDialog.dataset.projectId = project.id;
  const timeDefaults = getIndividualEventTimeDefaults(project);
  if (trip) {
    classTripDialog.dataset.tripId = trip.id;
    classTripDialogTitle.textContent = "Klassenfahrt bearbeiten";
    classTripSubmitButton.textContent = "Änderungen speichern";
    classTripName.value = trip.name || "";
    classTripClass.value = trip.className || "";
    classTripDate.value = trip.startDate || "";
    classTripStartTime.value = trip.startTime || timeDefaults.start;
    classTripEndTime.value = trip.endTime || timeDefaults.end;
  } else {
    delete classTripDialog.dataset.tripId;
    classTripDialogTitle.textContent = "Klassenfahrt hinzufügen";
    classTripSubmitButton.textContent = "Klassenfahrt hinzufügen";
    classTripStartTime.value = timeDefaults.start;
    classTripEndTime.value = timeDefaults.end;
  }
  classTripDialog.showModal();
  classTripName.focus();
}

function openSchoolProjectDialog(project, schoolProject = null) {
  schoolProjectForm.reset();
  schoolProjectEndDate.min = "";
  schoolProjectDialogStatus.textContent = "";
  schoolProjectDialog.dataset.projectId = project.id;
  const timeDefaults = getIndividualEventTimeDefaults(project);
  if (schoolProject) {
    schoolProjectDialog.dataset.entryId = schoolProject.id;
    schoolProjectDialogTitle.textContent = "Schulprojekt bearbeiten";
    schoolProjectSubmitButton.textContent = "Änderungen speichern";
    schoolProjectName.value = schoolProject.name || "";
    schoolProjectDate.value = schoolProject.startDate || "";
    schoolProjectEndDate.value = schoolProject.endDate || schoolProject.startDate || "";
    schoolProjectStartTime.value = schoolProject.startTime || timeDefaults.start;
    schoolProjectEndTime.value = schoolProject.endTime || timeDefaults.end;
  } else {
    delete schoolProjectDialog.dataset.entryId;
    schoolProjectDialogTitle.textContent = "Schulprojekt hinzufügen";
    schoolProjectSubmitButton.textContent = "Schulprojekt hinzufügen";
    schoolProjectStartTime.value = timeDefaults.start;
    schoolProjectEndTime.value = timeDefaults.end;
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

function renderIndividualProjectsProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Individuelle Projekte";

  const layer = getProjectLayer(project, "individual");
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const trips = layer.entries.filter((entry) => entry.type === "class-trip");
  const schoolProjects = layer.entries.filter((entry) => entry.type === "school-project");

  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Persönlich betreute oder begleitete Vorhaben werden als eigene Kalendereinträge im Projekt gespeichert.";
  head.append(title, intro);

  const section = document.createElement("section");
  section.className = "property-section";
  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = "Klassenfahrten";

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
  launcherButton.textContent = "Klassenfahrt hinzufügen";
  launcherButton.addEventListener("click", () => openClassTripDialog(project));

  const list = document.createElement("div");
  list.className = "trip-entry-list";
  if (!trips.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch keine Klassenfahrt eingetragen.";
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
          openClassTripDialog(project, trip);
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

  const schoolProjectSection = document.createElement("section");
  schoolProjectSection.className = "property-section";
  const schoolProjectSectionTitle = document.createElement("h3");
  schoolProjectSectionTitle.textContent = "Schulprojekte";
  const schoolProjectLauncher = document.createElement("button");
  schoolProjectLauncher.type = "button";
  schoolProjectLauncher.className = "secondary-button primary-action trip-add-button";
  schoolProjectLauncher.textContent = "Schulprojekt hinzufügen";
  schoolProjectLauncher.addEventListener("click", () => openSchoolProjectDialog(project));
  const schoolProjectList = document.createElement("div");
  schoolProjectList.className = "trip-entry-list";
  if (!schoolProjects.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch kein Schulprojekt eingetragen.";
    schoolProjectList.append(empty);
  } else {
    schoolProjects
      .slice()
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
      .forEach((schoolProject) => {
        const row = document.createElement("article");
        row.className = "trip-entry";
        const copy = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = schoolProject.name;
        const dates = document.createElement("span");
        dates.textContent = formatIndividualEventSchedule(schoolProject);
        copy.append(name, dates);
        const menuShell = document.createElement("div");
        menuShell.className = "schedule-menu-shell";
        const menuButton = document.createElement("button");
        menuButton.type = "button";
        menuButton.className = "schedule-menu-button";
        menuButton.setAttribute("aria-label", `Menü für ${schoolProject.name}`);
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
          openSchoolProjectDialog(project, schoolProject);
        });
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "schedule-menu-delete";
        deleteButton.textContent = "Löschen";
        deleteButton.dataset.projectId = project.id;
        deleteButton.dataset.tripId = schoolProject.id;
        deleteButton.setAttribute("aria-label", `${schoolProject.name} löschen – gedrückt halten`);
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
        schoolProjectList.append(row);
      });
  }
  schoolProjectSection.append(schoolProjectSectionTitle, schoolProjectLauncher, schoolProjectList);

  const applyStatus = document.createElement("p");
  applyStatus.className = "property-status";
  applyStatus.setAttribute("role", "status");
  applyStatus.setAttribute("aria-live", "polite");
  const applyButton = document.createElement("button");
  applyButton.type = "button";
  applyButton.className = "secondary-button primary-action trip-apply-button";
  applyButton.textContent = "Einstellungen übernehmen";
  applyButton.addEventListener("click", () => {
    layer.appliedEntries = structuredClone(layer.entries);
    layer.appliedAt = new Date().toISOString();
    saveProjects();
    renderActiveCalendar(project);
    applyStatus.textContent = "Einstellungen übernommen und Kalenderansicht aktualisiert.";
  });

  section.append(sectionTitle, launcherButton, list);
  sheet.append(head, section, schoolProjectSection, applyButton, applyStatus);
  projectDetail.replaceChildren(sheet);
  saveProjects();
}

function renderHolidayProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Ferien";

  const layer = getProjectLayer(project, "holidays");
  const currentYear = new Date().getFullYear();
  layer.settings = {
    federalState: layer.settings?.federalState || "MV",
    schoolType: layer.settings?.schoolType || (layer.settings?.federalState === "MV" ? "general" : "all"),
    startYear: Number(layer.settings?.startYear) || currentYear,
    endYear: Number(layer.settings?.endYear) || currentYear + 1
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
  const schoolTypeRow = document.createElement("label");
  schoolTypeRow.className = "property-row";
  const schoolTypeLabel = document.createElement("span");
  schoolTypeLabel.textContent = "Geltungsbereich";
  const schoolTypeSelect = document.createElement("select");
  schoolTypeSelect.setAttribute("aria-label", "Schulart");
  const schoolTypeOptions = layer.settings.federalState === "MV"
    ? [["general", "Allgemeinbildende Schulen"], ["vocational", "Berufliche Schulen"]]
    : [["all", "Alle Schulen"]];
  schoolTypeOptions.forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    option.selected = value === layer.settings.schoolType;
    schoolTypeSelect.append(option);
  });
  if (![...schoolTypeSelect.options].some((option) => option.selected)) {
    schoolTypeSelect.selectedIndex = 0;
    layer.settings.schoolType = schoolTypeSelect.value;
  }
  schoolTypeSelect.addEventListener("change", () => {
    layer.settings.schoolType = schoolTypeSelect.value;
    clearHolidayPreview(layer);
    saveProjects();
    renderHolidayProperties(project);
  });
  schoolTypeRow.append(schoolTypeLabel, createSelectShell(schoolTypeSelect));
  schoolTypeList.append(schoolTypeRow);
  schoolTypeSection.append(schoolTypeTitle, schoolTypeList);

  const section = document.createElement("section");
  section.className = "property-section";
  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = "Schuljahr";
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
    layer.settings.schoolType = stateSelect.value === "MV" ? "general" : "all";
    clearHolidayPreview(layer);
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
    saveProjects();
    renderHolidayProperties(project);
  });

  list.append(stateRow, schoolYearRow);
  const settingsKey = getHolidaySettingsKey(layer.settings);
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
    empty.textContent = layer.previewError || "Ferientermine werden automatisch abgerufen …";
    result.append(empty);
  }

  const source = document.createElement("div");
  source.className = "holiday-source";
  const sourceLink = document.createElement("a");
  sourceLink.href = "https://www.kmk.org/service/ferienregelung/ferienkalender.html";
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener noreferrer";
  sourceLink.textContent = "Amtliche Prüfreferenz: Kultusministerkonferenz";
  source.append(sourceLink);
  if (layer.previewProvenance?.retrievedAt) {
    const retrieved = document.createElement("span");
    retrieved.textContent = `Daten: OpenHolidays · abgerufen ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(layer.previewProvenance.retrievedAt))}`;
    source.append(retrieved);
  }

  applyButton.addEventListener("click", () => {
    if (!previewEntries.length) return;
    layer.entries = structuredClone(previewEntries);
    layer.provenance = structuredClone(layer.previewProvenance);
    layer.appliedSettings = structuredClone(layer.settings);
    saveProjects();
    renderActiveCalendar(project);
    status.textContent = "Einstellungen übernommen und Kalenderansicht aktualisiert.";
  });

  section.append(sectionTitle, list, result, source, applyButton, status);
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
    settings.schoolType,
    settings.startYear,
    settings.endYear
  ].join(":");
}

async function refreshHolidayPreview(project, layer, settingsKey) {
  layer.previewLoadingKey = settingsKey;
  delete layer.previewError;
  try {
    const settingsSnapshot = structuredClone(layer.settings);
    const entries = await fetchSchoolHolidays(settingsSnapshot);
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
      groupCode: getHolidayGroupCode(settingsSnapshot),
      corrections: getKnownHolidayCorrections(settingsSnapshot)
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
    validFrom: `${settings.startYear}-08-01`,
    validTo: `${settings.endYear}-09-30`
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

function getHolidayGroupCode(settings) {
  if (settings.federalState !== "MV") return null;
  return settings.schoolType === "vocational" ? "DE-MV-BBS" : "DE-MV-ABS";
}

function normalizeHolidayEntries(entries, settings) {
  if (settings.federalState !== "MV" || settings.schoolType !== "general") return entries;
  return entries.filter((entry) => !(
    entry.startDate === entry.endDate
    && MV_VOCATIONAL_ONLY_DATES.has(entry.startDate)
  ));
}

function getKnownHolidayCorrections(settings) {
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
  const layer = project && getProjectLayer(project, "appointments");
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
  renderAppointmentsProperties(project);
  renderActiveCalendar(project);
});
cancelAppointmentButton.addEventListener("click", () => appointmentDialog.close());
appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === appointmentDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "appointments");
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
    endTime: appointmentEndTime.value
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
  renderAppointmentsProperties(project);
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
    const duplicate = layer.subjects.some((entry) => entry.name.toLocaleLowerCase("de") === name.toLocaleLowerCase("de") && entry.id !== classCatalogDialog.dataset.subjectId);
    if (duplicate) {
      classCatalogDialogStatus.textContent = "Dieses Fach ist bereits vorhanden.";
      return;
    }
    if (existing) existing.name = name;
    else layer.subjects.push({
      id: globalThis.crypto?.randomUUID?.() ?? `subject-${Date.now()}`,
      name,
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
    endTime: schoolProjectEndTime.value
  };
  const existingEntry = layer.entries.find((entry) => entry.id === schoolProjectDialog.dataset.entryId);
  if (existingEntry) Object.assign(existingEntry, entryData);
  else {
    layer.entries.push({
      id: globalThis.crypto?.randomUUID?.() ?? `school-project-${Date.now()}`,
      type: "school-project",
      ...entryData,
      createdAt: new Date().toISOString()
    });
  }
  layer.appliedEntries = structuredClone(layer.entries);
  layer.appliedAt = new Date().toISOString();
  saveProjects();
  schoolProjectDialog.close();
  renderIndividualProjectsProperties(project);
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
  if (!name || !className || !classTripDate.value || !classTripStartTime.value || !classTripEndTime.value) {
    classTripDialogStatus.textContent = "Bitte Bezeichnung, Klasse, Datum sowie Beginn und Ende eintragen.";
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
    startDate: classTripDate.value,
    endDate: classTripDate.value,
    startTime: classTripStartTime.value,
    endTime: classTripEndTime.value
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
  renderIndividualProjectsProperties(project);
  renderActiveCalendar(project);
});
cancelLessonButton.addEventListener("click", () => lessonDialog.close());
lessonPropertiesTab.addEventListener("click", () => setLessonDialogTab("properties"));
lessonStatisticsTab.addEventListener("click", () => setLessonDialogTab("statistics"));
lessonProgressTab.addEventListener("click", () => setLessonDialogTab("progress"));
addLessonPhaseButton.addEventListener("click", addLessonPhase);
cancelScheduleDisplayButton.addEventListener("click", () => scheduleDisplayDialog.close());
addLessonRowButton.addEventListener("click", () => addScheduleDisplayRow("lesson"));
addBreakRowButton.addEventListener("click", () => addScheduleDisplayRow("break"));
schoolDayStart.addEventListener("change", applyDisplayDefaults);
schoolDayEnd.addEventListener("change", applyDisplayDefaults);
defaultLessonDuration.addEventListener("change", applyDisplayDefaults);
scheduleDisplayForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const scheduleName = scheduleDisplayName.value.trim();
  const invalidIndex = displayRowsDraft.findIndex((row, index) => (
    !row.label.trim()
    || !row.start
    || !row.end
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
  schedule.displayDefaults = {
    dayStart: schoolDayStart.value,
    dayEnd: schoolDayEnd.value,
    lessonMinutes: Number(defaultLessonDuration.value),
  };
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
    day: Number(lessonDay.value),
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
    epochal: lessonEpochal.value === "epochal"
  };
  const existingLesson = schedule.lessons.find((entry) => entry.id === lessonDialog.dataset.lessonId);
  if (existingLesson) Object.assign(existingLesson, lessonData);
  else {
    schedule.lessons.push({
      id: globalThis.crypto?.randomUUID?.() ?? `lesson-${Date.now()}`,
      ...lessonData
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
  saveProjects();
  renderProjectBrowser();
  renderProjectDetail();
  newProjectDialog.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    setBrowserMenuOpen(false);
  }
});
document.addEventListener("click", (event) => {
  if (!browserActionsMenu.contains(event.target) && !browserActionsButton.contains(event.target)) {
    setBrowserMenuOpen(false);
  }
});
renderLessonColorPalette();
renderAppointmentGroupColorPalette();
updateLessonSignalsToggle();
setInterval(checkLessonSignals, 500);
currentTimeIndicatorTimer = setInterval(updateCurrentTimeIndicator, 15_000);
renderActiveCalendar();
renderProjectBrowser();
renderProjectDetail();
