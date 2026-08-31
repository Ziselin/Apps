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
const appointmentAssignment = document.getElementById("appointmentAssignment");
const appointmentRoomField = document.getElementById("appointmentRoomField");
const appointmentRoom = document.getElementById("appointmentRoom");
const appointmentClassSection = document.getElementById("appointmentClassSection");
const appointmentClassSummary = document.getElementById("appointmentClassSummary");
const appointmentClassButton = document.getElementById("appointmentClassButton");
const appointmentStartDate = document.getElementById("appointmentStartDate");
const appointmentEndDate = document.getElementById("appointmentEndDate");
const appointmentStartTime = document.getElementById("appointmentStartTime");
const appointmentEndTime = document.getElementById("appointmentEndTime");
const appointmentIsDeadline = document.getElementById("appointmentIsDeadline");
const appointmentOverridesClassLessonsField = document.getElementById("appointmentOverridesClassLessonsField");
const appointmentOverridesClassLessons = document.getElementById("appointmentOverridesClassLessons");
const appointmentOverridesLessons = document.getElementById("appointmentOverridesLessons");
const appointmentCalendarVisible = document.getElementById("appointmentCalendarVisible");
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
const classTripClassSummary = document.getElementById("classTripClassSummary");
const classTripClassButton = document.getElementById("classTripClassButton");
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
const schoolProjectAssignmentField = document.getElementById("schoolProjectAssignmentField");
const schoolProjectAssignment = document.getElementById("schoolProjectAssignment");
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
const classCatalogGradePrefix = document.getElementById("classCatalogGradePrefix");
const classCatalogGradeField = document.getElementById("classCatalogGradeField");
const classCatalogGrade = document.getElementById("classCatalogGrade");
const classCatalogClassOptions = document.getElementById("classCatalogClassOptions");
const classCatalogFixedGrade = document.getElementById("classCatalogFixedGrade");
const classCatalogDisplayModeButtons = [...document.querySelectorAll("[data-class-display-mode]")];
const classCatalogTabs = document.getElementById("classCatalogTabs");
const classCatalogGeneralTab = document.getElementById("classCatalogGeneralTab");
const classCatalogStudentsTab = document.getElementById("classCatalogStudentsTab");
const classCatalogGeneralPanel = document.getElementById("classCatalogGeneralPanel");
const classCatalogStudentsPanel = document.getElementById("classCatalogStudentsPanel");
const classStudentList = document.getElementById("classStudentList");
const addClassStudentButton = document.getElementById("addClassStudentButton");
const classCatalogTeacherFields = document.getElementById("classCatalogTeacherFields");
const classCatalogTeacherOne = document.getElementById("classCatalogTeacherOne");
const classCatalogTeacherTwoField = document.getElementById("classCatalogTeacherTwoField");
const classCatalogTeacherTwo = document.getElementById("classCatalogTeacherTwo");
const addSecondClassTeacherButton = document.getElementById("addSecondClassTeacherButton");
const classCatalogIdField = document.getElementById("classCatalogIdField");
const openClassCatalogIdButton = document.getElementById("openClassCatalogIdButton");
const lessonGradePreview = document.getElementById("lessonGradePreview");
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
const overviewSidebarButton = document.getElementById("overviewSidebarButton");
const overviewSidebar = document.getElementById("overviewSidebar");
const overviewSidebarClose = document.getElementById("overviewSidebarClose");
const overviewProjectsTab = document.getElementById("overviewProjectsTab");
const overviewEventsTab = document.getElementById("overviewEventsTab");
const overviewTodosTab = document.getElementById("overviewTodosTab");
const overviewProjectsPanel = document.getElementById("overviewProjectsPanel");
const overviewEventsPanel = document.getElementById("overviewEventsPanel");
const overviewTodosPanel = document.getElementById("overviewTodosPanel");
const overviewTodoCount = document.getElementById("overviewTodoCount");
const calendarExportDialog = document.getElementById("calendarExportDialog");
const calendarExportForm = document.getElementById("calendarExportForm");
const calendarExportChoices = document.getElementById("calendarExportChoices");
const calendarExportStatus = document.getElementById("calendarExportStatus");
const cancelCalendarExportButton = document.getElementById("cancelCalendarExportButton");

const PROJECT_STORAGE_KEY = "schola-stundenplan-projects-v1";
const PROJECT_FOLDERS_STORAGE_KEY = "schola-stundenplan-project-folders-v1";
const DISPLAY_PROJECT_STORAGE_KEY = "schola-stundenplan-display-project-v1";
const LESSON_SIGNALS_STORAGE_KEY = "schola-stundenplan-signals-enabled-v1";
const EXPANDED_LAYERS_STORAGE_KEY = "schola-stundenplan-expanded-layers-v1";
const CLASS_DIRECTORY_STORAGE_KEY = "schola-stundenplan-class-directory-v1";
const SCHEDULE_DELETE_HOLD_MS = 820;
const HOLIDAY_NORMALIZATION_VERSION = "mv-school-types-2026-07-27-1";
const MV_VOCATIONAL_ONLY_DATES = new Set(["2026-11-26", "2026-11-27"]);
const VACATION_COLOR = "#9faf93";
let classTripSelectedClassKeys = [];
let appointmentSelectedClassKeys = [];
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
  { id: "classCatalog", title: "Klassen", description: "Fachunabhängige Klassenstufen und semantisch eindeutige Einzelklassen" },
  { id: "schedules", title: "Stundenpläne", description: "Zeitlich gültige Stundenplanversionen mit den jeweils zugehörigen Stundenplanlogiken" },
  { id: "individual", title: "Persönliche Termine", description: "Urlaub, weitere persönliche Termine und Krankschreibungen" },
  { id: "appointments", title: "Schulische Termine", description: "Schulische Ereignisse mit optionalem Klassenbezug und getrennten Unterrichtsauswirkungen" },
  { id: "classes", title: "Projekttage nach Klassen", description: "Ehemalige klassenbezogene Projektschicht", hiddenInBrowser: true },
  { id: "sickness", title: "Krankschreibungen", description: "Zeiträume persönlicher Verhinderung ohne Unterricht", hiddenInBrowser: true }
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
let projectFolders = loadProjectFolders(projects);
migrateClassProjectsToSchoolAppointments(projects);
let classStudentDraft = [];
migrateKnownHolidayCorrections(projects);
projects.forEach((project) => ensureScheduleVersions(project));
let activeProjectId = projects[0]?.id ?? null;
let activeProjectFolderId = null;
let displayedProjectId = projects.some((project) => project.id === localStorage.getItem(DISPLAY_PROJECT_STORAGE_KEY))
  ? localStorage.getItem(DISPLAY_PROJECT_STORAGE_KEY)
  : projects[0]?.id ?? null;
let activeLayerType = null;
let activeSchoolId = null;
let activeClassSchoolId = null;
let activeClassCatalogTab = "classes";
let activeClassCatalogTarget = null;
let pendingClassCatalogScrollTarget = null;
let activeAppointmentGroupTarget = null;
let pendingAppointmentGroupScrollTarget = null;
let activeScheduleId = null;
let activeScheduleVersionId = projects[0]?.layers?.find((entry) => entry.type === "schedules")?.versions?.[0]?.id || null;
let activeSupervisionVersionId = null;
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
const expandedProjectFolderIds = new Set(projectFolders.map((folder) => folder.id));
const expandableLayerIds = new Set(["holidays", "classCatalog", "schedules", "individual", "appointments"]);
const storedExpandedLayerKeys = (() => {
  try { return JSON.parse(localStorage.getItem(EXPANDED_LAYERS_STORAGE_KEY) || "null"); }
  catch { return null; }
})();
const expandedLayerKeys = new Set(Array.isArray(storedExpandedLayerKeys)
  ? storedExpandedLayerKeys
  : projects.flatMap((project) => [...expandableLayerIds].map((layerId) => `${project.id}:${layerId}`)));
const expandedAppointmentGroupKeys = new Set();
const expandedAppointmentProjectKeys = new Set();
let draggedAppointmentContext = null;

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
  calendar.closest(".calendar-shell")?.classList.remove("is-month-view");
  calendar.closest(".calendar-shell")?.classList.add("is-year-view");
  calendarTitle.textContent = "Jahresübersicht";
  yearLabel.textContent = schoolYearMode
    ? `${startYear}/${String(startYear + 1).slice(-2)}`
    : String(startYear);
  const todayKey = getLocalDateKey(new Date());

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
        if (entry.type === "vacation") return VACATION_COLOR;
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
        entryColors.length > 1 ? "has-overlap" : "",
        dateKey === todayKey ? "is-today" : ""
      ].filter(Boolean).join(" ");
      if (entryColors.length) {
        day.style.setProperty("--day-color-a", entryColors[0]);
        day.style.setProperty("--day-color-b", entryColors[1] || entryColors[0]);
      }
      const dayNumberLabel = document.createElement("span");
      dayNumberLabel.className = "year-day-number";
      dayNumberLabel.textContent = String(dayNumber);
      day.append(dayNumberLabel);
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

function renderMonthView(project) {
  if (livePhaseTimer) {
    clearInterval(livePhaseTimer);
    livePhaseTimer = null;
  }
  const reference = new Date(calendarReferenceDate);
  reference.setHours(12, 0, 0, 0);
  const year = reference.getFullYear();
  const monthIndex = reference.getMonth();
  const schedules = getCombinedSchedules();
  const schoolProjects = getCombinedSchoolProjects();
  const appointments = getCombinedAppointments().filter((entry) => entry.calendarVisible !== false);
  const sicknessEntries = project?.layers?.find((entry) => entry.type === "sickness")?.entries || [];
  const todayKey = getLocalDateKey(new Date());

  calendar.replaceChildren();
  calendar.className = "month-calendar-view";
  calendar.setAttribute("aria-label", `Monatskalender ${monthNames[monthIndex]} ${year}`);
  const shell = calendar.closest(".calendar-shell");
  shell?.classList.remove("is-timeline-view", "is-year-view");
  shell?.classList.add("is-month-view");
  calendarTitle.textContent = "Monatsansicht";
  yearLabel.textContent = `${monthNames[monthIndex]} ${year}`;

  weekdayNames.forEach((name) => {
    const weekday = document.createElement("span");
    weekday.className = "month-view-weekday";
    weekday.textContent = name;
    calendar.append(weekday);
  });
  const leadingDays = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  for (let index = 0; index < leadingDays; index += 1) {
    const empty = document.createElement("span");
    empty.className = "month-view-day is-empty";
    empty.setAttribute("aria-hidden", "true");
    calendar.append(empty);
  }
  const dayCount = new Date(year, monthIndex + 1, 0).getDate();
  for (let dayNumber = 1; dayNumber <= dayCount; dayNumber += 1) {
    const date = new Date(year, monthIndex, dayNumber, 12);
    const dateKey = getLocalDateKey(date);
    const weekday = ((date.getDay() + 6) % 7) + 1;
    const cell = document.createElement("section");
    cell.className = [
      "month-view-day",
      weekday >= 6 ? "is-weekend" : "",
      dateKey === todayKey ? "is-today" : ""
    ].filter(Boolean).join(" ");
    cell.setAttribute("aria-label", date.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
    const dayHead = document.createElement("header");
    const number = document.createElement("strong");
    number.textContent = String(dayNumber);
    dayHead.append(number);
    const entries = document.createElement("div");
    entries.className = "month-view-entries";

    getSchoolHolidaysForDate(date, schedules).forEach((holiday) => {
      const item = document.createElement("span");
      item.className = `month-view-entry is-holiday${holiday.type === "public-holiday" ? " is-public-holiday" : ""}`;
      item.textContent = holiday.name;
      item.title = holiday.name;
      entries.append(item);
    });
    schedules.forEach((schedule) => {
      (schedule.lessons || []).filter((lesson) => (
        Number(lesson.day) === weekday
        && isScheduleValidOn(schedule, date)
        && isLessonActiveOnDate(lesson, schedule, date)
        && !isScheduleLessonSuppressed(schedule, lesson, date)
      )).sort((a, b) => a.start.localeCompare(b.start)).forEach((lesson) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "month-view-entry is-lesson";
        item.style.setProperty("--month-entry-color", lesson.color || "#bfd2e2");
        item.textContent = `${lesson.start} ${lesson.subject}${lesson.grade ? ` · ${lesson.grade}` : ""}`;
        item.title = `${lesson.start}–${lesson.end} · ${lesson.subject}${lesson.grade ? ` · ${lesson.grade}` : ""}`;
        item.addEventListener("click", () => openCalendarLessonDialog(schedule, lesson));
        entries.append(item);
      });
    });
    schoolProjects.filter((entry) => dateKey >= (entry.startDate || entry.date) && dateKey <= (entry.endDate || entry.date)).forEach((entry) => {
      const item = document.createElement("span");
      item.className = "month-view-entry is-project";
      item.style.setProperty("--month-entry-color", entry.color || "#e6d8a8");
      item.textContent = entry.name || "Projekt";
      item.title = entry.name || "Projekt";
      entries.append(item);
    });
    appointments.filter((entry) => dateKey >= getAppointmentStartDate(entry) && dateKey <= getAppointmentEndDate(entry)).forEach((entry) => {
      const item = document.createElement("span");
      item.className = "month-view-entry is-appointment";
      item.style.setProperty("--month-entry-color", entry.color || "#c9c1dd");
      item.textContent = `${entry.startTime ? `${entry.startTime} ` : ""}${entry.name || entry.groupName || "Termin"}`;
      item.title = entry.name || entry.groupName || "Termin";
      entries.append(item);
    });
    sicknessEntries.filter((entry) => dateKey >= entry.startDate && dateKey <= entry.endDate).forEach(() => {
      const item = document.createElement("span");
      item.className = "month-view-entry is-sickness";
      item.textContent = "Krankschreibung";
      entries.append(item);
    });
    cell.append(dayHead, entries);
    calendar.append(cell);
  }
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
  const periodName = mainCalendarView === "day" ? "Tag" : mainCalendarView === "month" ? "Monat" : "Woche";
  previousCalendarPeriod.setAttribute("aria-label", `Voriger ${periodName}`);
  nextCalendarPeriod.setAttribute("aria-label", `Nächster ${periodName}`);
  if (mainCalendarView === "day" || mainCalendarView === "week") {
    renderCombinedScheduleView(mainCalendarView);
    return;
  }
  if (mainCalendarView === "month") {
    renderMonthView(project);
    return;
  }
  const holidayLayer = project?.layers?.find((entry) => entry.type === "holidays");
  const individualLayer = project?.layers?.find((entry) => entry.type === "individual");
  const appointmentLayer = project?.layers?.find((entry) => entry.type === "appointments");
  const sicknessLayer = project?.layers?.find((entry) => entry.type === "sickness");
  const classProjectLayer = project?.layers?.find((entry) => entry.type === "classes");
  const appliedSettings = holidayLayer?.appliedSettings || holidayLayer?.settings;
  const semanticSchoolYearStart = Number((project ? getProjectCalendarRange(project).startDate : "")?.slice(0, 4));
  const appointmentEntries = [appointmentLayer, individualLayer]
    .flatMap((entryLayer) => (Array.isArray(entryLayer?.groups) ? entryLayer.groups : []).filter((group) => group.calendarVisible !== false))
    .flatMap((group) => getAppointmentGroupEntries(group).filter((appointment) => appointment.calendarVisible !== false).map((appointment) => ({
      id: appointment.id,
      name: `${group.name}${appointment.appointmentProjectName ? ` · ${appointment.appointmentProjectName}` : ""}: ${appointment.name}`,
      startDate: getAppointmentStartDate(appointment),
      endDate: getAppointmentEndDate(appointment),
      type: "appointment",
      color: group.color || "#c9c1dd"
    })));
  const calendarEntries = [
    ...(Array.isArray(holidayLayer?.entries) ? holidayLayer.entries : []),
    ...(Array.isArray(individualLayer?.appliedEntries) ? individualLayer.appliedEntries.filter((entry) => entry.calendarVisible !== false) : []),
    ...(Array.isArray(classProjectLayer?.entries) ? classProjectLayer.entries.filter((entry) => isClassProjectCalendarVisible(project, entry)) : []),
    ...appointmentEntries,
    ...(Array.isArray(sicknessLayer?.entries) ? sicknessLayer.entries : [])
  ];
  if (!project || (!semanticSchoolYearStart && !appliedSettings?.startYear)) {
    renderYear(new Date().getFullYear(), calendarEntries);
    return;
  }
  renderYear(semanticSchoolYearStart || Number(appliedSettings.startYear), calendarEntries, true);
}

function getAppointmentGroupEntries(group) {
  const direct = (Array.isArray(group?.appointments) ? group.appointments : []).map((appointment) => ({
    ...appointment,
    appointmentProjectId: "",
    appointmentProjectName: ""
  }));
  const projectEntries = (Array.isArray(group?.projects) ? group.projects : []).flatMap((appointmentProject) => (
    (Array.isArray(appointmentProject.appointments) ? appointmentProject.appointments : []).map((appointment) => ({
      ...appointment,
      appointmentProjectId: appointmentProject.id,
      appointmentProjectName: appointmentProject.name
    }))
  ));
  return [...direct, ...projectEntries];
}

function getAppointmentStartDate(appointment) {
  return appointment?.startDate || appointment?.date || "";
}

function getAppointmentEndDate(appointment) {
  return appointment?.endDate || appointment?.startDate || appointment?.date || "";
}

function getAppointmentSortDate(appointment) {
  return appointment?.isDeadline ? getAppointmentEndDate(appointment) : getAppointmentStartDate(appointment);
}

function formatAppointmentDateRange(appointment) {
  const startDate = getAppointmentStartDate(appointment);
  const endDate = getAppointmentEndDate(appointment);
  if (!startDate) return "Datum noch offen";
  return startDate === endDate ? formatGermanDate(startDate) : `${formatGermanDate(startDate)}–${formatGermanDate(endDate)}`;
}

function getCombinedSchedules() {
  return projects.filter((project) => project.id === displayedProjectId).flatMap((project) => {
    const layer = project.layers?.find((entry) => entry.type === "schedules");
    const schedules = (Array.isArray(layer?.schedules) ? layer.schedules : [])
      .map((schedule) => ({ ...schedule, projectId: project.id, projectName: project.name }));
    const substitutions = (Array.isArray(layer?.substitutions) ? layer.substitutions : []).map((entry) => {
      const date = entry.date ? new Date(`${entry.date}T12:00:00`) : null;
      const weekday = date && !Number.isNaN(date.getTime()) ? ((date.getDay() + 6) % 7) + 1 : 1;
      return {
        id: `substitution-schedule-${entry.id}`,
        name: "Vertretungen",
        schoolId: entry.schoolId || "",
        projectId: project.id,
        projectName: project.name,
        substitutionId: entry.id,
        validFrom: entry.date,
        validUntil: entry.date,
        activeDays: [weekday],
        displayRows: [],
        lessons: [{
          id: `substitution-lesson-${entry.id}`,
          day: weekday,
          start: entry.startTime,
          end: entry.endTime,
          subject: entry.subject || "Vertretung",
          grade: entry.classNames?.join(", ") || entry.className || "Klasse offen",
          room: entry.room || "",
          classId: entry.classIds?.[0] || "",
          classIds: entry.classIds || [],
          courseId: entry.classGroups?.find((group) => group.targetType === "course")?.courseId || "",
          color: "#d9c9a9"
        }]
      };
    });
    const supervisions = (Array.isArray(layer?.supervisionVersions) ? layer.supervisionVersions : []).map((version) => ({
      id: `supervision-schedule-${version.id}`,
      name: version.name || "Aufsichten",
      schoolId: version.schoolId || "",
      projectId: project.id,
      projectName: project.name,
      supervisionVersionId: version.id,
      validFrom: version.validFrom,
      validUntil: version.validUntil,
      activeDays: version.activeDays || [1, 2, 3, 4, 5],
      displayRows: [],
      lessons: (version.entries || []).filter((entry) => (version.activeDays || []).includes(Number(entry.day))).map((entry) => ({
        id: `supervision-lesson-${entry.id}`,
        day: Number(entry.day),
        start: entry.startTime,
        end: entry.endTime,
        subject: "Aufsicht",
        grade: "",
        room: entry.location || "",
          color: entry.color || "#bfd2e2"
      }))
    }));
    return [...schedules, ...substitutions, ...supervisions];
  });
}

function getCombinedSchoolProjects() {
  return projects.filter((project) => project.id === displayedProjectId).flatMap((project) => {
    const individualLayer = project.layers?.find((entry) => entry.type === "individual");
    const classProjectLayer = project.layers?.find((entry) => entry.type === "classes");
    return [
      ...(Array.isArray(individualLayer?.appliedEntries) ? individualLayer.appliedEntries : [])
        .filter((entry) => entry.calendarVisible !== false && ["school-project", "class-trip", "vacation", "personal-appointment"].includes(entry.type)),
      ...(Array.isArray(classProjectLayer?.entries) ? classProjectLayer.entries : [])
        .filter((entry) => isClassProjectCalendarVisible(project, entry))
    ].map((entry) => ({ ...entry, projectId: project.id, projectName: project.name }));
  });
}

