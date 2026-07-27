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

const PROJECT_STORAGE_KEY = "schola-stundenplan-projects-v1";
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
  { id: "schedules", title: "Stundenpläne", description: "Wochenpläne mit Gültigkeitszeitraum und Unterrichtsstunden" }
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
let activeLayerType = null;
let activeScheduleId = null;
let displayRowsDraft = [];
let mainCalendarView = "year";
const expandedProjectIds = new Set(projects.map((project) => project.id));

const monthNames = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];
const weekdayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function renderYear(startYear, calendarEntries = [], schoolYearMode = false) {
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
      const matchingProjects = matchingEntries.filter((entry) => entry.type !== "school-holiday");
      day.className = [
        "day",
        weekday === 0 || weekday === 6 ? "is-weekend" : "",
        matchingHolidays.length ? "is-holiday" : "",
        matchingProjects.length ? "is-project" : ""
      ].filter(Boolean).join(" ");
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

function renderActiveCalendar(project = projects.find((entry) => entry.id === activeProjectId)) {
  calendarViewButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.calendarView === mainCalendarView));
  });
  if (mainCalendarView === "day" || mainCalendarView === "week") {
    renderCombinedScheduleView(mainCalendarView);
    return;
  }
  const holidayLayer = project?.layers?.find((entry) => entry.type === "holidays");
  const individualLayer = project?.layers?.find((entry) => entry.type === "individual");
  const appliedSettings = holidayLayer?.appliedSettings || holidayLayer?.settings;
  const calendarEntries = [
    ...(Array.isArray(holidayLayer?.entries) ? holidayLayer.entries : []),
    ...(Array.isArray(individualLayer?.appliedEntries) ? individualLayer.appliedEntries : [])
  ];
  if (!project || !appliedSettings?.startYear) {
    renderYear(new Date().getFullYear(), calendarEntries);
    return;
  }
  renderYear(Number(appliedSettings.startYear), calendarEntries, true);
}

function getCombinedSchedules() {
  return projects.flatMap((project) => {
    const layer = project.layers?.find((entry) => entry.type === "schedules");
    return (Array.isArray(layer?.schedules) ? layer.schedules : [])
      .map((schedule) => ({ ...schedule, projectId: project.id, projectName: project.name }));
  });
}

function getScheduleReferenceDate() {
  return new Date();
}

