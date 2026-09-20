(() => {
  "use strict";
  const $ = selector => document.querySelector(selector);
  const STORAGE_KEY = "schola-seat-lab-v1";
  const LIBRARY_KEY = "schola-parliament-results-v1";
  const CURRENT_VIEW_ID = "current-view";
  const methods = ["sainte-lague", "dhondt", "hare"];
  const colors = ["#416a64", "#c96d55", "#7c72a0", "#c69c45", "#5c7fa3", "#9a6c7b", "#6f8e58", "#b47842"];
  const initialState = () => ({ mode: "percent", seats: 20, threshold: 0, method: "sainte-lague", resultView: "parliament", nextId: 3, parties: [{ id: "party-1", name: "Partei A", votes: 0, color: colors[0] }, { id: "party-2", name: "Partei B", votes: 0, color: colors[1] }] });
  function load() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); return saved?.parties?.length ? { ...initialState(), ...saved } : initialState(); } catch { return initialState(); } }
  let state = load();
  function loadLibrary() {
    try {
      const saved = JSON.parse(localStorage.getItem(LIBRARY_KEY));
      if (!Array.isArray(saved)) return [];
      return saved.map(entry => {
        try {
          return { id: String(entry.id || makeId()), name: String(entry.name || "Wahlergebnis").slice(0, 80), createdAt: entry.createdAt || new Date().toISOString(), updatedAt: entry.updatedAt || new Date().toISOString(), state: normalizeSnapshot(entry.state) };
        } catch { return null; }
      }).filter(Boolean);
    } catch { return []; }
  }
  let resultLibrary = loadLibrary();
  let activeResultId = CURRENT_VIEW_ID;
  let resultDialogMode = "snapshot";
  let selectedChartPartyIds = new Set();
  const format = (value, digits = 1) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
  const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const partyColor = party => party.color || colors[state.parties.indexOf(party) % colors.length];

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  function normalizedParties() { return state.parties.map(party => ({ ...party, votes: Math.max(0, Number(party.votes) || 0) })); }
  function calculate(method) { return SeatAllocation.allocateSeats({ method, parties: normalizedParties(), seats: state.seats, threshold: state.threshold, voteMode: state.mode }); }
  function resultSet() { return Object.fromEntries(methods.map(method => [method, calculate(method)])); }

  function renderPartyEditor() {
    $("#partyEditor").innerHTML = state.parties.map((party, index) => `<div class="party-row" data-id="${escapeHtml(party.id)}"><label class="party-color-picker" title="Farbe für ${escapeHtml(party.name)} auswählen"><span class="sr-only">Farbe für ${escapeHtml(party.name)} auswählen</span><input class="party-color-input" type="color" value="${escapeHtml(partyColor(party))}"><i class="party-color" style="--party-color:${partyColor(party)}" aria-hidden="true"></i></label><label><span class="sr-only">Name der Partei ${index + 1}</span><input class="party-name" value="${escapeHtml(party.name)}" maxlength="40"></label><label><span class="sr-only">${state.mode === "percent" ? "Stimmenanteil in Prozent" : "Stimmenzahl"}</span><input class="party-votes" type="number" min="0" step="${state.mode === "percent" ? "0.1" : "1"}" value="${escapeHtml(party.votes)}"></label><button class="delete-party" type="button" aria-label="${escapeHtml(party.name)} löschen" ${state.parties.length <= 2 ? "disabled" : ""}>×</button></div>`).join("");
    $("#partyEditor").querySelectorAll(".party-row").forEach(row => {
      const party = state.parties.find(item => item.id === row.dataset.id);
      row.querySelector(".party-color-input").addEventListener("input", event => { party.color = event.target.value; row.querySelector(".party-color").style.setProperty("--party-color", party.color); update(false); });
      row.querySelector(".party-name").addEventListener("input", event => { party.name = event.target.value; update(false); });
      row.querySelector(".party-votes").addEventListener("input", event => { party.votes = event.target.value; update(false); });
      row.querySelector(".delete-party").addEventListener("click", () => { state.parties = state.parties.filter(item => item.id !== party.id); update(true); });
    });
  }

  function renderParliament(result) {
    const seated = result.results.filter(row => row.seats > 0);
    const total = result.seats;
    if (!total || !seated.length) { $("#parliament").innerHTML = '<p class="empty-result">Noch kann kein Parlament gebildet werden.</p>'; $("#legend").innerHTML = ""; return; }
    const owner = [];
    seated.forEach(row => { for (let i = 0; i < row.seats; i += 1) owner.push(row); });
    const width = Math.min(820, $("#parliament").clientWidth || 700);
    const height = Math.min(330, Math.max(230, width * .44));
    const cx = width / 2, cy = height - 14;
    const innerRadius = Math.min(94, Math.max(68, width * .12));
    const maxOuterRadius = Math.min(width / 2 - 16, height - 24);
    const preferredRingCount = Math.max(2, Math.min(32, Math.ceil(Math.sqrt(total / 5))));
    // Bei kleineren Parlamenten wird der Halbkreis kompakter, statt wenige
    // Ringe über die gesamte verfügbare Tiefe auseinanderzuziehen.
    const outerRadius = Math.min(maxOuterRadius, innerRadius + (preferredRingCount - 1) * 26);
    let ringCount = preferredRingCount, dot = 12, capacities = [];
    for (; ringCount <= 32; ringCount += 1) {
      const ringGap = (outerRadius - innerRadius) / Math.max(1, ringCount - 1);
      dot = Math.max(4.5, Math.min(12, ringGap * .68));
      const spacing = dot + Math.max(2, dot * .2);
      capacities = Array.from({ length: ringCount }, (_, ring) => {
        const radius = innerRadius + ring * ringGap;
        return Math.max(3, Math.floor(Math.PI * radius / spacing) + 1);
      });
      if (capacities.reduce((sum, value) => sum + value, 0) >= total) break;
    }
    const capacitySum = capacities.reduce((sum, value) => sum + value, 0);
    const exactCounts = capacities.map(capacity => capacity / capacitySum * total);
    const counts = exactCounts.map(value => Math.floor(value));
    const missing = total - counts.reduce((sum, value) => sum + value, 0);
    [...exactCounts.keys()].sort((a, b) => (exactCounts[b] - counts[b]) - (exactCounts[a] - counts[a])).slice(0, missing).forEach(index => { counts[index] += 1; });
    const ringGap = (outerRadius - innerRadius) / Math.max(1, ringCount - 1);
    const positions = [];
    counts.forEach((count, ring) => {
      const radius = innerRadius + ring * ringGap;
      for (let position = 0; position < count; position += 1) {
        const angle = count === 1 ? Math.PI / 2 : Math.PI - position / (count - 1) * Math.PI;
        positions.push({ angle, radius });
      }
    });
    // Winkelweise Vergabe über alle Ringe erzeugt radiale Parteisektoren.
    positions.sort((a, b) => b.angle - a.angle || b.radius - a.radius);
    const dots = positions.map((position, seatIndex) => {
      const row = owner[seatIndex];
      const x = cx + Math.cos(position.angle) * position.radius;
      const y = cy - Math.sin(position.angle) * position.radius;
      return `<button class="seat-dot" style="left:${x}px;top:${y}px;--dot:${dot}px;--party-color:${partyColor(state.parties.find(p => p.id === row.id))}" title="${escapeHtml(row.name)}: ${row.seats} Sitze" aria-label="${escapeHtml(row.name)}, Sitz"></button>`;
    }).join("");
    $("#parliament").style.maxWidth = `${width}px`; $("#parliament").style.height = `${height}px`;
    $("#parliament").setAttribute("aria-label", `Halbkreisdiagramm mit ${total} Sitzen. ${seated.map(row => `${row.name}: ${row.seats}`).join(", ")}.`);
    $("#parliament").innerHTML = dots + `<div class="hemicycle-summary"><b>${total}</b><span>Sitze</span></div>`;
    $("#legend").innerHTML = seated.map(row => `<span><i style="--party-color:${partyColor(state.parties.find(p => p.id === row.id))}"></i><b>${escapeHtml(row.name)}</b> ${row.seats}</span>`).join("");
  }

  function partyLabel(row) { const original = state.parties.find(p => p.id === row.id); return `<span class="party-label"><i style="--party-color:${partyColor(original)}"></i>${escapeHtml(row.name)}</span>`; }

  function renderVoteChart(result) {
    const rows = result.results.filter(row => row.eligible).sort((a, b) => b.voteShare - a.voteShare || a.name.localeCompare(b.name, "de"));
    selectedChartPartyIds = new Set([...selectedChartPartyIds].filter(id => rows.some(row => row.id === id)));
    if (!rows.length) {
      $("#voteChart").innerHTML = '<p class="empty-result vote-chart-empty">Keine Partei erreicht die eingestellte Sperrklausel.</p>';
      $("#chartSeatSelection").hidden = true;
      return;
    }
    const highestValue = Math.max(...rows.map(row => row.voteShare), 1);
    const scaleMax = Math.min(100, Math.max(10, Math.ceil(highestValue * 1.12 / 5) * 5));
    const ticks = [scaleMax, scaleMax / 2, 0];
    const columns = rows.map(row => {
      const original = state.parties.find(party => party.id === row.id);
      const barHeight = Math.min(100, row.voteShare / scaleMax * 100);
      const seatLabel = `${row.seats} ${row.seats === 1 ? "Sitz" : "Sitze"}`;
      const thresholdDistance = row.voteShare - state.threshold;
      const thresholdContext = state.threshold > 0 ? (Math.abs(thresholdDistance) < 1e-9 ? "genau auf der Sperrklausel" : `${format(thresholdDistance)} PP über der ${format(state.threshold)}-%-Hürde`) : "keine Sperrklausel";
      const feedback = `${row.name} · ${format(row.voteShare)} % Stimmen · ${seatLabel} (${result.methodInfo.name}) · ${thresholdContext}`;
      const isSelected = selectedChartPartyIds.has(row.id);
      return `<button class="vote-column${isSelected ? " is-selected" : ""}" type="button" style="--bar-height:${barHeight}%;--party-color:${partyColor(original)}" data-party-id="${escapeHtml(row.id)}" data-feedback="${escapeHtml(feedback)}" aria-label="${escapeHtml(feedback)}" aria-pressed="${isSelected}"><span class="vote-bar-area"><span class="vote-value">${format(row.voteShare)} %</span><i class="vote-bar"></i></span><b title="${escapeHtml(row.name)}">${escapeHtml(row.name)}</b></button>`;
    }).join("");
    const densityClass = rows.length > 16 ? " is-dense" : rows.length > 10 ? " is-crowded" : "";
    const ariaLabel = `Stimmenanteile der Parteien, die die Sperrklausel erreichen, absteigend sortiert. ${rows.map(row => `${row.name}: ${format(row.voteShare)} Prozent`).join(". ")}.`;
    $("#voteChart").innerHTML = `<p class="sr-only">${escapeHtml(ariaLabel)}</p><p id="voteChartFeedback" class="chart-feedback" aria-hidden="true"></p><div class="vote-chart-shell"><div class="vote-axis" aria-hidden="true">${ticks.map(value => `<span>${format(value, 0)} %</span>`).join("")}</div><div class="vote-plot"><div class="vote-columns${densityClass}">${columns}</div></div></div>`;
    const feedbackLine = $("#voteChartFeedback");
    $("#voteChart").querySelectorAll(".vote-column").forEach(column => {
      const showFeedback = () => { feedbackLine.textContent = column.dataset.feedback; column.classList.add("is-active"); };
      const resetFeedback = () => { feedbackLine.textContent = ""; column.classList.remove("is-active"); };
      column.addEventListener("mouseenter", showFeedback);
      column.addEventListener("mouseleave", resetFeedback);
      column.addEventListener("focus", showFeedback);
      column.addEventListener("blur", resetFeedback);
      column.addEventListener("click", () => {
        const partyId = column.dataset.partyId;
        if (selectedChartPartyIds.has(partyId)) selectedChartPartyIds.delete(partyId);
        else selectedChartPartyIds.add(partyId);
        const isSelected = selectedChartPartyIds.has(partyId);
        column.classList.toggle("is-selected", isSelected);
        column.setAttribute("aria-pressed", String(isSelected));
        updateChartSeatSelection(result);
      });
    });
    updateChartSeatSelection(result);
  }

  function updateChartSeatSelection(result) {
    const metric = $("#chartSeatSelection");
    const selectedRows = result.results.filter(row => selectedChartPartyIds.has(row.id));
    if (!selectedRows.length) {
      metric.hidden = true;
      return;
    }
    const selectedSeats = selectedRows.reduce((sum, row) => sum + row.seats, 0);
    const share = result.seats ? selectedSeats / result.seats * 100 : 0;
    metric.innerHTML = `<b>${format(share)} %</b><span>der Sitze</span>`;
    metric.setAttribute("aria-label", `${selectedRows.map(row => row.name).join(", ")}: ${format(share)} Prozent der Sitze`);
    metric.hidden = false;
  }

  function applyResultView() {
    const showChart = state.resultView === "chart";
    $("#parliamentView").hidden = showChart;
    $("#voteChartView").hidden = !showChart;
    $("#resultCard").classList.toggle("is-chart-view", showChart);
    $("#resultTitle").textContent = showChart ? "Stimmenanteile im Überblick" : `${calculate(state.method).methodInfo.name} im Parlament`;
    $("#resultViewLabel").textContent = showChart ? "Stimmenanteile" : "Sitzverteilung";
    $("#resultViewToggle").setAttribute("aria-label", showChart ? "Zur Sitzverteilung wechseln" : "Stimmenanteile als Säulendiagramm zeigen");
    $("#resultViewToggle").setAttribute("title", showChart ? "Zur Sitzverteilung" : "Zum Säulendiagramm");
  }
  function renderResultTable(result) {
    const showAbsoluteVotes = state.mode === "absolute";
    const voteHeader = showAbsoluteVotes ? "<th>Stimmen</th>" : "";
    const rows = result.results.map(row => {
      const voteCell = showAbsoluteVotes ? `<td>${format(row.votes, 0)}</td>` : "";
      return `<tr class="${row.eligible ? "" : "excluded"}"><td>${partyLabel(row)}${row.eligible ? "" : "<small> unter Sperrklausel</small>"}</td>${voteCell}<td>${format(row.voteShare)} %</td><td><b>${row.seats}</b></td><td>${format(row.seatShare)} %</td><td>${row.deviation > 0 ? "+" : ""}${format(row.deviation)} PP</td></tr>`;
    }).join("");
    $("#resultTable").innerHTML = `<table><thead><tr><th>Partei</th>${voteHeader}<th>Stimmenanteil</th><th>Sitze</th><th>Sitzanteil</th><th>Abweichung</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function renderComparison(all) {
    const baseRows = all[methods[0]].results;
    const differences = baseRows.filter(row => new Set(methods.map(method => all[method].results.find(item => item.id === row.id).seats)).size > 1);
    const rows = baseRows.map(row => { const values = methods.map(method => all[method].results.find(item => item.id === row.id).seats); const differs = new Set(values).size > 1; return `<tr><td>${partyLabel(row)}</td>${values.map(value => `<td class="${differs ? "different" : ""}">${value}</td>`).join("")}</tr>`; }).join("");
    let note = "Alle drei Verfahren führen bei diesen Einstellungen zur gleichen Sitzverteilung.";
    if (differences.length) note = `Unterschiede gibt es bei ${differences.map(row => row.name).join(", ")}. Markierte Zahlen zeigen, wo die Verfahren andere Sitzzahlen ergeben.`;
    $("#comparison").innerHTML = `<div class="table-wrap"><table><thead><tr><th>Partei</th><th>Sainte-Laguë</th><th>D’Hondt</th><th>Hare/Niemeyer</th></tr></thead><tbody>${rows}</tbody></table></div><p class="comparison-note">${escapeHtml(note)}</p>`;
  }

  function calculationTable(result) {
    const tie = result.ties.length ? `<p class="tie-note">Mathematischer Gleichstand erkannt. Für ein reproduzierbares Ergebnis entscheidet zuerst die höhere Stimmenzahl, danach die technische Partei-ID. Reale Wahlordnungen können stattdessen einen Losentscheid vorsehen.</p>` : "";
    const strongest = [...result.results].filter(row => row.eligible).sort((a, b) => b.votes - a.votes)[0];
    const unit = state.mode === "percent" ? " %" : "";
    let example = "";
    if (strongest && result.method === "hare") {
      const detail = result.detail.rows.find(row => row.party.id === strongest.id);
      if (detail) {
        const eligibleVotes = result.eligible.reduce((sum, party) => sum + party.votes, 0);
        const extraText = detail.extra ? " Wegen eines der größten Reste erhält die Partei noch einen Zusatzsitz." : " In diesem Ergebnis kommt kein Zusatzsitz hinzu.";
        example = `<div class="calculation-example"><span class="eyebrow">Beispiel: ${escapeHtml(strongest.name)}</span><p><b>${format(strongest.votes, state.mode === "percent" ? 1 : 0)}${unit} ÷ ${format(eligibleVotes, state.mode === "percent" ? 1 : 0)}${unit} × ${result.seats} Sitze = ${format(detail.quota, 3)}</b></p><p>Der ganzzahlige Anteil ist ${detail.base}. Der Rest beträgt ${format(detail.remainder, 3)}.${extraText} Ergebnis: <b>${strongest.seats} Sitze</b>.</p></div>`;
      }
    }
    if (result.method === "hare") return `<div class="calculation-section"><h3>${result.methodInfo.name}</h3><p>Zuerst wird für jede zugelassene Partei der genaue proportionale Sitzanspruch berechnet: eigener Stimmenwert ÷ Stimmen aller zugelassenen Parteien × ${result.seats} Sitze. Der Teil vor dem Komma wird sofort vergeben. Die noch freien Sitze gehen anschließend an die größten Nachkommareste.</p>${example}<div class="table-wrap"><table><thead><tr><th>Partei</th><th>Anspruch</th><th>Zunächst</th><th>Rest</th><th>Zusatzsitz</th></tr></thead><tbody>${result.detail.rows.map(row => `<tr><td>${escapeHtml(row.party.name)}</td><td>${format(row.quota, 3)}</td><td>${row.base}</td><td>${format(row.remainder, 3)}</td><td>${row.extra ? "ja" : "–"}</td></tr>`).join("")}</tbody></table></div>${tie}</div>`;
    if (strongest) {
      const divisors = result.method === "sainte-lague" ? [1, 3, 5] : [1, 2, 3];
      const equations = divisors.map(divisor => `<li><span>${format(strongest.votes, state.mode === "percent" ? 1 : 0)}${unit} ÷ ${divisor}</span><b>= ${format(strongest.votes / divisor, 3)}</b></li>`).join("");
      example = `<div class="calculation-example"><span class="eyebrow">Beispiel: ${escapeHtml(strongest.name)}</span><p>Aus dem Stimmenwert der stärksten Partei entstehen nacheinander diese Höchstzahlen:</p><ol class="equation-list">${equations}</ol><p>Dasselbe geschieht für alle Parteien. Danach werden sämtliche Höchstzahlen gemeinsam sortiert. Die höchsten ${result.seats} Werte erhalten je einen Sitz; ${escapeHtml(strongest.name)} kommt so auf <b>${strongest.seats} Sitze</b>.</p></div>`;
    }
    const relevant = result.detail.steps.slice(Math.max(0, result.detail.steps.length - Math.min(12, result.detail.steps.length)));
    return `<div class="calculation-section"><h3>${result.methodInfo.name}</h3><p>${result.method === "sainte-lague" ? "1, 3, 5, 7 … sind die aufeinanderfolgenden Divisoren. Jede Partei teilt ihren Stimmenwert zuerst durch 1, dann durch 3, dann durch 5 und so weiter. Jeder Quotient ist eine Höchstzahl und damit ein möglicher Sitz. Diese Darstellung ist mathematisch gleichwertig zur Standardrundung mit einem gemeinsamen Divisor." : "1, 2, 3, 4 … sind die aufeinanderfolgenden Divisoren. Jede Partei teilt ihren Stimmenwert zuerst durch 1, dann durch 2, dann durch 3 und so weiter. Jeder Quotient ist eine Höchstzahl und damit ein möglicher Sitz."}</p>${example}<p>Die Tabelle zeigt die letzten Vergaben – dort entscheidet sich häufig, warum zwei Verfahren um einen Sitz voneinander abweichen.</p><div class="table-wrap"><table><thead><tr><th>Sitz</th><th>Partei</th><th>Divisor</th><th>Höchstzahl</th></tr></thead><tbody>${relevant.map(step => { const party = result.results.find(row => row.id === step.partyId); return `<tr><td>${step.seat}</td><td>${escapeHtml(party.name)}</td><td>${step.divisor}</td><td>${format(step.quotient, 3)}</td></tr>`; }).join("")}</tbody></table></div>${tie}</div>`;
  }

  function validate() {
    const messages = [], names = state.parties.map(p => p.name.trim().toLowerCase()).filter(Boolean);
    if (state.parties.some(p => !p.name.trim())) messages.push("Gib jeder Partei einen Namen.");
    if (new Set(names).size !== names.length) messages.push("Parteinamen sollten sich unterscheiden.");
    if (state.seats < 1) messages.push("Das Parlament braucht mindestens einen Sitz.");
    if (state.threshold < 0 || state.threshold > 100) messages.push("Die Sperrklausel muss zwischen 0 und 100 % liegen.");
    if (!normalizedParties().some(p => p.votes > 0)) messages.push("Mindestens eine Partei braucht Stimmen.");
    return messages;
  }

  function renderResults() {
    const messages = validate(); $("#validation").textContent = messages.join(" ");
    const all = resultSet(), active = all[state.method];
    const sum = normalizedParties().reduce((total, party) => total + party.votes, 0);
    const shareHint = $("#shareHint");
    shareHint.replaceChildren();
    const totalLine = document.createElement("span");
    totalLine.textContent = state.mode === "percent" ? `Summe der eingegebenen Anteile: ${format(sum)} %` : `Insgesamt eingegebene Stimmen: ${format(sum, 0)}`;
    shareHint.append(totalLine);
    const differenceToHundred = 100 - sum;
    if (state.mode === "percent" && Math.abs(differenceToHundred) > 0.2000001) {
      const correctionLine = document.createElement("strong");
      correctionLine.className = "share-correction";
      correctionLine.textContent = `${differenceToHundred > 0 ? "+" : "−"}${format(Math.abs(differenceToHundred))} % bis 100 %`;
      shareHint.append(correctionLine);
    }
    $("#comparisonCard").hidden = false;
    $("#resultTitle").textContent = `${active.methodInfo.name} im Parlament`;
    $("#gallagherBadge").innerHTML = `<span>Gallagher-Index</span><b>${format(active.gallagher, 2)}</b>`;
    renderParliament(active); renderVoteChart(active); applyResultView(); renderResultTable(active); renderComparison(all);
    $("#calculation").innerHTML = methods.map(method => calculationTable(all[method])).join("");
  }

  function makeId(prefix = "result") {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function snapshotState() {
    return {
      mode: state.mode,
      seats: state.seats,
      threshold: state.threshold,
      method: state.method,
      resultView: state.resultView,
      nextId: state.nextId,
      parties: normalizedParties().map(party => ({ id: party.id, name: party.name, votes: party.votes, color: party.color }))
    };
  }

  function emptyResultState() {
    const fresh = initialState();
    fresh.parties = fresh.parties.map(party => ({ ...party, votes: 0 }));
    return fresh;
  }

  function normalizeSnapshot(source) {
    if (!source || typeof source !== "object" || !Array.isArray(source.parties) || source.parties.length < 2) throw new Error("Die Datei enthält kein gültiges Wahlergebnis.");
    const mode = source.mode === "absolute" ? "absolute" : "percent";
    const method = methods.includes(source.method) ? source.method : "sainte-lague";
    const parties = source.parties.slice(0, 100).map((party, index) => ({
      id: `party-${index + 1}`,
      name: String(party?.name || `Partei ${index + 1}`).slice(0, 40),
      votes: Math.max(0, Number(party?.votes) || 0),
      color: /^#[0-9a-f]{6}$/i.test(String(party?.color || "")) ? party.color : colors[index % colors.length]
    }));
    return {
      mode,
      seats: Math.max(1, Math.min(10000, Math.floor(Number(source.seats) || 20))),
      threshold: Math.max(0, Math.min(100, Number(source.threshold) || 0)),
      method,
      resultView: source.resultView === "chart" ? "chart" : "parliament",
      nextId: parties.length + 1,
      parties
    };
  }

  function persistLibrary() {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(resultLibrary));
  }

  function closeLibraryMenus() {
    $("#libraryActionsMenu").hidden = true;
    $("#libraryActionsButton").setAttribute("aria-expanded", "false");
    document.querySelectorAll(".result-item-menu").forEach(menu => { menu.hidden = true; });
    document.querySelectorAll(".result-item-menu-button").forEach(button => button.setAttribute("aria-expanded", "false"));
  }

  function downloadResult(entry) {
    const payload = { kind: "schola-parliament-result", version: 1, exportedAt: new Date().toISOString(), result: { name: entry.name, state: entry.state } };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = entry.name.trim().replace(/[^a-z0-9äöüß_-]+/gi, "-").replace(/^-|-$/g, "") || "wahlergebnis";
    link.href = url;
    link.download = `${safeName}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function openSavedResult(entry) {
    state = { ...initialState(), ...normalizeSnapshot(entry.state) };
    selectedChartPartyIds.clear();
    activeResultId = CURRENT_VIEW_ID;
    $("#resultLibraryView").hidden = true;
    $("#labView").hidden = false;
    renderPartyEditor();
    update();
    $("#openLibraryButton").focus();
  }

  function loadSavedResultIntoEditor(entry) {
    state = { ...initialState(), ...normalizeSnapshot(entry.state) };
    selectedChartPartyIds.clear();
    activeResultId = CURRENT_VIEW_ID;
    save();
    renderLibrary();
  }

  function renderResultBrowser() {
    const browser = $("#resultBrowserList");
    const currentItem = `<article class="result-browser-item current-result-item${activeResultId === CURRENT_VIEW_ID ? " is-active" : ""}"><span class="result-browser-icon" aria-hidden="true"></span><button class="result-browser-main" type="button"><strong>Aktuelle Ansicht</strong><small>${state.parties.length} Parteien · ${state.seats} Sitze</small></button><span class="current-result-dot" title="Nicht als Wahlergebnis gespeichert" aria-label="Nicht gespeichert"></span></article>`;
    const savedItems = resultLibrary.map(entry => {
      const snapshot = entry.state;
      return `<article class="result-browser-item${entry.id === activeResultId ? " is-active" : ""}" data-result-id="${escapeHtml(entry.id)}"><span class="result-browser-icon" aria-hidden="true"></span><button class="result-browser-main" type="button"><strong>${escapeHtml(entry.name)}</strong><small>${snapshot.parties.length} Parteien · ${snapshot.seats} Sitze</small></button><div class="result-item-menu-shell"><button class="result-item-menu-button" type="button" aria-label="Menü für ${escapeHtml(entry.name)}" aria-expanded="false"><span class="browser-actions-dots" aria-hidden="true"></span></button><div class="result-item-menu" hidden><button type="button" data-action="open">Im Parlament öffnen</button><button type="button" data-action="export">Exportieren</button><button type="button" class="is-danger" data-action="delete">Löschen</button></div></div></article>`;
    }).join("");
    browser.innerHTML = currentItem + savedItems;
    browser.querySelector(".current-result-item .result-browser-main").addEventListener("click", () => { activeResultId = CURRENT_VIEW_ID; renderLibrary(); });
    browser.querySelectorAll(".result-browser-item[data-result-id]").forEach(item => {
      const entry = resultLibrary.find(candidate => candidate.id === item.dataset.resultId);
      item.querySelector(".result-browser-main").addEventListener("click", () => loadSavedResultIntoEditor(entry));
      const menuButton = item.querySelector(".result-item-menu-button");
      const menu = item.querySelector(".result-item-menu");
      menuButton.addEventListener("click", event => {
        event.stopPropagation();
        const opening = menu.hidden;
        closeLibraryMenus();
        menu.hidden = !opening;
        menuButton.setAttribute("aria-expanded", String(opening));
      });
      menu.addEventListener("click", event => {
        const action = event.target.closest("button")?.dataset.action;
        if (action === "open") openSavedResult(entry);
        if (action === "export") downloadResult(entry);
        if (action === "delete" && confirm(`„${entry.name}“ wirklich löschen?`)) {
          resultLibrary = resultLibrary.filter(candidate => candidate.id !== entry.id);
          activeResultId = CURRENT_VIEW_ID;
          persistLibrary();
          renderLibrary();
        }
        closeLibraryMenus();
      });
    });
  }

  function renderCurrentResultEditor() {
    $("#resultDetailLabel").textContent = "Editor";
    $("#resultDetailTitle").textContent = "Aktuelle Ansicht";
    const maximumVotes = Math.max(...normalizedParties().map(party => party.votes), 1);
    const voteStep = state.mode === "percent" ? "0.1" : "1";
    const partyRows = state.parties.map((party, index) => {
      const width = Math.max(0, Number(party.votes) || 0) / maximumVotes * 100;
      return `<div class="current-party-editor-row" data-party-id="${escapeHtml(party.id)}"><div class="current-party-editor-fields"><label class="current-party-color" title="Farbe für ${escapeHtml(party.name)}"><input type="color" value="${escapeHtml(partyColor(party))}"><i style="--party-color:${partyColor(party)}"></i></label><label><span class="sr-only">Parteiname</span><input class="current-party-name" value="${escapeHtml(party.name)}" maxlength="40"></label><label><span class="sr-only">${state.mode === "percent" ? "Stimmenanteil" : "Stimmenzahl"}</span><input class="current-party-votes" type="number" min="0" step="${voteStep}" value="${escapeHtml(party.votes)}"></label><button class="current-party-delete" type="button" aria-label="${escapeHtml(party.name)} löschen"${state.parties.length <= 2 ? " disabled" : ""}>×</button></div><div class="current-party-bar-track" aria-hidden="true"><i style="--party-color:${partyColor(party)};--editor-bar-width:${width}%"></i></div></div>`;
    }).join("");
    $("#resultDetail").innerHTML = `<div class="current-result-editor"><div class="current-result-settings"><label class="library-field"><span>Stimmen als</span><select id="currentModeSelect"><option value="percent"${state.mode === "percent" ? " selected" : ""}>Prozent</option><option value="absolute"${state.mode === "absolute" ? " selected" : ""}>Anzahl</option></select></label><label class="library-field"><span>Sitze</span><input id="currentSeatsInput" type="number" min="1" max="10000" value="${state.seats}"></label><label class="library-field"><span>Sperrklausel (%)</span><input id="currentThresholdInput" type="number" min="0" max="100" step="0.1" value="${state.threshold}"></label><label class="library-field"><span>Verfahren</span><select id="currentMethodSelect"><option value="sainte-lague"${state.method === "sainte-lague" ? " selected" : ""}>Sainte-Laguë/Schepers</option><option value="dhondt"${state.method === "dhondt" ? " selected" : ""}>D’Hondt</option><option value="hare"${state.method === "hare" ? " selected" : ""}>Hare/Niemeyer</option></select></label></div><div class="current-party-editor-head"><span>Parteien und Stimmen</span></div><div id="currentPartyEditor" class="current-party-editor">${partyRows}</div><div class="result-editor-actions"><button id="currentAddPartyButton" class="secondary add-party-button" type="button">+ Partei</button><button id="saveCurrentResultButton" type="button" class="secondary library-primary-action">Wahlergebnis speichern</button></div></div>`;
    const refreshBars = () => {
      const maxVotes = Math.max(...state.parties.map(party => Math.max(0, Number(party.votes) || 0)), 1);
      $("#currentPartyEditor").querySelectorAll(".current-party-editor-row").forEach(row => {
        const party = state.parties.find(candidate => candidate.id === row.dataset.partyId);
        row.querySelector(".current-party-bar-track i").style.setProperty("--editor-bar-width", `${Math.max(0, Number(party.votes) || 0) / maxVotes * 100}%`);
      });
    };
    $("#currentPartyEditor").querySelectorAll(".current-party-editor-row").forEach(row => {
      const party = state.parties.find(candidate => candidate.id === row.dataset.partyId);
      row.querySelector("input[type=color]").addEventListener("input", event => { party.color = event.target.value; row.querySelector(".current-party-bar-track i").style.setProperty("--party-color", party.color); row.querySelector(".current-party-color i").style.setProperty("--party-color", party.color); save(); });
      row.querySelector(".current-party-name").addEventListener("input", event => { party.name = event.target.value; save(); });
      row.querySelector(".current-party-votes").addEventListener("input", event => { party.votes = event.target.value; refreshBars(); save(); });
      row.querySelector(".current-party-delete").addEventListener("click", () => { state.parties = state.parties.filter(candidate => candidate.id !== party.id); save(); renderLibrary(); });
    });
    $("#currentModeSelect").addEventListener("change", event => { state.mode = event.target.value; save(); renderLibrary(); });
    $("#currentSeatsInput").addEventListener("input", event => { state.seats = Math.max(1, Math.min(10000, Math.floor(Number(event.target.value) || 1))); save(); renderResultBrowser(); });
    $("#currentThresholdInput").addEventListener("input", event => { state.threshold = Math.max(0, Math.min(100, Number(event.target.value) || 0)); save(); });
    $("#currentMethodSelect").addEventListener("change", event => { state.method = event.target.value; save(); });
    $("#currentAddPartyButton").addEventListener("click", () => { const index = state.parties.length; state.parties.push({ id: `party-${state.nextId++}`, name: `Partei ${String.fromCharCode(65 + index)}`, votes: 0, color: colors[index % colors.length] }); save(); renderLibrary(); });
    $("#saveCurrentResultButton").addEventListener("click", () => $("#newResultButton").click());
  }

  function renderResultDetail() {
    activeResultId = CURRENT_VIEW_ID;
    renderCurrentResultEditor();
  }

  function renderLibrary() {
    renderResultBrowser();
    renderResultDetail();
  }

  function openLibrary() {
    $("#labView").hidden = true;
    $("#resultLibraryView").hidden = false;
    renderLibrary();
    $("#returnLabButton").focus();
  }

  function syncControls() { $("#seatInput").value = state.seats; $("#thresholdInput").value = state.threshold; $("#methodSelect").value = state.method; document.querySelector(`input[name=mode][value=${state.mode}]`).checked = true; }
  function update(rebuildEditor = false) { state.seats = Math.max(0, Math.min(10000, Math.floor(Number(state.seats) || 0))); state.threshold = Math.max(0, Math.min(100, Number(state.threshold) || 0)); if (rebuildEditor) renderPartyEditor(); syncControls(); renderResults(); save(); }
  $("#addPartyButton").addEventListener("click", () => { const index = state.parties.length; state.parties.push({ id: `party-${state.nextId++}`, name: `Partei ${String.fromCharCode(65 + index)}`, votes: 0, color: colors[index % colors.length] }); update(true); });
  $("#newViewButton").addEventListener("click", () => {
    if (!confirm("Die eingetragenen Ergebnisse der aktuellen Ansicht werden entfernt. Ein neues Wahlergebnis beginnen?")) return;
    state = emptyResultState();
    selectedChartPartyIds.clear();
    activeResultId = CURRENT_VIEW_ID;
    renderPartyEditor();
    update();
  });
  $("#seatInput").addEventListener("input", event => { state.seats = event.target.value; update(); });
  $("#thresholdInput").addEventListener("input", event => { state.threshold = event.target.value; update(); });
  $("#methodSelect").addEventListener("change", event => { state.method = event.target.value; update(); });
  $("#resultViewToggle").addEventListener("click", () => { state.resultView = state.resultView === "chart" ? "parliament" : "chart"; update(); });
  document.querySelectorAll("input[name=mode]").forEach(input => input.addEventListener("change", event => { state.mode = event.target.value; renderPartyEditor(); update(); }));
  $("#openLibraryButton").addEventListener("click", openLibrary);
  $("#returnLabButton").addEventListener("click", () => { $("#resultLibraryView").hidden = true; $("#labView").hidden = false; renderPartyEditor(); update(); $("#openLibraryButton").focus(); });
  $("#libraryActionsButton").addEventListener("click", event => {
    event.stopPropagation();
    const menu = $("#libraryActionsMenu");
    const opening = menu.hidden;
    closeLibraryMenus();
    menu.hidden = !opening;
    $("#libraryActionsButton").setAttribute("aria-expanded", String(opening));
  });
  $("#createResultButton").addEventListener("click", () => {
    closeLibraryMenus();
    resultDialogMode = "empty";
    $("#newResultForm").reset();
    $("#newResultTitle").textContent = "Neues Wahlergebnis";
    $("#confirmNewResultButton").textContent = "Anlegen";
    $("#newResultName").value = `Wahlergebnis ${resultLibrary.length + 1}`;
    $("#newResultDialog").showModal();
    requestAnimationFrame(() => $("#newResultName").select());
  });
  $("#newResultButton").addEventListener("click", () => {
    closeLibraryMenus();
    resultDialogMode = "snapshot";
    $("#newResultForm").reset();
    $("#newResultTitle").textContent = "Aktuellen Stand speichern";
    $("#confirmNewResultButton").textContent = "Speichern";
    $("#newResultName").value = `Wahlergebnis ${resultLibrary.length + 1}`;
    $("#newResultDialog").showModal();
    requestAnimationFrame(() => $("#newResultName").select());
  });
  $("#cancelNewResultButton").addEventListener("click", () => $("#newResultDialog").close());
  $("#newResultForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("#newResultName").value.trim();
    if (!name) return $("#newResultName").focus();
    const now = new Date().toISOString();
    const entry = { id: makeId(), name, createdAt: now, updatedAt: now, state: resultDialogMode === "empty" ? emptyResultState() : snapshotState() };
    resultLibrary.unshift(entry);
    activeResultId = resultDialogMode === "empty" ? entry.id : CURRENT_VIEW_ID;
    persistLibrary();
    $("#newResultDialog").close();
    if (resultDialogMode === "empty") openSavedResult(entry);
    else renderLibrary();
  });
  $("#importResultButton").addEventListener("click", () => {
    closeLibraryMenus();
    $("#importResultForm").reset();
    $("#importResultStatus").textContent = "";
    $("#importResultDialog").showModal();
  });
  $("#cancelImportResultButton").addEventListener("click", () => $("#importResultDialog").close());
  $("#importResultForm").addEventListener("submit", async event => {
    event.preventDefault();
    const file = $("#importResultFile").files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { $("#importResultStatus").textContent = "Die Datei ist größer als 2 MB."; return; }
    try {
      const payload = JSON.parse(await file.text());
      if (payload?.kind !== "schola-parliament-result" || payload?.version !== 1 || !payload?.result) throw new Error("Die Datei ist kein gültiger Parlament-Export.");
      const now = new Date().toISOString();
      const entry = { id: makeId(), name: String(payload.result.name || file.name.replace(/\.json$/i, "") || "Importiertes Wahlergebnis").slice(0, 80), createdAt: now, updatedAt: now, state: normalizeSnapshot(payload.result.state) };
      resultLibrary.unshift(entry);
      state = { ...initialState(), ...normalizeSnapshot(entry.state) };
      selectedChartPartyIds.clear();
      activeResultId = CURRENT_VIEW_ID;
      save();
      persistLibrary();
      $("#importResultDialog").close();
      renderLibrary();
    } catch (error) {
      $("#importResultStatus").textContent = error instanceof Error ? error.message : "Das Wahlergebnis konnte nicht importiert werden.";
    }
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".browser-actions-menu-shell") && !event.target.closest(".result-item-menu-shell")) closeLibraryMenus();
  });
  window.addEventListener("resize", () => renderParliament(calculate(state.method)));
  renderPartyEditor(); syncControls(); renderResults();
})();