function getCombinedAppointments() {
  return projects.filter((project) => project.id === displayedProjectId).flatMap((project) => {
    return ["appointments", "individual"].flatMap((layerType) => {
      const layer = project.layers?.find((entry) => entry.type === layerType);
      return (Array.isArray(layer?.groups) ? layer.groups : []).filter((group) => group.calendarVisible !== false).flatMap((group) => (
        getAppointmentGroupEntries(group).map((appointment) => ({
        ...appointment,
        groupId: group.id,
        groupName: group.name,
        color: group.color || "#c9c1dd",
        layerType,
        projectId: project.id,
        projectName: project.name
        }))
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

function isScheduleWithinOwnValidity(schedule, date) {
  const project = schedule.projectId ? projects.find((entry) => entry.id === schedule.projectId) : null;
  const version = project?.layers?.find((entry) => entry.type === "schedules")?.versions?.find((entry) => entry.id === schedule.versionId);
  const validitySource = version || schedule;
  if (validitySource.validityPending) return false;
  const dateKey = getLocalDateKey(date);
  return (!validitySource.validFrom || dateKey >= validitySource.validFrom)
    && (!validitySource.validUntil || dateKey <= validitySource.validUntil);
}

function isScheduleValidOn(schedule, date) {
  if (!isScheduleWithinOwnValidity(schedule, date)) return false;
  if (schedule.projectId && schedule.versionId) {
    const project = projects.find((entry) => entry.id === schedule.projectId);
    const versions = project?.layers?.find((entry) => entry.type === "schedules")?.versions || [];
    const dateKey = getLocalDateKey(date);
    const activeVersion = versions.filter((version) => (
      !version.validityPending
      && (!version.validFrom || dateKey >= version.validFrom)
      && (!version.validUntil || dateKey <= version.validUntil)
    )).sort((a, b) => (
      String(b.validFrom || "").localeCompare(String(a.validFrom || ""))
      || String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
    ))[0];
    if (activeVersion && activeVersion.id !== schedule.versionId) return false;
  }
  if (schedule.projectId && schedule.supervisionVersionId) {
    const project = projects.find((entry) => entry.id === schedule.projectId);
    const versions = project?.layers?.find((entry) => entry.type === "schedules")?.supervisionVersions || [];
    const dateKey = getLocalDateKey(date);
    const activeVersion = versions.filter((version) => (
      version.validFrom && version.validUntil && dateKey >= version.validFrom && dateKey <= version.validUntil
    )).sort((a, b) => String(b.validFrom).localeCompare(String(a.validFrom)) || String(b.createdAt || "").localeCompare(String(a.createdAt || "")))[0];
    if (activeVersion && activeVersion.id !== schedule.supervisionVersionId) return false;
  }
  return true;
}

function isMandatorySupervision(schedule) {
  return Boolean(schedule?.supervisionVersionId);
}

function isTeacherScheduleSuppressedByAppointment(project, lesson, date) {
  const dateKey = getLocalDateKey(date);
  const individualLayer = project?.layers?.find((entry) => entry.type === "individual");
  const schoolAppointmentLayer = project?.layers?.find((entry) => entry.type === "appointments");
  const individualEntries = Array.isArray(individualLayer?.appliedEntries)
    ? individualLayer.appliedEntries
    : (Array.isArray(individualLayer?.entries) ? individualLayer.entries : []);
  const groupedAppointments = [schoolAppointmentLayer, individualLayer].flatMap((appointmentLayer) => (
    (Array.isArray(appointmentLayer?.groups) ? appointmentLayer.groups : [])
      .flatMap((group) => getAppointmentGroupEntries(group))
  ));
  return [...individualEntries, ...groupedAppointments].some((entry) => {
    if (!entry?.overridesLessons) return false;
    const startDate = entry.startDate || entry.date;
    const endDate = entry.endDate || entry.date;
    if (!startDate || !endDate || dateKey < startDate || dateKey > endDate) return false;
    if (!entry.startTime || !entry.endTime) return true;
    return timeToMinutes(lesson.start) < timeToMinutes(entry.endTime)
      && timeToMinutes(lesson.end) > timeToMinutes(entry.startTime);
  });
}

function isScheduleLessonSuppressed(schedule, lesson, date) {
  const project = projects.find((entry) => entry.id === schedule.projectId);
  if (isMandatorySupervision(schedule)) return isTeacherScheduleSuppressedByAppointment(project, lesson, date);
  const suppressedByAppointment = isLessonSuppressedByClassProject(project, lesson, date);
  return isSchoolHolidayForSchedule(schedule, date)
    || isSicknessForSchedule(schedule, date)
    || suppressedByAppointment;
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
    if (!isScheduleValidOn(schedule, now)) return;
    (Array.isArray(schedule.lessons) ? schedule.lessons : [])
      .filter((lesson) => (
        Number(lesson.day) === weekday
        && isLessonActiveOnDate(lesson, schedule, now)
        && !isScheduleLessonSuppressed(schedule, lesson, now)
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
  const nowMs = now.getTime();
  const prestartDurationMs = 15 * 60 * 1000;
  const showPrestart = element.dataset.showPrestart !== "false";
  const prestartName = element.dataset.prestartName || "Unterricht";
  const isPrestart = showPrestart && nowMs >= lessonStartMs - prestartDurationMs && nowMs < lessonStartMs;
  const isActive = nowMs >= lessonStartMs && nowMs < lessonEndMs;
  if (!Number.isFinite(lessonStartMs) || !Number.isFinite(lessonEndMs) || (!isPrestart && !isActive)) {
    element.hidden = true;
    element.classList.remove("is-prestart");
    return;
  }
  const formatCountdown = (remainingSeconds) => {
    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const seconds = String(remainingSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  element.hidden = false;
  element.classList.toggle("is-prestart", isPrestart);
  const countdown = element.querySelector(".live-phase-remaining");
  const progress = element.querySelector(".live-phase-progress");
  if (isPrestart) {
    const remainingSeconds = Math.max(0, Math.ceil((lessonStartMs - nowMs) / 1000));
    const remainingRatio = Math.min(1, Math.max(0, (lessonStartMs - nowMs) / prestartDurationMs));
    const remainingCountdown = formatCountdown(remainingSeconds);
    countdown.querySelector(".live-phase-total").textContent = `${prestartName} in ${remainingCountdown}`;
    countdown.querySelector(".live-phase-current").textContent = "";
    countdown.setAttribute("aria-label", `${prestartName} beginnt in ${remainingCountdown}.`);
    countdown.title = `${prestartName} beginnt in ${remainingCountdown}`;
    progress.classList.remove("is-dense");
    const segment = document.createElement("span");
    segment.className = "live-phase-segment is-current";
    segment.style.flexGrow = "1";
    segment.title = `${prestartName} beginnt in ${remainingCountdown}`;
    const label = document.createElement("span");
    label.className = "live-phase-segment-label";
    label.textContent = `${prestartName} in`;
    const track = document.createElement("span");
    track.className = "live-phase-segment-track";
    track.style.setProperty("--segment-progress", `${remainingRatio * 100}%`);
    track.style.setProperty("--segment-relative-width", "100%");
    segment.append(label, track);
    progress.replaceChildren(segment);
    return;
  }
  const phases = JSON.parse(element.dataset.phases || "[]");
  const elapsedSeconds = Math.floor((nowMs - lessonStartMs) / 1000);
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
  const totalRemainingSeconds = Math.max(0, Math.ceil((lessonEndMs - nowMs) / 1000));
  const totalCountdown = formatCountdown(totalRemainingSeconds);
  const phaseCountdown = formatCountdown(phaseRemainingSeconds);
  countdown.querySelector(".live-phase-total").textContent = totalCountdown;
  countdown.querySelector(".live-phase-current").textContent = `(${phaseCountdown})`;
  countdown.setAttribute("aria-label", `Gesamte Stunde: ${totalCountdown} verbleibend. Aktuelle Phase ${phase.name}: ${phaseCountdown} verbleibend.`);
  countdown.title = `Gesamt verbleibend: ${totalCountdown} · Phase verbleibend: ${phaseCountdown}`;
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

function configureLivePhase(card, lesson, date, defaultPhaseName = "Unterricht", showPrestart = true) {
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
  live.dataset.showPrestart = String(showPrestart);
  live.dataset.prestartName = defaultPhaseName;
  live.innerHTML = "<span class=\"live-phase-copy\"><span class=\"live-phase-remaining\"><span class=\"live-phase-total\"></span> <strong class=\"live-phase-current\"></strong></span></span><span class=\"live-phase-progress\"></span>";
  const phaseSummary = phases.map((phase) => `${phase.name}, ${phase.durationMinutes} Minuten`).join("; ");
  card.setAttribute("aria-description", `${showPrestart ? "Ab 15 Minuten vor Beginn wird die verbleibende Vorbereitungszeit angezeigt. " : ""}Phasen: ${phaseSummary}. Die erste Zeit zeigt die verbleibende Gesamtzeit, die Zeit in Klammern die verbleibende Zeit der aktuellen Phase.`);
  card.title = `${card.title} · Phasen: ${phaseSummary}`;
  card.append(live);
  updateLivePhaseElement(live);
  if (!livePhaseTimer) {
    livePhaseTimer = setInterval(() => {
      document.querySelectorAll(".live-phase").forEach((element) => updateLivePhaseElement(element));
    }, 1000);
  }
}

function openCalendarLessonDialog(schedule, lesson) {
  const project = projects.find((entry) => entry.id === schedule.projectId);
  if (!project) return;
  const schedulesLayer = project.layers?.find((entry) => entry.type === "schedules");
  if (schedule.substitutionId) {
    const substitution = schedulesLayer?.substitutions?.find((entry) => entry.id === schedule.substitutionId);
    if (substitution) openSubstitutionDialog(project, substitution);
    return;
  }
  if (schedule.supervisionVersionId) {
    const version = schedulesLayer?.supervisionVersions?.find((entry) => entry.id === schedule.supervisionVersionId);
    const supervisionId = String(lesson.id || "").replace(/^supervision-lesson-/, "");
    const supervision = version?.entries?.find((entry) => entry.id === supervisionId);
    if (version && supervision) openSupervisionDialog(project, version, supervision);
    return;
  }
  const originalSchedule = schedulesLayer?.schedules?.find((entry) => entry.id === schedule.id);
  const originalLesson = originalSchedule?.lessons?.find((entry) => entry.id === lesson.id);
  if (originalSchedule && originalLesson) openExistingLessonDialog(project, originalSchedule, originalLesson);
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
  const project = projects.find((entry) => entry.id === schedule.projectId);
  const catalogClass = project ? getCatalogClassById(project, lesson.classId, lesson.gradeLevelId) : null;
  if (catalogClass) renderClassDisplay(grade, catalogClass.grade.name, catalogClass.classEntry.suffix, catalogClass.classEntry.displayMode);
  else grade.textContent = lesson.grade;
  heading.append(subject, grade);
  const time = document.createElement("small");
  time.textContent = `${lesson.start}–${lesson.end}`;
  const room = document.createElement("small");
  room.textContent = lesson.room || "Raum fehlt";
  room.className = lesson.room ? "lesson-card-room" : "lesson-card-room is-missing";
  const meta = document.createElement("span");
  meta.className = "lesson-card-meta";
  meta.append(time, room);
  card.append(heading, meta);
  configureLivePhase(card, lesson, date, isMandatorySupervision(schedule) ? "Aufsicht" : "Unterricht");
  card.addEventListener("click", () => openCalendarLessonDialog(schedule, lesson));
  return card;
}

function renderSchoolProjectCard(schoolProject, start, end) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "lesson-card timeline-lesson-card timeline-project-card";
  card.style.setProperty("--lesson-color", schoolProject.type === "vacation" ? VACATION_COLOR : (schoolProject.color || "#bfd2e2"));
  const categoryNames = {
    "class-trip": "Klassenfahrten",
    "school-project": "Einzelveranstaltungen",
    "class-project": "Projekttage nach Klassen",
    vacation: "Urlaub",
    "personal-appointment": "Weitere Termine"
  };
  card.title = `${schoolProject.projectName} / ${categoryNames[schoolProject.type] || "Termine"}`;
  const name = document.createElement("strong");
  name.textContent = schoolProject.name;
  const assignedClasses = (schoolProject.classNames || []).join(", ") || schoolProject.className;
  if (schoolProject.type === "school-project") {
    const heading = document.createElement("span");
    heading.className = "lesson-card-heading";
    const classLabel = document.createElement("span");
    classLabel.textContent = assignedClasses || "";
    heading.append(name, classLabel);
    const time = document.createElement("small");
    time.textContent = `${minutesToTime(start)}–${minutesToTime(end)}`;
    const room = document.createElement("small");
    room.className = "lesson-card-room";
    room.textContent = schoolProject.room || "";
    const meta = document.createElement("span");
    meta.className = "lesson-card-meta";
    meta.append(time, room);
    card.append(heading, meta);
  } else if (schoolProject.type === "class-trip" && assignedClasses) {
    const classLabel = document.createElement("small");
    classLabel.textContent = `Klasse ${assignedClasses}`;
    card.append(name, classLabel);
  } else {
    card.append(name);
  }
  if (schoolProject.type !== "school-project") {
    const time = document.createElement("small");
    time.textContent = `${minutesToTime(start)}–${minutesToTime(end)}`;
    card.append(time);
  }
  card.addEventListener("click", () => {
    const project = projects.find((entry) => entry.id === schoolProject.projectId);
    const originalEntry = project?.layers?.find((entry) => entry.type === (schoolProject.type === "class-project" ? "classes" : "individual"))
      ?.entries?.find((entry) => entry.id === schoolProject.id);
    if (!project || !originalEntry) return;
    if (originalEntry.type === "class-project") openAppointmentDialog(project, null, originalEntry, "appointments");
    else if (originalEntry.type === "class-trip") openClassTripDialog(project, originalEntry);
    else if (originalEntry.type === "school-project") openAppointmentDialog(project, null, originalEntry, "appointments");
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
  const isSchoolAppointment = appointment.layerType === "appointments";
  const assignedClasses = (appointment.classNames || []).join(", ") || appointment.className || "";
  const group = document.createElement("small");
  group.textContent = appointment.appointmentProjectName
    ? `${appointment.groupName} · ${appointment.appointmentProjectName}`
    : appointment.groupName;
  const time = document.createElement("small");
  time.textContent = appointment.startTime && appointment.endTime
    ? `${appointment.startTime}–${appointment.endTime}`
    : "Zeit noch offen";
  if (isSchoolAppointment) {
    const heading = document.createElement("span");
    heading.className = "lesson-card-heading";
    const classLabel = document.createElement("span");
    classLabel.textContent = assignedClasses;
    heading.append(name, classLabel);
    const room = document.createElement("small");
    room.className = "lesson-card-room";
    room.textContent = appointment.room || "";
    const meta = document.createElement("span");
    meta.className = "lesson-card-meta";
    meta.append(time, room);
    card.append(heading, meta, group);
  } else {
    card.append(name, group, time);
  }
  if (appointment.startTime && appointment.endTime) {
    configureLivePhase(card, {
      start: appointment.startTime,
      end: appointment.endTime,
      phases: []
    }, date, appointment.name || "Termin", false);
  }
  card.addEventListener("click", () => {
    const project = projects.find((entry) => entry.id === appointment.projectId);
    const originalGroup = project?.layers?.find((entry) => entry.type === (appointment.layerType || "appointments"))
      ?.groups?.find((entry) => entry.id === appointment.groupId);
    const originalProjectGroup = originalGroup?.projects?.find((entry) => entry.id === appointment.appointmentProjectId);
    const originalAppointment = (originalProjectGroup?.appointments || originalGroup?.appointments)?.find((entry) => entry.id === appointment.id);
    if (project && originalGroup && originalAppointment) {
      openAppointmentDialog(project, originalGroup, originalAppointment, appointment.layerType || "appointments", originalProjectGroup || null);
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
        Number(lesson.day) === ((date.getDay() + 6) % 7) + 1
        && isScheduleValidOn(schedule, date)
        && isLessonActiveOnDate(lesson, schedule, date)
        && !isScheduleLessonSuppressed(schedule, lesson, date)
      ))) {
        timedLessons.push({ lesson, schedule });
      }
    });
  });
  const visibleSchoolProjects = schoolProjects.filter((schoolProject) => dates.some((date) => {
    const dateKey = getLocalDateKey(date);
    return dateKey >= schoolProject.startDate && dateKey <= schoolProject.endDate;
  }));
  const visibleAppointments = appointments.filter((appointment) => appointment.calendarVisible !== false && (
    dates.some((date) => {
      const dateKey = getLocalDateKey(date);
      return dateKey >= getAppointmentStartDate(appointment) && dateKey <= getAppointmentEndDate(appointment);
    })
  ));
  calendar.replaceChildren();
  calendar.className = `combined-timeline is-${view}-timeline`;
  calendar.closest(".calendar-shell")?.classList.add("is-timeline-view");
  calendar.closest(".calendar-shell")?.classList.remove("is-year-view", "is-month-view");
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
    ? Math.min(3.25, responsiveCardHeight / shortestPhaseLessonMinutes / 2)
    : 1.35;
  const pixelsPerMinute = view === "day"
    ? Math.max(1.35, responsivePixelsPerMinute)
    : .9;
  const minimumTimelineHeight = view === "day" ? 420 : 360;
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
        Number(lesson.day) === weekday
        && isScheduleValidOn(schedule, date)
        && isLessonActiveOnDate(lesson, schedule, date)
        && !isScheduleLessonSuppressed(schedule, lesson, date)
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
      .filter((appointment) => {
        const dateKey = getLocalDateKey(date);
        return dateKey >= getAppointmentStartDate(appointment) && dateKey <= getAppointmentEndDate(appointment);
      })
      .map((appointment) => ({
        lesson: {
          start: appointment.startTime || minutesToTime(schoolDayStart),
          end: appointment.endTime || minutesToTime(schoolDayEnd)
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
  requestAnimationFrame(() => updateCurrentTimeIndicator(new Date(), true));
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

function updateCurrentTimeIndicator(now = new Date(), centerOnCurrentTime = false) {
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
    if (centerOnCurrentTime) centerCurrentTimeIndicator(indicator);
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

function loadProjectFolders(projectList) {
  let folders = [];
  try {
    const stored = JSON.parse(localStorage.getItem(PROJECT_FOLDERS_STORAGE_KEY) || "[]");
    if (Array.isArray(stored)) folders = stored.filter((folder) => folder?.id && folder?.name);
  } catch {
    folders = [];
  }
  const foldersById = new Map(folders.map((folder) => [folder.id, folder]));
  const claimedFolderIds = new Set();
  const normalizedFolders = [];
  projectList.forEach((project) => {
    const storedFolder = foldersById.get(project.folderId);
    const folder = storedFolder && !claimedFolderIds.has(storedFolder.id)
      ? storedFolder
      : {
        id: globalThis.crypto?.randomUUID?.() ?? `project-folder-${Date.now()}-${normalizedFolders.length}`,
        name: project.name,
        createdAt: project.createdAt || new Date().toISOString()
      };
    if (!folder.name || folder.name === "Schuljahre" || folder.name === "Importierte Schuljahre") folder.name = project.name;
    folder.calendarRange ||= structuredClone(project.calendarRange || project.periods?.schoolYear || {});
    project.folderId = folder.id;
    claimedFolderIds.add(folder.id);
    normalizedFolders.push(folder);
  });
  folders.filter((folder) => !claimedFolderIds.has(folder.id)).forEach((folder) => normalizedFolders.push(folder));
  localStorage.setItem(PROJECT_FOLDERS_STORAGE_KEY, JSON.stringify(normalizedFolders));
  if (projectList.length) localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projectList));
  return normalizedFolders;
}

function saveProjects() {
  localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
  localStorage.setItem(PROJECT_FOLDERS_STORAGE_KEY, JSON.stringify(projectFolders));
  publishClassDirectory();
  if (overviewSidebar?.classList.contains("is-open")) renderOverviewSidebar();
}

function publishClassDirectory() {
  const classes = projects.flatMap((project) => {
    const catalog = project.layers?.find((entry) => entry.type === "classCatalog");
    return (catalog?.grades || []).flatMap((grade) => (grade.classes || []).filter((classEntry) => classEntry.id).map((classEntry) => ({
      id: classEntry.id,
      transportId: `KL1:${classEntry.id}`,
      projectId: project.id,
      projectName: project.name,
      schoolId: grade.schoolId || "",
      gradeId: grade.id,
      gradeName: grade.name,
      className: classEntry.name || getClassDisplayText(grade.name, classEntry.suffix, classEntry.displayMode),
      suffix: classEntry.suffix || "",
      displayMode: classEntry.displayMode || "normal",
      teachers: structuredClone(classEntry.teachers || []),
      students: structuredClone(classEntry.students || []),
      updatedAt: new Date().toISOString()
    })));
  });
  const courses = projects.flatMap((project) => {
    const catalog = project.layers?.find((entry) => entry.type === "classCatalog");
    if (!catalog) return [];
    const studentsById = new Map((catalog.grades || []).flatMap((grade) => (grade.classes || []).flatMap((classEntry) => (
      (classEntry.students || []).map((student) => [student.id, {
        ...structuredClone(student),
        classId: classEntry.id,
        className: classEntry.name || getClassDisplayText(grade.name, classEntry.suffix, classEntry.displayMode),
        gradeId: grade.id,
        gradeName: grade.name
      }])
    ))));
    return (catalog.subjects || []).flatMap((subject) => (subject.courses || []).filter((course) => course.id).map((course) => ({
      id: course.id,
      transportId: `KU1:${course.id}`,
      projectId: project.id,
      projectName: project.name,
      schoolId: subject.schoolId || "",
      subjectId: subject.id,
      subjectName: subject.name,
      courseName: course.name,
      classIds: structuredClone(course.classIds || []),
      students: (course.studentIds || []).map((studentId) => studentsById.get(studentId)).filter(Boolean),
      updatedAt: new Date().toISOString()
    })));
  });
  localStorage.setItem(CLASS_DIRECTORY_STORAGE_KEY, JSON.stringify({ format: "schola-class-directory", version: 2, classes, courses }));
}

function getOverviewAppointmentSources(project) {
  return ["appointments", "individual"].flatMap((layerType) => {
    const layer = getProjectLayer(project, layerType);
    return (Array.isArray(layer?.groups) ? layer.groups : []).map((group) => ({ layerType, group }));
  });
}

function compareOverviewDates(left, right) {
  const today = getLocalDateKey(new Date());
  const leftDate = left?.sortDate || "";
  const rightDate = right?.sortDate || "";
  const rank = (date) => !date ? 1 : date >= today ? 0 : 2;
  const rankDifference = rank(leftDate) - rank(rightDate);
  if (rankDifference) return rankDifference;
  if (!leftDate && !rightDate) return 0;
  return rank(leftDate) === 2 ? rightDate.localeCompare(leftDate) : leftDate.localeCompare(rightDate);
}

function collectOverviewProjects(project) {
  if (!project) return [];
  const groupedProjects = getOverviewAppointmentSources(project).flatMap(({ layerType, group }) => (
    (Array.isArray(group.projects) ? group.projects : []).map((entry) => ({
      key: `${layerType}:${group.id}:${entry.id}`,
      name: entry.name || "Projektgruppe",
      context: `${layerType === "individual" ? "Persönliche Termine" : "Schulische Termine"} · ${group.name}`,
      color: group.color || "#bfd2e2",
      entries: [
        ...(entry.appointments || []).map((appointment) => ({
          type: "appointment",
          name: appointment.name || "Termin",
          date: formatAppointmentDateRange(appointment),
          time: appointment.startTime && appointment.endTime ? `${appointment.startTime}–${appointment.endTime}` : "",
          sortDate: getAppointmentSortDate(appointment),
          endDate: getAppointmentEndDate(appointment),
          sortTime: appointment.startTime || "00:00"
        })),
        ...(entry.todos || []).map((todo) => ({
          type: "todo",
          name: todo.name || "To-do",
          date: todo.dueDate ? formatGermanDate(todo.dueDate) : "Frist noch offen",
          time: todo.completed ? "Erledigt" : "To-do",
          sortDate: todo.dueDate || "",
          endDate: todo.dueDate || "",
          sortTime: "23:59",
          completed: Boolean(todo.completed),
          source: todo
        }))
      ].sort((a, b) => compareOverviewDates(a, b) || a.sortTime.localeCompare(b.sortTime))
    }))
  ));
  const classProjects = (getProjectLayer(project, "classes")?.entries || []).map((entry) => ({
    key: `classes:${entry.id}`,
    name: entry.name || "Projekttag",
    context: "Projekttage nach Klassen",
    color: "#bfd2e2",
    entries: [{
      name: (entry.classNames || []).join(", ") || entry.className || "Klassen noch offen",
      date: formatAppointmentDateRange(entry),
      time: entry.allDay === false && entry.startTime && entry.endTime ? `${entry.startTime}–${entry.endTime}` : "Ganztägig",
      sortDate: getAppointmentSortDate(entry),
      endDate: getAppointmentEndDate(entry),
      sortTime: entry.startTime || "00:00"
    }]
  }));
  return [...groupedProjects, ...classProjects]
    .filter((entry) => !entry.entries.length || entry.entries.some((projectEntry) => !projectEntry.endDate || projectEntry.endDate >= getLocalDateKey(new Date())))
    .map((entry) => ({ ...entry, sortDate: entry.entries.slice().sort(compareOverviewDates)[0]?.sortDate || "" }))
    .sort((a, b) => compareOverviewDates(a, b) || a.name.localeCompare(b.name, "de"));
}

function collectOverviewTodos(project) {
  if (!project) return [];
  const groupedTodos = getOverviewAppointmentSources(project).flatMap(({ group }) => {
    const directDeadlines = (group.appointments || []).filter((entry) => entry.isDeadline).map((entry) => ({
      name: entry.name || "Frist", dueDate: getAppointmentEndDate(entry), completed: Boolean(entry.completed),
      context: group.name, color: group.color || "#c9c1dd", source: entry
    }));
    const projectTodos = (group.projects || []).flatMap((appointmentProject) => [
      ...(appointmentProject.todos || []).map((entry) => ({
        name: entry.name || "To-do", dueDate: entry.dueDate || "", completed: Boolean(entry.completed),
        context: `${group.name} · ${appointmentProject.name}`, color: group.color || "#c9c1dd", source: entry
      })),
      ...(appointmentProject.appointments || []).filter((entry) => entry.isDeadline).map((entry) => ({
        name: entry.name || "Frist", dueDate: getAppointmentEndDate(entry), completed: Boolean(entry.completed),
        context: `${group.name} · ${appointmentProject.name}`, color: group.color || "#c9c1dd", source: entry
      }))
    ]);
    return [...directDeadlines, ...projectTodos];
  });
  const ungroupedDeadlines = (getProjectLayer(project, "individual")?.appliedEntries || [])
    .filter((entry) => ["school-project", "personal-appointment"].includes(entry.type) && entry.isDeadline)
    .map((entry) => ({
      name: entry.name || "Frist",
      dueDate: getAppointmentEndDate(entry),
      completed: Boolean(entry.completed),
      context: entry.type === "school-project" ? "Schulische Termine" : "Persönliche Termine",
      color: entry.color || "#c9c1dd",
      source: entry
    }));
  const today = getLocalDateKey(new Date());
  return [...groupedTodos, ...ungroupedDeadlines]
    .map((entry) => ({ ...entry, isOverdue: Boolean(!entry.completed && entry.dueDate && entry.dueDate < today) }))
    .sort((a, b) => {
      const priority = (entry) => entry.isOverdue ? 0 : entry.completed ? 2 : 1;
      return priority(a) - priority(b)
        || (a.dueDate || "9999-12-31").localeCompare(b.dueDate || "9999-12-31")
        || a.name.localeCompare(b.name, "de");
    });
}

function collectOverviewEvents(project) {
  if (!project) return [];
  const directAppointments = getOverviewAppointmentSources(project).flatMap(({ layerType, group }) => (
    (group.appointments || []).filter((entry) => !entry.isDeadline).map((entry) => ({
      name: entry.name || "Termin",
      context: `${layerType === "individual" ? "Persönliche Termine" : "Schulische Termine"} · ${group.name}`,
      color: group.color || "#c9c1dd",
      sortDate: getAppointmentStartDate(entry),
      endDate: getAppointmentEndDate(entry),
      date: formatAppointmentDateRange(entry),
      time: entry.startTime && entry.endTime ? `${entry.startTime}–${entry.endTime}` : "Zeit noch offen"
    }))
  ));
  const singleEvents = (getProjectLayer(project, "individual")?.appliedEntries || [])
    .filter((entry) => entry.type === "school-project" && !entry.isDeadline)
    .map((entry) => ({
      name: entry.name || "Einzelveranstaltung",
      context: "Schulische Termine",
      color: entry.color || "#bfd2e2",
      sortDate: getAppointmentStartDate(entry),
      endDate: getAppointmentEndDate(entry),
      date: formatAppointmentDateRange(entry),
      time: entry.startTime && entry.endTime ? `${entry.startTime}–${entry.endTime}` : "Ganztägig"
    }));
  return [...directAppointments, ...singleEvents]
    .filter((entry) => !entry.endDate || entry.endDate >= getLocalDateKey(new Date()))
    .sort((a, b) => compareOverviewDates(a, b) || (a.time || "").localeCompare(b.time || ""));
}

function renderOverviewSidebar() {
  const openProjectKeys = new Set([...overviewProjectsPanel.querySelectorAll(".overview-project-card[open]")].map((entry) => entry.dataset.projectKey));
  const project = projects.find((entry) => entry.id === displayedProjectId);
  const overviewProjects = collectOverviewProjects(project);
  const overviewEvents = collectOverviewEvents(project);
  const todos = collectOverviewTodos(project);
  overviewTodoCount.textContent = String(todos.filter((entry) => !entry.completed).length);
  const projectList = document.createElement("div");
  projectList.className = "overview-sidebar-list";
  if (!overviewProjects.length) {
    const empty = document.createElement("p");
    empty.className = "overview-sidebar-empty";
    empty.textContent = "Im ausgewählten Projektordner sind noch keine Projektgruppen oder Klassenprojekte angelegt.";
    projectList.append(empty);
  } else overviewProjects.forEach((entry) => {
    const card = document.createElement("details");
    card.className = "overview-sidebar-card overview-project-card";
    card.dataset.projectKey = entry.key;
    card.open = openProjectKeys.has(entry.key);
    card.style.setProperty("--overview-color", entry.color);
    const summary = document.createElement("summary");
    const heading = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = entry.name;
    const meta = document.createElement("small");
    const count = entry.entries.length;
    meta.textContent = `${entry.context} · ${count} ${count === 1 ? "Eintrag" : "Einträge"}`;
    heading.append(title, meta);
    summary.append(heading);
    const entries = document.createElement("div");
    entries.className = "overview-project-entries";
    if (!count) {
      const empty = document.createElement("p");
      empty.className = "overview-project-entry overview-project-entry-empty";
      empty.textContent = "Dieses Projekt enthält noch keine Termine.";
      entries.append(empty);
    } else entry.entries.forEach((projectEntry) => {
      const row = document.createElement("div");
      row.className = `overview-project-entry${projectEntry.type === "todo" ? " is-todo" : ""}${projectEntry.completed ? " is-completed" : ""}`;
      if (projectEntry.type === "todo") {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = projectEntry.completed;
        checkbox.setAttribute("aria-label", `${projectEntry.name} als erledigt markieren`);
        checkbox.addEventListener("change", () => {
          projectEntry.source.completed = checkbox.checked;
          saveProjects();
        });
        row.append(checkbox);
      }
      const copy = document.createElement("span");
      const rowTitle = document.createElement("strong");
      rowTitle.textContent = projectEntry.name;
      const rowMeta = document.createElement("small");
      rowMeta.textContent = [projectEntry.date, projectEntry.time].filter(Boolean).join(" · ");
      copy.append(rowTitle, rowMeta);
      row.append(copy);
      entries.append(row);
    });
    card.append(summary, entries);
    projectList.append(card);
  });
  overviewProjectsPanel.replaceChildren(projectList);

  const eventList = document.createElement("div");
  eventList.className = "overview-sidebar-list";
  if (!overviewEvents.length) {
    const empty = document.createElement("p");
    empty.className = "overview-sidebar-empty";
    empty.textContent = "Keine bevorstehenden Einzelveranstaltungen vorhanden.";
    eventList.append(empty);
  } else overviewEvents.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "overview-sidebar-card";
    card.style.setProperty("--overview-color", entry.color);
    const title = document.createElement("strong");
    title.textContent = entry.name;
    const meta = document.createElement("small");
    meta.textContent = [entry.date, entry.time, entry.context].filter(Boolean).join(" · ");
    card.append(title, meta);
    eventList.append(card);
  });
  overviewEventsPanel.replaceChildren(eventList);

  const todoList = document.createElement("div");
  todoList.className = "overview-sidebar-list";
  if (!todos.length) {
    const empty = document.createElement("p");
    empty.className = "overview-sidebar-empty";
    empty.textContent = "Noch keine To-dos oder als Frist markierten Termine vorhanden.";
    todoList.append(empty);
  } else todos.forEach((entry) => {
    const label = document.createElement("label");
    label.className = `overview-sidebar-card overview-todo-card${entry.completed ? " is-completed" : ""}${entry.isOverdue ? " is-overdue" : ""}`;
    label.style.setProperty("--overview-color", entry.color);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = entry.completed;
    const copy = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = entry.name;
    const meta = document.createElement("small");
    meta.textContent = `${entry.isOverdue ? "Überfällig · " : ""}${entry.dueDate ? formatGermanDate(entry.dueDate) : "Ohne Frist"} · ${entry.context}`;
    copy.append(title, meta);
    checkbox.addEventListener("change", () => { entry.source.completed = checkbox.checked; saveProjects(); });
    label.append(checkbox, copy);
    todoList.append(label);
  });
  overviewTodosPanel.replaceChildren(todoList);
}

function setOverviewSidebarTab(tabName) {
  const showProjects = tabName === "projects";
  const showEvents = tabName === "events";
  overviewProjectsTab.setAttribute("aria-selected", String(showProjects));
  overviewEventsTab.setAttribute("aria-selected", String(showEvents));
  overviewTodosTab.setAttribute("aria-selected", String(!showProjects && !showEvents));
  overviewProjectsPanel.hidden = !showProjects;
  overviewEventsPanel.hidden = !showEvents;
  overviewTodosPanel.hidden = showProjects || showEvents;
}

function setOverviewSidebarOpen(isOpen) {
  const renderStage = document.querySelector(".render-stage");
  const preservedScrollTop = renderStage?.scrollTop || 0;
  const preservedScrollLeft = renderStage?.scrollLeft || 0;
  overviewSidebar.classList.toggle("is-open", isOpen);
  overviewSidebar.setAttribute("aria-hidden", String(!isOpen));
  overviewSidebar.toggleAttribute("inert", !isOpen);
  overviewSidebarButton.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) {
    setExportMenuOpen(false);
    renderOverviewSidebar();
    overviewSidebarClose.focus({ preventScroll: true });
  } else overviewSidebarButton.focus({ preventScroll: true });
  if (renderStage) {
    renderStage.scrollTop = preservedScrollTop;
    renderStage.scrollLeft = preservedScrollLeft;
  }
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

function exportClassGrade(project, grade) {
  const payload = {
    type: "schola-stundenplan-klassenstufe",
    version: 1,
    exportedAt: new Date().toISOString(),
    source: { projectId: project.id, projectName: project.name, schoolId: grade.schoolId },
    grade: structuredClone(grade)
  };
  downloadExportFile(
    JSON.stringify(payload, null, 2),
    `${makeExportFilename(project.name)}-klassenstufe-${makeExportFilename(grade.name)}.json`,
    "application/json;charset=utf-8"
  );
}

async function importClassGrade(project, file, trigger) {
  try {
    const payload = JSON.parse(await file.text());
    if (payload?.type !== "schola-stundenplan-klassenstufe" || payload?.version !== 1 || !payload.grade) {
      throw new Error("Die Datei ist keine exportierte Stundenplan-Klassenstufe.");
    }
    const layer = getClassCatalogData(project);
    const gradeName = String(payload.grade.name || "").trim();
    if (!gradeName || !Array.isArray(payload.grade.classes)) throw new Error("Die Klassenstufe enthält keine gültigen Klassendaten.");
    if (layer.grades.some((grade) => grade.schoolId === activeClassSchoolId && grade.name === gradeName)) {
      throw new Error(`${gradeName}. Klassenstufe ist in dieser Schule bereits vorhanden.`);
    }
    const usedGradeIds = new Set(layer.grades.map((grade) => grade.id));
    const usedClassIds = new Set(layer.grades.flatMap((grade) => grade.classes || []).map((entry) => entry.id));
    const usedStudentIds = new Set(layer.grades.flatMap((grade) => grade.classes || []).flatMap((entry) => entry.students || []).map((student) => student.id));
    const createId = (prefix) => globalThis.crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    let gradeId = payload.grade.id || createId("grade");
    if (usedGradeIds.has(gradeId)) gradeId = createId("grade");
    const displayMode = layer.classDisplayMode || "normal";
    const classes = payload.grade.classes.map((sourceClass) => {
      const suffix = String(sourceClass.suffix ?? "").trim();
      let classId = sourceClass.id || createId("class");
      if (usedClassIds.has(classId)) classId = createId("class");
      usedClassIds.add(classId);
      const students = (Array.isArray(sourceClass.students) ? sourceClass.students : []).map((sourceStudent, index) => {
        let studentId = sourceStudent.id || createId("student");
        if (usedStudentIds.has(studentId)) studentId = createId("student");
        usedStudentIds.add(studentId);
        return { id: studentId, number: Math.max(1, Number(sourceStudent.number) || index + 1), name: String(sourceStudent.name || "").trim() };
      });
      return {
        id: classId,
        suffix,
        displayMode,
        name: getClassDisplayText(gradeName, suffix, displayMode),
        teachers: (Array.isArray(sourceClass.teachers) ? sourceClass.teachers : []).map((teacher) => String(teacher || "").trim()).filter(Boolean).slice(0, 2),
        students
      };
    });
    layer.grades.push({ id: gradeId, name: gradeName, schoolId: activeClassSchoolId, classes });
    syncLessonCatalogLabels(project);
    saveProjects();
    renderClassCatalogProperties(project);
    renderActiveCalendar(project);
  } catch (error) {
    window.alert(error instanceof Error ? error.message : "Die Klassenstufe konnte nicht importiert werden.");
    if (trigger) trigger.focus();
  }
}

function exportProject(projectId = displayedProjectId) {
  const project = projects.find((entry) => entry.id === projectId);
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

function exportDisplayedProject() {
  exportProject(displayedProjectId);
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
  ensureScheduleVersions(project);
  const importFolder = {
    id: globalThis.crypto?.randomUUID?.() ?? `project-folder-${Date.now()}`,
    name: project.name,
    calendarRange: structuredClone(project.calendarRange || project.periods?.schoolYear || {}),
    createdAt: new Date().toISOString()
  };
  projectFolders.push(importFolder);
  project.folderId = importFolder.id;
  projects.push(project);
  migrateClassProjectsToSchoolAppointments([project]);
  migrateKnownHolidayCorrections([project]);
  activeProjectId = project.id;
  activeProjectFolderId = project.folderId;
  displayedProjectId = project.id;
  activeLayerType = null;
  activeScheduleId = null;
  expandedProjectIds.add(project.id);
  expandedProjectFolderIds.add(project.folderId);
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
  const catalog = getClassCatalogData(project);
  const subject = (catalog.subjects || []).find((entry) => entry.id === lesson.subjectId);
  const matchingCourses = lesson.courseId
    ? (catalog.subjects || []).flatMap((catalogSubject) => (catalogSubject.courses || [])
      .filter((course) => course.id === lesson.courseId)
      .map((course) => ({ course, subject: catalogSubject })))
    : [];
  const lessonClassIds = [...new Set([
    lesson.classId,
    ...(lesson.classIds || []),
    ...matchingCourses.flatMap(({ course }) => course.classIds || [])
  ].filter(Boolean))];
  const effectiveLessonSchoolId = lesson.schoolId || subject?.schoolId || matchingCourses[0]?.subject?.schoolId || "";
  const lessonGrades = (catalog.grades || []).filter((grade) => (
    (grade.classes || []).some((classEntry) => lessonClassIds.includes(classEntry.id))
    || (lesson.gradeLevelId && grade.id === lesson.gradeLevelId)
  ));
  const lessonGradeNames = new Set(lessonGrades.map((grade) => String(grade.name || "").trim().toLocaleLowerCase("de")));
  const legacyLessonClass = String(lesson.grade || "").trim().toLocaleLowerCase("de");
  const legacyLessonGrade = legacyLessonClass.match(/^\d+/)?.[0] || "";
  if (legacyLessonGrade) lessonGradeNames.add(legacyLessonGrade);
  const matchesClassProjectGroup = (group) => {
    if (!group) return false;
    const normalizedGroupName = String(group.className || "").trim().toLocaleLowerCase("de");
    const normalizedGroupGrade = String(group.gradeName || "").trim().toLocaleLowerCase("de");
    const normalizedGroupSuffix = String(group.suffix || "").trim().toLocaleLowerCase("de");
    const currentClassIds = group.targetType === "class"
      ? (catalog.grades || [])
        .filter((grade) => (!group.schoolId || !grade.schoolId || grade.schoolId === group.schoolId)
          && (!normalizedGroupGrade || String(grade.name || "").trim().toLocaleLowerCase("de") === normalizedGroupGrade))
        .flatMap((grade) => (grade.classes || [])
          .filter((classEntry) => {
            const suffix = String(classEntry.suffix || "").trim().toLocaleLowerCase("de");
            const name = String(classEntry.name || "").trim().toLocaleLowerCase("de");
            return (normalizedGroupSuffix && suffix === normalizedGroupSuffix)
              || (normalizedGroupName && name === normalizedGroupName);
          })
          .map((classEntry) => classEntry.id))
      : [];
    const groupClassIds = group.targetType === "grade"
      ? (catalog.grades || [])
        .filter((grade) => String(grade.name || "").trim().toLocaleLowerCase("de") === String(group.gradeName || "").trim().toLocaleLowerCase("de")
          && (!group.schoolId || !grade.schoolId || grade.schoolId === group.schoolId))
        .flatMap((grade) => (grade.classes || []).map((classEntry) => classEntry.id))
      : group.targetType === "course"
        ? (catalog.subjects || []).flatMap((catalogSubject) => (catalogSubject.courses || []))
          .find((course) => course.id === group.courseId)?.classIds || group.classIds || []
        : [...new Set([...(group.classIds || []), ...currentClassIds])];
    if (lessonClassIds.some((classId) => groupClassIds.includes(classId))) return true;
    if (group.targetType === "course" && lesson.courseId && group.courseId === lesson.courseId) return true;
    if (group.schoolId && effectiveLessonSchoolId && group.schoolId !== effectiveLessonSchoolId) return false;
    if (group.targetType === "grade") {
      return Boolean(normalizedGroupGrade && lessonGradeNames.has(normalizedGroupGrade));
    }
    return Boolean(group.targetType === "class"
      && normalizedGroupName === legacyLessonClass);
  };
  const individualLayer = project?.layers?.find((entry) => entry.type === "individual");
  const schoolAppointmentLayer = project?.layers?.find((entry) => entry.type === "appointments");
  const individualEntries = Array.isArray(individualLayer?.appliedEntries)
    ? individualLayer.appliedEntries
    : (Array.isArray(individualLayer?.entries) ? individualLayer.entries : []);
  const schoolAppointmentEntries = (Array.isArray(schoolAppointmentLayer?.groups) ? schoolAppointmentLayer.groups : [])
    .flatMap((group) => getAppointmentGroupEntries(group));
  const classImpactEntries = [
    ...(Array.isArray(layer?.entries) ? layer.entries : []),
    ...individualEntries.filter((entry) => entry.type === "school-project"),
    ...schoolAppointmentEntries
  ];
  const suppressedByClassProject = classImpactEntries.some((entry) => {
    const affectsClassLessons = entry.overridesClassLessons
      ?? (entry.type === "class-project" ? entry.overridesLessons !== false : false);
    if (!affectsClassLessons) return false;
    if (Array.isArray(entry.schoolIds) && entry.schoolIds.length && effectiveLessonSchoolId && !entry.schoolIds.includes(effectiveLessonSchoolId)) return false;
    if ((!Array.isArray(entry.schoolIds) || !entry.schoolIds.length) && entry.schoolId && effectiveLessonSchoolId && entry.schoolId !== effectiveLessonSchoolId) return false;
    const startDate = entry.startDate || entry.date;
    const endDate = entry.endDate || entry.date;
    if (!startDate || !endDate || dateKey < startDate || dateKey > endDate) return false;
    const sameClass = Boolean(
      (entry.classId && lesson.classId && entry.classId === lesson.classId)
      || (Array.isArray(entry.classIds) && lessonClassIds.some((classId) => entry.classIds.includes(classId)))
      || (entry.classGroups || []).some(matchesClassProjectGroup)
      || (String(entry.className || entry.class || "").trim().toLocaleLowerCase("de") === legacyLessonClass)
    );
    if (!sameClass) return false;
    const allDay = typeof entry.allDay === "boolean"
      ? entry.allDay
      : !(entry.startTime && entry.endTime);
    if (allDay) return true;
    if (!entry.startTime || !entry.endTime) return false;
    return timeToMinutes(lesson.start) < timeToMinutes(entry.endTime)
      && timeToMinutes(lesson.end) > timeToMinutes(entry.startTime);
  });
  if (suppressedByClassProject) return true;
  const overlapsLesson = (entry) => {
    if (!entry?.overridesLessons) return false;
    const startDate = entry.startDate || entry.date;
    const endDate = entry.endDate || entry.date;
    if (!startDate || !endDate || dateKey < startDate || dateKey > endDate) return false;
    if (!entry.startTime || !entry.endTime) return true;
    if (entry.type === "class-trip") {
      const lessonClass = String(lesson.grade || "").trim().toLocaleLowerCase("de");
      const lessonGradeName = lessonClass.match(/^\d+/)?.[0] || "";
      const lessonClassIds = [...new Set([lesson.classId, ...(lesson.classIds || [])].filter(Boolean))];
      const hasTargets = (entry.classGroups || []).length || (entry.classIds || []).length || entry.className || entry.class;
      const matchesTarget = (entry.classGroups || []).some((group) => (
        (group.targetType === "grade" && String(group.gradeName || "").trim().toLocaleLowerCase("de") === lessonGradeName)
        || (group.targetType === "course" && lessonClassIds.some((classId) => (group.classIds || []).includes(classId)))
        || (group.targetType === "class" && (
          lessonClassIds.some((classId) => (group.classIds || []).includes(classId))
          || String(group.className || "").trim().toLocaleLowerCase("de") === lessonClass
        ))
      )) || lessonClassIds.some((classId) => (entry.classIds || []).includes(classId))
        || String(entry.className || entry.class || "").trim().toLocaleLowerCase("de") === lessonClass;
      if (hasTargets && !matchesTarget) return false;
    }
    return timeToMinutes(lesson.start) < timeToMinutes(entry.endTime)
      && timeToMinutes(lesson.end) > timeToMinutes(entry.startTime);
  };
  const groupedAppointments = [schoolAppointmentLayer, individualLayer].flatMap((appointmentLayer) => (
    (Array.isArray(appointmentLayer?.groups) ? appointmentLayer.groups : [])
      .flatMap((group) => getAppointmentGroupEntries(group))
  ));
  return individualEntries.some(overlapsLesson) || groupedAppointments.some(overlapsLesson);
}

function getCompleteIcalendarSelection(project) {
  const schedulesLayer = project.layers?.find((entry) => entry.type === "schedules");
  const individualLayer = project.layers?.find((entry) => entry.type === "individual");
  const appointmentLayer = project.layers?.find((entry) => entry.type === "appointments");
  const sicknessLayer = project.layers?.find((entry) => entry.type === "sickness");
  return {
    scheduleIds: new Set((schedulesLayer?.schedules || []).map((entry) => entry.id)),
    holidays: true,
    individualEntryIds: new Set((individualLayer?.appliedEntries || []).map((entry) => entry.id)),
    appointmentIds: new Set([appointmentLayer, individualLayer].flatMap((layer) => (
      (layer?.groups || []).flatMap((group) => getAppointmentGroupEntries(group).map((entry) => entry.id))
    ))),
    sicknessIds: new Set((sicknessLayer?.entries || []).map((entry) => entry.id)),
    classProjectIds: new Set()
  };
}

function buildProjectIcalendar(project, selection = getCompleteIcalendarSelection(project)) {
  const events = [];
  const schedulesLayer = project.layers?.find((entry) => entry.type === "schedules");
  const individualLayer = project.layers?.find((entry) => entry.type === "individual");
  const holidayLayer = project.layers?.find((entry) => entry.type === "holidays");
  const appointmentLayer = project.layers?.find((entry) => entry.type === "appointments");
  const sicknessLayer = project.layers?.find((entry) => entry.type === "sickness");
  const projectPeriod = getLessonStatisticsPeriod(project);

  (Array.isArray(schedulesLayer?.schedules) ? schedulesLayer.schedules : [])
    .filter((schedule) => selection.scheduleIds.has(schedule.id))
    .forEach((schedule) => {
    const version = schedulesLayer?.versions?.find((entry) => entry.id === schedule.versionId);
    const rangeStart = version?.validFrom || schedule.validFrom || projectPeriod.startDate;
    const rangeEnd = version?.validUntil || schedule.validUntil || projectPeriod.endDate;
    const combinedSchedule = { ...schedule, projectId: project.id };
    (Array.isArray(schedule.lessons) ? schedule.lessons : []).forEach((lesson) => {
      const occurrenceDates = [];
      const exclusionDates = [];
      forEachDateKey(rangeStart, rangeEnd, (dateKey, date) => {
        const weekday = ((date.getDay() + 6) % 7) + 1;
        if (Number(lesson.day) !== weekday) return;
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
          title: entry.name || ({ "class-trip": "Klassenfahrt", "school-project": "Einzelveranstaltung", vacation: "Urlaub", "personal-appointment": "Termin" }[entry.type]),
          description: (entry.classNames || []).join(", ") || entry.className || entry.class || "",
          location: entry.room || "",
          startDate: dateKey,
          startTime: entry.startTime,
          endTime: entry.endTime,
          category: ({ "class-trip": "Klassenfahrt", "school-project": "Einzelveranstaltung", vacation: "Urlaub", "personal-appointment": "Persönlicher Termin" }[entry.type]),
          color: entry.type === "vacation" ? VACATION_COLOR : (entry.color || "#bfd2e2")
        }));
      });
    });

  [appointmentLayer, individualLayer].flatMap((layer) => (Array.isArray(layer?.groups) ? layer.groups : []))
    .forEach((group) => {
    getAppointmentGroupEntries(group)
      .filter((appointment) => selection.appointmentIds.has(appointment.id))
      .forEach((appointment) => {
      events.push(...createIcalendarEvent({
        uid: `appointment-${group.id}-${appointment.appointmentProjectId || "direct"}-${appointment.id}`,
        title: appointment.name || group.name || "Termin",
        description: [group.name, appointment.appointmentProjectName].filter(Boolean).join(" · "),
        location: appointment.room || "",
        startDate: getAppointmentStartDate(appointment),
        endDate: getAppointmentEndDate(appointment),
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
  appendCalendarExportChoiceGroup("Ungruppierte schulische Termine", (individualLayer?.appliedEntries || [])
    .filter((entry) => entry.type === "school-project")
    .map((entry) => ({
      kind: "individual",
      id: entry.id,
      label: entry.name || "Schulischer Termin"
    })));
  appendCalendarExportChoiceGroup("Persönliche Termine, Klassenfahrten und Urlaub", (individualLayer?.appliedEntries || [])
    .filter((entry) => ["class-trip", "vacation", "personal-appointment"].includes(entry.type))
    .map((entry) => ({
      kind: "individual",
      id: entry.id,
      label: entry.name || ({ "class-trip": "Klassenfahrt", "school-project": "Einzelveranstaltung", vacation: "Urlaub", "personal-appointment": "Termin" }[entry.type])
    })));
  appendCalendarExportChoiceGroup("Schulische und persönliche Termingruppen", [appointmentLayer, individualLayer].flatMap((layer) => (
    (layer?.groups || []).flatMap((group) => getAppointmentGroupEntries(group).map((appointment) => ({
      kind: "appointment",
      id: appointment.id,
      label: `${group.name}${appointment.appointmentProjectName ? ` · ${appointment.appointmentProjectName}` : ""}: ${appointment.name}`
    })))
  )));
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

function openCalendarExportDialog(projectId = displayedProjectId) {
  const project = projects.find((entry) => entry.id === projectId);
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

function downloadProjectCalendar(projectId, selection) {
  const project = projects.find((entry) => entry.id === projectId);
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

function downloadDisplayedCalendar(selection) {
  downloadProjectCalendar(displayedProjectId, selection);
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
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = null;
  activeScheduleId = null;
  activeSchoolId = null;
  activeAppointmentGroupTarget = null;
  pendingAppointmentGroupScrollTarget = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectProjectFolder(folderId) {
  activeProjectFolderId = folderId;
  activeLayerType = null;
  activeScheduleId = null;
  activeSchoolId = null;
  renderProjectBrowser();
  renderProjectDetail();
}

function selectLayer(projectId, layerType) {
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = layerType;
  activeScheduleId = null;
  activeSchoolId = null;
  activeAppointmentGroupTarget = null;
  pendingAppointmentGroupScrollTarget = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectAppointmentGroup(projectId, layerType, groupId) {
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = layerType;
  activeScheduleId = null;
  activeSchoolId = null;
  activeAppointmentGroupTarget = { projectId, layerType, groupId };
  pendingAppointmentGroupScrollTarget = { ...activeAppointmentGroupTarget };
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function scrollToPendingAppointmentGroup(project, layerType) {
  const target = pendingAppointmentGroupScrollTarget;
  if (!target || target.projectId !== project.id || target.layerType !== layerType) return;
  pendingAppointmentGroupScrollTarget = null;
  requestAnimationFrame(() => {
    const card = [...projectDetail.querySelectorAll(".appointment-group-card[data-group-id]")]
      .find((entry) => entry.dataset.groupId === target.groupId);
    card?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function selectSchool(projectId, schoolId) {
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = "holidays";
  activeScheduleId = null;
  activeSchoolId = schoolId;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectClassCatalogSchool(projectId, schoolId) {
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = "classCatalog";
  activeScheduleId = null;
  activeSchoolId = null;
  activeClassSchoolId = schoolId;
  activeClassCatalogTarget = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectClassCatalogTarget(projectId, schoolId, tab, type = null, id = null) {
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = "classCatalog";
  activeScheduleId = null;
  activeSchoolId = null;
  activeClassSchoolId = schoolId;
  activeClassCatalogTab = tab;
  activeClassCatalogTarget = type && id ? { projectId, schoolId, type, id } : null;
  pendingClassCatalogScrollTarget = activeClassCatalogTarget ? { ...activeClassCatalogTarget } : null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectSchedule(projectId, scheduleId) {
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = "schedules";
  activeScheduleId = scheduleId;
  const project = projects.find((entry) => entry.id === projectId);
  activeScheduleVersionId = project?.layers?.find((entry) => entry.type === "schedules")?.schedules?.find((entry) => entry.id === scheduleId)?.versionId || activeScheduleVersionId;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectScheduleVersion(projectId, versionId) {
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = "schedules";
  activeScheduleVersionId = versionId;
  activeScheduleId = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectSubstitutions(projectId) {
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = "substitutions";
  activeScheduleId = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function selectSupervisions(projectId, versionId = null) {
  const project = projects.find((entry) => entry.id === projectId);
  const versions = project ? ensureSupervisionVersions(project) : [];
  activeProjectFolderId = null;
  activeProjectId = projectId;
  activeLayerType = "supervisions";
  activeSupervisionVersionId = versionId || activeSupervisionVersionId || versions[0]?.id || null;
  activeScheduleId = null;
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
}

function duplicateSupervisionVersion(project, versionId) {
  const versions = ensureSupervisionVersions(project);
  const sourceIndex = versions.findIndex((entry) => entry.id === versionId);
  if (sourceIndex < 0) return;
  const copy = structuredClone(versions[sourceIndex]);
  copy.id = globalThis.crypto?.randomUUID?.() ?? `supervision-version-${Date.now()}`;
  copy.name = `${copy.name || "Aufsichtsplan"} – Kopie`;
  copy.validFrom = "";
  copy.validUntil = "";
  copy.createdAt = new Date().toISOString();
  copy.entries = (copy.entries || []).map((entry, index) => ({ ...entry, id: globalThis.crypto?.randomUUID?.() ?? `supervision-${Date.now()}-${index}` }));
  versions.splice(sourceIndex + 1, 0, copy);
  activeSupervisionVersionId = copy.id;
  saveProjects();
  renderProjectBrowser();
  renderSupervisionsProperties(project);
  renderActiveCalendar(project);
}

function duplicateScheduleVersion(project, versionId) {
  const layer = getProjectLayer(project, "schedules");
  ensureScheduleVersions(project);
  const sourceIndex = layer.versions.findIndex((entry) => entry.id === versionId);
  const sourceVersion = layer.versions[sourceIndex];
  if (!sourceVersion) return;
  const newId = (prefix) => globalThis.crypto?.randomUUID?.() ?? `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const baseName = `${sourceVersion.name || "Stundenplanversion"} – Kopie`;
  let name = baseName;
  let suffix = 2;
  const usedNames = new Set(layer.versions.map((entry) => String(entry.name || "").toLocaleLowerCase("de")));
  while (usedNames.has(name.toLocaleLowerCase("de"))) name = `${baseName} ${suffix++}`;
  const copyVersion = {
    id: newId("schedule-version"),
    name,
    validFrom: "",
    validUntil: "",
    validityPending: true,
    createdAt: new Date().toISOString(),
    duplicatedFromId: sourceVersion.id
  };
  const seriesIds = new Map();
  const copies = layer.schedules.filter((schedule) => schedule.versionId === sourceVersion.id).map((source) => {
    const copy = typeof structuredClone === "function" ? structuredClone(source) : JSON.parse(JSON.stringify(source));
    copy.id = newId("schedule");
    copy.versionId = copyVersion.id;
    copy.createdAt = new Date().toISOString();
    copy.duplicatedFromId = source.id;
    copy.displayRows = (Array.isArray(copy.displayRows) ? copy.displayRows : []).map((row) => ({ ...row, id: newId("display") }));
    copy.lessons = (Array.isArray(copy.lessons) ? copy.lessons : []).map((lesson) => {
      let seriesId = lesson.seriesId;
      if (seriesId) {
        if (!seriesIds.has(seriesId)) seriesIds.set(seriesId, newId("lesson-series"));
        seriesId = seriesIds.get(seriesId);
      }
      return { ...lesson, id: newId("lesson"), ...(seriesId ? { seriesId } : {}) };
    });
    return copy;
  });
  layer.versions.splice(sourceIndex + 1, 0, copyVersion);
  layer.schedules.push(...copies);
  activeProjectFolderId = null;
  activeProjectId = project.id;
  activeLayerType = "schedules";
  activeScheduleVersionId = copyVersion.id;
  activeScheduleId = null;
  expandedLayerKeys.add(`${project.id}:schedules:version:${copyVersion.id}`);
  localStorage.setItem(EXPANDED_LAYERS_STORAGE_KEY, JSON.stringify([...expandedLayerKeys]));
  saveProjects();
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar(project);
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

function setClassProjectGradeCalendarVisibility(project, gradeName, visible) {
  const layer = getProjectLayer(project, "classes");
  layer.gradeVisibility = layer.gradeVisibility && typeof layer.gradeVisibility === "object"
    ? layer.gradeVisibility
    : {};
  layer.gradeVisibility[gradeName || "unassigned"] = visible;
  saveProjects();
  renderProjectBrowser();
  renderActiveCalendar(project);
}

function createBrowserGroupRow(project, layerType, group) {
  const row = document.createElement("div");
  row.className = "browser-group-row";
  const select = document.createElement("button");
  select.type = "button";
  const isActive = activeAppointmentGroupTarget?.projectId === project.id
    && activeAppointmentGroupTarget.layerType === layerType
    && activeAppointmentGroupTarget.groupId === group.id;
  select.className = `schedule-tree-row browser-group-select${isActive ? " is-active" : ""}`;
  select.textContent = group.name;
  select.addEventListener("click", () => selectAppointmentGroup(project.id, layerType, group.id));
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

function createSchoolYearProject(folderId, name) {
  const project = {
    id: globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}`,
    folderId,
    name,
    createdAt: new Date().toISOString(),
    layers: LAYER_TYPES.map((layer) => ({ type: layer.id, entries: [] }))
  };
  projects.push(project);
  activeProjectFolderId = folderId;
  activeProjectId = project.id;
  displayedProjectId = project.id;
  localStorage.setItem(DISPLAY_PROJECT_STORAGE_KEY, project.id);
  activeLayerType = null;
  expandedProjectFolderIds.add(folderId);
  expandedProjectIds.add(project.id);
  expandDefaultProjectLayers(project.id);
  saveProjects();
  renderProjectBrowser();
  renderProjectDetail();
  renderActiveCalendar();
  return project;
}

function openNewSchoolYearDialog(folder) {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  heading.innerHTML = `<span class="label">${escapeHtml(folder.name)}</span><h2>Schuljahr hinzufügen</h2>`;
  const field = document.createElement("label");
  field.className = "dialog-field";
  const label = document.createElement("span");
  label.textContent = "Bezeichnung des Schuljahres";
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 80;
  input.required = true;
  input.autocomplete = "off";
  input.placeholder = "z. B. Schuljahr 2027/28";
  field.append(label, input);
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
  submit.textContent = "Schuljahr anlegen";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (!name) return input.focus();
    createSchoolYearProject(folder.id, name);
    dialog.close();
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, field, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
  input.focus();
}

function renderProjectBrowser() {
  if (!projectFolders.length) {
    const empty = document.createElement("p");
    empty.className = "project-browser-empty";
    empty.textContent = "Noch kein Projektordner. Legen Sie über das Aktionsmenü einen Projektordner an.";
    projectBrowserList.replaceChildren(empty);
    return;
  }

  const cards = projects.map((project) => {
    const card = document.createElement("article");
    card.dataset.projectId = project.id;
    const expanded = true;
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

    const menuShell = document.createElement("div");
    menuShell.className = "schedule-menu-shell project-browser-menu";
    const projectMenuButton = document.createElement("button");
    projectMenuButton.type = "button";
    projectMenuButton.className = "schedule-menu-button";
    projectMenuButton.setAttribute("aria-label", `Menü für ${project.name}`);
    projectMenuButton.setAttribute("aria-expanded", "false");
    projectMenuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
    const projectMenu = document.createElement("div");
    projectMenu.className = "schedule-menu";
    projectMenu.hidden = true;
    const exportProjectButton = document.createElement("button");
    exportProjectButton.type = "button";
    exportProjectButton.className = "project-export-submenu-toggle";
    exportProjectButton.textContent = "Exportieren";
    exportProjectButton.setAttribute("aria-expanded", "false");
    const exportSubmenu = document.createElement("div");
    exportSubmenu.className = "project-export-submenu";
    exportSubmenu.hidden = true;
    const exportJsonButton = document.createElement("button");
    exportJsonButton.type = "button";
    exportJsonButton.innerHTML = "<strong>Schuljahr</strong><small>JSON · zur Wiederherstellung</small>";
    exportJsonButton.addEventListener("click", () => {
      closeCardMenus();
      exportProject(project.id);
    });
    const exportCalendarButton = document.createElement("button");
    exportCalendarButton.type = "button";
    exportCalendarButton.innerHTML = "<strong>Kalenderdatei</strong><small>ICS · für Kalender-Apps</small>";
    exportCalendarButton.addEventListener("click", () => {
      closeCardMenus();
      openCalendarExportDialog(project.id);
    });
    exportProjectButton.addEventListener("click", (event) => {
      event.stopPropagation();
      exportSubmenu.hidden = !exportSubmenu.hidden;
      exportProjectButton.setAttribute("aria-expanded", String(!exportSubmenu.hidden));
    });
    exportSubmenu.append(exportJsonButton, exportCalendarButton);
    const projectIdButton = document.createElement("button");
    projectIdButton.type = "button";
    projectIdButton.textContent = "ID";
    projectIdButton.addEventListener("click", () => { closeCardMenus(); openProjectCalendarIdDialog(project); });
    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.type = "button";
    deleteProjectButton.className = "schedule-menu-delete";
    deleteProjectButton.textContent = "Schuljahr löschen";
    deleteProjectButton.dataset.projectId = project.id;
    deleteProjectButton.dataset.projectFolderId = project.id;
    deleteProjectButton.setAttribute("aria-label", `${project.name} löschen – gedrückt halten`);
    deleteProjectButton.title = "Zum Löschen gedrückt halten";
    deleteProjectButton.addEventListener("pointerdown", beginScheduleDeleteHold);
    deleteProjectButton.addEventListener("pointerup", finishScheduleDeleteHold);
    deleteProjectButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
    deleteProjectButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
    projectMenuButton.addEventListener("click", () => {
      projectMenu.hidden = !projectMenu.hidden;
      projectMenuButton.setAttribute("aria-expanded", String(!projectMenu.hidden));
    });
    projectMenu.append(exportProjectButton, exportSubmenu, projectIdButton, deleteProjectButton);
    menuShell.append(projectMenuButton, projectMenu);

    row.append(toggle, icon, main, displayToggle, menuShell);
    card.append(row);

    if (expanded) {
      const layers = document.createElement("div");
      layers.className = "layer-list";
      LAYER_TYPES.forEach((layer) => {
        if (layer.hiddenInBrowser) return;
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
        if (isLayerExpanded && layer.id === "classCatalog") {
          const catalog = getClassCatalogData(project);
          const makeBranch = (label, expansionId, onSelect, className = "") => {
            const branch = document.createElement("div");
            branch.className = `class-catalog-browser-branch ${className}`.trim();
            const head = document.createElement("div");
            head.className = "layer-tree-head";
            const key = `${project.id}:${expansionId}`;
            const branchExpanded = expandedLayerKeys.has(key);
            const toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "layer-tree-toggle";
            toggle.textContent = branchExpanded ? "−" : "+";
            toggle.setAttribute("aria-expanded", String(branchExpanded));
            toggle.setAttribute("aria-label", `${label} ${branchExpanded ? "zuklappen" : "aufklappen"}`);
            toggle.addEventListener("click", () => toggleLayerExpanded(project.id, expansionId));
            const select = document.createElement("button");
            select.type = "button";
            select.className = "schedule-tree-row class-catalog-browser-branch-label";
            select.textContent = label;
            select.addEventListener("click", onSelect);
            head.append(toggle, select);
            branch.append(head);
            return { branch, branchExpanded };
          };
          ensureSchools(project).forEach((school) => {
            const schoolExpansionId = `classCatalog:school:${school.id}`;
            const schoolBranch = makeBranch(school.name, schoolExpansionId, () => selectClassCatalogSchool(project.id, school.id), "is-school");
            if (schoolBranch.branchExpanded) {
              [
                { id: "classes", label: "Klassen", tab: "classes" },
                { id: "subjects", label: "Fächer", tab: "subjects" }
              ].forEach((category) => {
                const categoryExpansionId = `${schoolExpansionId}:${category.id}`;
                const categoryBranch = makeBranch(category.label, categoryExpansionId, () => selectClassCatalogTarget(project.id, school.id, category.tab), "is-category");
                if (categoryBranch.branchExpanded) {
                  const items = category.id === "classes"
                    ? (catalog.grades || []).filter((grade) => grade.schoolId === school.id)
                      .slice().sort((a, b) => String(a.name).localeCompare(String(b.name), "de", { numeric: true }))
                      .map((grade) => ({ id: grade.id, label: `${grade.name}. Klassenstufe`, type: "grade" }))
                    : (catalog.subjects || []).filter((subject) => subject.schoolId === school.id)
                      .slice().sort((a, b) => a.name.localeCompare(b.name, "de", { sensitivity: "base" }))
                      .map((subject) => ({ id: subject.id, label: subject.name, type: "subject" }));
                  items.forEach((item) => {
                    const leaf = document.createElement("button");
                    leaf.type = "button";
                    leaf.className = `schedule-tree-row class-catalog-browser-leaf${activeClassCatalogTarget?.projectId === project.id && activeClassCatalogTarget?.type === item.type && activeClassCatalogTarget?.id === item.id ? " is-active" : ""}`;
                    leaf.textContent = item.label;
                    leaf.addEventListener("click", () => selectClassCatalogTarget(project.id, school.id, category.tab, item.type, item.id));
                    categoryBranch.branch.append(leaf);
                  });
                }
                schoolBranch.branch.append(categoryBranch.branch);
              });
            }
            layerShell.append(schoolBranch.branch);
          });
        }
        if (isLayerExpanded && layer.id === "schedules") {
          const scheduleLayer = getProjectLayer(project, "schedules");
          const supervisionKey = "schedules:supervisions";
          const supervisionsExpanded = expandedLayerKeys.has(`${project.id}:${supervisionKey}`);
          const supervisionShell = document.createElement("div");
          supervisionShell.className = "schedule-version-tree supervision-tree";
          const supervisionHead = document.createElement("div");
          supervisionHead.className = "schedule-version-tree-head";
          const supervisionToggle = document.createElement("button");
          supervisionToggle.type = "button";
          supervisionToggle.className = "layer-tree-toggle";
          supervisionToggle.textContent = supervisionsExpanded ? "−" : "+";
          supervisionToggle.setAttribute("aria-expanded", String(supervisionsExpanded));
          supervisionToggle.addEventListener("click", () => toggleLayerExpanded(project.id, supervisionKey));
          const supervisionRow = document.createElement("button");
          supervisionRow.type = "button";
          supervisionRow.className = `schedule-tree-row schedule-version-tree-label${project.id === activeProjectId && activeLayerType === "supervisions" ? " is-active" : ""}`;
          supervisionRow.textContent = "Aufsichten";
          supervisionRow.addEventListener("click", () => selectSupervisions(project.id));
          supervisionHead.append(supervisionToggle, supervisionRow, document.createElement("span"));
          supervisionShell.append(supervisionHead);
          if (supervisionsExpanded) {
            ensureSupervisionVersions(project).forEach((version) => {
              const entry = document.createElement("div");
              entry.className = "schedule-tree-entry";
              const versionRow = document.createElement("button");
              versionRow.type = "button";
              versionRow.className = `schedule-tree-row schedule-version-logic${version.id === activeSupervisionVersionId ? " is-active" : ""}`;
              versionRow.textContent = version.name;
              versionRow.addEventListener("click", () => selectSupervisions(project.id, version.id));
              const menuShell = document.createElement("div");
              menuShell.className = "schedule-menu-shell schedule-tree-menu-shell";
              const menuButton = document.createElement("button");
              menuButton.type = "button";
              menuButton.className = "schedule-menu-button schedule-tree-menu-button";
              menuButton.setAttribute("aria-label", `Menü für ${version.name}`);
              menuButton.setAttribute("aria-expanded", "false");
              menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
              const menu = document.createElement("div");
              menu.className = "schedule-menu schedule-tree-menu";
              menu.hidden = true;
              const duplicate = document.createElement("button");
              duplicate.type = "button";
              duplicate.textContent = "Duplizieren";
              duplicate.addEventListener("click", () => duplicateSupervisionVersion(project, version.id));
              const remove = document.createElement("button");
              remove.type = "button";
              remove.className = "schedule-menu-delete";
              remove.textContent = "Löschen";
              remove.dataset.projectId = project.id;
              remove.dataset.supervisionVersionId = version.id;
              remove.setAttribute("aria-label", `${version.name} löschen – gedrückt halten`);
              remove.title = "Zum Löschen gedrückt halten";
              remove.addEventListener("pointerdown", beginScheduleDeleteHold);
              remove.addEventListener("pointerup", finishScheduleDeleteHold);
              remove.addEventListener("pointercancel", cancelScheduleDeleteHold);
              remove.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
              menuButton.addEventListener("click", () => { menu.hidden = !menu.hidden; menuButton.setAttribute("aria-expanded", String(!menu.hidden)); });
              menu.append(duplicate, remove);
              menuShell.append(menuButton, menu);
              entry.append(versionRow, menuShell);
              supervisionShell.append(entry);
            });
          }
          layerShell.append(supervisionShell);
          scheduleLayer.substitutions = Array.isArray(scheduleLayer.substitutions) ? scheduleLayer.substitutions : [];
          const substitutionsShell = document.createElement("div");
          substitutionsShell.className = "schedule-version-tree substitution-tree";
          const substitutionsHead = document.createElement("div");
          substitutionsHead.className = "schedule-version-tree-head";
          const substitutionsSpacer = document.createElement("span");
          substitutionsSpacer.className = "layer-tree-spacer";
          substitutionsSpacer.setAttribute("aria-hidden", "true");
          const substitutionsRow = document.createElement("button");
          substitutionsRow.type = "button";
          substitutionsRow.className = `schedule-tree-row schedule-version-tree-label${project.id === activeProjectId && activeLayerType === "substitutions" ? " is-active" : ""}`;
          substitutionsRow.textContent = "Vertretungen";
          substitutionsRow.addEventListener("click", () => selectSubstitutions(project.id));
          substitutionsHead.append(substitutionsSpacer, substitutionsRow, document.createElement("span"));
          substitutionsShell.append(substitutionsHead);
          layerShell.append(substitutionsShell);
          ensureScheduleVersions(project).forEach((version) => {
            const versionKey = `schedules:version:${version.id}`;
            const versionExpanded = expandedLayerKeys.has(`${project.id}:${versionKey}`);
            const versionShell = document.createElement("div");
            versionShell.className = "schedule-version-tree";
            const versionHead = document.createElement("div");
            versionHead.className = "schedule-version-tree-head";
            const versionToggle = document.createElement("button");
            versionToggle.type = "button";
            versionToggle.className = "layer-tree-toggle";
            versionToggle.textContent = versionExpanded ? "−" : "+";
            versionToggle.setAttribute("aria-expanded", String(versionExpanded));
            versionToggle.addEventListener("click", () => toggleLayerExpanded(project.id, versionKey));
            const versionRow = document.createElement("button");
            versionRow.type = "button";
            versionRow.className = `schedule-tree-row schedule-version-tree-label${project.id === activeProjectId && version.id === activeScheduleVersionId && !activeScheduleId ? " is-active" : ""}`;
            versionRow.textContent = version.name;
            versionRow.addEventListener("click", () => selectScheduleVersion(project.id, version.id));
            const menuShell = document.createElement("div");
            menuShell.className = "schedule-menu-shell schedule-tree-menu-shell";
            const menuButton = document.createElement("button");
            menuButton.type = "button";
            menuButton.className = "schedule-menu-button schedule-tree-menu-button";
            menuButton.setAttribute("aria-label", `Menü für ${version.name}`);
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
            const menu = document.createElement("div");
            menu.className = "schedule-menu schedule-tree-menu";
            menu.hidden = true;
            const duplicate = document.createElement("button");
            duplicate.type = "button";
            duplicate.textContent = "Duplizieren";
            duplicate.addEventListener("click", () => duplicateScheduleVersion(project, version.id));
            const deleteVersion = document.createElement("button");
            deleteVersion.type = "button";
            deleteVersion.className = "schedule-menu-delete";
            deleteVersion.textContent = "Löschen";
            deleteVersion.dataset.projectId = project.id;
            deleteVersion.dataset.scheduleVersionId = version.id;
            deleteVersion.setAttribute("aria-label", `${version.name} löschen – gedrückt halten`);
            deleteVersion.title = "Zum Löschen gedrückt halten";
            deleteVersion.addEventListener("pointerdown", beginScheduleDeleteHold);
            deleteVersion.addEventListener("pointerup", finishScheduleDeleteHold);
            deleteVersion.addEventListener("pointercancel", cancelScheduleDeleteHold);
            deleteVersion.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
            menuButton.addEventListener("click", (event) => {
              event.stopPropagation();
              const shouldOpen = menu.hidden;
              closeCardMenus(shouldOpen ? menuShell : null);
              menu.hidden = !shouldOpen;
              menuButton.setAttribute("aria-expanded", String(shouldOpen));
            });
            menu.append(duplicate, deleteVersion);
            menuShell.append(menuButton, menu);
            versionHead.append(versionToggle, versionRow, menuShell);
            versionShell.append(versionHead);
            if (versionExpanded) {
              scheduleLayer.schedules.filter((schedule) => schedule.versionId === version.id).forEach((schedule) => {
                const scheduleRow = document.createElement("button");
                scheduleRow.type = "button";
                scheduleRow.className = `schedule-tree-row schedule-version-logic${project.id === activeProjectId && schedule.id === activeScheduleId ? " is-active" : ""}`;
                scheduleRow.textContent = schedule.name;
                scheduleRow.addEventListener("click", () => selectSchedule(project.id, schedule.id));
                versionShell.append(scheduleRow);
              });
            }
            layerShell.append(versionShell);
          });
        }
        if (isLayerExpanded && (layer.id === "appointments" || layer.id === "individual")) {
          const appointmentLayer = getProjectLayer(project, layer.id);
          appointmentLayer.groups = Array.isArray(appointmentLayer.groups) ? appointmentLayer.groups : [];
          appointmentLayer.groups.forEach((group) => layerShell.append(createBrowserGroupRow(project, layer.id, group)));
        }
        if (isLayerExpanded && layer.id === "classes") {
          const classProjectLayer = getProjectLayer(project, "classes");
          classProjectLayer.gradeVisibility = classProjectLayer.gradeVisibility && typeof classProjectLayer.gradeVisibility === "object"
            ? classProjectLayer.gradeVisibility
            : {};
          getClassProjectGradeFolders(project).forEach((folder) => {
            const gradeKey = `${project.id}:classes:grade:${folder.gradeName || "unassigned"}`;
            const gradeExpanded = expandedLayerKeys.has(gradeKey);
            const gradeShell = document.createElement("div");
            gradeShell.className = "class-project-browser-folder";
            const gradeHead = document.createElement("div");
            gradeHead.className = "class-project-browser-folder-head";
            const gradeToggle = document.createElement("button");
            gradeToggle.type = "button";
            gradeToggle.className = "layer-tree-toggle";
            gradeToggle.textContent = gradeExpanded ? "−" : "+";
            gradeToggle.setAttribute("aria-expanded", String(gradeExpanded));
            const gradeTitle = folder.gradeName ? `${folder.gradeName}. Klassenstufe` : "Ohne Klassenstufe";
            gradeToggle.setAttribute("aria-label", `${gradeTitle} ${gradeExpanded ? "zuklappen" : "aufklappen"}`);
            gradeToggle.addEventListener("click", () => toggleLayerExpanded(project.id, `classes:grade:${folder.gradeName || "unassigned"}`));
            const gradeLabel = document.createElement("button");
            gradeLabel.type = "button";
            gradeLabel.className = "class-project-browser-grade";
            gradeLabel.textContent = `${gradeTitle} (${folder.entries.length})`;
            gradeLabel.addEventListener("click", () => selectLayer(project.id, "classes"));
            const visibilityKey = folder.gradeName || "unassigned";
            const gradeVisible = classProjectLayer.gradeVisibility[visibilityKey] !== false;
            const visibility = document.createElement("button");
            visibility.type = "button";
            visibility.className = `group-visibility-button${gradeVisible ? "" : " is-hidden"}`;
            visibility.setAttribute("aria-pressed", String(gradeVisible));
            visibility.setAttribute("aria-label", `${gradeTitle} im Kalender ${gradeVisible ? "ausblenden" : "einblenden"}`);
            visibility.title = gradeVisible ? "Im Kalender ausblenden" : "Im Kalender einblenden";
            visibility.innerHTML = "<svg aria-hidden=\"true\" viewBox=\"0 0 24 24\"><path d=\"M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z\"/><circle cx=\"12\" cy=\"12\" r=\"2.8\"/><path class=\"eye-slash\" d=\"M4 4l16 16\"/></svg>";
            visibility.addEventListener("click", () => setClassProjectGradeCalendarVisibility(project, visibilityKey, !gradeVisible));
            gradeHead.append(gradeToggle, gradeLabel, visibility);
            gradeShell.append(gradeHead);
            if (gradeExpanded) {
              folder.entries.forEach((entry) => {
                const projectRow = document.createElement("button");
                projectRow.type = "button";
                projectRow.className = "schedule-tree-row class-project-browser-entry";
                projectRow.textContent = entry.name || "Projekt";
                projectRow.addEventListener("click", () => {
                  activeProjectId = project.id;
                  activeLayerType = "classes";
                  openClassProjectDialog(project, entry);
                });
                gradeShell.append(projectRow);
              });
            }
            layerShell.append(gradeShell);
          });
        }
        layers.append(layerShell);
      });
      card.append(layers);
    }
    return card;
  });
  const cardsByProjectId = new Map(cards.map((card) => [card.dataset.projectId, card]));
  const folderCards = projectFolders.map((folder) => {
    const folderProject = projects.find((project) => project.folderId === folder.id);
    const folderCard = document.createElement("section");
    folderCard.className = `school-year-folder${activeProjectFolderId === folder.id ? " is-active" : ""}`;
    const expanded = expandedProjectFolderIds.has(folder.id);
    const folderHead = document.createElement("div");
    folderHead.className = "school-year-folder-head";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "tree-toggle";
    toggle.textContent = expanded ? "▾" : "▸";
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", `${folder.name} ${expanded ? "zuklappen" : "aufklappen"}`);
    toggle.addEventListener("click", () => {
      if (expanded) expandedProjectFolderIds.delete(folder.id);
      else expandedProjectFolderIds.add(folder.id);
      renderProjectBrowser();
    });
    const icon = document.createElement("span");
    icon.className = "folder-icon school-year-folder-icon";
    icon.setAttribute("aria-hidden", "true");
    const title = document.createElement("button");
    title.type = "button";
    title.className = "school-year-folder-title";
    title.textContent = folder.name;
    title.addEventListener("click", () => selectProjectFolder(folder.id));
    const displayToggle = document.createElement("input");
    displayToggle.type = "checkbox";
    displayToggle.className = "project-display-checkbox";
    displayToggle.checked = Boolean(folderProject && folderProject.id === displayedProjectId);
    displayToggle.disabled = !folderProject;
    displayToggle.setAttribute("aria-label", `${folder.name} im Kalender anzeigen`);
    displayToggle.addEventListener("change", () => {
      if (!folderProject) return;
      if (!displayToggle.checked && folderProject.id === displayedProjectId) displayToggle.checked = true;
      else setDisplayedProject(folderProject.id);
    });
    const menuShell = document.createElement("div");
    menuShell.className = "schedule-menu-shell project-browser-menu";
    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.className = "schedule-menu-button";
    menuButton.setAttribute("aria-label", `Menü für ${folder.name}`);
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = "<span aria-hidden=\"true\"></span>";
    const menu = document.createElement("div");
    menu.className = "schedule-menu";
    menu.hidden = true;
    if (folderProject) {
      const exportJson = document.createElement("button");
      exportJson.type = "button";
      exportJson.textContent = "Exportieren";
      exportJson.addEventListener("click", () => { closeCardMenus(); exportProject(folderProject.id); });
      const exportCalendar = document.createElement("button");
      exportCalendar.type = "button";
      exportCalendar.textContent = "Kalender exportieren";
      exportCalendar.addEventListener("click", () => { closeCardMenus(); openCalendarExportDialog(folderProject.id); });
      const idButton = document.createElement("button");
      idButton.type = "button";
      idButton.textContent = "ID";
      idButton.addEventListener("click", () => { closeCardMenus(); openProjectCalendarIdDialog(folderProject); });
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "schedule-menu-delete";
      deleteButton.textContent = "Projektordner löschen";
      deleteButton.dataset.projectId = folderProject.id;
      deleteButton.dataset.projectFolderId = folderProject.id;
      deleteButton.setAttribute("aria-label", `${folder.name} löschen – gedrückt halten`);
      deleteButton.addEventListener("pointerdown", beginScheduleDeleteHold);
      deleteButton.addEventListener("pointerup", finishScheduleDeleteHold);
      deleteButton.addEventListener("pointercancel", cancelScheduleDeleteHold);
      deleteButton.addEventListener("lostpointercapture", cancelScheduleDeleteHold);
      menu.append(exportJson, exportCalendar, idButton, deleteButton);
    }
    menuButton.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      menuButton.setAttribute("aria-expanded", String(!menu.hidden));
    });
    menuShell.append(menuButton, menu);
    folderHead.append(toggle, icon, title, displayToggle, menuShell);
    folderCard.append(folderHead);
    if (expanded) {
      const children = document.createElement("div");
      children.className = "school-year-folder-projects";
      const folderProjects = projects.filter((project) => project.folderId === folder.id);
      if (folderProjects.length) folderProjects.forEach((project) => children.append(cardsByProjectId.get(project.id)));
      else {
        const empty = document.createElement("p");
        empty.className = "project-browser-empty school-year-folder-empty";
        empty.textContent = "Dieser Projektordner enthält noch keine Kalenderdaten.";
        children.append(empty);
      }
      folderCard.append(children);
    }
    return folderCard;
  });
  projectBrowserList.replaceChildren(...folderCards);
}

function openProjectCalendarIdDialog(project) {
  const dialog = document.createElement("dialog"); dialog.className = "project-dialog project-id-dialog";
  const form = document.createElement("form"); form.method = "dialog";
  const heading = document.createElement("div"); heading.innerHTML = `<span class="label">Schuljahr</span><h2>Kalender-ID</h2>`;
  const note = document.createElement("p"); note.textContent = "Mit dieser ID kann Classroom Screen den zusammengeführten Stundenplan dieses Schuljahres aufrufen.";
  const value = document.createElement("input"); value.type = "text"; value.readOnly = true; value.value = `SP1:${project.id}`;
  const actions = document.createElement("div"); actions.className = "dialog-actions";
  const close = document.createElement("button"); close.type = "submit"; close.className = "secondary-button"; close.textContent = "Schließen";
  const copy = document.createElement("button"); copy.type = "button"; copy.className = "secondary-button primary-action"; copy.textContent = "ID kopieren";
  copy.addEventListener("click", async () => { try { await navigator.clipboard.writeText(value.value); } catch { value.select(); document.execCommand("copy"); } copy.textContent = "Kopiert"; setTimeout(() => { copy.textContent = "ID kopieren"; }, 1400); });
  actions.append(close, copy); form.append(heading, note, value, actions); dialog.append(form); document.body.append(dialog);
  dialog.addEventListener("close", () => dialog.remove(), { once: true }); dialog.showModal(); value.select();
}

function getProjectFolderCalendarRange(folder) {
  const folderProjects = projects.filter((project) => project.folderId === folder.id);
  const ranges = folderProjects.map((project) => getProjectCalendarRange(project));
  const starts = ranges.map((range) => range.startDate).filter(Boolean).sort();
  const ends = ranges.map((range) => range.endDate).filter(Boolean).sort();
  return {
    startDate: folder.calendarRange?.startDate || starts[0] || "",
    endDate: folder.calendarRange?.endDate || ends.at(-1) || ""
  };
}

function renderProjectFolderProperties(folder) {
  detailPanelLabel.textContent = "Projektordner";
  detailPanelTitle.textContent = "Ordnereinstellungen";
  const range = getProjectFolderCalendarRange(folder);
  const sheet = document.createElement("section");
  sheet.className = "project-summary";
  const heading = document.createElement("h3");
  heading.textContent = folder.name;
  const intro = document.createElement("p");
  intro.textContent = "Dieser Haupt-Projektordner repräsentiert ein Schuljahr. Klassen, Kurse und Termine gelten gemeinsam; nur die Stundenpläne werden als zeitlich gültige Versionen geführt.";
  const form = document.createElement("form");
  form.className = "property-section";
  const nameRow = document.createElement("label");
  nameRow.className = "property-row";
  nameRow.innerHTML = "<span>Projekttitel</span>";
  const name = document.createElement("input");
  name.required = true;
  name.maxLength = 100;
  name.value = folder.name;
  nameRow.append(name);
  const rangeTitle = document.createElement("h3");
  rangeTitle.textContent = "Kalenderrahmen";
  const rangeRow = document.createElement("div");
  rangeRow.className = "property-row project-school-year-row";
  const rangeLabel = document.createElement("span");
  rangeLabel.textContent = "Gesamtzeitraum";
  const fields = document.createElement("div");
  fields.className = "project-school-year-fields";
  const fromLabel = document.createElement("label");
  fromLabel.textContent = "von";
  const from = document.createElement("input");
  from.type = "date";
  from.value = range.startDate;
  fromLabel.append(from);
  const untilLabel = document.createElement("label");
  untilLabel.textContent = "bis";
  const until = document.createElement("input");
  until.type = "date";
  until.value = range.endDate;
  untilLabel.append(until);
  fields.append(fromLabel, untilLabel);
  rangeRow.append(rangeLabel, fields);
  const status = document.createElement("p");
  status.className = "property-status";
  let saveTimer = null;
  const save = () => {
    const title = name.value.trim();
    if (!title || (from.value && until.value && until.value < from.value)) {
      status.className = "property-status is-error";
      status.textContent = "Bitte Projekttitel und Kalenderrahmen gültig angeben.";
      return;
    }
    folder.name = title;
    folder.calendarRange = { startDate: from.value, endDate: until.value };
    const project = projects.find((entry) => entry.folderId === folder.id);
    if (project) {
      project.name = title;
      project.calendarRange = { startDate: from.value, endDate: until.value, manuallyAdjusted: true };
      project.periods = project.periods || {};
      project.periods.schoolYear = { startDate: from.value, endDate: until.value, source: "project-folder" };
    }
    saveProjects();
    heading.textContent = folder.name;
    status.className = "property-status is-success";
    status.textContent = "Automatisch gespeichert ✓";
    renderProjectBrowser();
  };
  const scheduleSave = () => {
    clearTimeout(saveTimer);
    status.className = "property-status";
    status.textContent = "Wird gespeichert …";
    saveTimer = setTimeout(save, 400);
  };
  form.addEventListener("input", scheduleSave);
  form.addEventListener("change", scheduleSave);
  form.addEventListener("submit", (event) => event.preventDefault());
  form.append(nameRow, rangeTitle, rangeRow, status);
  sheet.append(heading, intro, form);
  projectDetail.replaceChildren(sheet);
}

function renderProjectDetail() {
  const activeFolder = projectFolders.find((folder) => folder.id === activeProjectFolderId);
  if (activeFolder) {
    renderProjectFolderProperties(activeFolder);
    return;
  }
  const project = projects.find((entry) => entry.id === activeProjectId);
  if (!project) {
    detailPanelLabel.textContent = "Einstellungen";
    detailPanelTitle.textContent = "Stundenplan";
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Wählen Sie links ein Schuljahr aus oder legen Sie zunächst einen Projektordner an.";
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
    activeLayerType = "appointments";
    renderProjectBrowser();
    renderAppointmentsProperties(project);
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

  if (activeLayerType === "substitutions") {
    renderSubstitutionsProperties(project);
    return;
  }

  if (activeLayerType === "supervisions") {
    renderSupervisionsProperties(project);
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
  detailPanelLabel.textContent = "Schuljahr";
  detailPanelTitle.textContent = "Schuljahreseinstellungen";
  const schools = ensureSchools(project);
  const automaticStarts = schools.map((school) => school.periods.schoolYear.startDate).filter(Boolean).sort();
  const automaticEnds = schools.map((school) => school.periods.schoolYear.endDate).filter(Boolean).sort();
  const range = getProjectCalendarRange(project);
  const sheet = document.createElement("section");
  sheet.className = "project-summary";
  const heading = document.createElement("h3");
  heading.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Hier legen Sie fest, von wann bis wann dieses Schuljahr gültig ist. Der übergreifende Kalenderrahmen wird im Hauptordner gepflegt.";
  const form = document.createElement("form");
  form.className = "property-section";
  const nameRow = document.createElement("label");
  nameRow.className = "property-row";
  nameRow.innerHTML = "<span>Bezeichnung des Schuljahres</span>";
  const name = document.createElement("input");
  name.required = true;
  name.maxLength = 100;
  name.value = project.name;
  nameRow.append(name);
  const rangeTitle = document.createElement("h3");
  rangeTitle.textContent = "Gültigkeit";
  const rangeNote = document.createElement("p");
  rangeNote.className = "project-period-intro";
  rangeNote.textContent = automaticStarts.length
    ? `Aus allen Schulen ermittelt: ${formatGermanDate(automaticStarts[0])}–${formatGermanDate(automaticEnds.at(-1))}. Die Grenzen können hier abweichend festgelegt werden.`
    : "Sobald Schulen angelegt sind, wird hier deren größtmögliche gemeinsame Zeitspanne vorgeschlagen.";
  const rangeRow = document.createElement("div");
  rangeRow.className = "property-row project-school-year-row";
  const rangeLabel = document.createElement("span");
  rangeLabel.textContent = "Schuljahr gültig";
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
      status.textContent = "Bitte Bezeichnung und Gültigkeit des Schuljahres vollständig und gültig angeben.";
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
  const catalog = getClassCatalogData(project);
  const groups = new Map();
  const gradeGroups = new Map();
  (catalog.grades || []).forEach((grade) => {
      const schoolId = grade.schoolId || "";
      const gradeName = String(grade.name || "").trim();
      const gradeKey = `${schoolId}|grade|${gradeName.toLocaleLowerCase("de")}`;
      const gradeGroup = gradeGroups.get(gradeKey) || {
        key: gradeKey,
        name: `Klassenstufe ${gradeName}`,
        gradeName,
        targetType: "grade",
        schoolId,
        schoolName: getSchool(project, schoolId)?.name || "Schule",
        classIds: [],
        subjects: []
      };
      (grade.classes || []).forEach((classEntry) => {
        const name = String(classEntry.name || "").trim();
        if (!name) return;
        if (classEntry.id && !gradeGroup.classIds.includes(classEntry.id)) gradeGroup.classIds.push(classEntry.id);
        const key = `${schoolId}|class|${name.toLocaleLowerCase("de")}`;
        const group = groups.get(key) || {
          key,
          name,
          gradeName,
          suffix: classEntry.suffix || "",
          displayMode: classEntry.displayMode || "normal",
          targetType: "class",
          schoolId,
          schoolName: getSchool(project, schoolId)?.name || "Schule",
          classIds: [],
          subjects: []
        };
        if (classEntry.id && !group.classIds.includes(classEntry.id)) group.classIds.push(classEntry.id);
        groups.set(key, group);
      });
      if (gradeName && gradeGroup.classIds.length) gradeGroups.set(gradeKey, gradeGroup);
  });
  const courseGroups = (catalog.subjects || []).flatMap((subject) => (subject.courses || []).map((course) => ({
    key: `${subject.schoolId || ""}|course|${course.id}`,
    name: course.name,
    targetType: "course",
    courseId: course.id,
    subjectId: subject.id,
    subjectName: subject.name,
    schoolId: subject.schoolId || "",
    schoolName: getSchool(project, subject.schoolId)?.name || "Schule",
    classIds: [...new Set(course.classIds || [])],
    gradeNames: (catalog.grades || [])
      .filter((grade) => (grade.classes || []).some((classEntry) => (course.classIds || []).includes(classEntry.id)))
      .map((grade) => String(grade.name)),
    subjects: [subject.name]
  })));
  return [...gradeGroups.values(), ...groups.values(), ...courseGroups].sort((a, b) => (
    a.schoolName.localeCompare(b.schoolName, "de", { sensitivity: "base" })
    || ({ grade: 0, class: 1, course: 2 }[a.targetType] - { grade: 0, class: 1, course: 2 }[b.targetType])
    || a.name.localeCompare(b.name, "de", { numeric: true, sensitivity: "base" })
  ));
}

function renderClassTargetSummary(container, classGroups, selectedKeys) {
  const selected = selectedKeys.map((key) => classGroups.find((group) => group.key === key)).filter(Boolean);
  if (!selected.length) {
    const empty = document.createElement("span");
    empty.className = "empty-state";
    empty.textContent = "Noch keine Klasse, Klassenstufe oder Kurs ausgewählt.";
    container.replaceChildren(empty);
    return;
  }
  container.replaceChildren(...selected.map((group) => {
    const chip = document.createElement("span");
    chip.className = `class-project-target-chip is-${group.targetType}`;
    chip.append(document.createTextNode(group.targetType === "course"
      ? `${group.schoolName} · ${group.subjectName} · `
      : `${group.schoolName} · `));
    const classLabel = document.createElement("span");
    if (group.targetType === "class" && group.gradeName) renderClassDisplay(classLabel, group.gradeName, group.suffix, group.displayMode);
    else classLabel.textContent = group.name;
    chip.append(classLabel);
    return chip;
  }));
}

function openClassTargetPicker(project, selectedKeys, onApply, contextLabel = "Termine") {
  const classGroups = getConfiguredClassGroups(project);
  const pickerDialog = document.createElement("dialog");
  pickerDialog.className = "project-dialog class-target-picker-dialog";
  const pickerForm = document.createElement("form");
  pickerForm.method = "dialog";
  const pickerHeading = document.createElement("div");
  pickerHeading.innerHTML = `<span class="label">${contextLabel}</span><h2>Klassen auswählen</h2>`;
  const pickerIntro = document.createElement("p");
  pickerIntro.className = "dialog-intro";
  pickerIntro.textContent = "Wählen Sie beliebig viele Klassenstufen, Einzelklassen und Kurse aus.";
  const choices = document.createElement("div");
  choices.className = "class-target-checkbox-list";
  classGroups.forEach((group) => {
    const choice = document.createElement("label");
    choice.className = `class-target-checkbox is-${group.targetType}`;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = group.key;
    checkbox.checked = selectedKeys.includes(group.key);
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    if (group.targetType === "class" && group.gradeName) renderClassDisplay(name, group.gradeName, group.suffix, group.displayMode);
    else name.textContent = group.name;
    const school = document.createElement("small");
    school.textContent = group.targetType === "course" ? `${group.subjectName} · ${group.schoolName}` : group.schoolName;
    copy.append(name, school);
    choice.append(checkbox, copy);
    choices.append(choice);
  });
  if (!classGroups.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Es sind noch keine Klassen eingerichtet.";
    choices.append(empty);
  }
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "secondary-button";
  cancel.textContent = "Abbrechen";
  cancel.addEventListener("click", () => pickerDialog.close());
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "secondary-button primary-action";
  submit.textContent = "Auswahl übernehmen";
  pickerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    onApply([...choices.querySelectorAll("input:checked")].map((checkbox) => checkbox.value), classGroups);
    pickerDialog.close();
  });
  pickerDialog.addEventListener("close", () => pickerDialog.remove(), { once: true });
  actions.append(cancel, submit);
  pickerForm.append(pickerHeading, pickerIntro, choices, actions);
  pickerDialog.append(pickerForm);
  document.body.append(pickerDialog);
  pickerDialog.showModal();
}

function getStoredClassTargetKeys(project, entry) {
  const classGroups = getConfiguredClassGroups(project);
  const storedTargets = entry?.classGroups || [];
  if (storedTargets.length) return storedTargets.map((stored) => {
    if (classGroups.some((group) => group.key === stored.key)) return stored.key;
    return classGroups.find((group) => (
      group.targetType === (stored.targetType || "class")
      && ((stored.classIds || []).some((id) => group.classIds.includes(id)) || group.name === stored.className)
    ))?.key;
  }).filter(Boolean);
  return classGroups
    .filter((group) => group.targetType === "class" && (entry?.classIds || []).some((id) => group.classIds.includes(id)))
    .map((group) => group.key);
}

function getSerializedClassTargets(project, selectedKeys) {
  const classGroups = getConfiguredClassGroups(project);
  const selected = selectedKeys.map((key) => classGroups.find((group) => group.key === key)).filter(Boolean);
  return {
    classGroups: selected.map((group) => ({
      key: group.key,
      targetType: group.targetType,
      schoolId: group.schoolId,
      schoolName: group.schoolName,
      className: group.name,
      gradeName: group.gradeName || "",
      gradeNames: [...(group.gradeNames || [])],
      suffix: group.suffix || "",
      displayMode: group.displayMode || "normal",
      classIds: [...group.classIds],
      courseId: group.courseId || "",
      subjectId: group.subjectId || "",
      subjectName: group.subjectName || ""
    })),
    classIds: [...new Set(selected.flatMap((group) => group.classIds))],
    classNames: selected.map((group) => group.name),
    schoolIds: [...new Set(selected.map((group) => group.schoolId).filter(Boolean))]
  };
}

function getClassProjectGradeNames(entry) {
  const grades = new Set();
  (entry.classGroups || []).forEach((group) => {
    if (group.targetType === "grade" && group.gradeName) grades.add(String(group.gradeName));
    else if (group.targetType === "course") (group.gradeNames || []).forEach((gradeName) => grades.add(String(gradeName)));
    else {
      const match = String(group.className || "").trim().match(/^\d+/);
      if (match) grades.add(match[0]);
    }
  });
  (entry.classNames || []).forEach((name) => {
    const match = String(name).trim().match(/^\d+/);
    if (match) grades.add(match[0]);
  });
  return grades.size ? [...grades] : [""];
}

function isClassProjectCalendarVisible(project, entry) {
  if (entry?.calendarVisible === false) return false;
  const layer = project?.layers?.find((candidate) => candidate.type === "classes");
  const gradeNames = getClassProjectGradeNames(entry);
  return gradeNames.some((gradeName) => layer?.gradeVisibility?.[gradeName || "unassigned"] !== false);
}

function getClassProjectGradeFolders(project) {
  const layer = getProjectLayer(project, "classes");
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const folders = new Map();
  layer.entries.forEach((entry) => {
    getClassProjectGradeNames(entry).forEach((gradeName) => {
      const folder = folders.get(gradeName) || { gradeName, entries: [] };
      folder.entries.push(entry);
      folders.set(gradeName, folder);
    });
  });
  return [...folders.values()].sort((a, b) => {
    if (!a.gradeName) return 1;
    if (!b.gradeName) return -1;
    return a.gradeName.localeCompare(b.gradeName, "de", { numeric: true });
  });
}

function openClassProjectDialog(project, entry = null) {
  const classGroups = getConfiguredClassGroups(project);
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
  linkDateRangePicker(start, end);

  const storedTargets = entry?.classGroups || [];
  const selectedKeys = storedTargets.length
    ? storedTargets.map((stored) => {
      if (classGroups.some((group) => group.key === stored.key)) return stored.key;
      return classGroups.find((group) => (
        group.targetType === (stored.targetType || "class")
        && ((stored.classIds || []).some((id) => group.classIds.includes(id))
          || group.name === stored.className)
      ))?.key;
    }).filter(Boolean)
    : classGroups.filter((group) => group.targetType === "class" && (entry?.classIds || []).some((id) => group.classIds.includes(id))).map((group) => group.key);
  const classSection = document.createElement("fieldset"); classSection.className = "class-project-class-picker";
  const classLegend = document.createElement("legend"); classLegend.textContent = "Beteiligte Klassen, Klassenstufen oder Kurse";
  const selectedSummary = document.createElement("div"); selectedSummary.className = "class-project-selected-targets";
  const renderSelectedSummary = () => {
    const selected = selectedKeys.map((key) => classGroups.find((group) => group.key === key)).filter(Boolean);
    if (!selected.length) {
      const empty = document.createElement("span");
      empty.className = "empty-state";
      empty.textContent = "Noch keine Klasse oder Klassenstufe ausgewählt.";
      selectedSummary.replaceChildren(empty);
      return;
    }
    selectedSummary.replaceChildren(...selected.map((group) => {
      const chip = document.createElement("span");
      chip.className = `class-project-target-chip is-${group.targetType}`;
      chip.append(document.createTextNode(`${group.schoolName} · `));
      const classLabel = document.createElement("span");
      if (group.targetType === "class" && group.gradeName) renderClassDisplay(classLabel, group.gradeName, group.suffix, group.displayMode);
      else classLabel.textContent = group.name;
      chip.append(classLabel);
      return chip;
    }));
  };
  const openTargetPicker = () => {
    const pickerDialog = document.createElement("dialog");
    pickerDialog.className = "project-dialog class-target-picker-dialog";
    const pickerForm = document.createElement("form");
    pickerForm.method = "dialog";
    const pickerHeading = document.createElement("div");
    pickerHeading.innerHTML = "<span class=\"label\">Projekttage nach Klassen</span><h2>Klassen auswählen</h2>";
    const pickerIntro = document.createElement("p");
    pickerIntro.className = "dialog-intro";
    pickerIntro.textContent = "Wählen Sie beliebig viele Klassenstufen, Einzelklassen und Kurse aus.";
    const choices = document.createElement("div");
    choices.className = "class-target-checkbox-list";
    classGroups.forEach((group) => {
      const choice = document.createElement("label");
      choice.className = `class-target-checkbox is-${group.targetType}`;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = group.key;
      checkbox.checked = selectedKeys.includes(group.key);
      const copy = document.createElement("span");
      const name = document.createElement("strong");
      if (group.targetType === "class" && group.gradeName) renderClassDisplay(name, group.gradeName, group.suffix, group.displayMode);
      else name.textContent = group.name;
      const school = document.createElement("small");
      school.textContent = group.targetType === "course" ? `${group.subjectName} · ${group.schoolName}` : group.schoolName;
      copy.append(name, school);
      choice.append(checkbox, copy);
      choices.append(choice);
    });
    if (!classGroups.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Es sind noch keine Klassen eingerichtet.";
      choices.append(empty);
    }
    const pickerActions = document.createElement("div");
    pickerActions.className = "dialog-actions";
    const pickerCancel = document.createElement("button");
    pickerCancel.type = "button";
    pickerCancel.className = "secondary-button";
    pickerCancel.textContent = "Abbrechen";
    pickerCancel.addEventListener("click", () => pickerDialog.close());
    const pickerSubmit = document.createElement("button");
    pickerSubmit.type = "submit";
    pickerSubmit.className = "secondary-button primary-action";
    pickerSubmit.textContent = "Auswahl übernehmen";
    pickerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      selectedKeys.splice(0, selectedKeys.length, ...[...choices.querySelectorAll("input:checked")].map((checkbox) => checkbox.value));
      renderSelectedSummary();
      pickerDialog.close();
    });
    pickerDialog.addEventListener("close", () => pickerDialog.remove(), { once: true });
    pickerActions.append(pickerCancel, pickerSubmit);
    pickerForm.append(pickerHeading, pickerIntro, choices, pickerActions);
    pickerDialog.append(pickerForm);
    document.body.append(pickerDialog);
    pickerDialog.showModal();
  };
  const chooseTargets = document.createElement("button");
  chooseTargets.type = "button";
  chooseTargets.className = "secondary-button";
  chooseTargets.textContent = "Klassen und Klassenstufen auswählen";
  chooseTargets.addEventListener("click", openTargetPicker);
  renderSelectedSummary();
  classSection.append(classLegend, selectedSummary, chooseTargets);

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
      times.hidden = allDay;
    });
    durationChoice.append(button);
  });
  duration.append(durationLegend, durationChoice);
  times.append(makeField("Zeit von", timeStart), makeField("bis", timeEnd));
  const overridesLessonsLabel = document.createElement("label"); overridesLessonsLabel.className = "dialog-checkbox";
  const overridesLessons = document.createElement("input"); overridesLessons.type = "checkbox"; overridesLessons.checked = entry?.overridesLessons !== false;
  const overridesLessonsCopy = document.createElement("span"); overridesLessonsCopy.textContent = "Der reguläre Unterricht der Klasse fällt für diesen Zeitraum aus.";
  overridesLessonsLabel.append(overridesLessons, overridesLessonsCopy);
  const calendarVisibleLabel = document.createElement("label"); calendarVisibleLabel.className = "dialog-checkbox";
  const calendarVisible = document.createElement("input"); calendarVisible.type = "checkbox"; calendarVisible.checked = entry?.calendarVisible !== false;
  const calendarVisibleCopy = document.createElement("span"); calendarVisibleCopy.textContent = "Dieser Projekttag soll im Kalender dargestellt werden.";
  calendarVisibleLabel.append(calendarVisible, calendarVisibleCopy);
  fields.append(makeField("Titel", name), dates, classSection, duration, times, overridesLessonsLabel, calendarVisibleLabel);

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
    const hasOnlyOneTime = !allDay && Boolean(timeStart.value) !== Boolean(timeEnd.value);
    if (end.value < start.value || hasOnlyOneTime || (!allDay && timeStart.value && timeEnd.value <= timeStart.value)) {
      status.textContent = end.value < start.value
        ? "Das Enddatum darf nicht vor dem Anfangsdatum liegen."
        : hasOnlyOneTime
          ? "Beginn und Ende bitte entweder gemeinsam eintragen oder beide offenlassen."
          : "Das Ende muss nach dem Beginn liegen.";
      return;
    }
    const chosenGroups = selectedKeys.map((key) => classGroups.find((group) => group.key === key)).filter(Boolean);
    const values = {
      type: "class-project", name: name.value.trim(),
      classGroups: chosenGroups.map((group) => ({ key: group.key, targetType: group.targetType, schoolId: group.schoolId, schoolName: group.schoolName, className: group.name, gradeName: group.gradeName || "", gradeNames: [...(group.gradeNames || [])], suffix: group.suffix || "", displayMode: group.displayMode || "normal", classIds: [...group.classIds], courseId: group.courseId || "", subjectId: group.subjectId || "", subjectName: group.subjectName || "" })),
      classIds: [...new Set(chosenGroups.flatMap((group) => group.classIds))],
      classNames: chosenGroups.map((group) => group.name),
      schoolIds: [...new Set(chosenGroups.map((group) => group.schoolId).filter(Boolean))],
      startDate: start.value, endDate: end.value, allDay,
      startTime: allDay ? "" : timeStart.value, endTime: allDay ? "" : timeEnd.value,
      overridesLessons: overridesLessons.checked,
      calendarVisible: calendarVisible.checked,
      color: "#e6d8a8"
    };
    const layer = getProjectLayer(project, "classes"); layer.entries = layer.entries || [];
    if (entry) Object.assign(entry, values); else layer.entries.push({ id: globalThis.crypto?.randomUUID?.() ?? `class-project-${Date.now()}`, ...values });
    saveProjects(); dialog.close(); renderProjectBrowser(); renderClassProjectsIntroduction(project); renderActiveCalendar(project);
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
  add.disabled = false; add.addEventListener("click", () => openClassProjectDialog(project));
  const list = document.createElement("div"); list.className = "class-project-entry-list class-project-overview-list";
  layer.entries.forEach((entry) => {
    const selectedGroups = entry.classGroups?.length
      ? entry.classGroups
      : classGroups.filter((group) => (entry.classIds || []).some((id) => group.classIds.includes(id)));
    entry.classGroups = selectedGroups.map((group) => ({
      key: group.key,
      targetType: group.targetType || "class",
      schoolId: group.schoolId,
      schoolName: group.schoolName || getSchool(project, group.schoolId)?.name || "Schule",
      className: group.className || group.name,
      gradeName: group.gradeName || "",
      gradeNames: [...(group.gradeNames || [])],
      suffix: group.suffix || "",
      displayMode: group.displayMode || "normal",
      classIds: [...group.classIds],
      courseId: group.courseId || "",
      subjectId: group.subjectId || "",
      subjectName: group.subjectName || ""
    }));
    entry.classIds = [...new Set(entry.classGroups.flatMap((group) => group.classIds))];
    entry.schoolIds = [...new Set(entry.classGroups.map((group) => group.schoolId).filter(Boolean))];
  });
  getClassProjectGradeFolders(project).forEach((folder) => {
    const folderSection = document.createElement("section");
    folderSection.className = "class-project-grade-section";
    const folderHeading = document.createElement("div");
    folderHeading.className = "class-project-grade-heading";
    const folderTitle = document.createElement("h3");
    folderTitle.textContent = folder.gradeName ? `${folder.gradeName}. Klassenstufe` : "Ohne Klassenstufe";
    const folderSchools = document.createElement("span");
    const schoolNames = [...new Set(folder.entries.flatMap((entry) => (entry.classGroups || [])
      .filter((group) => !folder.gradeName
        || group.gradeName === folder.gradeName
        || (group.gradeNames || []).includes(folder.gradeName))
      .map((group) => group.schoolName)
      .filter(Boolean)))];
    folderSchools.textContent = schoolNames.join(", ");
    folderHeading.append(folderTitle, folderSchools);
    const folderEntries = document.createElement("div");
    folderEntries.className = "class-project-grade-entries";
    folder.entries.forEach((entry) => {
      const row = document.createElement("button"); row.type = "button"; row.className = "holiday-entry class-project-summary class-project-overview-row";
      const name = document.createElement("strong"); name.textContent = entry.name || "Projekt";
      const classes = document.createElement("span");
      const visibleGroups = (entry.classGroups || []).filter((group) => !folder.gradeName
        || group.gradeName === folder.gradeName
        || (group.gradeNames || []).includes(folder.gradeName));
      if (!visibleGroups.length) classes.textContent = "Keine Klasse";
      else visibleGroups.forEach((group, index) => {
        if (index) classes.append(document.createTextNode(", "));
        const label = document.createElement("span");
        if (group.targetType === "class" && group.gradeName) renderClassDisplay(label, group.gradeName, group.suffix, group.displayMode);
        else label.textContent = group.className;
        classes.append(label);
      });
      const dates = document.createElement("span");
      dates.textContent = !entry.startDate || !entry.endDate
        ? "Datum noch nicht vollständig"
        : entry.startDate === entry.endDate ? formatGermanDate(entry.startDate) : `${formatGermanDate(entry.startDate)}–${formatGermanDate(entry.endDate)}`;
      const time = document.createElement("span"); time.textContent = entry.allDay !== false ? "ganztägig" : `${entry.startTime || "–"}–${entry.endTime || "–"}`;
      row.append(name, classes, dates, time); row.addEventListener("click", () => openClassProjectDialog(project, entry)); folderEntries.append(row);
    });
    folderSection.append(folderHeading, folderEntries);
    list.append(folderSection);
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

function openAppointmentDialog(project, group, appointment = null, layerType = "appointments", appointmentProject = null) {
  appointmentForm.reset();
  appointmentDialogStatus.textContent = "";
  appointmentDialog.dataset.projectId = project.id;
  appointmentDialog.dataset.groupId = group?.id || "";
  appointmentDialog.dataset.layerType = layerType;
  appointmentDialog.dataset.appointmentProjectId = appointmentProject?.id || "";
  appointmentDialog.dataset.ungrouped = String(!group);
  populateAppointmentAssignmentSelect(appointmentAssignment, project, layerType, group?.id || null, appointmentProject?.id || null, false, true);
  const isSchoolAppointment = layerType === "appointments";
  appointmentRoomField.hidden = !isSchoolAppointment;
  appointmentClassSection.hidden = !isSchoolAppointment;
  appointmentOverridesClassLessonsField.hidden = !isSchoolAppointment;
  appointmentSelectedClassKeys = isSchoolAppointment ? getStoredClassTargetKeys(project, appointment) : [];
  renderClassTargetSummary(appointmentClassSummary, getConfiguredClassGroups(project), appointmentSelectedClassKeys);
  appointmentOverridesClassLessons.disabled = !appointmentSelectedClassKeys.length;
  if (appointment) {
    appointmentDialog.dataset.appointmentId = appointment.id;
    appointmentDialogTitle.textContent = "Termin bearbeiten";
    appointmentSubmitButton.textContent = "Änderungen speichern";
    appointmentName.value = appointment.name || "";
    appointmentRoom.value = isSchoolAppointment ? (appointment.room || "") : "";
    appointmentStartDate.value = getAppointmentStartDate(appointment);
    appointmentEndDate.value = getAppointmentEndDate(appointment);
    appointmentStartTime.value = appointment.startTime || "";
    appointmentEndTime.value = appointment.endTime || "";
    appointmentIsDeadline.checked = Boolean(appointment.isDeadline);
    appointmentOverridesClassLessons.checked = isSchoolAppointment && Boolean(appointment.overridesClassLessons);
    appointmentOverridesLessons.checked = Boolean(appointment.overridesLessons);
    appointmentCalendarVisible.checked = appointment.calendarVisible !== false;
  } else {
    delete appointmentDialog.dataset.appointmentId;
    appointmentDialogTitle.textContent = "Termin hinzufügen";
    appointmentSubmitButton.textContent = "Termin hinzufügen";
    appointmentCalendarVisible.checked = true;
    appointmentOverridesClassLessons.checked = false;
    appointmentRoom.value = "";
  }
  linkDateRangePicker(appointmentStartDate, appointmentEndDate);
  appointmentEndDate.min = appointmentStartDate.value;
  appointmentDialog.showModal();
  appointmentName.focus();
}

function openAppointmentProjectDialog(project, group, appointmentProject = null, layerType = "appointments") {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog appointment-project-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  const label = document.createElement("span");
  label.className = "label";
  label.textContent = group.name;
  const title = document.createElement("h2");
  title.textContent = appointmentProject ? "Projektgruppe bearbeiten" : "Projektgruppe hinzufügen";
  heading.append(label, title);
  const field = document.createElement("label");
  field.className = "dialog-field";
  const fieldLabel = document.createElement("span");
  fieldLabel.textContent = "Bezeichnung";
  const input = document.createElement("input");
  input.type = "text";
  input.required = true;
  input.maxLength = 100;
  input.placeholder = "z. B. Projekt Abi";
  input.value = appointmentProject?.name || "";
  field.append(fieldLabel, input);
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
  submit.textContent = appointmentProject ? "Änderungen speichern" : "Projektgruppe hinzufügen";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (!name) return;
    group.projects = Array.isArray(group.projects) ? group.projects : [];
    if (appointmentProject) appointmentProject.name = name;
    else group.projects.push({ id: globalThis.crypto?.randomUUID?.() ?? `appointment-project-${Date.now()}`, name, appointments: [], todos: [] });
    saveProjects();
    dialog.close();
    if (layerType === "individual") renderIndividualProjectsProperties(project);
    else renderAppointmentsProperties(project);
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, field, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
  input.focus();
}

function createAppointmentMenu(project, group, appointment = null, layerType = "appointments", appointmentProject = null) {
  const menuShell = document.createElement("div");
  menuShell.className = "schedule-menu-shell";
  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "schedule-menu-button";
  menuButton.setAttribute("aria-label", `Menü für ${appointment?.name || appointmentProject?.name || group.name}`);
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
    if (appointment) openAppointmentDialog(project, group, appointment, layerType, appointmentProject);
    else if (appointmentProject) openAppointmentProjectDialog(project, group, appointmentProject, layerType);
    else openAppointmentGroupDialog(project, group, layerType);
  });
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "schedule-menu-delete";
  deleteButton.textContent = "Löschen";
  deleteButton.dataset.projectId = project.id;
  deleteButton.dataset.appointmentGroupId = group.id;
  deleteButton.dataset.appointmentLayerType = layerType;
  if (appointmentProject) deleteButton.dataset.appointmentProjectId = appointmentProject.id;
  if (appointment) deleteButton.dataset.appointmentId = appointment.id;
  deleteButton.setAttribute("aria-label", `${appointment?.name || appointmentProject?.name || group.name} löschen – gedrückt halten`);
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

function createMovedProjectSection(project, type, titleText, buttonText, emptyText, options = {}) {
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
    else if (type === "school-project") openAppointmentDialog(project, null, null, "appointments");
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
      const assignedClasses = (entry.classNames || []).join(", ") || entry.className;
      if (assignedClasses) {
        const classLabel = document.createElement("span");
        classLabel.textContent = `Klasse ${assignedClasses}`;
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
        else if (type === "school-project") openAppointmentDialog(project, null, entry, "appointments");
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
  if (options.hideWhenEmpty && !entries.length) section.hidden = true;
  if (!options.hideTitle) section.append(title);
  if (!options.hideAddButton) section.append(addButton);
  section.append(list);
  return section;
}

function createAppointmentEntryRow(project, group, appointment, layerType, appointmentProject = null) {
  const row = document.createElement("article");
  row.draggable = true;
  row.dataset.appointmentId = appointment.id;
  row.setAttribute("aria-roledescription", "verschiebbarer Termin");
  row.title = "Ziehen, um den Termin einer anderen Gruppe oder Projektgruppe zuzuordnen";
  row.addEventListener("dragstart", (event) => {
    draggedAppointmentContext = {
      projectId: project.id,
      layerType,
      sourceGroupId: group.id,
      sourceProjectId: appointmentProject?.id || null,
      appointmentId: appointment.id
    };
    row.classList.add("is-moving");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", appointment.id);
  });
  row.addEventListener("dragend", () => {
    row.classList.remove("is-moving");
    draggedAppointmentContext = null;
    document.querySelectorAll(".appointment-drop-target.is-drop-target").forEach((target) => target.classList.remove("is-drop-target"));
  });
  if (appointment.isDeadline) {
    row.className = `appointment-entry appointment-todo-entry${appointment.completed ? " is-completed" : ""}`;
    const checkLabel = document.createElement("label");
    checkLabel.className = "appointment-todo-check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(appointment.completed);
    checkbox.setAttribute("aria-label", `${appointment.name} als erledigt markieren`);
    checkbox.addEventListener("change", () => {
      appointment.completed = checkbox.checked;
      row.classList.toggle("is-completed", appointment.completed);
      saveProjects();
    });
    const copy = document.createElement("span");
    copy.className = "appointment-todo-copy";
    const name = document.createElement("strong");
    name.textContent = appointment.name;
    const deadline = document.createElement("small");
    const dueDate = getAppointmentEndDate(appointment);
    deadline.textContent = dueDate ? `Ablaufdatum: ${formatGermanDate(dueDate)}` : "Ablaufdatum noch offen";
    copy.append(name, deadline);
    if ((appointment.classNames || []).length) {
      const classes = document.createElement("small");
      classes.textContent = `Klassen: ${appointment.classNames.join(", ")}`;
      copy.append(classes);
    }
    checkLabel.append(checkbox, copy);
    row.append(checkLabel, createAppointmentMenu(project, group, appointment, layerType, appointmentProject));
    return row;
  }
  row.className = "appointment-entry";
  const copy = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = appointment.name;
  const date = document.createElement("span");
  date.textContent = appointment.startTime && appointment.endTime
    ? `${formatAppointmentDateRange(appointment)} · ${appointment.startTime}–${appointment.endTime}`
    : `${formatAppointmentDateRange(appointment)} · Zeit noch offen`;
  copy.append(name, date);
  if ((appointment.classNames || []).length) {
    const classes = document.createElement("span");
    classes.textContent = `Klassen: ${appointment.classNames.join(", ")}`;
    copy.append(classes);
  }
  row.append(copy, createAppointmentMenu(project, group, appointment, layerType, appointmentProject));
  return row;
}

function populateAppointmentAssignmentSelect(select, project, layerType, groupId, appointmentProjectId = null, projectsOnly = false, includeUngrouped = false) {
  const layer = getProjectLayer(project, layerType);
  select.replaceChildren();
  if (includeUngrouped) {
    const ungrouped = document.createElement("option");
    ungrouped.value = "::";
    ungrouped.textContent = "Keine Gruppe";
    select.append(ungrouped);
  }
  (Array.isArray(layer.groups) ? layer.groups : []).forEach((candidateGroup) => {
    if (!projectsOnly) {
      const groupOption = document.createElement("option");
      groupOption.value = `${candidateGroup.id}::`;
      groupOption.textContent = `Gruppe: ${candidateGroup.name}`;
      select.append(groupOption);
    }
    (Array.isArray(candidateGroup.projects) ? candidateGroup.projects : []).forEach((candidateProject) => {
      const projectOption = document.createElement("option");
      projectOption.value = `${candidateGroup.id}::${candidateProject.id}`;
      projectOption.textContent = `Projektgruppe: ${candidateGroup.name} › ${candidateProject.name}`;
      select.append(projectOption);
    });
  });
  select.value = groupId ? `${groupId}::${appointmentProjectId || ""}` : "::";
}

function moveAppointmentToContainer(project, layerType, targetGroupId, targetProjectId = null) {
  const context = draggedAppointmentContext;
  if (!context || context.projectId !== project.id || context.layerType !== layerType) return false;
  if (context.sourceGroupId === targetGroupId && context.sourceProjectId === targetProjectId) return false;
  const layer = getProjectLayer(project, layerType);
  const groups = Array.isArray(layer.groups) ? layer.groups : [];
  const sourceGroup = groups.find((group) => group.id === context.sourceGroupId);
  const targetGroup = groups.find((group) => group.id === targetGroupId);
  if (!sourceGroup || !targetGroup) return false;
  const sourceProject = context.sourceProjectId
    ? (sourceGroup.projects || []).find((entry) => entry.id === context.sourceProjectId)
    : null;
  const sourceAppointments = sourceProject
    ? (sourceProject.appointments = Array.isArray(sourceProject.appointments) ? sourceProject.appointments : [])
    : (sourceGroup.appointments = Array.isArray(sourceGroup.appointments) ? sourceGroup.appointments : []);
  const sourceIndex = sourceAppointments.findIndex((entry) => entry.id === context.appointmentId);
  if (sourceIndex < 0) return false;
  const targetProject = targetProjectId
    ? (targetGroup.projects || []).find((entry) => entry.id === targetProjectId)
    : null;
  if (targetProjectId && !targetProject) return false;
  const targetAppointments = targetProject
    ? (targetProject.appointments = Array.isArray(targetProject.appointments) ? targetProject.appointments : [])
    : (targetGroup.appointments = Array.isArray(targetGroup.appointments) ? targetGroup.appointments : []);
  const [appointment] = sourceAppointments.splice(sourceIndex, 1);
  targetAppointments.push(appointment);
  expandedAppointmentGroupKeys.add(`${project.id}:${layerType}:${targetGroup.id}`);
  if (targetProject) expandedAppointmentProjectKeys.add(`${project.id}:${layerType}:${targetGroup.id}:${targetProject.id}`);
  draggedAppointmentContext = null;
  saveProjects();
  if (layerType === "individual") renderIndividualProjectsProperties(project);
  else renderAppointmentsProperties(project);
  renderActiveCalendar(project);
  return true;
}

function enableAppointmentDropTarget(element, project, layerType, groupId, appointmentProjectId = null) {
  element.classList.add("appointment-drop-target");
  element.addEventListener("dragover", (event) => {
    const context = draggedAppointmentContext;
    if (!context || context.projectId !== project.id || context.layerType !== layerType) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    element.classList.add("is-drop-target");
  });
  element.addEventListener("dragleave", (event) => {
    if (!element.contains(event.relatedTarget)) element.classList.remove("is-drop-target");
  });
  element.addEventListener("drop", (event) => {
    if (!draggedAppointmentContext) return;
    event.preventDefault();
    event.stopPropagation();
    element.classList.remove("is-drop-target");
    moveAppointmentToContainer(project, layerType, groupId, appointmentProjectId);
  });
}

function openAppointmentTodoDialog(project, group, appointmentProject, todo = null, layerType = "appointments") {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog appointment-todo-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  const label = document.createElement("span");
  label.className = "label";
  label.textContent = appointmentProject.name;
  const title = document.createElement("h2");
  title.textContent = todo ? "To-do bearbeiten" : "To-do hinzufügen";
  heading.append(label, title);
  const field = document.createElement("label");
  field.className = "dialog-field";
  const fieldLabel = document.createElement("span");
  fieldLabel.textContent = "Aufgabe";
  const input = document.createElement("input");
  input.type = "text";
  input.required = true;
  input.maxLength = 140;
  input.placeholder = "z. B. Elternbrief vorbereiten";
  input.value = todo?.name || "";
  field.append(fieldLabel, input);
  const deadlineField = document.createElement("label");
  deadlineField.className = "dialog-field";
  const deadlineLabel = document.createElement("span");
  deadlineLabel.textContent = "Frist";
  const deadline = document.createElement("input");
  deadline.type = "date";
  deadline.required = true;
  deadline.value = todo?.dueDate || "";
  deadlineField.append(deadlineLabel, deadline);
  const assignmentField = document.createElement("label");
  assignmentField.className = "dialog-field";
  const assignmentLabel = document.createElement("span");
  assignmentLabel.textContent = "Zuordnung";
  const assignment = document.createElement("select");
  populateAppointmentAssignmentSelect(assignment, project, layerType, group.id, appointmentProject.id, true);
  assignmentField.append(assignmentLabel, assignment);
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
  submit.textContent = todo ? "Änderungen speichern" : "To-do hinzufügen";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (!name || !deadline.value) return;
    const [targetGroupId, targetProjectId] = assignment.value.split("::");
    const layer = getProjectLayer(project, layerType);
    const targetGroup = layer.groups?.find((entry) => entry.id === targetGroupId);
    const targetProject = targetGroup?.projects?.find((entry) => entry.id === targetProjectId);
    if (!targetProject) return;
    appointmentProject.todos = Array.isArray(appointmentProject.todos) ? appointmentProject.todos : [];
    targetProject.todos = Array.isArray(targetProject.todos) ? targetProject.todos : [];
    if (todo) {
      Object.assign(todo, { name, dueDate: deadline.value });
      if (targetProject !== appointmentProject) {
        const sourceIndex = appointmentProject.todos.findIndex((entry) => entry.id === todo.id);
        if (sourceIndex >= 0) appointmentProject.todos.splice(sourceIndex, 1);
        targetProject.todos.push(todo);
      }
    } else {
      targetProject.todos.push({ id: globalThis.crypto?.randomUUID?.() ?? `appointment-todo-${Date.now()}`, name, dueDate: deadline.value, completed: false });
    }
    expandedAppointmentGroupKeys.add(`${project.id}:${layerType}:${targetGroup.id}`);
    expandedAppointmentProjectKeys.add(`${project.id}:${layerType}:${targetGroup.id}:${targetProject.id}`);
    saveProjects();
    dialog.close();
    if (layerType === "individual") renderIndividualProjectsProperties(project);
    else renderAppointmentsProperties(project);
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, field, deadlineField, assignmentField, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
  input.focus();
}

function createAppointmentTodoMenu(project, group, appointmentProject, todo, layerType) {
  const shell = document.createElement("div");
  shell.className = "schedule-menu-shell";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "schedule-menu-button";
  button.setAttribute("aria-label", `Menü für ${todo.name}`);
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const edit = document.createElement("button");
  edit.type = "button";
  edit.textContent = "Bearbeiten";
  edit.addEventListener("click", () => openAppointmentTodoDialog(project, group, appointmentProject, todo, layerType));
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "schedule-menu-delete";
  remove.textContent = "Löschen";
  remove.dataset.projectId = project.id;
  remove.dataset.appointmentGroupId = group.id;
  remove.dataset.appointmentProjectId = appointmentProject.id;
  remove.dataset.appointmentTodoId = todo.id;
  remove.dataset.appointmentLayerType = layerType;
  remove.setAttribute("aria-label", `${todo.name} löschen – gedrückt halten`);
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

function createAppointmentTodoRow(project, group, appointmentProject, todo, layerType) {
  const row = document.createElement("article");
  row.className = `appointment-entry appointment-todo-entry${todo.completed ? " is-completed" : ""}`;
  const checkLabel = document.createElement("label");
  checkLabel.className = "appointment-todo-check";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = Boolean(todo.completed);
  checkbox.setAttribute("aria-label", `${todo.name} als erledigt markieren`);
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    row.classList.toggle("is-completed", todo.completed);
    saveProjects();
  });
  const copy = document.createElement("span");
  copy.className = "appointment-todo-copy";
  const name = document.createElement("strong");
  name.textContent = todo.name;
  const deadline = document.createElement("small");
  deadline.textContent = todo.dueDate ? `Ablaufdatum: ${formatGermanDate(todo.dueDate)}` : "Ablaufdatum noch offen";
  copy.append(name, deadline);
  checkLabel.append(checkbox, copy);
  row.append(checkLabel, createAppointmentTodoMenu(project, group, appointmentProject, todo, layerType));
  return row;
}

function createAppointmentProjectCard(project, group, appointmentProject, layerType) {
  appointmentProject.appointments = Array.isArray(appointmentProject.appointments) ? appointmentProject.appointments : [];
  appointmentProject.todos = Array.isArray(appointmentProject.todos) ? appointmentProject.todos : [];
  const card = document.createElement("section");
  card.className = "appointment-project-card";
  enableAppointmentDropTarget(card, project, layerType, group.id, appointmentProject.id);
  const projectKey = `${project.id}:${layerType}:${group.id}:${appointmentProject.id}`;
  const isExpanded = expandedAppointmentProjectKeys.has(projectKey);
  card.dataset.projectExpanded = String(isExpanded);
  const head = document.createElement("div");
  head.className = "appointment-group-head appointment-project-head";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "appointment-group-toggle appointment-project-toggle";
  toggle.textContent = isExpanded ? "−" : "+";
  toggle.setAttribute("aria-expanded", String(isExpanded));
  toggle.setAttribute("aria-label", `${appointmentProject.name} ${isExpanded ? "einklappen" : "ausklappen"}`);
  const name = document.createElement("button");
  name.type = "button";
  name.className = "appointment-group-title appointment-project-title";
  name.textContent = appointmentProject.name;
  name.setAttribute("aria-expanded", String(isExpanded));
  const toggleProject = () => {
    if (isExpanded) expandedAppointmentProjectKeys.delete(projectKey);
    else expandedAppointmentProjectKeys.add(projectKey);
    if (layerType === "individual") renderIndividualProjectsProperties(project);
    else renderAppointmentsProperties(project);
  };
  toggle.addEventListener("click", toggleProject);
  name.addEventListener("click", toggleProject);
  head.append(toggle, name, createAppointmentMenu(project, group, null, layerType, appointmentProject));
  const add = document.createElement("button");
  add.type = "button";
  add.className = "secondary-button appointment-add-button";
  add.textContent = "Termin hinzufügen";
  add.addEventListener("click", () => openAppointmentDialog(project, group, null, layerType, appointmentProject));
  const addTodo = document.createElement("button");
  addTodo.type = "button";
  addTodo.className = "secondary-button appointment-add-button";
  addTodo.textContent = "To-do hinzufügen";
  addTodo.addEventListener("click", () => openAppointmentTodoDialog(project, group, appointmentProject, null, layerType));
  const actions = document.createElement("div");
  actions.className = "appointment-group-actions appointment-project-actions";
  actions.append(add, addTodo);
  const entries = document.createElement("div");
  entries.className = "appointment-entry-list";
  if (!appointmentProject.appointments.length && !appointmentProject.todos.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch kein Termin in dieser Projektgruppe.";
    entries.append(empty);
  } else {
    const chronologicalEntries = [
      ...appointmentProject.appointments.map((appointment) => ({
        type: "appointment",
        date: getAppointmentSortDate(appointment) || "9999-12-31",
        time: appointment.startTime || "00:00",
        value: appointment
      })),
      ...appointmentProject.todos.map((todo) => ({
        type: "todo",
        date: todo.dueDate || "9999-12-31",
        time: "23:59",
        value: todo
      }))
    ].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
    chronologicalEntries.forEach((entry) => {
      entries.append(entry.type === "appointment"
        ? createAppointmentEntryRow(project, group, entry.value, layerType, appointmentProject)
        : createAppointmentTodoRow(project, group, appointmentProject, entry.value, layerType));
    });
  }
  const body = document.createElement("div");
  body.className = "appointment-project-body";
  body.hidden = !isExpanded;
  body.append(actions, entries);
  card.append(head, body);
  return card;
}

function getNextAppointmentInGroup(group, now = new Date()) {
  const todayKey = getLocalDateKey(now);
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return getAppointmentGroupEntries(group)
    .filter((appointment) => {
      if (appointment.isDeadline && appointment.completed) return false;
      const endDate = getAppointmentEndDate(appointment);
      if (!endDate || endDate < todayKey) return false;
      if (endDate > todayKey) return true;
      return !appointment.endTime || appointment.endTime >= currentTime;
    })
    .sort((a, b) => {
      const aStart = getAppointmentStartDate(a) || "9999-12-31";
      const bStart = getAppointmentStartDate(b) || "9999-12-31";
      const aIsActive = aStart <= todayKey && getAppointmentEndDate(a) >= todayKey;
      const bIsActive = bStart <= todayKey && getAppointmentEndDate(b) >= todayKey;
      if (aIsActive !== bIsActive) return aIsActive ? -1 : 1;
      return `${aStart} ${a.startTime || "00:00"}`.localeCompare(`${bStart} ${b.startTime || "00:00"}`);
    })[0] || null;
}

function getAppointmentGroupPreview(group, now = new Date()) {
  const appointment = getNextAppointmentInGroup(group, now);
  if (!appointment) return "Kein anstehender Termin";
  const todayKey = getLocalDateKey(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startDate = getAppointmentStartDate(appointment);
  const endDate = getAppointmentEndDate(appointment);
  const dateLabel = startDate < todayKey && endDate >= todayKey
    ? `läuft bis ${formatGermanDate(endDate)}`
    : startDate === todayKey
      ? "heute"
      : startDate === getLocalDateKey(tomorrow)
        ? "morgen"
        : formatGermanDate(startDate);
  const timeLabel = appointment.startTime
    ? appointment.endTime ? `${appointment.startTime}–${appointment.endTime}` : appointment.startTime
    : "Zeit offen";
  return `Nächster Termin: ${dateLabel} · ${timeLabel} · ${appointment.name || "Termin"}`;
}

function createAppointmentGroupHeader(project, group, layerType) {
  const groupKey = `${project.id}:${layerType}:${group.id}`;
  const isExpanded = expandedAppointmentGroupKeys.has(groupKey);
  const head = document.createElement("div");
  head.className = "appointment-group-head";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "appointment-group-toggle";
  toggle.textContent = isExpanded ? "−" : "+";
  toggle.setAttribute("aria-expanded", String(isExpanded));
  toggle.setAttribute("aria-label", `${group.name} ${isExpanded ? "einklappen" : "ausklappen"}`);
  const title = document.createElement("button");
  title.type = "button";
  title.className = "appointment-group-title";
  title.textContent = group.name;
  title.setAttribute("aria-expanded", String(isExpanded));
  const titleBlock = document.createElement("div");
  titleBlock.className = "appointment-group-title-block";
  const preview = document.createElement("small");
  preview.className = "appointment-group-next";
  preview.textContent = getAppointmentGroupPreview(group);
  preview.title = preview.textContent;
  titleBlock.append(title, preview);
  const toggleGroup = () => {
    if (isExpanded) expandedAppointmentGroupKeys.delete(groupKey);
    else expandedAppointmentGroupKeys.add(groupKey);
    if (layerType === "individual") renderIndividualProjectsProperties(project);
    else renderAppointmentsProperties(project);
  };
  toggle.addEventListener("click", toggleGroup);
  title.addEventListener("click", toggleGroup);
  head.append(toggle, titleBlock, createAppointmentMenu(project, group, null, layerType));
  return { head, isExpanded };
}

function enableAppointmentGroupReordering(list, project, layerType) {
  let draggedCard = null;
  const persistOrder = () => {
    if (!draggedCard) return;
    const layer = getProjectLayer(project, layerType);
    const groupsById = new Map((layer.groups || []).map((group) => [group.id, group]));
    layer.groups = [...list.querySelectorAll(":scope > .appointment-group-card[data-group-id]")]
      .map((card) => groupsById.get(card.dataset.groupId))
      .filter(Boolean);
    saveProjects();
    renderProjectBrowser();
  };
  list.querySelectorAll(":scope > .appointment-group-card[data-group-id]").forEach((card) => {
    if (card.dataset.groupExpanded === "true") return;
    card.draggable = true;
    card.setAttribute("aria-roledescription", "verschiebbare eingeklappte Gruppe");
    card.title = "Gedrückt halten und ziehen, um die Gruppe zu verschieben";
    card.addEventListener("dragstart", (event) => {
      draggedCard = card;
      card.classList.add("is-reordering");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", card.dataset.groupId);
    });
    card.addEventListener("dragend", () => {
      persistOrder();
      card.classList.remove("is-reordering");
      draggedCard = null;
    });
  });
  list.addEventListener("dragover", (event) => {
    if (!draggedCard) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const target = event.target instanceof Element ? event.target.closest(".appointment-group-card[data-group-id]") : null;
    if (!target || target === draggedCard || target.parentElement !== list) return;
    const bounds = target.getBoundingClientRect();
    list.insertBefore(draggedCard, event.clientY < bounds.top + bounds.height / 2 ? target : target.nextSibling);
  });
  list.addEventListener("drop", (event) => event.preventDefault());
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
  intro.textContent = "Erfassen Sie schulische Ereignisse direkt oder bündeln Sie sie in selbst angelegten Gruppen und Projektgruppen. Klassen sind Eigenschaften eines Termins und erzeugen keine eigenen Ordner.";
  head.append(title, intro);
  const addGroupButton = document.createElement("button");
  addGroupButton.type = "button";
  addGroupButton.className = "secondary-button primary-action appointment-add-group";
  addGroupButton.textContent = "Gruppe hinzufügen";
  addGroupButton.addEventListener("click", () => openAppointmentGroupDialog(project));
  const addSingleEventButton = document.createElement("button");
  addSingleEventButton.type = "button";
  addSingleEventButton.className = "secondary-button primary-action appointment-add-group";
  addSingleEventButton.textContent = "Einzelveranstaltung hinzufügen";
  addSingleEventButton.addEventListener("click", () => openAppointmentDialog(project, null, null, "appointments"));
  const rootActions = document.createElement("div");
  rootActions.className = "appointment-root-actions";
  rootActions.append(addGroupButton, addSingleEventButton);

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
      group.projects = Array.isArray(group.projects) ? group.projects : [];
      const groupCard = document.createElement("section");
      groupCard.className = "appointment-group-card";
      groupCard.dataset.groupId = group.id;
      enableAppointmentDropTarget(groupCard, project, "appointments", group.id);
      groupCard.style.setProperty("--appointment-group-color", group.color || "#c9c1dd");
      const { head: groupHead, isExpanded } = createAppointmentGroupHeader(project, group, "appointments");
      groupCard.dataset.groupExpanded = String(isExpanded);
      const addAppointmentButton = document.createElement("button");
      addAppointmentButton.type = "button";
      addAppointmentButton.className = "secondary-button appointment-add-button";
      addAppointmentButton.textContent = "Termin hinzufügen";
      addAppointmentButton.addEventListener("click", () => openAppointmentDialog(project, group));
      const addProjectButton = document.createElement("button");
      addProjectButton.type = "button";
      addProjectButton.className = "secondary-button appointment-add-button";
      addProjectButton.textContent = "Projektgruppe hinzufügen";
      addProjectButton.addEventListener("click", () => openAppointmentProjectDialog(project, group));
      const groupActions = document.createElement("div");
      groupActions.className = "appointment-group-actions";
      groupActions.append(addAppointmentButton, addProjectButton);
      const appointmentList = document.createElement("div");
      appointmentList.className = "appointment-entry-list";
      enableAppointmentDropTarget(appointmentList, project, "appointments", group.id);
      if (!group.appointments.length && !group.projects.length) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "In dieser Gruppe sind noch keine Termine eingetragen.";
        appointmentList.append(empty);
      } else {
        group.appointments
          .slice()
          .sort((a, b) => `${getAppointmentSortDate(a)} ${a.startTime}`.localeCompare(`${getAppointmentSortDate(b)} ${b.startTime}`))
          .forEach((appointment) => {
            appointmentList.append(createAppointmentEntryRow(project, group, appointment, "appointments"));
          });
      }
      appointmentList.hidden = !group.appointments.length && group.projects.length > 0;
      const projectList = document.createElement("div");
      projectList.className = "appointment-project-list";
      group.projects.forEach((appointmentProject) => projectList.append(createAppointmentProjectCard(project, group, appointmentProject, "appointments")));
      const groupBody = document.createElement("div");
      groupBody.className = "appointment-group-body";
      groupBody.hidden = !isExpanded;
      groupBody.append(groupActions, appointmentList, projectList);
      groupCard.append(groupHead, groupBody);
      groupList.append(groupCard);
    });
    enableAppointmentGroupReordering(groupList, project, "appointments");
  }
  const singleEvents = createMovedProjectSection(
    project,
    "school-project",
    "Einzelveranstaltungen",
    "Einzelveranstaltung hinzufügen",
    "Noch keine Einzelveranstaltung eingetragen.",
    { hideTitle: true, hideAddButton: true, hideWhenEmpty: true }
  );
  sheet.append(head, rootActions, singleEvents, groupList);
  projectDetail.replaceChildren(sheet);
  scrollToPendingAppointmentGroup(project, "appointments");
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

function linkDateRangePicker(startInput, endInput) {
  if (!startInput || !endInput || endInput.dataset.rangePickerLinked === "true") return;
  endInput.dataset.rangePickerLinked = "true";
  const prepareEndDate = () => {
    if (!startInput.value) return;
    endInput.min = startInput.value;
    if (!endInput.value) endInput.value = startInput.value;
  };
  startInput.addEventListener("change", () => {
    if (!startInput.value) return;
    endInput.min = startInput.value;
    if (endInput.value && endInput.value < startInput.value) endInput.value = startInput.value;
  });
  endInput.addEventListener("pointerdown", prepareEndDate);
  endInput.addEventListener("focus", prepareEndDate);
}

linkDateRangePicker(sicknessStartDate, sicknessEndDate);
linkDateRangePicker(classTripStartDate, classTripEndDate);
linkDateRangePicker(schoolProjectDate, schoolProjectEndDate);

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

function createSicknessSection(project) {
  const layer = getProjectLayer(project, "sickness");
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const section = document.createElement("section");
  section.className = "property-section personal-sickness-section";
  const title = document.createElement("h3");
  title.textContent = "Krankschreibungen";
  const intro = document.createElement("p");
  intro.textContent = "Erfassen Sie Zeitspannen persönlicher Verhinderung. Der Unterricht entfällt in diesen Zeiträumen automatisch.";
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
    layer.entries.slice().sort((a, b) => a.startDate.localeCompare(b.startDate)).forEach((sickness) => {
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
  section.append(title, intro, addButton, list);
  return section;
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

function getClassCatalogData(project) {
  const layer = getProjectLayer(project, "classCatalog");
  layer.subjects = Array.isArray(layer.subjects) ? layer.subjects : [];
  if (!Array.isArray(layer.grades)) layer.grades = [];
  if (Number(layer.independentClassesMigrationVersion || 0) < 2) {
    layer.subjects.forEach((subject) => {
      (subject.grades || []).forEach((legacyGrade) => {
        let grade = layer.grades.find((entry) => entry.schoolId === subject.schoolId && entry.name === String(legacyGrade.name));
        if (!grade) {
          grade = { id: legacyGrade.id || (globalThis.crypto?.randomUUID?.() ?? `grade-${Date.now()}`), name: String(legacyGrade.name), schoolId: subject.schoolId || "", classes: [] };
          layer.grades.push(grade);
        }
        (legacyGrade.classes || []).forEach((legacyClass) => {
          if (grade.classes.some((entry) => entry.id === legacyClass.id)) return;
          const fullName = String(legacyClass.name || "").trim();
          const suffix = fullName.replace(new RegExp(`^${String(legacyGrade.name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-?`, "i"), "") || fullName;
          grade.classes.push({ ...legacyClass, suffix, displayMode: legacyClass.displayMode || "normal", name: fullName || `${legacyGrade.name}${suffix}` });
        });
      });
    });
    const remappedClassIds = new Map();
    layer.grades.forEach((grade) => {
      const unique = new Map();
      grade.classes = (grade.classes || []).filter((classEntry) => {
        const key = String(classEntry.suffix || classEntry.name || "").toLocaleLowerCase("de");
        const existing = unique.get(key);
        if (!existing) {
          unique.set(key, classEntry);
          return true;
        }
        if (classEntry.id && existing.id) remappedClassIds.set(classEntry.id, existing.id);
        return false;
      });
    });
    (project.layers?.find((entry) => entry.type === "schedules")?.schedules || []).forEach((schedule) => {
      (schedule.lessons || []).forEach((lesson) => {
        if (remappedClassIds.has(lesson.classId)) lesson.classId = remappedClassIds.get(lesson.classId);
      });
    });
    layer.independentClassesMigrationVersion = 2;
  }
  layer.grades.forEach((grade) => { grade.classes = Array.isArray(grade.classes) ? grade.classes : []; });
  layer.subjects.forEach((subject) => {
    subject.classIds = Array.isArray(subject.classIds) ? subject.classIds : [];
    subject.courses = Array.isArray(subject.courses) ? subject.courses : [];
    subject.courses.forEach((course) => {
      course.id ||= globalThis.crypto?.randomUUID?.() ?? `course-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      course.classIds = Array.isArray(course.classIds) ? course.classIds : [];
      course.studentIds = Array.isArray(course.studentIds) ? course.studentIds : [];
    });
  });
  const validDisplayModes = new Set(["normal", "subscript", "superscript", "hyphen", "smallcaps"]);
  if (!validDisplayModes.has(layer.classDisplayMode)) {
    layer.classDisplayMode = layer.grades.flatMap((grade) => grade.classes || []).find((entry) => validDisplayModes.has(entry.displayMode))?.displayMode || "normal";
  }
  layer.grades.forEach((grade) => (grade.classes || []).forEach((classEntry) => {
    classEntry.id ||= globalThis.crypto?.randomUUID?.() ?? `class-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    classEntry.displayMode = layer.classDisplayMode;
    classEntry.name = getClassDisplayText(grade.name, classEntry.suffix, layer.classDisplayMode);
    classEntry.teachers = (Array.isArray(classEntry.teachers) ? classEntry.teachers : [classEntry.teacher])
      .map((teacher) => String(teacher || "").trim())
      .filter(Boolean)
      .slice(0, 2);
    classEntry.students = (Array.isArray(classEntry.students) ? classEntry.students : []).map((student, index) => ({
      ...student,
      id: student.id || (globalThis.crypto?.randomUUID?.() ?? `student-${Date.now()}-${index}`),
      number: Math.max(1, Number.parseInt(student.number, 10) || index + 1),
      name: String(student.name || "").trim()
    }));
  }));
  const validStudentIds = new Set(layer.grades.flatMap((grade) => (grade.classes || [])
    .flatMap((classEntry) => (classEntry.students || []).map((student) => student.id))));
  layer.subjects.forEach((subject) => (subject.courses || []).forEach((course) => {
    course.studentIds = (course.studentIds || []).filter((studentId) => validStudentIds.has(studentId));
  }));
  return layer;
}

function getClassDisplayText(gradeName, suffix, mode = "normal") {
  const cleanSuffix = String(suffix || "").trim();
  return mode === "hyphen" ? `${gradeName}-${cleanSuffix}` : `${gradeName}${cleanSuffix}`;
}

function renderClassDisplay(element, gradeName, suffix, mode = "normal") {
  element.replaceChildren(document.createTextNode(String(gradeName || "")));
  const mark = document.createElement(mode === "subscript" ? "sub" : mode === "superscript" ? "sup" : "span");
  mark.textContent = String(suffix || "");
  if (mode === "hyphen") mark.textContent = `-${suffix || ""}`;
  if (mode === "smallcaps") mark.className = "class-label-smallcaps";
  element.append(mark);
}

function getCatalogClassById(project, classId, gradeId = null) {
  const catalog = getClassCatalogData(project);
  for (const grade of catalog.grades || []) {
    if (gradeId && grade.id !== gradeId && !(grade.classes || []).some((entry) => entry.id === classId)) continue;
    const classEntry = (grade.classes || []).find((entry) => entry.id === classId);
    if (classEntry) return { grade, classEntry };
  }
  return null;
}

function updateLessonClassSelectionPreview(project) {
  if (!lessonGradePreview) return;
  const option = lessonGrade.selectedOptions[0];
  const catalogClass = project ? getCatalogClassById(project, lessonGrade.value, option?.dataset.gradeId) : null;
  lessonGradePreview.hidden = !catalogClass;
  if (catalogClass) renderClassDisplay(lessonGradePreview, catalogClass.grade.name, catalogClass.classEntry.suffix, catalogClass.classEntry.displayMode);
}

function updateClassDisplayPreviews() {
  const gradeName = classCatalogFixedGrade.textContent || classCatalogGrade.value || "7";
  const suffix = classCatalogName.value.trim() || "b";
  const labels = { normal: "Normal", subscript: "Kürzel tiefgestellt", superscript: "Kürzel hochgestellt", hyphen: "Mit Bindestrich", smallcaps: "Kürzel als Kapitälchen" };
  classCatalogDisplayModeButtons.forEach((button) => {
    renderClassDisplay(button, gradeName, suffix, button.dataset.classDisplayMode);
    button.setAttribute("aria-label", `${labels[button.dataset.classDisplayMode]}: ${getClassDisplayText(gradeName, suffix, button.dataset.classDisplayMode)}`);
    button.title = labels[button.dataset.classDisplayMode];
  });
}

function setClassCatalogTab(tab = "general") {
  const showStudents = tab === "students";
  classCatalogGeneralTab.setAttribute("aria-selected", String(!showStudents));
  classCatalogStudentsTab.setAttribute("aria-selected", String(showStudents));
  classCatalogGeneralPanel.hidden = showStudents;
  classCatalogStudentsPanel.hidden = !showStudents;
}

function openStudentIdDialog(student) {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog student-id-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  heading.innerHTML = `<span class="label">Schülerliste</span><h2>Schüler-ID</h2>`;
  const note = document.createElement("p");
  note.className = "dialog-intro";
  note.textContent = student.name ? `Stabile ID für ${student.name}.` : "Stabile ID dieses Schülereintrags.";
  const value = document.createElement("input");
  value.type = "text";
  value.readOnly = true;
  value.value = student.id;
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  const close = document.createElement("button");
  close.type = "submit";
  close.className = "secondary-button";
  close.textContent = "Schließen";
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "secondary-button primary-action";
  copy.textContent = "ID kopieren";
  copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(value.value); }
    catch { value.select(); document.execCommand("copy"); }
    copy.textContent = "Kopiert";
    setTimeout(() => { copy.textContent = "ID kopieren"; }, 1400);
  });
  actions.append(close, copy);
  form.append(heading, note, value, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.showModal();
  value.select();
}

function openClassIdDialog() {
  const classId = classCatalogDialog.dataset.draftClassId;
  if (!classId) return;
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog student-id-dialog class-id-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  heading.innerHTML = '<span class="label">Klassen</span><h2>Klassen-ID</h2>';
  const note = document.createElement("p");
  note.className = "dialog-intro";
  note.textContent = "Diese ID verweist auf Klassenname, Klassenlehrer und die zugewiesene Schülerliste. Änderungen stehen nach dem Speichern bereit.";
  const value = document.createElement("input");
  value.type = "text";
  value.readOnly = true;
  value.value = `KL1:${classId}`;
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  const close = document.createElement("button");
  close.type = "submit";
  close.className = "secondary-button";
  close.textContent = "Schließen";
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "secondary-button primary-action";
  copy.textContent = "ID kopieren";
  copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(value.value); }
    catch { value.select(); document.execCommand("copy"); }
    copy.textContent = "Kopiert";
    setTimeout(() => { copy.textContent = "ID kopieren"; }, 1400);
  });
  actions.append(close, copy);
  form.append(heading, note, value, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.showModal();
  value.select();
}

function renderClassStudentList() {
  if (!classStudentDraft.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch keine Schüler angelegt.";
    classStudentList.replaceChildren(empty);
    return;
  }
  const rows = classStudentDraft
    .slice()
    .sort((a, b) => a.number - b.number || a.name.localeCompare(b.name, "de"))
    .map((student) => {
      const row = document.createElement("div");
      row.className = "class-student-row";
      const numberField = document.createElement("label");
      numberField.innerHTML = "<span>Nr.</span>";
      const number = document.createElement("input");
      number.type = "number";
      number.min = "1";
      number.step = "1";
      number.value = String(student.number);
      number.setAttribute("aria-label", `Laufende Nummer für ${student.name || "Schüler"}`);
      number.addEventListener("input", () => { student.number = Number.parseInt(number.value, 10) || 0; });
      numberField.append(number);
      const nameField = document.createElement("label");
      nameField.innerHTML = "<span>Name</span>";
      const name = document.createElement("input");
      name.type = "text";
      name.maxLength = 120;
      name.value = student.name;
      name.placeholder = "Vor- und Nachname";
      name.addEventListener("input", () => { student.name = name.value; });
      nameField.append(name);
      const id = document.createElement("button");
      id.type = "button";
      id.className = "student-id-button";
      id.textContent = "ID";
      id.addEventListener("click", () => openStudentIdDialog(student));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "student-remove-button";
      remove.textContent = "Löschen";
      remove.addEventListener("click", () => {
        classStudentDraft = classStudentDraft.filter((entry) => entry.id !== student.id);
        renderClassStudentList();
      });
      row.append(numberField, nameField, id, remove);
      return row;
    });
  classStudentList.replaceChildren(...rows);
}

function openClassCatalogDialog(project, mode, subject = null, grade = null, classEntry = null, initialTab = "general") {
  classCatalogForm.reset();
  classCatalogDialogStatus.textContent = "";
  classCatalogDialog.dataset.projectId = project.id;
  classCatalogDialog.dataset.subjectId = subject?.id || "";
  classCatalogDialog.dataset.gradeId = grade?.id || "";
  classCatalogDialog.dataset.classId = classEntry?.id || "";
  classCatalogDialog.dataset.draftClassId = mode === "catalog-class"
    ? (classEntry?.id || globalThis.crypto?.randomUUID?.() || `class-${Date.now()}`)
    : "";
  classCatalogDialog.classList.toggle("is-class-editor", mode === "catalog-class");
  classCatalogMode.value = mode;
  classCatalogGrade.replaceChildren(...Array.from({ length: 13 }, (_, index) => {
    const option = document.createElement("option");
    option.value = String(index + 1);
    option.textContent = `${index + 1}. Klassenstufe`;
    return option;
  }));
  classCatalogNameField.hidden = mode === "catalog-grade";
  classCatalogNameField.classList.toggle("is-class-suffix-field", mode === "catalog-class");
  classCatalogGradeField.hidden = mode !== "catalog-grade";
  classCatalogClassOptions.hidden = true;
  classCatalogTeacherFields.hidden = mode !== "catalog-class";
  classCatalogIdField.hidden = mode !== "catalog-class";
  const teachers = Array.isArray(classEntry?.teachers) ? classEntry.teachers : [];
  classCatalogTeacherOne.value = teachers[0] || "";
  classCatalogTeacherTwo.value = teachers[1] || "";
  classCatalogTeacherTwoField.hidden = !teachers[1];
  addSecondClassTeacherButton.hidden = Boolean(teachers[1]);
  classCatalogTabs.hidden = mode !== "catalog-class";
  setClassCatalogTab(mode === "catalog-class" && initialTab === "students" ? "students" : "general");
  classStudentDraft = mode === "catalog-class"
    ? structuredClone(Array.isArray(classEntry?.students) ? classEntry.students : [])
    : [];
  renderClassStudentList();
  classCatalogGradePrefix.hidden = mode !== "catalog-class";
  if (mode === "subject") {
    classCatalogDialogTitle.textContent = subject ? "Fach bearbeiten" : "Fach hinzufügen";
    classCatalogNameLabel.textContent = "Fach";
    classCatalogName.placeholder = "z. B. Deutsch";
    classCatalogName.value = subject?.name || "";
  } else if (mode === "catalog-grade") {
    classCatalogDialogTitle.textContent = grade ? "Klassenstufe bearbeiten" : "Klassenstufe hinzufügen";
    classCatalogGrade.value = grade?.name || "1";
  } else {
    classCatalogDialogTitle.textContent = classEntry ? "Klasse bearbeiten" : "Klasse erstellen";
    classCatalogNameLabel.textContent = "Klassenkürzel";
    classCatalogName.placeholder = "z. B. b, 2 oder II";
    classCatalogName.value = classEntry?.suffix || String(classEntry?.name || "").replace(new RegExp(`^${grade?.name || ""}-?`, "i"), "");
    classCatalogGradePrefix.textContent = grade?.name || "";
    classCatalogFixedGrade.textContent = grade?.name || "";
  }
  const isEditing = (mode === "subject" && Boolean(subject))
    || (mode === "catalog-grade" && Boolean(grade))
    || (mode === "catalog-class" && Boolean(classEntry));
  classCatalogSubmitButton.textContent = isEditing
    ? "Änderungen speichern"
    : mode === "catalog-class" ? "Klasse erstellen" : "Hinzufügen";
  classCatalogDialog.showModal();
  requestAnimationFrame(() => {
    if (mode === "catalog-class" && initialTab === "students") {
      (classStudentList.querySelector(".class-student-row input[type='text']") || addClassStudentButton).focus();
    } else {
      (mode === "catalog-grade" ? classCatalogGrade : classCatalogName).focus();
    }
  });
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
  const exportButton = document.createElement("button");
  exportButton.type = "button";
  exportButton.textContent = "Exportieren";
  exportButton.addEventListener("click", () => {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    exportClassGrade(project, grade);
  });
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "schedule-menu-delete";
  remove.textContent = "Löschen";
  remove.dataset.projectId = project.id;
  remove.dataset.catalogType = type;
  if (subject?.id) remove.dataset.catalogSubjectId = subject.id;
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
  menu.append(edit);
  if (type === "catalog-grade") menu.append(exportButton);
  menu.append(remove);
  shell.append(button, menu);
  return shell;
}

function openGlobalClassDisplayDialog(project) {
  const layer = getClassCatalogData(project);
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog class-display-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  heading.innerHTML = "<span class=\"label\">Klassen</span><h2>Darstellung</h2>";
  const intro = document.createElement("p");
  intro.className = "dialog-intro";
  intro.textContent = "Wählen Sie eine einheitliche Darstellung für alle vorhandenen und zukünftigen Klassen.";
  const choices = document.createElement("div");
  choices.className = "class-catalog-display-modes class-global-display-modes";
  choices.setAttribute("role", "radiogroup");
  const labels = {
    normal: "Normal",
    subscript: "Kürzel tiefgestellt",
    superscript: "Kürzel hochgestellt",
    hyphen: "Mit Bindestrich",
    smallcaps: "Kürzel als Kapitälchen"
  };
  let selectedMode = layer.classDisplayMode || "normal";
  Object.entries(labels).forEach(([mode, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.classDisplayMode = mode;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(mode === selectedMode));
    button.setAttribute("aria-label", label);
    const preview = document.createElement("strong");
    renderClassDisplay(preview, "7", "b", mode);
    const caption = document.createElement("small");
    caption.textContent = label;
    button.append(preview, caption);
    button.addEventListener("click", () => {
      selectedMode = mode;
      choices.querySelectorAll("button").forEach((entry) => entry.setAttribute("aria-checked", String(entry === button)));
    });
    choices.append(button);
  });
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
  submit.textContent = "Darstellung speichern";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    layer.classDisplayMode = selectedMode;
    layer.grades.forEach((grade) => (grade.classes || []).forEach((classEntry) => {
      classEntry.displayMode = selectedMode;
      classEntry.name = getClassDisplayText(grade.name, classEntry.suffix, selectedMode);
    }));
    syncLessonCatalogLabels(project);
    saveProjects();
    dialog.close();
    renderClassCatalogProperties(project);
    renderActiveCalendar(project);
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, intro, choices, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
}

function createClassCatalogSettingsMenu(project) {
  const shell = document.createElement("div");
  shell.className = "schedule-menu-shell";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "schedule-menu-button";
  button.setAttribute("aria-label", "Menü für Klassen");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const display = document.createElement("button");
  display.type = "button";
  display.textContent = "Darstellung";
  display.addEventListener("click", () => {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    openGlobalClassDisplayDialog(project);
  });
  button.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    button.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(display);
  shell.append(button, menu);
  return shell;
}

function getSchoolCatalogClasses(project, schoolId) {
  return getClassCatalogData(project).grades
    .filter((grade) => grade.schoolId === schoolId)
    .flatMap((grade) => (grade.classes || []).map((classEntry) => ({ grade, classEntry })));
}

function getSchoolCatalogStudents(project, schoolId, classIds = null) {
  const selectedClasses = classIds ? new Set(classIds) : null;
  return getSchoolCatalogClasses(project, schoolId)
    .filter(({ classEntry }) => !selectedClasses || selectedClasses.has(classEntry.id))
    .flatMap(({ grade, classEntry }) => (classEntry.students || []).map((student) => ({ grade, classEntry, student })))
    .sort((a, b) => (
      Number(a.grade.name) - Number(b.grade.name)
      || String(a.classEntry.suffix || "").localeCompare(String(b.classEntry.suffix || ""), "de", { sensitivity: "base", numeric: true })
      || Number(a.student.number) - Number(b.student.number)
      || a.student.name.localeCompare(b.student.name, "de", { sensitivity: "base" })
    ));
}

function openSubjectClassSelectionDialog(project, subject, initialClassIds, onApply, title = "Klassen zuweisen") {
  const classes = getSchoolCatalogClasses(project, subject.schoolId);
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog class-target-picker-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  const headingLabel = document.createElement("span");
  headingLabel.className = "label";
  headingLabel.textContent = subject.name;
  const headingTitle = document.createElement("h2");
  headingTitle.textContent = title;
  heading.append(headingLabel, headingTitle);
  const intro = document.createElement("p");
  intro.className = "dialog-intro";
  intro.textContent = "Wählen Sie beliebig viele Einzelklassen aus.";
  const choices = document.createElement("div");
  choices.className = "class-target-checkbox-list";
  classes.forEach(({ grade, classEntry }) => {
    const choice = document.createElement("label");
    choice.className = "class-target-checkbox is-class";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = classEntry.id;
    checkbox.checked = initialClassIds.includes(classEntry.id);
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    renderClassDisplay(name, grade.name, classEntry.suffix, classEntry.displayMode);
    const gradeCopy = document.createElement("small");
    gradeCopy.textContent = `${grade.name}. Klassenstufe`;
    copy.append(name, gradeCopy);
    choice.append(checkbox, copy);
    choices.append(choice);
  });
  if (!classes.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Für diese Schule sind noch keine Klassen eingerichtet.";
    choices.append(empty);
  }
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
  submit.textContent = "Auswahl übernehmen";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onApply([...choices.querySelectorAll("input:checked")].map((checkbox) => checkbox.value));
    dialog.close();
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, intro, choices, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
}

function openCourseStudentSelectionDialog(project, subject, classIds, initialStudentIds, onApply) {
  const students = getSchoolCatalogStudents(project, subject.schoolId, classIds);
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog class-target-picker-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  const headingLabel = document.createElement("span");
  headingLabel.className = "label";
  headingLabel.textContent = subject.name;
  const headingTitle = document.createElement("h2");
  headingTitle.textContent = "Schüler auswählen";
  heading.append(headingLabel, headingTitle);
  const intro = document.createElement("p");
  intro.className = "dialog-intro";
  intro.textContent = "Wählen Sie beliebig viele Schüler aus den festgelegten Herkunftsklassen aus.";
  const choices = document.createElement("div");
  choices.className = "class-target-checkbox-list";
  students.forEach(({ grade, classEntry, student }) => {
    const choice = document.createElement("label");
    choice.className = "class-target-checkbox is-student";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = student.id;
    checkbox.checked = initialStudentIds.includes(student.id);
    const copy = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = student.name || `Schüler ${student.number}`;
    const context = document.createElement("small");
    context.append(document.createTextNode(`Nr. ${student.number} · Klasse `));
    const className = document.createElement("span");
    className.className = "class-target-student-class";
    renderClassDisplay(className, grade.name, classEntry.suffix, classEntry.displayMode);
    context.append(className);
    copy.append(name, context);
    choice.append(checkbox, copy);
    choices.append(choice);
  });
  if (!students.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = classIds.length
      ? "In den ausgewählten Herkunftsklassen sind noch keine Schüler angelegt."
      : "Wählen Sie zuerst mindestens eine Herkunftsklasse aus.";
    choices.append(empty);
  }
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
  submit.textContent = "Auswahl übernehmen";
  submit.disabled = !students.length;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onApply([...choices.querySelectorAll("input:checked")].map((checkbox) => checkbox.value));
    dialog.close();
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, intro, choices, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
}

function openCourseIdDialog(project, subject, course) {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog class-course-id-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  const label = document.createElement("span");
  label.className = "label";
  label.textContent = subject.name;
  const title = document.createElement("h2");
  title.textContent = "Kurs-ID";
  heading.append(label, title);
  const note = document.createElement("p");
  note.className = "dialog-intro";
  note.textContent = `Diese ID verweist auf „${course.name}“ und überträgt ausschließlich die aktuell ausgewählten Kursschüler.`;
  const value = document.createElement("input");
  value.type = "text";
  value.readOnly = true;
  value.value = `KU1:${course.id}`;
  value.setAttribute("aria-label", `Kurs-ID für ${course.name}`);
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  const close = document.createElement("button");
  close.type = "submit";
  close.className = "secondary-button";
  close.textContent = "Schließen";
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "secondary-button primary-action";
  copy.textContent = "ID kopieren";
  copy.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(value.value); }
    catch { value.select(); document.execCommand("copy"); }
    copy.textContent = "Kopiert";
    setTimeout(() => { copy.textContent = "ID kopieren"; }, 1400);
  });
  actions.append(close, copy);
  form.append(heading, note, value, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  dialog.showModal();
  value.select();
}

function openCourseDialog(project, subject, course = null) {
  let selectedClassIds = [...(course?.classIds || [])];
  let selectedStudentIds = [...(course?.studentIds || [])];
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog class-course-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  const headingLabel = document.createElement("span");
  headingLabel.className = "label";
  headingLabel.textContent = subject.name;
  const headingTitle = document.createElement("h2");
  headingTitle.textContent = course ? "Kurs bearbeiten" : "Kurs erstellen";
  heading.append(headingLabel, headingTitle);
  const nameLabel = document.createElement("label");
  nameLabel.className = "dialog-field";
  const label = document.createElement("span");
  label.textContent = "Kursbezeichnung";
  const name = document.createElement("input");
  name.type = "text";
  name.required = true;
  name.maxLength = 80;
  name.placeholder = "z. B. Grundkurs Deutsch";
  name.value = course?.name || "";
  nameLabel.append(label, name);
  const selectionSummary = document.createElement("div");
  selectionSummary.className = "class-course-selection-summary";
  const classSummaryLabel = document.createElement("strong");
  classSummaryLabel.textContent = "Herkunftsklassen";
  const selectedSummary = document.createElement("div");
  selectedSummary.className = "class-project-selected-targets";
  const studentSummaryLabel = document.createElement("strong");
  studentSummaryLabel.textContent = "Ausgewählte Schüler";
  const selectedStudentSummary = document.createElement("div");
  selectedStudentSummary.className = "class-project-selected-targets";
  const renderSummary = () => {
    const classes = getSchoolCatalogClasses(project, subject.schoolId).filter(({ classEntry }) => selectedClassIds.includes(classEntry.id));
    if (!classes.length) {
      const empty = document.createElement("span");
      empty.className = "empty-state";
      empty.textContent = "Noch keine Herkunftsklasse ausgewählt.";
      selectedSummary.replaceChildren(empty);
    } else {
      selectedSummary.replaceChildren(...classes.map(({ grade, classEntry }) => {
        const chip = document.createElement("span");
        chip.className = "class-project-target-chip is-class";
        renderClassDisplay(chip, grade.name, classEntry.suffix, classEntry.displayMode);
        return chip;
      }));
    }
    const students = getSchoolCatalogStudents(project, subject.schoolId, selectedClassIds)
      .filter(({ student }) => selectedStudentIds.includes(student.id));
    if (!students.length) {
      const empty = document.createElement("span");
      empty.className = "empty-state";
      empty.textContent = "Noch keine Schüler ausgewählt.";
      selectedStudentSummary.replaceChildren(empty);
    } else selectedStudentSummary.replaceChildren(...students.map(({ student }) => {
      const chip = document.createElement("span");
      chip.className = "class-project-target-chip is-student";
      chip.textContent = student.name || `Schüler ${student.number}`;
      return chip;
    }));
  };
  const choose = document.createElement("button");
  choose.type = "button";
  choose.className = "secondary-button";
  choose.textContent = "Klassen auswählen";
  choose.addEventListener("click", () => openSubjectClassSelectionDialog(project, subject, selectedClassIds, (ids) => {
    selectedClassIds = ids;
    const validStudentIds = new Set(getSchoolCatalogStudents(project, subject.schoolId, selectedClassIds).map(({ student }) => student.id));
    selectedStudentIds = selectedStudentIds.filter((id) => validStudentIds.has(id));
    renderSummary();
  }, "Herkunftsklassen auswählen"));
  const chooseStudents = document.createElement("button");
  chooseStudents.type = "button";
  chooseStudents.className = "secondary-button";
  chooseStudents.textContent = "Schüler auswählen";
  chooseStudents.addEventListener("click", () => openCourseStudentSelectionDialog(project, subject, selectedClassIds, selectedStudentIds, (ids) => {
    selectedStudentIds = ids;
    renderSummary();
  }));
  const selectionActions = document.createElement("div");
  selectionActions.className = "class-course-selection-actions";
  selectionActions.append(choose, chooseStudents);
  selectionSummary.append(classSummaryLabel, selectedSummary, studentSummaryLabel, selectedStudentSummary);
  renderSummary();
  const status = document.createElement("p");
  status.className = "property-status";
  const actions = document.createElement("div");
  actions.className = "dialog-actions";
  if (course) {
    const showId = document.createElement("button");
    showId.type = "button";
    showId.className = "secondary-button class-course-id-button";
    showId.textContent = "ID";
    showId.addEventListener("click", () => openCourseIdDialog(project, subject, course));
    actions.append(showId);
  }
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "secondary-button";
  cancel.textContent = "Abbrechen";
  cancel.addEventListener("click", () => dialog.close());
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "secondary-button primary-action";
  submit.textContent = course ? "Änderungen speichern" : "Kurs erstellen";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const courseName = name.value.trim();
    if (!courseName || !selectedClassIds.length) {
      status.textContent = !courseName ? "Bitte den Kurs benennen." : "Bitte mindestens eine Herkunftsklasse auswählen.";
      return;
    }
    subject.courses = Array.isArray(subject.courses) ? subject.courses : [];
    const values = { name: courseName, classIds: [...selectedClassIds], studentIds: [...selectedStudentIds] };
    if (course) Object.assign(course, values);
    else subject.courses.push({ id: globalThis.crypto?.randomUUID?.() ?? `course-${Date.now()}`, ...values });
    saveProjects();
    dialog.close();
    renderClassCatalogProperties(project);
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, nameLabel, selectionActions, selectionSummary, status, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
  name.focus();
}

function renderClassCatalogProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Klassen";
  const layer = getClassCatalogData(project);
  const schools = ensureSchools(project);
  if (!schools.some((school) => school.id === activeClassSchoolId)) activeClassSchoolId = schools[0]?.id || null;
  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const intro = document.createElement("p");
  intro.textContent = "Legen Sie Klassen unabhängig von Fächern an. Dadurch können dieselben Klassen später verschiedenen Fächern und zusammengesetzten Kursen zugeordnet werden.";
  const titleLine = document.createElement("div");
  titleLine.className = "schedule-title-line";
  titleLine.append(title, createClassCatalogSettingsMenu(project));
  head.append(titleLine, intro);
  const schoolTabs = document.createElement("div");
  schoolTabs.className = "project-period-tabs class-catalog-school-tabs";
  schoolTabs.setAttribute("role", "tablist");
  schoolTabs.setAttribute("aria-label", "Schule auswählen");
  schools.forEach((school) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(school.id === activeClassSchoolId));
    tab.textContent = school.name;
    tab.addEventListener("click", () => {
      if (school.id === activeClassSchoolId) return;
      activeClassSchoolId = school.id;
      renderClassCatalogProperties(project);
    });
    schoolTabs.append(tab);
  });
  if (!schools.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Legen Sie zuerst eine Schule an.";
    schoolTabs.append(empty);
  }
  const contentTabs = document.createElement("div");
  contentTabs.className = "project-period-tabs class-catalog-content-tabs";
  contentTabs.setAttribute("role", "tablist");
  contentTabs.setAttribute("aria-label", "Klassenbereich auswählen");
  const classSection = document.createElement("section");
  classSection.className = "property-section class-catalog-master-section class-catalog-content-panel";
  classSection.id = "classCatalogClassesPanel";
  classSection.setAttribute("role", "tabpanel");
  const classSectionIntro = document.createElement("p");
  classSectionIntro.textContent = "Fügen Sie zuerst eine Klassenstufe hinzu und erstellen Sie darin die einzelnen Klassen.";
  const addGrade = document.createElement("button");
  addGrade.type = "button";
  addGrade.className = "secondary-button primary-action";
  addGrade.disabled = !activeClassSchoolId;
  addGrade.textContent = "Klassenstufe hinzufügen";
  addGrade.addEventListener("click", () => openClassCatalogDialog(project, "catalog-grade"));
  const importGrade = document.createElement("button");
  importGrade.type = "button";
  importGrade.className = "secondary-button";
  importGrade.disabled = !activeClassSchoolId;
  importGrade.textContent = "Klassenstufe importieren";
  importGrade.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.addEventListener("change", () => {
      const [file] = input.files || [];
      if (file) void importClassGrade(project, file, importGrade);
    }, { once: true });
    input.click();
  });
  const gradeActions = document.createElement("div");
  gradeActions.className = "class-catalog-grade-actions";
  gradeActions.append(addGrade, importGrade);
  const gradeList = document.createElement("div");
  gradeList.className = "class-catalog-grade-list";
  const visibleGrades = layer.grades.filter((grade) => grade.schoolId === activeClassSchoolId);
  if (!visibleGrades.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch keine Klassenstufe angelegt.";
    gradeList.append(empty);
  } else {
    visibleGrades.slice().sort((a, b) => Number(a.name) - Number(b.name)).forEach((grade) => {
      const gradeCard = document.createElement("section");
      gradeCard.className = "class-catalog-grade";
      gradeCard.dataset.classCatalogGradeId = grade.id;
      const gradeHead = document.createElement("div");
      gradeHead.className = "class-catalog-grade-head";
      const gradeTitle = document.createElement("strong");
      gradeTitle.textContent = `${grade.name}. Klassenstufe`;
      gradeHead.append(gradeTitle, createClassCatalogMenu(project, "catalog-grade", null, grade));
      const classList = document.createElement("div");
      classList.className = "class-catalog-class-list";
      grade.classes.slice().sort((a, b) => String(a.suffix || "").localeCompare(String(b.suffix || ""), "de", {
        sensitivity: "base",
        numeric: true
      })).forEach((classEntry) => {
        const row = document.createElement("div");
        row.className = "class-catalog-class";
        const name = document.createElement("span");
        name.className = "class-catalog-class-name";
        renderClassDisplay(name, grade.name, classEntry.suffix, classEntry.displayMode);
        const metadata = document.createElement("div");
        metadata.className = "class-catalog-class-meta";
        const teacher = document.createElement("button");
        teacher.type = "button";
        teacher.className = "class-catalog-class-detail";
        const teacherNames = (classEntry.teachers || []).filter(Boolean);
        teacher.textContent = teacherNames.length ? teacherNames.join(" / ") : "Klassenlehrer fehlt";
        teacher.title = "Allgemeine Klassendaten öffnen";
        teacher.addEventListener("click", () => openClassCatalogDialog(project, "catalog-class", null, grade, classEntry, "general"));
        const students = document.createElement("button");
        students.type = "button";
        students.className = "class-catalog-class-detail is-students";
        const studentCount = (classEntry.students || []).length;
        students.textContent = `${studentCount} Schüler`;
        students.title = "Schülerliste öffnen";
        students.addEventListener("click", () => openClassCatalogDialog(project, "catalog-class", null, grade, classEntry, "students"));
        metadata.append(teacher, students);
        row.append(name, metadata, createClassCatalogMenu(project, "catalog-class", null, grade, classEntry));
        classList.append(row);
      });
      const addClass = document.createElement("button");
      addClass.type = "button";
      addClass.className = "secondary-button class-catalog-add-class";
      addClass.textContent = "Klasse erstellen";
      addClass.addEventListener("click", () => openClassCatalogDialog(project, "catalog-class", null, grade));
      gradeCard.append(gradeHead, classList, addClass);
      gradeList.append(gradeCard);
    });
  }
  classSection.append(classSectionIntro, gradeActions, gradeList);

  const subjectSection = document.createElement("section");
  subjectSection.className = "property-section class-catalog-content-panel";
  subjectSection.id = "classCatalogSubjectsPanel";
  subjectSection.setAttribute("role", "tabpanel");
  const subjectSectionIntro = document.createElement("p");
  subjectSectionIntro.textContent = "Fächer bleiben als unabhängige Stammdaten erhalten. Die Zuordnung zu Klassen und Kursen folgt im nächsten Schritt.";
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
      const subjectCard = document.createElement("section");
      subjectCard.className = "class-catalog-subject";
      subjectCard.dataset.classCatalogSubjectId = subject.id;
      const subjectHead = document.createElement("div");
      subjectHead.className = "appointment-group-head class-catalog-subject-head";
      const subjectTitle = document.createElement("h3");
      subjectTitle.textContent = subject.name;
      subjectHead.append(subjectTitle, createClassCatalogMenu(project, "subject", subject));
      const assignedClasses = document.createElement("div");
      assignedClasses.className = "class-subject-assignment-pills";
      const catalogClasses = getSchoolCatalogClasses(project, subject.schoolId);
      const courseClassIds = new Set((subject.courses || []).flatMap((course) => course.classIds || []));
      const visibleClassIds = new Set((subject.classIds || []).filter((classId) => !courseClassIds.has(classId)));
      const selectedClasses = catalogClasses.filter(({ classEntry }) => visibleClassIds.has(classEntry.id));
      if (selectedClasses.length) {
        selectedClasses.forEach(({ grade, classEntry }) => {
          const row = document.createElement("div");
          row.className = "class-subject-assignment-pill is-class";
          const name = document.createElement("strong");
          renderClassDisplay(name, grade.name, classEntry.suffix, classEntry.displayMode);
          row.append(name);
          assignedClasses.append(row);
        });
      }
      const subjectActions = document.createElement("div");
      subjectActions.className = "class-subject-actions";
      const assignClasses = document.createElement("button");
      assignClasses.type = "button";
      assignClasses.className = "secondary-button";
      assignClasses.textContent = "Klassen zuweisen";
      assignClasses.addEventListener("click", () => openSubjectClassSelectionDialog(project, subject, subject.classIds, (ids) => {
        subject.classIds = ids;
        saveProjects();
        renderClassCatalogProperties(project);
      }));
      const addCourse = document.createElement("button");
      addCourse.type = "button";
      addCourse.className = "secondary-button";
      addCourse.textContent = "Kurs erstellen";
      addCourse.addEventListener("click", () => openCourseDialog(project, subject));
      subjectActions.append(assignClasses, addCourse);
      const courseRows = [];
      (subject.courses || []).forEach((course) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "class-subject-assignment-pill is-course";
        row.title = `${course.name} bearbeiten`;
        row.setAttribute("aria-label", `${course.name} bearbeiten`);
        const courseName = document.createElement("strong");
        courseName.textContent = course.name;
        const courseClasses = document.createElement("small");
        const assignedCourseClasses = catalogClasses.filter(({ classEntry }) => course.classIds.includes(classEntry.id));
        assignedCourseClasses.forEach(({ grade, classEntry }, index) => {
          if (index) courseClasses.append(document.createTextNode(", "));
          const className = document.createElement("span");
          renderClassDisplay(className, grade.name, classEntry.suffix, classEntry.displayMode);
          courseClasses.append(className);
        });
        if (course.studentIds.length) {
          courseClasses.append(document.createTextNode(`${assignedCourseClasses.length ? " · " : ""}${course.studentIds.length} Schüler`));
        }
        row.append(courseName, courseClasses);
        row.addEventListener("click", () => openCourseDialog(project, subject, course));
        courseRows.push(row);
      });
      assignedClasses.prepend(...courseRows);
      subjectCard.append(subjectHead, subjectActions, assignedClasses);
      subjectList.append(subjectCard);
    });
  }
  subjectSection.append(subjectSectionIntro, addSubject, subjectList);
  [
    { id: "classes", label: "Klassen", panel: classSection },
    { id: "subjects", label: "Fächer", panel: subjectSection }
  ].forEach(({ id, label, panel }) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.id = `classCatalog${id === "classes" ? "Classes" : "Subjects"}Tab`;
    tab.textContent = label;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    tab.setAttribute("aria-selected", String(activeClassCatalogTab === id));
    panel.setAttribute("aria-labelledby", tab.id);
    panel.hidden = activeClassCatalogTab !== id;
    tab.addEventListener("click", () => {
      activeClassCatalogTab = id;
      contentTabs.querySelectorAll('[role="tab"]').forEach((entry) => entry.setAttribute("aria-selected", String(entry === tab)));
      classSection.hidden = id !== "classes";
      subjectSection.hidden = id !== "subjects";
    });
    contentTabs.append(tab);
  });
  sheet.append(head, schoolTabs, contentTabs, classSection, subjectSection);
  projectDetail.replaceChildren(sheet);
  if (pendingClassCatalogScrollTarget?.projectId === project.id
    && pendingClassCatalogScrollTarget.schoolId === activeClassSchoolId) {
    const target = pendingClassCatalogScrollTarget;
    pendingClassCatalogScrollTarget = null;
    requestAnimationFrame(() => {
      const selector = target.type === "grade"
        ? `[data-class-catalog-grade-id="${CSS.escape(target.id)}"]`
        : `[data-class-catalog-subject-id="${CSS.escape(target.id)}"]`;
      projectDetail.querySelector(selector)?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }
  saveProjects();
}

function syncLessonCatalogLabels(project) {
  const catalog = getClassCatalogData(project);
  const schedules = project.layers?.find((entry) => entry.type === "schedules")?.schedules;
  if (!Array.isArray(catalog?.subjects) || !Array.isArray(schedules)) return;
  schedules.forEach((schedule) => {
    (Array.isArray(schedule.lessons) ? schedule.lessons : []).forEach((lesson) => {
      const subject = catalog.subjects.find((entry) => entry.id === lesson.subjectId);
      if (!subject) return;
      lesson.subject = subject.name;
      for (const grade of Array.isArray(catalog.grades) ? catalog.grades : []) {
        if (grade.schoolId && subject.schoolId && grade.schoolId !== subject.schoolId) continue;
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

function ensureScheduleVersions(project) {
  const layer = getProjectLayer(project, "schedules");
  layer.schedules = Array.isArray(layer.schedules) ? layer.schedules : [];
  layer.versions = Array.isArray(layer.versions) ? layer.versions : [];
  if (!layer.versions.length) {
    const starts = layer.schedules.map((schedule) => schedule.validFrom).filter(Boolean).sort();
    const ends = layer.schedules.map((schedule) => schedule.validUntil).filter(Boolean).sort();
    const validFrom = starts[0] || project.calendarRange?.startDate || project.periods?.schoolYear?.startDate || "";
    const validUntil = ends.at(-1) || project.calendarRange?.endDate || project.periods?.schoolYear?.endDate || "";
    layer.versions.push({
      id: globalThis.crypto?.randomUUID?.() ?? `schedule-version-${Date.now()}`,
      name: "Stundenplan 1",
      validFrom,
      validUntil,
      validityPending: !(validFrom && validUntil),
      createdAt: project.createdAt || new Date().toISOString()
    });
  }
  const versionIds = new Set(layer.versions.map((version) => version.id));
  layer.schedules.forEach((schedule) => {
    if (!versionIds.has(schedule.versionId)) schedule.versionId = layer.versions[0].id;
  });
  return layer.versions;
}

function ensureSupervisionVersions(project) {
  const layer = getProjectLayer(project, "schedules");
  layer.supervisionVersions = Array.isArray(layer.supervisionVersions) ? layer.supervisionVersions : [];
  if (!layer.supervisionVersions.length) {
    const range = getProjectCalendarRange(project);
    layer.supervisionVersions.push({
      id: globalThis.crypto?.randomUUID?.() ?? `supervision-version-${Date.now()}`,
      name: "Aufsichtsplan 1",
      schoolId: ensureSchools(project)[0]?.id || "",
      validFrom: range.startDate || "",
      validUntil: range.endDate || "",
      activeDays: [1, 2, 3, 4, 5],
      entries: [],
      createdAt: new Date().toISOString()
    });
  }
  layer.supervisionVersions.forEach((version) => {
    version.activeDays = Array.isArray(version.activeDays) ? version.activeDays : [1, 2, 3, 4, 5];
    version.entries = Array.isArray(version.entries) ? version.entries : [];
  });
  return layer.supervisionVersions;
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
  (catalog?.grades || []).forEach((grade) => {
    if (!grade.schoolId) grade.schoolId = firstSchool?.id || null;
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

function deleteScheduleVersion(projectId, versionId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "schedules");
  if (!project || !layer) return;
  ensureScheduleVersions(project);
  if (layer.versions.length <= 1) {
    window.alert("Mindestens eine Stundenplanversion muss erhalten bleiben.");
    return;
  }
  layer.versions = layer.versions.filter((version) => version.id !== versionId);
  layer.schedules = (layer.schedules || []).filter((schedule) => schedule.versionId !== versionId);
  expandedLayerKeys.delete(`${projectId}:schedules:version:${versionId}`);
  localStorage.setItem(EXPANDED_LAYERS_STORAGE_KEY, JSON.stringify([...expandedLayerKeys]));
  if (activeScheduleVersionId === versionId) {
    activeScheduleVersionId = layer.versions[0]?.id || null;
    activeScheduleId = null;
  }
  saveProjects();
  renderProjectBrowser();
  renderSchedulesProperties(project);
  renderActiveCalendar(project);
}

function deleteSupervisionVersion(projectId, versionId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "schedules");
  if (!project || !layer) return;
  const versions = ensureSupervisionVersions(project);
  if (versions.length <= 1) {
    window.alert("Mindestens eine Aufsichtsplan-Version muss erhalten bleiben.");
    return;
  }
  layer.supervisionVersions = versions.filter((version) => version.id !== versionId);
  if (activeSupervisionVersionId === versionId) activeSupervisionVersionId = layer.supervisionVersions[0]?.id || null;
  saveProjects();
  renderProjectBrowser();
  renderSupervisionsProperties(project);
  renderActiveCalendar(project);
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
  renderProjectBrowser();
  renderClassProjectsIntroduction(project);
  renderActiveCalendar(project);
}

function deleteSchool(projectId, schoolId) {
  const project = projects.find((entry) => entry.id === projectId);
  const schoolLayer = project?.layers?.find((entry) => entry.type === "holidays");
  if (!project || !schoolLayer) return;
  const schedules = project.layers?.find((entry) => entry.type === "schedules")?.schedules || [];
  const subjects = project.layers?.find((entry) => entry.type === "classCatalog")?.subjects || [];
  const grades = project.layers?.find((entry) => entry.type === "classCatalog")?.grades || [];
  if (schedules.some((entry) => entry.schoolId === schoolId) || subjects.some((entry) => entry.schoolId === schoolId) || grades.some((entry) => entry.schoolId === schoolId)) {
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
  const deletedProject = projects.find((project) => project.id === projectId);
  if (!deletedProject) return;
  projects = projects.filter((project) => project.id !== projectId);
  projectFolders = projectFolders.filter((folder) => folder.id !== deletedProject.folderId);
  expandedProjectFolderIds.delete(deletedProject.folderId);
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
  if (activeProjectFolderId === deletedProject.folderId) activeProjectFolderId = null;
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

function deleteAppointmentProject(projectId, groupId, appointmentProjectId, layerType = "appointments") {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === layerType);
  const group = layer?.groups?.find((entry) => entry.id === groupId);
  if (!project || !group || !Array.isArray(group.projects)) return;
  group.projects = group.projects.filter((entry) => entry.id !== appointmentProjectId);
  saveProjects();
  if (layerType === "individual") renderIndividualProjectsProperties(project);
  else renderAppointmentsProperties(project);
  renderActiveCalendar(project);
}

function deleteAppointmentTodo(projectId, groupId, appointmentProjectId, appointmentTodoId, layerType = "appointments") {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === layerType);
  const group = layer?.groups?.find((entry) => entry.id === groupId);
  const appointmentProject = group?.projects?.find((entry) => entry.id === appointmentProjectId);
  if (!project || !appointmentProject || !Array.isArray(appointmentProject.todos)) return;
  appointmentProject.todos = appointmentProject.todos.filter((entry) => entry.id !== appointmentTodoId);
  saveProjects();
  if (layerType === "individual") renderIndividualProjectsProperties(project);
  else renderAppointmentsProperties(project);
}

function deleteAppointment(projectId, groupId, appointmentId, layerType = "appointments", appointmentProjectId = "") {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === layerType);
  const group = layer?.groups?.find((entry) => entry.id === groupId);
  const appointmentContainer = appointmentProjectId
    ? group?.projects?.find((entry) => entry.id === appointmentProjectId)
    : group;
  if (!project || !appointmentContainer || !Array.isArray(appointmentContainer.appointments)) return;
  appointmentContainer.appointments = appointmentContainer.appointments.filter((entry) => entry.id !== appointmentId);
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
  if (activeLayerType === "individual") renderIndividualProjectsProperties(project);
  else renderSicknessProperties(project);
  renderActiveCalendar(project);
}

function deleteClassCatalogEntry(projectId, type, subjectId, gradeId, classId) {
  const project = projects.find((entry) => entry.id === projectId);
  const layer = project?.layers?.find((entry) => entry.type === "classCatalog");
  if (!project || !layer || !Array.isArray(layer.subjects)) return;
  if (type === "catalog-grade") {
    layer.grades = (layer.grades || []).filter((entry) => entry.id !== gradeId);
  } else if (type === "catalog-class") {
    const grade = (layer.grades || []).find((entry) => entry.id === gradeId);
    if (grade) grade.classes = (grade.classes || []).filter((entry) => entry.id !== classId);
    layer.subjects.forEach((subject) => {
      subject.classIds = (subject.classIds || []).filter((id) => id !== classId);
      (subject.courses || []).forEach((course) => { course.classIds = (course.classIds || []).filter((id) => id !== classId); });
    });
  } else if (type === "subject") layer.subjects = layer.subjects.filter((entry) => entry.id !== subjectId);
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
    scheduleVersionId: button.dataset.scheduleVersionId,
    supervisionVersionId: button.dataset.supervisionVersionId,
    scheduleId: button.dataset.scheduleId,
    lessonId: button.dataset.lessonId,
    tripId: button.dataset.tripId,
    appointmentGroupId: button.dataset.appointmentGroupId,
    appointmentProjectId: button.dataset.appointmentProjectId,
    appointmentTodoId: button.dataset.appointmentTodoId,
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
    scheduleVersionId,
    supervisionVersionId,
    scheduleId,
    lessonId,
    tripId,
    appointmentGroupId,
    appointmentProjectId,
    appointmentTodoId,
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
  else if (scheduleVersionId) deleteScheduleVersion(projectId, scheduleVersionId);
  else if (supervisionVersionId) deleteSupervisionVersion(projectId, supervisionVersionId);
  else if (schoolId) deleteSchool(projectId, schoolId);
  else if (holidayScopeType) deleteHolidayScope(projectId, holidayScopeType);
  else if (classProjectId) deleteClassProject(projectId, classProjectId);
  else if (lessonId) deleteLesson(projectId, scheduleId, lessonId);
  else if (catalogType) deleteClassCatalogEntry(projectId, catalogType, catalogSubjectId, catalogGradeId, catalogClassId);
  else if (sicknessId) deleteSickness(projectId, sicknessId);
  else if (appointmentTodoId) deleteAppointmentTodo(projectId, appointmentGroupId, appointmentProjectId, appointmentTodoId, appointmentLayerType);
  else if (appointmentId) deleteAppointment(projectId, appointmentGroupId, appointmentId, appointmentLayerType, appointmentProjectId);
  else if (appointmentProjectId) deleteAppointmentProject(projectId, appointmentGroupId, appointmentProjectId, appointmentLayerType);
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

function serializeScheduleLogic(project, schedule) {
  const school = getSchool(project, schedule.schoolId);
  return {
    name: schedule.name,
    schoolId: schedule.schoolId || null,
    schoolName: school?.name || "",
    activeDays: structuredClone(getScheduleActiveDays(schedule)),
    displayDefaults: structuredClone(schedule.displayDefaults || {}),
    displayRows: structuredClone(schedule.displayRows || []),
    pauseDefaultsInitialized: Boolean(schedule.pauseDefaultsInitialized)
  };
}

function exportScheduleLogics(project) {
  const layer = getProjectLayer(project, "schedules");
  ensureScheduleVersions(project);
  const schedules = (layer.schedules || []).filter((schedule) => !activeScheduleVersionId || schedule.versionId === activeScheduleVersionId);
  if (!schedules.length) {
    window.alert("Es ist noch keine Stundenplanlogik vorhanden.");
    return;
  }
  const payload = {
    type: "schola-stundenplan-logics",
    version: 2,
    exportedAt: new Date().toISOString(),
    projectName: project.name,
    logics: schedules.map((schedule) => serializeScheduleLogic(project, schedule))
  };
  downloadExportFile(
    JSON.stringify(payload, null, 2),
    `${makeExportFilename(project.name)}.stundenplanlogiken.json`,
    "application/json;charset=utf-8"
  );
}

function openScheduleLogicExport(project) {
  exportScheduleLogics(project);
}

async function importScheduleLogicFile(project, file) {
  let payload;
  try { payload = JSON.parse(await file.text()); }
  catch { throw new Error("Die ausgewählte Datei enthält kein gültiges JSON."); }
  const isLegacyExport = payload?.type === "schola-stundenplan-logic" && Number(payload.version) === 1 && payload.logic;
  const isCombinedExport = payload?.type === "schola-stundenplan-logics" && Number(payload.version) === 2 && Array.isArray(payload.logics);
  if (!isLegacyExport && !isCombinedExport) {
    throw new Error("Die Datei ist keine gültige exportierte Stundenplanlogik.");
  }
  const sources = isLegacyExport ? [payload.logic] : payload.logics;
  if (!sources.length) throw new Error("Die Datei enthält keine Stundenplanlogik.");
  const schools = ensureSchools(project);
  if (!schools.length) throw new Error("Bitte legen Sie vor dem Import mindestens eine Schule an.");
  const normalizedSources = sources.map((source) => {
    const rows = Array.isArray(source.displayRows) ? source.displayRows : [];
    if (!rows.length || rows.some((row) => (
      !["lesson", "break"].includes(row.type)
      || !String(row.label || "").trim()
      || !isValidTimeValue(row.start)
      || !isValidTimeValue(row.end)
      || row.end <= row.start
    ))) throw new Error(`Die Logik „${source.name || "Unbenannt"}“ enthält kein gültiges Stunden- und Pausenraster.`);
    return { source, rows };
  });
  const layer = getProjectLayer(project, "schedules");
  ensureScheduleVersions(project);
  const targetVersionId = activeScheduleVersionId || layer.versions[0].id;
  layer.schedules = Array.isArray(layer.schedules) ? layer.schedules : [];
  const importedSchedules = normalizedSources.map(({ source, rows }, sourceIndex) => {
    const school = schools.find((entry) => entry.id === source.schoolId)
      || schools.find((entry) => source.schoolName && entry.name === source.schoolName)
      || schools[0];
    const period = getScheduleValidityPeriods(project, school.id)[0];
    const defaults = getDefaultScheduleValidity(project, school.id);
    return {
      id: globalThis.crypto?.randomUUID?.() ?? `schedule-${Date.now()}-${sourceIndex}`,
      versionId: targetVersionId,
      name: String(source.name || "Importierte Planlogik").slice(0, 80),
      schoolId: school.id,
      validityPeriodId: period?.id || "schoolYear",
      validFrom: period?.startDate || defaults.validFrom,
      validUntil: period?.endDate || defaults.validUntil,
      activeDays: Array.isArray(source.activeDays) ? source.activeDays.map(Number).filter((day) => day >= 1 && day <= 7) : [1, 2, 3, 4, 5],
      displayDefaults: structuredClone(source.displayDefaults || {}),
      displayRows: rows.map((row, index) => ({
        id: globalThis.crypto?.randomUUID?.() ?? `display-${Date.now()}-${sourceIndex}-${index}`,
        type: row.type,
        label: String(row.label).slice(0, 50),
        start: row.start,
        end: row.end
      })),
      pauseDefaultsInitialized: source.pauseDefaultsInitialized !== false,
      lessons: [],
      importedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
  });
  layer.schedules.push(...importedSchedules);
  activeScheduleVersionId = targetVersionId;
  activeScheduleId = importedSchedules.at(-1)?.id || null;
  saveProjects();
  renderProjectBrowser();
  renderSchedulesProperties(project);
  renderActiveCalendar(project);
}

function openScheduleLogicImport(project) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,.stundenplanlogik.json,application/json";
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    try { await importScheduleLogicFile(project, file); }
    catch (error) { window.alert(error.message || "Die Stundenplanlogik konnte nicht importiert werden."); }
  }, { once: true });
  input.click();
}

function createScheduleLogicTransferMenu(project) {
  const shell = document.createElement("div");
  shell.className = "schedule-menu-shell schedule-transfer-menu";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "schedule-menu-button";
  button.setAttribute("aria-label", "Menü für Stundenplanlogiken");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "<span aria-hidden=\"true\"></span>";
  const menu = document.createElement("div");
  menu.className = "schedule-menu";
  menu.hidden = true;
  const exportButton = document.createElement("button");
  exportButton.type = "button";
  exportButton.textContent = "Exportieren";
  exportButton.addEventListener("click", () => { menu.hidden = true; openScheduleLogicExport(project); });
  const importButton = document.createElement("button");
  importButton.type = "button";
  importButton.textContent = "Importieren";
  importButton.addEventListener("click", () => { menu.hidden = true; openScheduleLogicImport(project); });
  button.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    button.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(exportButton, importButton);
  shell.append(button, menu);
  return shell;
}

function openSubstitutionDialog(project, substitution = null) {
  let selectedKeys = substitution ? getStoredClassTargetKeys(project, substitution) : [];
  const initialManualClassName = substitution?.manualClassName
    || (!selectedKeys.length ? substitution?.className || "" : "");
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog substitution-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  heading.innerHTML = `<span class="label">Vertretungen</span><h2>${substitution ? "Vertretungsstunde bearbeiten" : "Vertretungsstunde hinzufügen"}</h2>`;
  const fields = document.createElement("div");
  fields.className = "substitution-dialog-grid";
  const makeField = (labelText, type, value = "") => {
    const label = document.createElement("label");
    label.className = "dialog-field";
    const caption = document.createElement("span");
    caption.textContent = labelText;
    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.required = type !== "text" || labelText !== "Raum";
    label.append(caption, input);
    return { label, input };
  };
  const date = makeField("Datum", "date", substitution?.date || "");
  const start = makeField("von", "time", substitution?.startTime || "");
  const end = makeField("bis", "time", substitution?.endTime || "");
  const room = makeField("Raum", "text", substitution?.room || "");
  room.input.maxLength = 40;
  const subject = makeField("Fach", "text", substitution?.subject || "");
  subject.input.maxLength = 80;
  subject.label.classList.add("substitution-subject-field");
  fields.append(date.label, start.label, end.label, room.label, subject.label);
  const classSection = document.createElement("section");
  classSection.className = "substitution-class-section";
  const classHead = document.createElement("div");
  classHead.className = "schedule-title-line";
  const classTitle = document.createElement("strong");
  classTitle.textContent = "Klasse";
  const chooseClass = document.createElement("button");
  chooseClass.type = "button";
  chooseClass.className = "secondary-button";
  chooseClass.textContent = "Klasse auswählen";
  const summary = document.createElement("div");
  summary.className = "class-project-target-summary";
  renderClassTargetSummary(summary, getConfiguredClassGroups(project), selectedKeys);
  const manualClassLabel = document.createElement("label");
  manualClassLabel.className = "dialog-field substitution-manual-class-field";
  const manualClassCaption = document.createElement("span");
  manualClassCaption.textContent = "Klasse manuell eingeben";
  const manualClass = document.createElement("input");
  manualClass.type = "text";
  manualClass.maxLength = 60;
  manualClass.placeholder = "z. B. 7d oder Grundkurs Biologie";
  manualClass.value = initialManualClassName;
  const manualClassHint = document.createElement("small");
  manualClassHint.textContent = "Für Vertretungsklassen, die nicht im Klassenkatalog geführt werden sollen.";
  manualClassLabel.append(manualClassCaption, manualClass, manualClassHint);
  chooseClass.addEventListener("click", () => openClassTargetPicker(project, selectedKeys, (keys, groups) => {
    selectedKeys = keys;
    if (selectedKeys.length) manualClass.value = "";
    renderClassTargetSummary(summary, groups, selectedKeys);
  }, "Vertretungsstunde"));
  manualClass.addEventListener("input", () => {
    if (!manualClass.value.trim() || !selectedKeys.length) return;
    selectedKeys = [];
    renderClassTargetSummary(summary, getConfiguredClassGroups(project), selectedKeys);
  });
  classHead.append(classTitle, chooseClass);
  classSection.append(classHead, summary, manualClassLabel);
  const status = document.createElement("p");
  status.className = "property-status";
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
  submit.textContent = substitution ? "Änderungen speichern" : "Vertretungsstunde hinzufügen";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const manualClassName = manualClass.value.trim();
    if (!date.input.value || !start.input.value || !end.input.value || end.input.value <= start.input.value || (!selectedKeys.length && !manualClassName)) {
      status.textContent = "Bitte Datum, gültige Uhrzeiten und eine ausgewählte oder manuell eingetragene Klasse angeben.";
      return;
    }
    const layer = getProjectLayer(project, "schedules");
    layer.substitutions = Array.isArray(layer.substitutions) ? layer.substitutions : [];
    const targets = getSerializedClassTargets(project, selectedKeys);
    const values = {
      date: date.input.value,
      startTime: start.input.value,
      endTime: end.input.value,
      room: room.input.value.trim(),
      subject: subject.input.value.trim(),
      ...targets,
      schoolId: targets.classGroups?.[0]?.schoolId || "",
      className: manualClassName || targets.classNames?.[0] || "",
      classNames: manualClassName ? [manualClassName] : targets.classNames,
      manualClassName
    };
    if (substitution) Object.assign(substitution, values);
    else layer.substitutions.unshift({ id: globalThis.crypto?.randomUUID?.() ?? `substitution-${Date.now()}`, ...values, createdAt: new Date().toISOString() });
    saveProjects();
    dialog.close();
    renderProjectBrowser();
    renderSubstitutionsProperties(project);
    renderActiveCalendar(project);
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, fields, classSection, status, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
}

function openSupervisionDialog(project, version, supervision = null, defaults = {}) {
  const dialog = document.createElement("dialog");
  dialog.className = "project-dialog substitution-dialog";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("div");
  heading.innerHTML = `<span class="label">${escapeHtml(version.name)}</span><h2>${supervision ? "Aufsicht bearbeiten" : "Aufsicht hinzufügen"}</h2>`;
  const grid = document.createElement("div");
  grid.className = "substitution-dialog-grid supervision-dialog-grid";
  const dayLabel = document.createElement("label");
  dayLabel.className = "dialog-field";
  dayLabel.innerHTML = "<span>Wochentag</span>";
  const day = document.createElement("select");
  weekdayNames.forEach((name, index) => {
    const option = document.createElement("option");
    option.value = String(index + 1);
    option.textContent = name;
    option.selected = Number(supervision?.day || defaults.day || version.activeDays[0] || 1) === index + 1;
    option.disabled = !version.activeDays.includes(index + 1);
    day.append(option);
  });
  dayLabel.append(createSelectShell(day));
  const makeField = (caption, type, value = "") => {
    const label = document.createElement("label");
    label.className = "dialog-field";
    const span = document.createElement("span");
    span.textContent = caption;
    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.required = true;
    label.append(span, input);
    return { label, input };
  };
  const start = makeField("von", "time", supervision?.startTime || defaults.startTime || "");
  const end = makeField("bis", "time", supervision?.endTime || defaults.endTime || "");
  const location = makeField("Ort", "text", supervision?.location || "");
  location.input.maxLength = 80;
  grid.append(dayLabel, start.label, end.label, location.label);
  let selectedColor = supervision?.color || "#bfd2e2";
  const colorField = document.createElement("fieldset");
  colorField.className = "lesson-color-field supervision-color-field";
  const colorLegend = document.createElement("legend");
  colorLegend.textContent = "Farbe";
  const colorPalette = document.createElement("div");
  colorPalette.className = "lesson-color-palette";
  const setSelectedColor = (color) => {
    selectedColor = color;
    [...colorPalette.children].forEach((swatch) => {
      const isActive = swatch.dataset.color === color;
      swatch.classList.toggle("is-active", isActive);
      swatch.setAttribute("aria-pressed", String(isActive));
    });
  };
  LESSON_COLORS.forEach(([color, name]) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "lesson-color-swatch";
    swatch.dataset.color = color;
    swatch.style.setProperty("--swatch-color", color);
    swatch.setAttribute("aria-label", name);
    swatch.addEventListener("click", () => setSelectedColor(color));
    colorPalette.append(swatch);
  });
  colorField.append(colorLegend, colorPalette);
  setSelectedColor(selectedColor);
  const status = document.createElement("p");
  status.className = "property-status";
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
  submit.textContent = supervision ? "Änderungen speichern" : "Aufsicht hinzufügen";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!day.value || !start.input.value || !end.input.value || end.input.value <= start.input.value || !location.input.value.trim()) {
      status.textContent = "Bitte Wochentag, gültige Uhrzeiten und einen Ort eintragen.";
      return;
    }
    const values = { day: Number(day.value), startTime: start.input.value, endTime: end.input.value, location: location.input.value.trim(), color: selectedColor };
    if (supervision) Object.assign(supervision, values);
    else version.entries.unshift({ id: globalThis.crypto?.randomUUID?.() ?? `supervision-${Date.now()}`, ...values, createdAt: new Date().toISOString() });
    saveProjects();
    dialog.close();
    renderSupervisionsProperties(project);
    renderActiveCalendar(project);
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  actions.append(cancel, submit);
  form.append(heading, grid, colorField, status, actions);
  dialog.append(form);
  document.body.append(dialog);
  dialog.showModal();
}

function renderSupervisionWeekGrid(project, version) {
  const shell = document.createElement("div");
  shell.className = "supervision-week-grid-shell";
  const grid = document.createElement("div");
  grid.className = "supervision-week-grid";
  const corner = document.createElement("div");
  corner.className = "supervision-grid-corner";
  corner.textContent = "Zeit";
  grid.append(corner);
  version.activeDays.forEach((dayNumber) => {
    const heading = document.createElement("div");
    heading.className = "supervision-grid-day";
    heading.textContent = weekdayNames[dayNumber - 1];
    grid.append(heading);
  });
  for (let hour = 7; hour < 18; hour += 1) {
    const startTime = `${String(hour).padStart(2, "0")}:00`;
    const endTime = `${String(hour + 1).padStart(2, "0")}:00`;
    const time = document.createElement("div");
    time.className = "supervision-grid-time";
    time.textContent = `${startTime}–${endTime}`;
    grid.append(time);
    version.activeDays.forEach((dayNumber) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "supervision-grid-cell";
      cell.setAttribute("aria-label", `${weekdayNames[dayNumber - 1]}, ${startTime} bis ${endTime}: Aufsicht hinzufügen`);
      const entries = version.entries.filter((entry) => (
        Number(entry.day) === dayNumber
        && entry.startTime >= startTime
        && entry.startTime < endTime
      ));
      if (entries.length) {
        cell.classList.add("has-supervision");
        entries.forEach((entry) => {
          const item = document.createElement("span");
          item.className = "supervision-grid-entry";
          item.style.setProperty("--supervision-color", entry.color || "#bfd2e2");
          const startOffset = Math.max(0, timeToMinutes(entry.startTime) - timeToMinutes(startTime));
          const duration = Math.max(5, timeToMinutes(entry.endTime) - timeToMinutes(entry.startTime));
          item.style.top = `${(startOffset / 60) * 100}%`;
          item.style.height = `${(duration / 60) * 100}%`;
          item.innerHTML = `<strong>${escapeHtml(entry.location)}</strong><small>${entry.startTime}–${entry.endTime}</small>`;
          item.addEventListener("click", (event) => {
            event.stopPropagation();
            openSupervisionDialog(project, version, entry);
          });
          cell.append(item);
        });
      }
      cell.addEventListener("click", () => openSupervisionDialog(project, version, null, { day: dayNumber, startTime, endTime }));
      grid.append(cell);
    });
  }
  grid.style.setProperty("--supervision-days", String(version.activeDays.length));
  grid.style.minWidth = `${112 + (version.activeDays.length * 112)}px`;
  shell.append(grid);
  return shell;
}

function renderSupervisionsProperties(project) {
  detailPanelLabel.textContent = "Stundenpläne";
  detailPanelTitle.textContent = "Aufsichten";
  const versions = ensureSupervisionVersions(project);
  if (!versions.some((entry) => entry.id === activeSupervisionVersionId)) activeSupervisionVersionId = versions[0]?.id || null;
  const version = versions.find((entry) => entry.id === activeSupervisionVersionId);
  if (!version) return;
  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const intro = document.createElement("p");
  intro.textContent = "Aufsichten wiederholen sich an den ausgewählten Wochentagen innerhalb der Gültigkeit dieser Version. Zum Einrichten auf ein Zeitfeld im Wochenraster klicken; die genaue Zeit lässt sich anschließend im Dialog anpassen.";
  const settings = document.createElement("div");
  settings.className = "schedule-version-properties supervision-version-properties";
  const nameLabel = document.createElement("label");
  nameLabel.innerHTML = "<span>Bezeichnung</span>";
  const name = document.createElement("input");
  name.value = version.name;
  nameLabel.append(name);
  const schoolLabel = document.createElement("label");
  schoolLabel.innerHTML = "<span>Schule</span>";
  const school = document.createElement("select");
  ensureSchools(project).forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = entry.name;
    option.selected = entry.id === version.schoolId;
    school.append(option);
  });
  schoolLabel.append(createSelectShell(school));
  const fromLabel = document.createElement("label");
  fromLabel.innerHTML = "<span>Gültig von</span>";
  const from = document.createElement("input");
  from.type = "date";
  from.value = version.validFrom || "";
  fromLabel.append(from);
  const untilLabel = document.createElement("label");
  untilLabel.innerHTML = "<span>Gültig bis</span>";
  const until = document.createElement("input");
  until.type = "date";
  until.value = version.validUntil || "";
  untilLabel.append(until);
  settings.append(nameLabel, schoolLabel, fromLabel, untilLabel);
  const days = document.createElement("fieldset");
  days.className = "schedule-active-days";
  const legend = document.createElement("legend");
  legend.textContent = "Wochentage";
  const dayButtons = document.createElement("div");
  dayButtons.className = "lesson-day-buttons";
  weekdayNames.forEach((dayName, index) => {
    const dayNumber = index + 1;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = dayName;
    button.setAttribute("aria-pressed", String(version.activeDays.includes(dayNumber)));
    button.addEventListener("click", () => {
      if (version.activeDays.includes(dayNumber) && version.activeDays.length === 1) return;
      version.activeDays = version.activeDays.includes(dayNumber) ? version.activeDays.filter((entry) => entry !== dayNumber) : [...version.activeDays, dayNumber].sort();
      saveProjects();
      renderSupervisionsProperties(project);
      renderActiveCalendar(project);
    });
    dayButtons.append(button);
  });
  days.append(legend, dayButtons);
  const saveSettings = () => {
    if (!name.value.trim() || !from.value || !until.value || until.value < from.value) return;
    version.name = name.value.trim();
    version.schoolId = school.value;
    version.validFrom = from.value;
    version.validUntil = until.value;
    saveProjects();
    renderProjectBrowser();
    renderActiveCalendar(project);
  };
  [name, school, from, until].forEach((field) => field.addEventListener("change", saveSettings));
  const list = document.createElement("div");
  list.className = "substitution-list substitution-info-list";
  version.entries.forEach((entry) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "substitution-card";
    card.innerHTML = `<strong>${weekdayNames[Number(entry.day) - 1] || "Wochentag"}</strong><span>${entry.startTime}–${entry.endTime} · ${escapeHtml(entry.location)}</span>`;
    card.addEventListener("click", () => openSupervisionDialog(project, version, entry));
    list.append(card);
  });
  const weekGrid = renderSupervisionWeekGrid(project, version);
  sheet.append(intro, settings, days, weekGrid, list);
  projectDetail.replaceChildren(sheet);
}

function renderSubstitutionsProperties(project) {
  detailPanelLabel.textContent = "Stundenpläne";
  detailPanelTitle.textContent = "Vertretungen";
  const layer = getProjectLayer(project, "schedules");
  layer.substitutions = Array.isArray(layer.substitutions) ? layer.substitutions : [];
  const sheet = document.createElement("section");
  sheet.className = "property-sheet";
  const head = document.createElement("div");
  head.className = "property-sheet-head schedule-transfer-head";
  const intro = document.createElement("p");
  intro.textContent = "Hier stehen einzelne, nicht wiederkehrende Vertretungsstunden. Neu hinzugefügte Stunden erscheinen immer oben.";
  const add = document.createElement("button");
  add.type = "button";
  add.className = "secondary-button primary-action";
  add.textContent = "Vertretungsstunde hinzufügen";
  add.addEventListener("click", () => openSubstitutionDialog(project));
  head.append(intro, add);
  const list = document.createElement("div");
  list.className = "substitution-list";
  if (!layer.substitutions.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch keine Vertretungsstunden eingetragen.";
    list.append(empty);
  } else {
    const columns = document.createElement("div");
    columns.className = "substitution-info-head";
    ["Datum", "Zeit", "Klasse/Klassenstufe", "Raum", "Fach"].forEach((label) => {
      const column = document.createElement("span");
      column.textContent = label;
      columns.append(column);
    });
    list.append(columns);
    layer.substitutions.forEach((entry) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "substitution-card substitution-info-row";
      [
        ["Datum", formatGermanDate(entry.date)],
        ["Zeit", `${entry.startTime}–${entry.endTime}`],
        ["Klasse/Klassenstufe", entry.classNames?.join(", ") || entry.className || "–"],
        ["Raum", entry.room || "–"],
        ["Fach", entry.subject || "Vertretung"]
      ].forEach(([label, value]) => {
        const cell = document.createElement("span");
        cell.dataset.label = label;
        cell.textContent = value;
        card.append(cell);
      });
      card.addEventListener("click", () => openSubstitutionDialog(project, entry));
      list.append(card);
    });
  }
  sheet.append(head, list);
  projectDetail.replaceChildren(sheet);
}

function renderSchedulesProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Stundenpläne";
  const layer = getProjectLayer(project, "schedules");
  const schools = ensureSchools(project);
  layer.schedules = Array.isArray(layer.schedules) ? layer.schedules : [];
  const versions = ensureScheduleVersions(project);
  if (!versions.some((version) => version.id === activeScheduleVersionId)) activeScheduleVersionId = versions[0]?.id || null;
  const activeVersion = versions.find((version) => version.id === activeScheduleVersionId);
  const schedule = layer.schedules.find((entry) => entry.id === activeScheduleId);

  if (!schedule) {
    const sheet = document.createElement("section");
    sheet.className = "property-sheet";
    const head = document.createElement("div");
    head.className = "property-sheet-head";
    const headLine = document.createElement("div");
    headLine.className = "schedule-transfer-head";
    const intro = document.createElement("p");
    intro.textContent = "Diese Stundenplanversion umfasst alle unten angelegten Zeitlogiken. Ihr Gültigkeitszeitraum steuert die gemeinsame Darstellung im Kalender.";
    headLine.append(intro, createScheduleLogicTransferMenu(project));
    head.append(headLine);
    if (activeVersion) {
      const versionForm = document.createElement("div");
      versionForm.className = "schedule-version-properties";
      const nameLabel = document.createElement("label");
      nameLabel.innerHTML = "<span>Bezeichnung</span>";
      const nameInput = document.createElement("input");
      nameInput.value = activeVersion.name || "";
      nameLabel.append(nameInput);
      const fromLabel = document.createElement("label");
      fromLabel.innerHTML = "<span>Gültig von</span>";
      const fromInput = document.createElement("input");
      fromInput.type = "date";
      fromInput.value = activeVersion.validFrom || "";
      fromLabel.append(fromInput);
      const untilLabel = document.createElement("label");
      untilLabel.innerHTML = "<span>Gültig bis</span>";
      const untilInput = document.createElement("input");
      untilInput.type = "date";
      untilInput.value = activeVersion.validUntil || "";
      untilLabel.append(untilInput);
      const status = document.createElement("p");
      status.className = "property-status schedule-validity-hint";
      const updateVersion = () => {
        if (!nameInput.value.trim() || (fromInput.value && untilInput.value && untilInput.value < fromInput.value)) {
          status.textContent = "Bitte Bezeichnung und Gültigkeit vollständig und korrekt eintragen.";
          status.className = "property-status schedule-validity-hint is-error";
          return;
        }
        activeVersion.name = nameInput.value.trim();
        activeVersion.validFrom = fromInput.value;
        activeVersion.validUntil = untilInput.value;
        activeVersion.validityPending = !(fromInput.value && untilInput.value);
        status.textContent = activeVersion.validityPending ? "Diese Version bleibt bis zur vollständigen Gültigkeitsangabe im Kalender inaktiv." : "Automatisch gespeichert ✓";
        status.className = "property-status schedule-validity-hint";
        saveProjects();
        renderProjectBrowser();
        renderActiveCalendar(project);
      };
      nameInput.addEventListener("change", updateVersion);
      fromInput.addEventListener("change", updateVersion);
      untilInput.addEventListener("change", updateVersion);
      status.textContent = activeVersion.validityPending ? "Diese Version bleibt bis zur vollständigen Gültigkeitsangabe im Kalender inaktiv." : "";
      versionForm.append(nameLabel, fromLabel, untilLabel, status);
      head.append(versionForm);
    }
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
    const versionSchedules = layer.schedules.filter((entry) => entry.versionId === activeVersion?.id);
    if (versionSchedules.length) {
      versionSchedules.forEach((entry) => {
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
  const exportLogicButton = document.createElement("button");
  exportLogicButton.type = "button";
  exportLogicButton.textContent = "Exportieren";
  exportLogicButton.addEventListener("click", () => {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    openScheduleLogicExport(project);
  });
  const importLogicButton = document.createElement("button");
  importLogicButton.type = "button";
  importLogicButton.textContent = "Importieren";
  importLogicButton.addEventListener("click", () => {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    openScheduleLogicImport(project);
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
  menu.append(displayButton, exportLogicButton, importLogicButton, deleteButton);
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
  schoolSelect.addEventListener("change", () => {
    schedule.schoolId = schoolSelect.value;
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
      schedule.lessons.filter((lesson) => Number(lesson.day) === day).map((lesson) => ({ lesson, schedule }))
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
  if (reference.subjectId && reference.courseId) {
    return candidate.subjectId === reference.subjectId && candidate.courseId === reference.courseId;
  }
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
          Number(lesson.day) === weekday
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
        Number(lesson.day) === weekday
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
  const catalog = getClassCatalogData(project);
  const subject = catalog.subjects?.find((entry) => entry.id === lesson.subjectId);
  const course = subject?.courses?.find((entry) => entry.id === lesson.courseId);
  const grade = catalog.grades?.find((entry) => entry.id === lesson.gradeLevelId
    || (entry.classes || []).some((classEntry) => classEntry.id === lesson.classId || course?.classIds?.includes(classEntry.id)));
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
  const layer = getClassCatalogData(project);
  const subject = layer?.subjects?.find((entry) => entry.id === lessonSubject.value && (!schoolId || entry.schoolId === schoolId));
  const options = [];
  if (subject) {
    (Array.isArray(layer.grades) ? layer.grades : []).filter((grade) => !schoolId || grade.schoolId === schoolId).forEach((grade) => {
      (Array.isArray(grade.classes) ? grade.classes : []).filter((classEntry) => subject.classIds.includes(classEntry.id)).forEach((classEntry) => {
        const option = document.createElement("option");
        option.value = classEntry.id;
        option.textContent = `${classEntry.name} · ${grade.name}. Klassenstufe`;
        option.dataset.name = classEntry.name;
        option.dataset.gradeId = grade.id;
        option.dataset.displayMode = classEntry.displayMode || "normal";
        option.dataset.suffix = classEntry.suffix || "";
        option.dataset.targetType = "class";
        options.push(option);
      });
    });
    (subject.courses || []).forEach((course) => {
      const option = document.createElement("option");
      option.value = `course:${course.id}`;
      option.textContent = `${course.name} · Kurs`;
      option.dataset.name = course.name;
      option.dataset.courseId = course.id;
      option.dataset.classIds = (course.classIds || []).join(",");
      option.dataset.targetType = "course";
      options.push(option);
    });
  }
  const lessonTargetValue = lesson?.courseId ? `course:${lesson.courseId}` : lesson?.classId;
  if (lesson?.grade && !options.some((option) => option.value === lessonTargetValue)) {
    const legacy = document.createElement("option");
    legacy.value = lessonTargetValue || `legacy-class:${lesson.grade}`;
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
  lessonGrade.value = lessonTargetValue || options[0].value;
  updateLessonClassSelectionPreview(project);
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

function getLessonSeriesFingerprint(lesson) {
  return JSON.stringify({
    schoolId: lesson.schoolId || "",
    start: lesson.start || "",
    end: lesson.end || "",
    subjectId: lesson.subjectId || "",
    subject: lesson.subject || "",
    grade: lesson.grade || "",
    gradeLevelId: lesson.gradeLevelId || "",
    classId: lesson.classId || "",
    courseId: lesson.courseId || "",
    classIds: [...(lesson.classIds || [])].sort(),
    room: lesson.room || "",
    color: lesson.color || "",
    teachingForm: getLessonTeachingForm(lesson),
    abWeek: lesson.abWeek || "A",
    epochHalf: lesson.epochHalf || "first",
    phases: lesson.phases || []
  });
}

function getLessonSeriesMembers(schedule, lesson) {
  const lessons = Array.isArray(schedule.lessons) ? schedule.lessons : [];
  if (lesson.seriesId) return lessons.filter((entry) => entry.seriesId === lesson.seriesId);
  const fingerprint = getLessonSeriesFingerprint(lesson);
  return lessons.filter((entry) => !entry.seriesId && getLessonSeriesFingerprint(entry) === fingerprint);
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
  setLessonDays(getLessonSeriesMembers(schedule, lesson).map((entry) => entry.day));
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
lessonGrade.addEventListener("change", () => {
  const project = projects.find((entry) => entry.id === lessonDialog.dataset.projectId);
  updateLessonClassSelectionPreview(project);
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
  const initialParts = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(input.value) || ["", "", ""];
  const isRequired = input.required;
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
  hourInput.required = isRequired;
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
  minuteInput.required = isRequired;
  const nativeValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  const syncSegmentsFromValue = () => {
    const parts = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(nativeValue.get.call(input));
    hourInput.value = parts?.[1] || "";
    minuteInput.value = parts?.[2] || "";
  };
  Object.defineProperty(input, "value", {
    configurable: true,
    get: () => nativeValue.get.call(input),
    set: (value) => {
      nativeValue.set.call(input, value);
      syncSegmentsFromValue();
    }
  });
  input.form?.addEventListener("reset", () => requestAnimationFrame(syncSegmentsFromValue));
  [hourInput, minuteInput].forEach((segment) => segment.addEventListener("focus", () => segment.select()));
  const syncManualValue = () => {
    let hour = hourInput.value.replace(/\D/g, "").slice(0, 2);
    let minute = minuteInput.value.replace(/\D/g, "").slice(0, 2);
    if (hour.length === 2 && Number(hour) > 23) hour = "23";
    if (minute.length === 2 && Number(minute) > 59) minute = "59";
    hourInput.value = hour;
    minuteInput.value = minute;
    nativeValue.set.call(input, hour.length === 2 && minute.length === 2 ? `${hour}:${minute}` : "");
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

function enhanceFiveMinuteTimeInput(input) {
  if (!(input instanceof HTMLInputElement) || input.type !== "time" || input.closest(".five-minute-time-control")) return;
  const parent = input.parentNode;
  if (!parent) return;
  const nextSibling = input.nextSibling;
  const control = createFiveMinuteTimeControl(input);
  parent.insertBefore(control, nextSibling);
}

function enhanceFiveMinuteTimeInputs(root = document) {
  if (root instanceof HTMLInputElement) enhanceFiveMinuteTimeInput(root);
  root.querySelectorAll?.('input[type="time"]').forEach(enhanceFiveMinuteTimeInput);
}

enhanceFiveMinuteTimeInputs();
new MutationObserver((mutations) => {
  mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
    if (node instanceof Element) enhanceFiveMinuteTimeInputs(node);
  }));
}).observe(document.body, { childList: true, subtree: true });

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
    start.step = "60";
    start.value = row.start;
    start.required = true;
    start.setAttribute("aria-label", `${kind.textContent} Beginn`);
    start.addEventListener("input", () => {
      row.start = start.value;
      updateScheduleDisplayConflicts();
    });
    const end = document.createElement("input");
    end.type = "time";
    end.step = "60";
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
  const classGroups = getConfiguredClassGroups(project);
  const storedTargets = trip?.classGroups || [];
  classTripSelectedClassKeys = storedTargets.length
    ? storedTargets.map((stored) => classGroups.find((group) => group.key === stored.key
      || ((stored.classIds || []).some((id) => group.classIds.includes(id)) && group.targetType === (stored.targetType || "class")))?.key).filter(Boolean)
    : classGroups.filter((group) => group.targetType === "class" && (
      (trip?.classIds || []).some((id) => group.classIds.includes(id))
      || group.name === trip?.className
    )).map((group) => group.key);
  renderClassTargetSummary(classTripClassSummary, classGroups, classTripSelectedClassKeys);
  const timeDefaults = getIndividualEventTimeDefaults(project);
  if (trip) {
    classTripDialog.dataset.tripId = trip.id;
    classTripDialogTitle.textContent = "Klassenfahrt bearbeiten";
    classTripSubmitButton.textContent = "Änderungen speichern";
    classTripName.value = trip.name || "";
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

classTripClassButton.addEventListener("click", () => {
  const project = projects.find((entry) => entry.id === classTripDialog.dataset.projectId);
  if (!project) return;
  openClassTargetPicker(project, classTripSelectedClassKeys, (selectedKeys, classGroups) => {
    classTripSelectedClassKeys = selectedKeys;
    renderClassTargetSummary(classTripClassSummary, classGroups, classTripSelectedClassKeys);
  }, "Klassenfahrt");
});

function openSchoolProjectDialog(project, schoolProject = null, entryType = "school-project") {
  schoolProjectForm.reset();
  schoolProjectEndDate.min = "";
  schoolProjectDialogStatus.textContent = "";
  schoolProjectDialog.dataset.projectId = project.id;
  schoolProjectDialog.dataset.entryType = schoolProject?.type || entryType;
  const isVacation = schoolProjectDialog.dataset.entryType === "vacation";
  const assignmentLayerType = schoolProjectDialog.dataset.entryType === "school-project" ? "appointments" : "individual";
  const nameField = schoolProjectName.closest(".dialog-field");
  const timeFields = schoolProjectStartTime.closest(".event-time-fields");
  const overridesField = schoolProjectOverridesLessons.closest(".dialog-checkbox");
  nameField.hidden = isVacation;
  timeFields.hidden = isVacation;
  overridesField.hidden = isVacation;
  schoolProjectAssignmentField.hidden = isVacation;
  if (!isVacation) populateAppointmentAssignmentSelect(schoolProjectAssignment, project, assignmentLayerType, null, null, false, true);
  const dialogLabels = {
    "school-project": ["Einzelveranstaltung", "Einzelveranstaltung"],
    vacation: ["Urlaub", "Urlaub"],
    "personal-appointment": ["Weiteren Termin", "Termin"]
  };
  const [noun, buttonNoun] = dialogLabels[schoolProjectDialog.dataset.entryType] || dialogLabels["school-project"];
  const dialogLabel = schoolProjectDialog.querySelector(".label");
  if (dialogLabel) dialogLabel.textContent = schoolProjectDialog.dataset.entryType === "school-project" ? "Schulische Termine" : "Persönliche Termine";
  schoolProjectName.placeholder = schoolProjectDialog.dataset.entryType === "vacation"
    ? "z. B. Sommerurlaub"
    : schoolProjectDialog.dataset.entryType === "personal-appointment"
      ? "z. B. Arzttermin"
      : "z. B. Schulfest";
  const timeDefaults = getIndividualEventTimeDefaults(project);
  if (schoolProject) {
    schoolProjectDialog.dataset.entryId = schoolProject.id;
    schoolProjectDialogTitle.textContent = `${noun} bearbeiten`;
    schoolProjectSubmitButton.textContent = "Änderungen speichern";
    schoolProjectName.value = isVacation ? "Urlaub" : (schoolProject.name || "");
    schoolProjectDate.value = schoolProject.startDate || "";
    schoolProjectEndDate.value = schoolProject.endDate || schoolProject.startDate || "";
    schoolProjectStartTime.value = isVacation ? "" : (schoolProject.startTime || timeDefaults.start);
    schoolProjectEndTime.value = isVacation ? "" : (schoolProject.endTime || timeDefaults.end);
    schoolProjectOverridesLessons.checked = isVacation || Boolean(schoolProject.overridesLessons);
  } else {
    delete schoolProjectDialog.dataset.entryId;
    schoolProjectDialogTitle.textContent = `${noun} hinzufügen`;
    schoolProjectSubmitButton.textContent = `${buttonNoun} hinzufügen`;
    schoolProjectName.value = isVacation ? "Urlaub" : "";
    schoolProjectStartTime.value = isVacation ? "" : timeDefaults.start;
    schoolProjectEndTime.value = isVacation ? "" : timeDefaults.end;
    schoolProjectOverridesLessons.checked = isVacation;
  }
  schoolProjectEndDate.min = schoolProjectDate.value;
  schoolProjectDialog.showModal();
  (isVacation ? schoolProjectDate : schoolProjectName).focus();
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
      group.projects = Array.isArray(group.projects) ? group.projects : [];
      const card = document.createElement("section");
      card.className = "appointment-group-card";
      card.dataset.groupId = group.id;
      enableAppointmentDropTarget(card, project, "individual", group.id);
      card.style.setProperty("--appointment-group-color", group.color || "#c9c1dd");
      const { head, isExpanded } = createAppointmentGroupHeader(project, group, "individual");
      card.dataset.groupExpanded = String(isExpanded);
      const add = document.createElement("button");
      add.type = "button";
      add.className = "secondary-button appointment-add-button";
      add.textContent = "Termin hinzufügen";
      add.addEventListener("click", () => openAppointmentDialog(project, group, null, "individual"));
      const addProject = document.createElement("button");
      addProject.type = "button";
      addProject.className = "secondary-button appointment-add-button";
      addProject.textContent = "Projektgruppe hinzufügen";
      addProject.addEventListener("click", () => openAppointmentProjectDialog(project, group, null, "individual"));
      const actions = document.createElement("div");
      actions.className = "appointment-group-actions";
      actions.append(add, addProject);
      const entries = document.createElement("div");
      entries.className = "appointment-entry-list";
      enableAppointmentDropTarget(entries, project, "individual", group.id);
      if (!group.appointments.length && !group.projects.length) {
        const empty = document.createElement("p");
        empty.className = "empty-state";
        empty.textContent = "In dieser Gruppe sind noch keine Termine eingetragen.";
        entries.append(empty);
      } else {
        group.appointments.slice().sort((a, b) => `${getAppointmentSortDate(a)} ${a.startTime}`.localeCompare(`${getAppointmentSortDate(b)} ${b.startTime}`)).forEach((appointment) => {
          entries.append(createAppointmentEntryRow(project, group, appointment, "individual"));
        });
      }
      entries.hidden = !group.appointments.length && group.projects.length > 0;
      const projectList = document.createElement("div");
      projectList.className = "appointment-project-list";
      group.projects.forEach((appointmentProject) => projectList.append(createAppointmentProjectCard(project, group, appointmentProject, "individual")));
      const body = document.createElement("div");
      body.className = "appointment-group-body";
      body.hidden = !isExpanded;
      body.append(actions, entries, projectList);
      card.append(head, body);
      list.append(card);
    });
    enableAppointmentGroupReordering(list, project, "individual");
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
  intro.textContent = "Erfassen Sie Urlaub, weitere persönliche Termine und Krankschreibungen an einem gemeinsamen Ort.";
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
        const assignedClasses = (trip.classNames || []).join(", ") || trip.className;
        if (assignedClasses) {
          const classLabel = document.createElement("span");
          classLabel.textContent = `Klasse ${assignedClasses}`;
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
  const personalSingleEvents = createMovedProjectSection(
    project,
    "personal-appointment",
    "Einzeltermine",
    "Einzeltermin hinzufügen",
    "Noch kein ungruppierter Einzeltermin eingetragen.",
    { hideAddButton: true, hideWhenEmpty: true }
  );
  const sicknessSection = createSicknessSection(project);
  sheet.append(head, section, personalSingleEvents, appointmentGroups, sicknessSection);
  projectDetail.replaceChildren(sheet);
  scrollToPendingAppointmentGroup(project, "individual");
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

function migrateClassProjectsToSchoolAppointments(projectList) {
  let changed = false;
  projectList.forEach((project) => {
    const classLayer = project.layers?.find((entry) => entry.type === "classes");
    const legacyEntries = Array.isArray(classLayer?.entries) ? classLayer.entries : [];
    if (!legacyEntries.length) return;
    let individualLayer = project.layers?.find((entry) => entry.type === "individual");
    if (!individualLayer) {
      individualLayer = { type: "individual", entries: [] };
      project.layers = Array.isArray(project.layers) ? project.layers : [];
      project.layers.push(individualLayer);
    }
    individualLayer.entries = Array.isArray(individualLayer.entries) ? individualLayer.entries : [];
    const existingIds = new Set(individualLayer.entries.map((entry) => entry.id));
    legacyEntries.forEach((entry) => {
      if (existingIds.has(entry.id)) return;
      const gradeNames = getClassProjectGradeNames(entry);
      const wasVisibleByFolder = gradeNames.some((gradeName) => classLayer.gradeVisibility?.[gradeName || "unassigned"] !== false);
      individualLayer.entries.push({
        ...entry,
        type: "school-project",
        overridesClassLessons: entry.overridesClassLessons ?? entry.overridesLessons !== false,
        overridesLessons: entry.overridesTeacherLessons ?? false,
        calendarVisible: entry.calendarVisible !== false && wasVisibleByFolder,
        migratedFromClassProject: true
      });
      existingIds.add(entry.id);
    });
    classLayer.entries = [];
    classLayer.migratedToSchoolAppointments = true;
    individualLayer.appliedEntries = structuredClone(individualLayer.entries);
    individualLayer.appliedAt = new Date().toISOString();
    changed = true;
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
  } else if (mainCalendarView === "month") {
    calendarReferenceDate.setDate(1);
    calendarReferenceDate.setMonth(calendarReferenceDate.getMonth() + direction);
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
      projects: [],
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
appointmentClassButton.addEventListener("click", () => {
  const project = projects.find((entry) => entry.id === appointmentDialog.dataset.projectId);
  if (!project) return;
  openClassTargetPicker(project, appointmentSelectedClassKeys, (selectedKeys, classGroups) => {
    appointmentSelectedClassKeys = selectedKeys;
    renderClassTargetSummary(appointmentClassSummary, classGroups, appointmentSelectedClassKeys);
    appointmentOverridesClassLessons.disabled = !appointmentSelectedClassKeys.length;
    if (!appointmentSelectedClassKeys.length) appointmentOverridesClassLessons.checked = false;
  }, "Schulische Termine");
});
appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === appointmentDialog.dataset.projectId);
  const layerType = appointmentDialog.dataset.layerType || "appointments";
  const layer = project && getProjectLayer(project, layerType);
  const individualLayer = project && getProjectLayer(project, "individual");
  const sourceIsUngrouped = appointmentDialog.dataset.ungrouped === "true";
  const group = layer?.groups?.find((entry) => entry.id === appointmentDialog.dataset.groupId);
  const appointmentProject = group?.projects?.find((entry) => entry.id === appointmentDialog.dataset.appointmentProjectId);
  const appointmentContainer = appointmentProject || group;
  const [targetGroupId, targetProjectId = ""] = appointmentAssignment.value.split("::");
  const targetGroup = layer?.groups?.find((entry) => entry.id === targetGroupId);
  const targetProject = targetGroup?.projects?.find((entry) => entry.id === targetProjectId);
  const targetContainer = targetProject || targetGroup;
  const moveToUngrouped = !targetGroupId;
  const name = appointmentName.value.trim();
  if (!project || !layer || !individualLayer || (!sourceIsUngrouped && !appointmentContainer) || (!moveToUngrouped && !targetContainer) || (targetProjectId && !targetProject)) return;
  if (!name || !appointmentStartDate.value || !appointmentEndDate.value) {
    appointmentDialogStatus.textContent = "Bitte Bezeichnung sowie Start- und Enddatum eintragen.";
    return;
  }
  if (appointmentEndDate.value < appointmentStartDate.value) {
    appointmentDialogStatus.textContent = "Das Enddatum darf nicht vor dem Startdatum liegen.";
    appointmentEndDate.focus();
    return;
  }
  if (Boolean(appointmentStartTime.value) !== Boolean(appointmentEndTime.value)) {
    appointmentDialogStatus.textContent = "Beginn und Ende bitte entweder gemeinsam eintragen oder beide offenlassen.";
    return;
  }
  if (appointmentStartTime.value && appointmentEndTime.value <= appointmentStartTime.value) {
    appointmentDialogStatus.textContent = "Das Ende muss nach dem Beginn liegen.";
    appointmentEndTime.focus();
    return;
  }
  individualLayer.entries = Array.isArray(individualLayer.entries) ? individualLayer.entries : [];
  if (appointmentContainer) appointmentContainer.appointments = Array.isArray(appointmentContainer.appointments) ? appointmentContainer.appointments : [];
  const existingAppointment = sourceIsUngrouped
    ? individualLayer.entries.find((entry) => entry.id === appointmentDialog.dataset.appointmentId)
    : appointmentContainer?.appointments.find((entry) => entry.id === appointmentDialog.dataset.appointmentId);
  const classTargets = layerType === "appointments"
    ? getSerializedClassTargets(project, appointmentSelectedClassKeys)
    : { classGroups: [], classIds: [], classNames: [], schoolIds: [] };
  const appointmentData = {
    name,
    room: layerType === "appointments" ? appointmentRoom.value.trim() : "",
    startDate: appointmentStartDate.value,
    endDate: appointmentEndDate.value,
    startTime: appointmentStartTime.value,
    endTime: appointmentEndTime.value,
    isDeadline: appointmentIsDeadline.checked,
    completed: appointmentIsDeadline.checked && existingAppointment?.isDeadline
      ? Boolean(existingAppointment.completed)
      : false,
    ...classTargets,
    overridesClassLessons: layerType === "appointments" && appointmentSelectedClassKeys.length
      ? appointmentOverridesClassLessons.checked
      : false,
    overridesLessons: appointmentOverridesLessons.checked,
    calendarVisible: appointmentCalendarVisible.checked
  };
  const savedAppointment = existingAppointment || {
      id: globalThis.crypto?.randomUUID?.() ?? `appointment-${Date.now()}`,
      createdAt: new Date().toISOString()
  };
  Object.assign(savedAppointment, appointmentData);
  if (existingAppointment) {
    if (sourceIsUngrouped && !moveToUngrouped) {
      const sourceIndex = individualLayer.entries.findIndex((entry) => entry.id === existingAppointment.id);
      if (sourceIndex >= 0) individualLayer.entries.splice(sourceIndex, 1);
    } else if (!sourceIsUngrouped && (moveToUngrouped || targetContainer !== appointmentContainer)) {
      const sourceIndex = appointmentContainer.appointments.findIndex((entry) => entry.id === existingAppointment.id);
      if (sourceIndex >= 0) appointmentContainer.appointments.splice(sourceIndex, 1);
    }
  }
  if (moveToUngrouped) {
    savedAppointment.type = layerType === "appointments" ? "school-project" : "personal-appointment";
    if (!sourceIsUngrouped || !existingAppointment) individualLayer.entries.push(savedAppointment);
  } else if (!existingAppointment || sourceIsUngrouped || targetContainer !== appointmentContainer) {
    delete savedAppointment.type;
    targetContainer.appointments = Array.isArray(targetContainer.appointments) ? targetContainer.appointments : [];
    targetContainer.appointments.push(savedAppointment);
  }
  individualLayer.appliedEntries = structuredClone(individualLayer.entries);
  individualLayer.appliedAt = new Date().toISOString();
  if (targetGroup) expandedAppointmentGroupKeys.add(`${project.id}:${layerType}:${targetGroup.id}`);
  if (targetProject) expandedAppointmentProjectKeys.add(`${project.id}:${layerType}:${targetGroup.id}:${targetProject.id}`);
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
  if (activeLayerType === "individual") renderIndividualProjectsProperties(project);
  else renderSicknessProperties(project);
  renderActiveCalendar(project);
});
cancelClassCatalogButton.addEventListener("click", () => classCatalogDialog.close());
classCatalogGeneralTab.addEventListener("click", () => setClassCatalogTab("general"));
classCatalogStudentsTab.addEventListener("click", () => setClassCatalogTab("students"));
addClassStudentButton.addEventListener("click", () => {
  const nextNumber = classStudentDraft.reduce((maximum, student) => Math.max(maximum, Number(student.number) || 0), 0) + 1;
  classStudentDraft.push({
    id: globalThis.crypto?.randomUUID?.() ?? `student-${Date.now()}`,
    number: nextNumber,
    name: ""
  });
  renderClassStudentList();
  classStudentList.querySelector(".class-student-row:last-child input[type='text']")?.focus();
});
addSecondClassTeacherButton.addEventListener("click", () => {
  classCatalogTeacherTwoField.hidden = false;
  addSecondClassTeacherButton.hidden = true;
  classCatalogTeacherTwo.focus();
});
openClassCatalogIdButton.addEventListener("click", openClassIdDialog);
classCatalogName.addEventListener("input", () => {
  if (classCatalogMode.value === "catalog-class") updateClassDisplayPreviews();
});
classCatalogDisplayModeButtons.forEach((button) => button.addEventListener("click", () => {
  classCatalogDisplayModeButtons.forEach((entry) => entry.setAttribute("aria-pressed", String(entry === button)));
}));
classCatalogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = projects.find((entry) => entry.id === classCatalogDialog.dataset.projectId);
  const layer = project && getClassCatalogData(project);
  if (!project || !layer) return;
  layer.subjects = Array.isArray(layer.subjects) ? layer.subjects : [];
  const mode = classCatalogMode.value;
  const name = mode === "catalog-grade" ? classCatalogGrade.value : classCatalogName.value.trim();
  if (!name) {
    classCatalogDialogStatus.textContent = "Bitte eine Bezeichnung eintragen.";
    return;
  }
  if (mode === "catalog-class") {
    const normalizedStudents = classStudentDraft.map((student) => ({
      id: student.id,
      number: Number.parseInt(student.number, 10),
      name: String(student.name || "").trim()
    }));
    const invalidStudent = normalizedStudents.find((student) => !student.name || !Number.isInteger(student.number) || student.number < 1);
    const numbers = normalizedStudents.map((student) => student.number);
    if (invalidStudent || new Set(numbers).size !== numbers.length) {
      setClassCatalogTab("students");
      classCatalogDialogStatus.textContent = invalidStudent
        ? "Bitte für jeden Schüler einen Namen und eine positive laufende Nummer eintragen."
        : "Jede laufende Nummer darf innerhalb der Klasse nur einmal vergeben werden.";
      return;
    }
    classStudentDraft = normalizedStudents;
  }
  const subject = layer.subjects.find((entry) => entry.id === classCatalogDialog.dataset.subjectId);
  const grade = layer.grades.find((entry) => entry.id === classCatalogDialog.dataset.gradeId);
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
  } else if (mode === "catalog-grade") {
    const duplicate = layer.grades.some((entry) => entry.schoolId === activeClassSchoolId && entry.name === name && entry.id !== classCatalogDialog.dataset.gradeId);
    if (duplicate) {
      classCatalogDialogStatus.textContent = "Diese Klassenstufe ist bereits vorhanden.";
      return;
    }
    const existing = layer.grades.find((entry) => entry.id === classCatalogDialog.dataset.gradeId);
    if (existing) {
      existing.name = name;
      (existing.classes || []).forEach((classEntry) => {
        classEntry.name = getClassDisplayText(name, classEntry.suffix, classEntry.displayMode);
      });
    }
    else layer.grades.push({
      id: globalThis.crypto?.randomUUID?.() ?? `grade-${Date.now()}`,
      name,
      schoolId: activeClassSchoolId,
      classes: []
    });
  } else if (mode === "catalog-class" && grade) {
    grade.classes = Array.isArray(grade.classes) ? grade.classes : [];
    const displayMode = layer.classDisplayMode || "normal";
    const fullName = getClassDisplayText(grade.name, name, displayMode);
    const teachers = [classCatalogTeacherOne.value, classCatalogTeacherTwo.value]
      .map((teacher) => teacher.trim())
      .filter(Boolean)
      .slice(0, 2);
    const duplicate = grade.classes.some((entry) => String(entry.suffix || entry.name).toLocaleLowerCase("de") === name.toLocaleLowerCase("de") && entry.id !== classCatalogDialog.dataset.classId);
    if (duplicate) {
      classCatalogDialogStatus.textContent = "Diese Klasse ist in der Klassenstufe bereits vorhanden.";
      return;
    }
    const existing = grade.classes.find((entry) => entry.id === classCatalogDialog.dataset.classId);
    if (existing) Object.assign(existing, { suffix: name, displayMode, name: fullName, teachers, students: structuredClone(classStudentDraft) });
    else grade.classes.push({
      id: classCatalogDialog.dataset.draftClassId || globalThis.crypto?.randomUUID?.() || `class-${Date.now()}`,
      suffix: name,
      displayMode,
      name: fullName,
      teachers,
      students: structuredClone(classStudentDraft)
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
  const entryType = schoolProjectDialog.dataset.entryType || "school-project";
  const isVacation = entryType === "vacation";
  const name = isVacation ? "Urlaub" : schoolProjectName.value.trim();
  if (!project || !layer) return;
  if (!name || !schoolProjectDate.value || !schoolProjectEndDate.value) {
    schoolProjectDialogStatus.textContent = isVacation
      ? "Bitte Start- und Enddatum eintragen."
      : "Bitte Bezeichnung sowie Start- und Enddatum eintragen.";
    return;
  }
  if (schoolProjectEndDate.value < schoolProjectDate.value) {
    schoolProjectDialogStatus.textContent = "Das Enddatum darf nicht vor dem Startdatum liegen.";
    schoolProjectEndDate.focus();
    return;
  }
  if (!isVacation && Boolean(schoolProjectStartTime.value) !== Boolean(schoolProjectEndTime.value)) {
    schoolProjectDialogStatus.textContent = "Beginn und Ende bitte entweder gemeinsam eintragen oder beide offenlassen.";
    return;
  }
  if (!isVacation && schoolProjectStartTime.value && schoolProjectEndTime.value <= schoolProjectStartTime.value) {
    schoolProjectDialogStatus.textContent = "Das Ende muss nach dem Beginn liegen.";
    schoolProjectEndTime.focus();
    return;
  }
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const assignmentLayerType = entryType === "school-project" ? "appointments" : "individual";
  const assignmentLayer = getProjectLayer(project, assignmentLayerType);
  const [targetGroupId, targetProjectId = ""] = isVacation ? ["", ""] : schoolProjectAssignment.value.split("::");
  const targetGroup = assignmentLayer.groups?.find((entry) => entry.id === targetGroupId);
  const targetProject = targetGroup?.projects?.find((entry) => entry.id === targetProjectId);
  const targetContainer = targetProject || targetGroup;
  if (!isVacation && targetGroupId && (!targetContainer || (targetProjectId && !targetProject))) return;
  const entryData = {
    name,
    startDate: schoolProjectDate.value,
    endDate: schoolProjectEndDate.value,
    startTime: isVacation ? "" : schoolProjectStartTime.value,
    endTime: isVacation ? "" : schoolProjectEndTime.value,
    overridesLessons: isVacation || schoolProjectOverridesLessons.checked
  };
  const existingEntry = layer.entries.find((entry) => entry.id === schoolProjectDialog.dataset.entryId);
  const savedEntry = existingEntry || {
      id: globalThis.crypto?.randomUUID?.() ?? `school-project-${Date.now()}`,
      type: entryType,
      createdAt: new Date().toISOString()
  };
  Object.assign(savedEntry, entryData);
  if (targetContainer && !isVacation) {
    if (existingEntry) {
      const sourceIndex = layer.entries.findIndex((entry) => entry.id === existingEntry.id);
      if (sourceIndex >= 0) layer.entries.splice(sourceIndex, 1);
    }
    targetContainer.appointments = Array.isArray(targetContainer.appointments) ? targetContainer.appointments : [];
    targetContainer.appointments.push(savedEntry);
    expandedAppointmentGroupKeys.add(`${project.id}:${assignmentLayerType}:${targetGroup.id}`);
    if (targetProject) expandedAppointmentProjectKeys.add(`${project.id}:${assignmentLayerType}:${targetGroup.id}:${targetProject.id}`);
  } else if (!existingEntry) {
    layer.entries.push(savedEntry);
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
  if (!project || !layer) return;
  if (!name || !classTripStartDate.value || !classTripEndDate.value) {
    classTripDialogStatus.textContent = "Bitte Bezeichnung sowie Start- und Enddatum eintragen.";
    return;
  }
  if (classTripEndDate.value < classTripStartDate.value) {
    classTripDialogStatus.textContent = "Das Enddatum darf nicht vor dem Startdatum liegen.";
    classTripEndDate.focus();
    return;
  }
  if (Boolean(classTripStartTime.value) !== Boolean(classTripEndTime.value)) {
    classTripDialogStatus.textContent = "Beginn und Ende bitte entweder gemeinsam eintragen oder beide offenlassen.";
    return;
  }
  if (classTripStartTime.value && classTripEndTime.value <= classTripStartTime.value) {
    classTripDialogStatus.textContent = "Das Ende muss nach dem Beginn liegen.";
    classTripEndTime.focus();
    return;
  }
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const classGroups = getConfiguredClassGroups(project);
  const chosenGroups = classTripSelectedClassKeys.map((key) => classGroups.find((group) => group.key === key)).filter(Boolean);
  const tripData = {
    name,
    className: chosenGroups.length === 1 ? chosenGroups[0].name : "",
    classGroups: chosenGroups.map((group) => ({
      key: group.key,
      targetType: group.targetType,
      schoolId: group.schoolId,
      schoolName: group.schoolName,
      className: group.name,
      gradeName: group.gradeName || "",
      suffix: group.suffix || "",
      displayMode: group.displayMode || "normal",
      classIds: [...group.classIds]
    })),
    classIds: [...new Set(chosenGroups.flatMap((group) => group.classIds))],
    classNames: chosenGroups.map((group) => group.name),
    schoolIds: [...new Set(chosenGroups.map((group) => group.schoolId).filter(Boolean))],
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
  ensureScheduleVersions(project);
  const targetVersionId = activeScheduleVersionId || layer.versions[0].id;
  layer.schedules = Array.isArray(layer.schedules) ? layer.schedules : [];
  const defaultValidity = getDefaultScheduleValidity(project, school.id);
  const defaultValidityPeriod = getScheduleValidityPeriods(project, school.id)[0];
  const newSchedule = {
    id: globalThis.crypto?.randomUUID?.() ?? `schedule-${Date.now()}`,
    versionId: targetVersionId,
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
  activeScheduleVersionId = targetVersionId;
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
    lessonDialogStatus.textContent = "Bitte ein angelegtes Fach und eine Klasse oder einen Kurs auswählen.";
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
    classId: classOption?.dataset.targetType === "course" ? "" : lessonGrade.value,
    courseId: classOption?.dataset.courseId || "",
    classIds: classOption?.dataset.targetType === "course" ? (classOption.dataset.classIds || "").split(",").filter(Boolean) : [lessonGrade.value],
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
    const seriesMembers = getLessonSeriesMembers(schedule, existingLesson);
    const seriesId = existingLesson.seriesId || globalThis.crypto?.randomUUID?.() || `lesson-series-${Date.now()}`;
    const primaryDay = selectedDays.includes(existingLesson.day) ? existingLesson.day : selectedDays[0];
    const seriesMemberIds = new Set(seriesMembers.map((entry) => entry.id));
    schedule.lessons = schedule.lessons.filter((entry) => entry === existingLesson || !seriesMemberIds.has(entry.id));
    Object.assign(existingLesson, lessonData, { day: primaryDay, seriesId });
    selectedDays
      .filter((day) => day !== primaryDay)
      .forEach((day) => {
        schedule.lessons.push({
          id: globalThis.crypto?.randomUUID?.() ?? `lesson-${Date.now()}-${day}`,
          ...structuredClone(lessonData),
          day,
          seriesId
        });
      });
  } else {
    const seriesId = globalThis.crypto?.randomUUID?.() || `lesson-series-${Date.now()}`;
    selectedDays.forEach((day) => {
      schedule.lessons.push({
        id: globalThis.crypto?.randomUUID?.() ?? `lesson-${Date.now()}-${day}`,
        ...structuredClone(lessonData),
        day,
        seriesId
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
  const folder = {
    id: globalThis.crypto?.randomUUID?.() ?? `project-folder-${Date.now()}`,
    name,
    createdAt: new Date().toISOString()
  };
  projectFolders.push(folder);
  expandedProjectFolderIds.add(folder.id);
  createSchoolYearProject(folder.id, name);
  newProjectDialog.close();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    setBrowserMenuOpen(false);
    setExportMenuOpen(false);
    if (overviewSidebar.classList.contains("is-open")) setOverviewSidebarOpen(false);
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
overviewSidebarButton.addEventListener("click", () => setOverviewSidebarOpen(overviewSidebarButton.getAttribute("aria-expanded") !== "true"));
overviewSidebarClose.addEventListener("click", () => setOverviewSidebarOpen(false));
overviewProjectsTab.addEventListener("click", () => setOverviewSidebarTab("projects"));
overviewEventsTab.addEventListener("click", () => setOverviewSidebarTab("events"));
overviewTodosTab.addEventListener("click", () => setOverviewSidebarTab("todos"));
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
  downloadProjectCalendar(project.id, selection);
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