function renderLessonCard(lesson, schedule) {
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
  card.addEventListener("click", () => {
    const project = projects.find((entry) => entry.id === schedule.projectId);
    const originalSchedule = project?.layers?.find((entry) => entry.type === "schedules")
      ?.schedules?.find((entry) => entry.id === schedule.id);
    const originalLesson = originalSchedule?.lessons?.find((entry) => entry.id === lesson.id);
    if (project && originalSchedule && originalLesson) openExistingLessonDialog(project, originalSchedule, originalLesson);
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
  const schedules = getCombinedSchedules();
  const reference = getScheduleReferenceDate(schedules);
  if (reference.getDay() === 0) reference.setDate(reference.getDate() + 1);
  if (reference.getDay() === 6) reference.setDate(reference.getDate() + 2);
  const monday = new Date(reference);
  monday.setDate(reference.getDate() - ((reference.getDay() + 6) % 7));
  const dates = view === "day"
    ? [reference]
    : Array.from({ length: 5 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  const timedLessons = [];
  schedules.forEach((schedule) => {
    (Array.isArray(schedule.lessons) ? schedule.lessons : []).forEach((lesson) => {
      if (dates.some((date) => lesson.day === ((date.getDay() + 6) % 7) + 1)) {
        timedLessons.push({ lesson, schedule });
      }
    });
  });
  calendar.replaceChildren();
  calendar.className = "combined-timeline";
  calendar.closest(".calendar-shell")?.classList.add("is-timeline-view");
  calendarTitle.textContent = view === "day" ? "Tagesansicht" : "Wochenansicht";
  yearLabel.textContent = view === "day"
    ? dates[0].toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })
    : `${dates[0].toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}–${dates[4].toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}`;
  if (!timedLessons.length) {
    const empty = document.createElement("p");
    empty.className = "combined-schedule-empty";
    empty.textContent = "Für diese Ansicht sind noch keine Unterrichtsstunden eingetragen.";
    calendar.append(empty);
    return;
  }

  const earliestMinutes = Math.min(...timedLessons.map(({ lesson }) => timeToMinutes(lesson.start)));
  const latestMinutes = Math.max(...timedLessons.map(({ lesson }) => timeToMinutes(lesson.end)));
  const configuredStarts = schedules.map((schedule) => schedule.displayDefaults?.dayStart).filter(Boolean).map(timeToMinutes);
  const configuredEnds = schedules.map((schedule) => {
    if (schedule.displayDefaults?.dayEnd) return timeToMinutes(schedule.displayDefaults.dayEnd);
    if (schedule.displayDefaults?.dayStart && schedule.displayDefaults?.schoolDayMinutes) {
      return timeToMinutes(schedule.displayDefaults.dayStart) + Number(schedule.displayDefaults.schoolDayMinutes);
    }
    return null;
  }).filter(Number.isFinite);
  const timelineStart = Math.max(0, Math.floor(Math.min(earliestMinutes, ...configuredStarts) / 60) * 60 - 30);
  const timelineEnd = Math.min(24 * 60, Math.ceil(Math.max(latestMinutes, ...configuredEnds) / 60) * 60 + 30);
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
  const axis = document.createElement("div");
  axis.className = "timeline-axis";
  for (let minutes = firstHourMark; minutes <= timelineEnd; minutes += 60) {
    const mark = document.createElement("span");
    mark.className = "timeline-hour-mark";
    mark.style.top = `${((minutes - timelineStart) / timelineMinutes) * 100}%`;
    mark.textContent = minutesToTime(minutes);
    axis.append(mark);
  }
  body.append(axis);
  dates.forEach((date) => {
    const weekday = ((date.getDay() + 6) % 7) + 1;
    const column = document.createElement("div");
    column.className = "timeline-day-column";
    for (let minutes = firstHourMark; minutes <= timelineEnd; minutes += 60) {
      const guide = document.createElement("span");
      guide.className = "timeline-hour-guide";
      guide.style.top = `${((minutes - timelineStart) / timelineMinutes) * 100}%`;
      column.append(guide);
    }
    const entries = layoutTimelineEntries(
      timedLessons.filter(({ lesson }) => lesson.day === weekday)
    );
    entries.forEach(({ lesson, schedule, lane, laneCount }) => {
      const card = renderLessonCard(lesson, schedule);
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

    row.append(toggle, icon, main);
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

  if (activeLayerType === "schedules") {
    renderSchedulesProperties(project);
    return;
  }

  detailPanelLabel.textContent = "Einstellungen";
  detailPanelTitle.textContent = "Stundenplan";
  const summary = document.createElement("section");
  summary.className = "project-summary";
  const title = document.createElement("h3");
  title.textContent = project.name;
  const note = document.createElement("p");
  note.textContent = "Dieser Projektordner bündelt die Kalenderschichten, aus denen später Kalenderansicht, Export und Stundenbilanz erzeugt werden.";
  const grid = document.createElement("div");
  grid.className = "layer-summary-grid";
  LAYER_TYPES.forEach((layer) => {
    const card = document.createElement("div");
    card.className = "layer-summary-card";
    const layerTitle = document.createElement("strong");
    layerTitle.textContent = layer.title;
    const description = document.createElement("span");
    description.textContent = layer.description;
    card.append(layerTitle, description);
    grid.append(card);
  });
  summary.append(title, note, grid);
  projectDetail.replaceChildren(summary);
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
    sheet.append(head, addButton);
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
  menuButton.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute("aria-expanded", String(!menu.hidden));
  });
  menu.append(displayButton);
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
  week.className = "schedule-week";
  const corner = document.createElement("div");
  corner.className = "schedule-week-corner";
  corner.textContent = "Zeit";
  week.append(corner);
  ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"].forEach((name) => {
    const dayHead = document.createElement("div");
    dayHead.className = "schedule-day-head";
    dayHead.textContent = name;
    week.append(dayHead);
  });
  schedule.displayRows.forEach((displayRow) => {
    const time = document.createElement("div");
    time.className = `schedule-time${displayRow.type === "break" ? " is-break" : ""}`;
    const timeLabel = document.createElement("strong");
    timeLabel.textContent = displayRow.label;
    const timeRange = document.createElement("span");
    timeRange.textContent = `${displayRow.start}–${displayRow.end}`;
    time.append(timeLabel, timeRange);
    week.append(time);
    for (let day = 1; day <= 5; day += 1) {
      if (displayRow.type === "break") {
        const pause = document.createElement("div");
        pause.className = "schedule-break-cell";
        pause.textContent = "Pause";
        week.append(pause);
        continue;
      }
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "schedule-cell";
      cell.setAttribute("aria-label", `${weekdayNames[day - 1]}, ${displayRow.label}: Stunde hinzufügen`);
      schedule.lessons
        .filter((entry) => entry.day === day && entry.start === displayRow.start)
        .forEach((lesson) => {
          const card = document.createElement("span");
          card.className = `lesson-card${lesson.epochal ? " is-epochal" : ""}`;
          card.style.setProperty("--lesson-color", lesson.color || "#bfd2e2");
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
          cell.append(card);
        });
      cell.addEventListener("click", () => openLessonDialog(project, schedule, day, displayRow));
      week.append(cell);
    }
  });
  sheet.append(head, validity, week);
  projectDetail.replaceChildren(sheet);
  saveProjects();
}

function openLessonDialog(project, schedule, day, displayRow) {
  lessonForm.reset();
  delete lessonDialog.dataset.lessonId;
  lessonDialogTitle.textContent = "Stunde hinzufügen";
  lessonSubmitButton.textContent = "Stunde hinzufügen";
  setLessonColor("#bfd2e2");
  lessonDay.value = String(day);
  lessonStart.value = displayRow.start;
  lessonEnd.value = displayRow.end;
  lessonDialogStatus.textContent = "";
  lessonDialog.dataset.projectId = project.id;
  lessonDialog.dataset.scheduleId = schedule.id;
  lessonDialog.showModal();
  requestAnimationFrame(() => lessonStart.focus());
}

function openExistingLessonDialog(project, schedule, lesson) {
  lessonForm.reset();
  lessonDialogTitle.textContent = "Stunde bearbeiten";
  lessonSubmitButton.textContent = "Änderungen speichern";
  lessonDay.value = String(lesson.day);
  lessonStart.value = lesson.start;
  lessonEnd.value = lesson.end;
  lessonGrade.value = lesson.grade || "";
  lessonSubject.value = lesson.subject || "";
  lessonRoom.value = lesson.room || "";
  setLessonColor(lesson.color || "#bfd2e2");
  lessonEpochal.value = lesson.epochal ? "epochal" : "regular";
  lessonDialogStatus.textContent = "";
  lessonDialog.dataset.projectId = project.id;
  lessonDialog.dataset.scheduleId = schedule.id;
  lessonDialog.dataset.lessonId = lesson.id;
  lessonDialog.showModal();
  requestAnimationFrame(() => lessonSubject.focus());
}

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

function renderIndividualProjectsProperties(project) {
  detailPanelLabel.textContent = "Eigenschaften";
  detailPanelTitle.textContent = "Individuelle Projekte";

  const layer = getProjectLayer(project, "individual");
  layer.entries = Array.isArray(layer.entries) ? layer.entries : [];
  const trips = layer.entries.filter((entry) => entry.type === "class-trip");

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
        dates.textContent = `${formatGermanDate(trip.startDate)}–${formatGermanDate(trip.endDate)}`;
        copy.append(tripName, dates);
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "trip-delete-button";
        deleteButton.textContent = "Löschen";
        deleteButton.setAttribute("aria-label", `${trip.name} löschen`);
        deleteButton.addEventListener("click", () => {
          layer.entries = layer.entries.filter((entry) => entry.id !== trip.id);
          saveProjects();
          renderIndividualProjectsProperties(project);
        });
        row.append(copy, deleteButton);
        list.append(row);
      });
  }

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

  section.append(sectionTitle, form, list, applyButton, applyStatus);
  sheet.append(head, section);
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
cancelLessonButton.addEventListener("click", () => lessonDialog.close());
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
  if (lessonEnd.value <= lessonStart.value) {
    lessonDialogStatus.textContent = "Das Ende muss nach dem Beginn liegen.";
    lessonEnd.focus();
    return;
  }
  const project = projects.find((entry) => entry.id === lessonDialog.dataset.projectId);
  const layer = project && getProjectLayer(project, "schedules");
  const schedule = layer?.schedules?.find((entry) => entry.id === lessonDialog.dataset.scheduleId);
  if (!schedule) return;
  const lessonData = {
    day: Number(lessonDay.value),
    start: lessonStart.value,
    end: lessonEnd.value,
    grade: lessonGrade.value.trim(),
    subject: lessonSubject.value.trim(),
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
renderActiveCalendar();
renderProjectBrowser();
renderProjectDetail();
