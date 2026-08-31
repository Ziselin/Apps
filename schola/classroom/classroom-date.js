(() => {
  const stateKey = 'schola-classroom-date';
  const dock = document.querySelector('.tool-dock');
  const moreButton = document.querySelector('#moreToolButton');
  const stage = document.querySelector('.screen-stage');
  const toolButton = document.createElement('button');
  toolButton.id = 'dateToolButton';
  toolButton.className = 'tool-button';
  toolButton.type = 'button';
  toolButton.dataset.dockMiniapp = 'date';
  toolButton.setAttribute('aria-pressed', 'false');
  toolButton.innerHTML = '<img class="tool-icon miniapp-reference-icon" src="../../assets/date-icon.svg?v=20260831a" alt="" aria-hidden="true"><span>Datum</span>';
  dock.insertBefore(toolButton, moreButton);

  const widget = document.createElement('section');
  widget.id = 'classroomDateWidget';
  widget.className = 'classroom-date-widget';
  widget.hidden = true;
  widget.tabIndex = 0;
  widget.setAttribute('aria-label', 'Datum');
  widget.innerHTML = `<time class="classroom-date-value"></time><button class="classroom-date-close" type="button" aria-label="Datum schließen">×</button>${['nw','ne','sw','se'].map(corner => `<span class="classroom-date-resize ${corner}" data-date-resize="${corner}" aria-hidden="true"></span>`).join('')}`;
  stage.append(widget);

  const initialWidth = Math.min(660, Math.max(360, stage.clientWidth * .48));
  let state = {
    visible: false,
    layout: {
      x: Math.max(18, Math.round((stage.clientWidth - initialWidth) / 2)),
      y: Math.max(18, Math.round(stage.clientHeight * .16)),
      width: initialWidth,
      fontSize: 42
    }
  };
  try {
    const stored = JSON.parse(localStorage.getItem(stateKey) || 'null');
    if (stored?.layout) state = {...state, ...stored, layout: {...state.layout, ...stored.layout}};
  } catch {}

  const value = widget.querySelector('.classroom-date-value');
  const formatter = new Intl.DateTimeFormat('de-DE', {weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'});
  let gesture = null;

  function save() {
    try { localStorage.setItem(stateKey, JSON.stringify(state)); } catch (error) { console.warn('Datum konnte nicht lokal gespeichert werden.', error); }
  }

  function updateDate() {
    const now = new Date();
    value.dateTime = now.toISOString().slice(0, 10);
    value.textContent = formatter.format(now);
  }

  function applyLayout() {
    widget.style.left = `${state.layout.x}px`;
    widget.style.top = `${state.layout.y}px`;
    widget.style.width = `${state.layout.width}px`;
    widget.style.setProperty('--date-font-size', `${state.layout.fontSize}px`);
  }

  function render() {
    updateDate();
    applyLayout();
    widget.hidden = !state.visible;
    widget.classList.remove('is-selected');
    toolButton.classList.toggle('active', state.visible);
    toolButton.setAttribute('aria-pressed', String(state.visible));
  }

  function setVisible(visible) {
    state.visible = visible;
    save();
    render();
  }

  toolButton.addEventListener('click', () => setVisible(!state.visible));
  widget.querySelector('.classroom-date-close').addEventListener('pointerdown', event => event.stopPropagation());
  widget.querySelector('.classroom-date-close').addEventListener('click', event => { event.stopPropagation(); setVisible(false); });
  widget.addEventListener('pointerdown', event => {
    if (event.target.closest('button')) return;
    event.preventDefault();
    event.stopPropagation();
    widget.classList.add('is-selected');
    const handle = event.target.closest('[data-date-resize]');
    gesture = {
      mode: handle ? 'resize' : 'move',
      corner: handle?.dataset.dateResize || '',
      startX: event.clientX,
      startY: event.clientY,
      ...state.layout
    };
    widget.setPointerCapture?.(event.pointerId);
  });
  document.addEventListener('pointermove', event => {
    if (!gesture) return;
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    if (gesture.mode === 'move') {
      state.layout.x = gesture.x + dx;
      state.layout.y = gesture.y + dy;
    } else {
      const delta = Math.abs(dx) > Math.abs(dy) ? dx * (gesture.corner.includes('e') ? 1 : -1) : dy * (gesture.corner.includes('s') ? 1 : -1);
      const width = Math.max(280, Math.min(1100, gesture.width + delta));
      if (gesture.corner.includes('w')) state.layout.x = gesture.x + gesture.width - width;
      if (gesture.corner.includes('n')) state.layout.y = gesture.y - (width - gesture.width) * .08;
      state.layout.width = width;
      state.layout.fontSize = Math.max(24, Math.min(82, gesture.fontSize * width / gesture.width));
    }
    applyLayout();
  });
  document.addEventListener('pointerup', () => {
    if (gesture) save();
    gesture = null;
  });
  document.addEventListener('pointerdown', event => {
    if (!widget.contains(event.target)) widget.classList.remove('is-selected');
  });
  widget.addEventListener('keydown', event => {
    if (event.key === 'Escape') widget.classList.remove('is-selected');
  });

  const dateSelection = document.querySelector('[data-dock-selection="date"]');
  let dockSelection = {};
  try { dockSelection = JSON.parse(localStorage.getItem('schola-classroom-dock-selection') || '{}') || {}; } catch {}
  toolButton.hidden = dockSelection.date === false;
  if (dateSelection) {
    dateSelection.checked = dockSelection.date !== false;
    dateSelection.addEventListener('change', () => { toolButton.hidden = !dateSelection.checked; });
  }

  window.classroomScreenApi.registerTool('date', {
    reset: () => {
      localStorage.removeItem(stateKey);
      state.visible = false;
      render();
    },
    hide: () => {},
    exportState: () => ({...state, currentDate: value.dateTime, formattedDate: value.textContent})
  });

  render();
  setInterval(updateDate, 60000);
})();
