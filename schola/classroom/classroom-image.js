(() => {
  const stateKey = 'schola-classroom-images';
  const dock = document.querySelector('.tool-dock');
  const moreButton = document.querySelector('#moreToolButton');
  const stage = document.querySelector('.screen-stage');
  const imageToolButton = document.createElement('button');
  imageToolButton.id = 'imageToolButton';
  imageToolButton.className = 'tool-button';
  imageToolButton.type = 'button';
  imageToolButton.innerHTML = '<img class="tool-icon miniapp-reference-icon" src="../../assets/image-insert-icon.svg?v=20260831a" alt="" aria-hidden="true"><span>Bild einfügen</span>';
  dock.insertBefore(imageToolButton, moreButton);
  imageToolButton.dataset.dockMiniapp = 'image';

  const dialog = document.createElement('dialog');
  dialog.id = 'imageInsertDialog';
  dialog.className = 'text-insert-dialog image-insert-dialog';
  dialog.setAttribute('aria-labelledby', 'imageInsertTitle');
  dialog.innerHTML = `<div class="text-dialog-content">
    <header><div><span class="label">Classroom Screen</span><h2 id="imageInsertTitle">Bild einfügen</h2></div><button type="button" data-image-dialog-close aria-label="Dialog schließen">×</button></header>
    <div class="image-source-actions">
      <button id="chooseImageButton" type="button">Bilddatei auswählen</button>
      <div id="imagePasteZone" class="image-paste-zone" tabindex="0"><strong>Bild hier einfügen</strong><span>Mit Strg + V oder per Drag &amp; Drop</span></div>
    </div>
    <input id="imageFileInput" type="file" accept="image/*" hidden>
    <div id="imageImportPreview" class="image-import-preview" hidden><img alt="Vorschau des einzufügenden Bildes"></div>
    <p id="imageInsertStatus" role="status" aria-live="polite">Wähle eine Bilddatei oder kopiere ein Bild in die Zwischenablage.</p>
    <footer><button type="button" data-image-dialog-close>Abbrechen</button><button id="insertImageButton" type="button" class="primary" disabled>Einfügen</button></footer>
  </div>`;
  document.body.append(dialog);

  let items = [];
  let pendingImage = null;
  let gesture = null;
  try {
    const stored = JSON.parse(localStorage.getItem(stateKey) || '[]');
    if (Array.isArray(stored)) items = stored;
  } catch {}

  const fileInput = dialog.querySelector('#imageFileInput');
  const pasteZone = dialog.querySelector('#imagePasteZone');
  const preview = dialog.querySelector('#imageImportPreview');
  const previewImage = preview.querySelector('img');
  const status = dialog.querySelector('#imageInsertStatus');
  const insertButton = dialog.querySelector('#insertImageButton');
  const imageSelection = document.querySelector('[data-dock-selection="image"]');
  let dockSelection = {};
  try { dockSelection = JSON.parse(localStorage.getItem('schola-classroom-dock-selection') || '{}') || {}; } catch {}
  imageToolButton.hidden = dockSelection.image === false;
  if (imageSelection) {
    imageSelection.checked = dockSelection.image !== false;
    imageSelection.addEventListener('change', () => { imageToolButton.hidden = !imageSelection.checked; });
  }

  function saveItems() {
    try {
      localStorage.setItem(stateKey, JSON.stringify(items));
      return true;
    } catch (error) {
      console.warn('Bilder konnten nicht vollständig lokal gespeichert werden.', error);
      return false;
    }
  }

  function updateToolState() {
    imageToolButton.classList.toggle('active', items.some(item => item.visible !== false));
  }

  function defaultLayout(width, height) {
    const maxWidth = Math.min(900, stage.clientWidth * .58);
    const maxHeight = Math.min(680, stage.clientHeight * .7);
    const scale = Math.min(1, maxWidth / width, maxHeight / height);
    const displayWidth = Math.max(120, Math.round(width * scale));
    const displayHeight = Math.max(80, Math.round(height * scale));
    return {
      x: Math.max(18, Math.round((stage.clientWidth - displayWidth) / 2)),
      y: Math.max(18, Math.round((stage.clientHeight - displayHeight) / 2)),
      width: displayWidth,
      height: displayHeight,
      aspect: width / height
    };
  }

  function applyLayout(widget, layout) {
    widget.style.left = `${layout.x}px`;
    widget.style.top = `${layout.y}px`;
    widget.style.width = `${layout.width}px`;
    widget.style.height = `${layout.height}px`;
  }

  function createWidget(item) {
    const widget = document.createElement('section');
    widget.className = 'screen-image-widget';
    widget.dataset.imageId = item.id;
    widget.tabIndex = 0;
    widget.setAttribute('aria-label', item.name ? `Bild: ${item.name}` : 'Eingefügtes Bild');
    widget.innerHTML = `<img src="${item.dataUrl}" alt=""><button class="screen-image-close" type="button" aria-label="Bild schließen">×</button>${['nw','ne','sw','se'].map(corner => `<span class="screen-image-resize ${corner}" data-image-resize="${corner}" aria-hidden="true"></span>`).join('')}`;
    applyLayout(widget, item.layout);
    stage.append(widget);

    widget.querySelector('.screen-image-close').addEventListener('pointerdown', event => event.stopPropagation());
    widget.querySelector('.screen-image-close').addEventListener('click', event => {
      event.stopPropagation();
      item.visible = false;
      widget.remove();
      saveItems();
      updateToolState();
    });
    widget.addEventListener('pointerdown', event => {
      if (event.target.closest('button')) return;
      event.preventDefault();
      event.stopPropagation();
      document.querySelectorAll('.screen-image-widget.is-selected').forEach(node => node.classList.remove('is-selected'));
      widget.classList.add('is-selected');
      const handle = event.target.closest('[data-image-resize]');
      gesture = {
        item,
        widget,
        mode: handle ? 'resize' : 'move',
        corner: handle?.dataset.imageResize || '',
        startX: event.clientX,
        startY: event.clientY,
        ...item.layout
      };
      widget.setPointerCapture?.(event.pointerId);
    });
    widget.addEventListener('keydown', event => {
      if (event.key === 'Escape') widget.classList.remove('is-selected');
    });
    return widget;
  }

  function renderItems() {
    document.querySelectorAll('.screen-image-widget').forEach(widget => widget.remove());
    items.filter(item => item.visible !== false && item.dataUrl && item.layout).forEach(createWidget);
    updateToolState();
  }

  document.addEventListener('pointermove', event => {
    if (!gesture) return;
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    const layout = gesture.item.layout;
    if (gesture.mode === 'move') {
      layout.x = gesture.x + dx;
      layout.y = gesture.y + dy;
    } else {
      const horizontal = dx * (gesture.corner.includes('e') ? 1 : -1);
      const vertical = dy * (gesture.corner.includes('s') ? 1 : -1);
      const widthFromX = gesture.width + horizontal;
      const widthFromY = gesture.width + vertical * gesture.aspect;
      const nextWidth = Math.max(120, Math.min(1600, Math.abs(horizontal) > Math.abs(vertical) ? widthFromX : widthFromY));
      const nextHeight = nextWidth / gesture.aspect;
      if (gesture.corner.includes('w')) layout.x = gesture.x + gesture.width - nextWidth;
      if (gesture.corner.includes('n')) layout.y = gesture.y + gesture.height - nextHeight;
      layout.width = nextWidth;
      layout.height = nextHeight;
    }
    applyLayout(gesture.widget, layout);
  });
  document.addEventListener('pointerup', () => {
    if (gesture) saveItems();
    gesture = null;
  });
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('.screen-image-widget')) document.querySelectorAll('.screen-image-widget.is-selected').forEach(node => node.classList.remove('is-selected'));
  });

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Das Bild konnte nicht gelesen werden.'));
      image.src = url;
    });
  }

  function canvasBlob(canvas, quality) {
    return new Promise(resolve => canvas.toBlob(resolve, 'image/webp', quality));
  }

  function blobDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Das Bild konnte nicht vorbereitet werden.'));
      reader.readAsDataURL(blob);
    });
  }

  async function prepareFile(file) {
    if (!file?.type?.startsWith('image/')) throw new Error('Bitte eine Bilddatei auswählen oder ein Bild einfügen.');
    const objectUrl = URL.createObjectURL(file);
    try {
      const image = await loadImage(objectUrl);
      let scale = Math.min(1, 2400 / Math.max(image.naturalWidth, image.naturalHeight));
      let quality = .9;
      let blob;
      let width;
      let height;
      for (let attempt = 0; attempt < 4; attempt++) {
        width = Math.max(1, Math.round(image.naturalWidth * scale));
        height = Math.max(1, Math.round(image.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        blob = await canvasBlob(canvas, quality);
        if (blob && blob.size <= 1500000) break;
        scale *= .78;
        quality = Math.max(.72, quality - .06);
      }
      if (!blob) throw new Error('Das Bild konnte nicht verarbeitet werden.');
      return {dataUrl: await blobDataUrl(blob), width, height, name: file.name || 'Bild', mime: blob.type, originalType: file.type, originalSize: file.size};
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  async function acceptFile(file) {
    status.textContent = 'Bild wird vorbereitet …';
    insertButton.disabled = true;
    try {
      pendingImage = await prepareFile(file);
      previewImage.src = pendingImage.dataUrl;
      preview.hidden = false;
      status.textContent = `${pendingImage.name} · ${pendingImage.width} × ${pendingImage.height} px`;
      insertButton.disabled = false;
    } catch (error) {
      pendingImage = null;
      preview.hidden = true;
      status.textContent = error.message || 'Das Bild konnte nicht übernommen werden.';
    }
  }

  function resetDialog() {
    pendingImage = null;
    fileInput.value = '';
    preview.hidden = true;
    previewImage.removeAttribute('src');
    insertButton.disabled = true;
    status.textContent = 'Wähle eine Bilddatei oder kopiere ein Bild in die Zwischenablage.';
  }

  function openDialog() {
    resetDialog();
    dialog.showModal();
    requestAnimationFrame(() => pasteZone.focus());
  }

  imageToolButton.addEventListener('click', openDialog);
  dialog.querySelector('#chooseImageButton').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => acceptFile(fileInput.files[0]));
  dialog.querySelectorAll('[data-image-dialog-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('paste', event => {
    const imageFile = [...(event.clipboardData?.items || [])].find(item => item.type.startsWith('image/'))?.getAsFile();
    if (!imageFile) {
      status.textContent = 'In der Zwischenablage wurde kein Bild gefunden.';
      return;
    }
    event.preventDefault();
    acceptFile(imageFile);
  });
  pasteZone.addEventListener('dragover', event => { event.preventDefault(); pasteZone.classList.add('is-dragging'); });
  pasteZone.addEventListener('dragleave', () => pasteZone.classList.remove('is-dragging'));
  pasteZone.addEventListener('drop', event => {
    event.preventDefault();
    pasteZone.classList.remove('is-dragging');
    acceptFile([...event.dataTransfer.files].find(file => file.type.startsWith('image/')));
  });
  insertButton.addEventListener('click', () => {
    if (!pendingImage) return;
    const item = {
      id: `image-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...pendingImage,
      addedAt: new Date().toISOString(),
      visible: true,
      layout: defaultLayout(pendingImage.width, pendingImage.height)
    };
    items.push(item);
    const persisted = saveItems();
    createWidget(item).classList.add('is-selected');
    updateToolState();
    dialog.close();
    if (!persisted) window.alert('Das Bild ist eingefügt, konnte wegen des lokalen Speicherlimits aber nicht dauerhaft im Browser gesichert werden. Der JSON-Export enthält es weiterhin.');
  });

  window.classroomScreenApi.registerTool('image', {
    reset: () => {
      items = [];
      localStorage.removeItem(stateKey);
      renderItems();
      if (dialog.open) dialog.close();
    },
    hide: () => { if (dialog.open) dialog.close(); },
    exportState: () => ({items: items.map(item => ({...item}))})
  });

  renderItems();
})();
