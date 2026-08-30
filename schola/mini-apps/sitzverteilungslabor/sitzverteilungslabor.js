(() => {
  "use strict";
  const $ = selector => document.querySelector(selector);
  const STORAGE_KEY = "schola-seat-lab-v1";
  const methods = ["sainte-lague", "dhondt", "hare"];
  const colors = ["#416a64", "#c96d55", "#7c72a0", "#c69c45", "#5c7fa3", "#9a6c7b", "#6f8e58", "#b47842"];
  const descriptions = {
    "sainte-lague": "Teilt die Stimmen durch 1, 3, 5 … und vergibt Sitze an die höchsten Ergebnisse. Es behandelt große und kleine Parteien möglichst ausgewogen.",
    dhondt: "Teilt die Stimmen durch 1, 2, 3 … Die höchsten Ergebnisse bekommen die Sitze. Größere Parteien können dabei etwas günstiger abschneiden.",
    hare: "Berechnet zuerst den genauen Sitzanspruch. Ganze Sitze werden sofort vergeben, die übrigen nach den größten Nachkommaresten.",
  };
  const initialState = () => ({ mode: "percent", seats: 20, threshold: 0, view: "compare", method: "sainte-lague", nextId: 3, parties: [{ id: "party-1", name: "Partei A", votes: 50, color: colors[0] }, { id: "party-2", name: "Partei B", votes: 50, color: colors[1] }] });
  function load() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); return saved?.parties?.length ? { ...initialState(), ...saved } : initialState(); } catch { return initialState(); } }
  let state = load();
  const format = (value, digits = 1) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
  const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const partyColor = party => party.color || colors[state.parties.indexOf(party) % colors.length];

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    $("#saveState").textContent = "Gespeichert";
    window.clearTimeout(save.timer);
    save.timer = window.setTimeout(() => $("#saveState").textContent = "Automatisch gespeichert", 900);
  }
  function normalizedParties() { return state.parties.map(party => ({ ...party, votes: Math.max(0, Number(party.votes) || 0) })); }
  function calculate(method) { return SeatAllocation.allocateSeats({ method, parties: normalizedParties(), seats: state.seats, threshold: state.threshold }); }
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
  function renderResultTable(result) {
    $("#resultTable").innerHTML = `<table><thead><tr><th>Partei</th><th>Stimmen</th><th>Stimmenanteil</th><th>Sitze</th><th>Sitzanteil</th><th>Abweichung</th></tr></thead><tbody>${result.results.map(row => `<tr class="${row.eligible ? "" : "excluded"}"><td>${partyLabel(row)}${row.eligible ? "" : "<small> unter Sperrklausel</small>"}</td><td>${state.mode === "percent" ? `${format(row.votes)} %` : format(row.votes, 0)}</td><td>${format(row.voteShare)} %</td><td><b>${row.seats}</b></td><td>${format(row.seatShare)} %</td><td>${row.deviation > 0 ? "+" : ""}${format(row.deviation)} PP</td></tr>`).join("")}</tbody></table>`;
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
    if (result.method === "hare") return `<div class="calculation-section"><h3>${result.methodInfo.name}</h3><p>Exakter Anspruch = Stimmen der zugelassenen Partei ÷ zugelassene Stimmen × ${result.seats} Sitze.</p><div class="table-wrap"><table><thead><tr><th>Partei</th><th>Anspruch</th><th>Zunächst</th><th>Rest</th><th>Zusatzsitz</th></tr></thead><tbody>${result.detail.rows.map(row => `<tr><td>${escapeHtml(row.party.name)}</td><td>${format(row.quota, 3)}</td><td>${row.base}</td><td>${format(row.remainder, 3)}</td><td>${row.extra ? "ja" : "–"}</td></tr>`).join("")}</tbody></table></div>${tie}</div>`;
    const relevant = result.detail.steps.slice(Math.max(0, result.detail.steps.length - Math.min(12, result.detail.steps.length)));
    return `<div class="calculation-section"><h3>${result.methodInfo.name}</h3><p>${result.method === "sainte-lague" ? "Die Höchstzahlen entstehen durch Division durch 1, 3, 5 … Diese Darstellung ist äquivalent zur Standardrundung mit einem gemeinsamen Divisor." : "Die Höchstzahlen entstehen durch Division durch 1, 2, 3 …"} Gezeigt werden die letzten Vergaben.</p><div class="table-wrap"><table><thead><tr><th>Sitz</th><th>Partei</th><th>Divisor</th><th>Höchstzahl</th></tr></thead><tbody>${relevant.map(step => { const party = result.results.find(row => row.id === step.partyId); return `<tr><td>${step.seat}</td><td>${escapeHtml(party.name)}</td><td>${step.divisor}</td><td>${format(step.quotient, 3)}</td></tr>`; }).join("")}</tbody></table></div>${tie}</div>`;
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
    $("#shareHint").textContent = state.mode === "percent" ? `Summe der eingegebenen Anteile: ${format(sum)} %` : `Insgesamt eingegebene Stimmen: ${format(sum, 0)}`;
    $("#assumptionBar").innerHTML = `<span>Stimmenmodus: ${state.mode === "percent" ? "Prozent" : "Anzahl"}</span><span>Sitze: ${state.seats}</span><span>Sperrklausel: ${state.threshold ? `${format(state.threshold)} %` : "keine"}</span><span>Ansicht: ${state.view === "compare" ? "Vergleich" : SeatAllocation.METHODS[state.method].name}</span>`;
    $("#methodField").hidden = state.view === "compare";
    $("#comparisonCard").hidden = state.view !== "compare";
    $("#resultTitle").textContent = state.view === "compare" ? `${active.methodInfo.name} im Parlament` : "Das neue Parlament";
    $("#gallagherBadge").innerHTML = `<span>Gallagher-Index</span><b>${format(active.gallagher, 2)}</b>`;
    renderParliament(active); renderResultTable(active); renderComparison(all);
    $("#calculation").innerHTML = (state.view === "compare" ? methods.map(method => calculationTable(all[method])).join("") : calculationTable(active));
  }

  function renderMethodCards() { $("#methodCards").innerHTML = methods.map(method => `<article class="method-card"><span class="eyebrow">${SeatAllocation.METHODS[method].kind}</span><h3>${SeatAllocation.METHODS[method].name}</h3><p>${descriptions[method]}</p></article>`).join(""); }
  function syncControls() { $("#seatInput").value = state.seats; $("#thresholdInput").value = state.threshold; $("#methodSelect").value = state.method; document.querySelector(`input[name=mode][value=${state.mode}]`).checked = true; document.querySelector(`input[name=view][value=${state.view}]`).checked = true; }
  function update(rebuildEditor = false) { state.seats = Math.max(0, Math.min(10000, Math.floor(Number(state.seats) || 0))); state.threshold = Math.max(0, Math.min(100, Number(state.threshold) || 0)); if (rebuildEditor) renderPartyEditor(); syncControls(); renderResults(); save(); }
  $("#addPartyButton").addEventListener("click", () => { const index = state.parties.length; state.parties.push({ id: `party-${state.nextId++}`, name: `Partei ${String.fromCharCode(65 + index)}`, votes: 0, color: colors[index % colors.length] }); update(true); });
  $("#seatInput").addEventListener("input", event => { state.seats = event.target.value; update(); });
  $("#thresholdInput").addEventListener("input", event => { state.threshold = event.target.value; update(); });
  $("#methodSelect").addEventListener("change", event => { state.method = event.target.value; update(); });
  document.querySelectorAll("input[name=mode]").forEach(input => input.addEventListener("change", event => { state.mode = event.target.value; renderPartyEditor(); update(); }));
  document.querySelectorAll("input[name=view]").forEach(input => input.addEventListener("change", event => { state.view = event.target.value; update(); }));
  $("#resetButton").addEventListener("click", () => { if (confirm("Alle Eingaben auf den Ausgangszustand zurücksetzen?")) { state = initialState(); localStorage.removeItem(STORAGE_KEY); renderPartyEditor(); update(); } });
  $("#randomButton").addEventListener("click", () => { const weights = state.parties.map(() => Math.random() ** .75 + .08), total = weights.reduce((a, b) => a + b, 0); state.mode = "percent"; state.parties.forEach((party, index) => { party.votes = Number((weights[index] / total * 100).toFixed(1)); }); renderPartyEditor(); update(); });
  window.addEventListener("resize", () => renderParliament(calculate(state.method)));
  renderMethodCards(); renderPartyEditor(); syncControls(); renderResults();
})();
