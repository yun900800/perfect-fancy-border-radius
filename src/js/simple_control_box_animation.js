const STORAGE_KEY = 'fancy_border_simple_animation';

const SIMPLE_PRESETS = {
  blob: [
    { left: 30, right: 30, top: 30, bottom: 30, width: '', height: '' },
    { left: 50, right: 50, top: 70, bottom: 70, width: '', height: '' },
    { left: 30, right: 30, top: 30, bottom: 30, width: '', height: '' },
  ],
  breathing: [
    { left: 30, right: 30, top: 30, bottom: 30, width: '', height: '' },
    { left: 50, right: 50, top: 50, bottom: 50, width: '', height: '' },
    { left: 30, right: 30, top: 30, bottom: 30, width: '', height: '' },
  ],
  morph1: [
    { left: 10, right: 40, top: 30, bottom: 60, width: '', height: '' },
    { left: 40, right: 10, top: 60, bottom: 30, width: '', height: '' },
    { left: 60, right: 20, top: 10, bottom: 80, width: '', height: '' },
    { left: 20, right: 60, top: 80, bottom: 10, width: '', height: '' },
  ],
  waterdrop: [
    { left: 20, right: 20, top: 5, bottom: 90, width: '', height: '' },
    { left: 35, right: 35, top: 15, bottom: 70, width: '', height: '' },
    { left: 50, right: 50, top: 20, bottom: 50, width: '', height: '' },
    { left: 35, right: 35, top: 15, bottom: 70, width: '', height: '' },
    { left: 20, right: 20, top: 5, bottom: 90, width: '', height: '' },
  ],
  leaf: [
    { left: 10, right: 90, top: 10, bottom: 90, width: '', height: '' },
    { left: 30, right: 70, top: 30, bottom: 70, width: '', height: '' },
    { left: 50, right: 50, top: 50, bottom: 50, width: '', height: '' },
    { left: 30, right: 70, top: 30, bottom: 70, width: '', height: '' },
    { left: 10, right: 90, top: 10, bottom: 90, width: '', height: '' },
  ],
  organic: [
    { left: 30, right: 70, top: 20, bottom: 80, width: '', height: '' },
    { left: 70, right: 30, top: 80, bottom: 20, width: '', height: '' },
    { left: 50, right: 50, top: 50, bottom: 50, width: '', height: '' },
    { left: 20, right: 80, top: 40, bottom: 60, width: '', height: '' },
    { left: 80, right: 20, top: 60, bottom: 40, width: '', height: '' },
    { left: 30, right: 70, top: 20, bottom: 80, width: '', height: '' },
  ],
  wobbly: [
    { left: 20, right: 80, top: 30, bottom: 70, width: '', height: '' },
    { left: 40, right: 60, top: 20, bottom: 80, width: '', height: '' },
    { left: 60, right: 40, top: 70, bottom: 30, width: '', height: '' },
    { left: 80, right: 20, top: 40, bottom: 60, width: '', height: '' },
    { left: 30, right: 70, top: 60, bottom: 40, width: '', height: '' },
    { left: 20, right: 80, top: 30, bottom: 70, width: '', height: '' },
  ],
};

export default function initSimpleAnimation(simpleBox) {
  simpleBox.frames = [];
  simpleBox.duration = 3;
  simpleBox.easing = 'ease-in-out';
  simpleBox.isPlaying = false;
  
  const animCodeElem = document.getElementById("anim-css-code");
  const frameStatus = document.getElementById("frame-status");
  const framesList = document.getElementById("frames-list");
  
  loadFromStorage();
  
  function loadFromStorage() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data) {
        simpleBox.frames = data.frames || [];
        simpleBox.duration = data.duration || 3;
        simpleBox.easing = data.easing || 'ease-in-out';
        
        document.getElementById("anim-duration").value = simpleBox.duration;
        document.getElementById("duration-value").textContent = simpleBox.duration + 's';
        document.getElementById("anim-easing").value = simpleBox.easing;
        
        renderFramesList();
        if (simpleBox.frames.length >= 2) {
          generateKeyframes();
        }
      }
    } catch (e) {
      console.warn('Could not load from localStorage');
    }
  }
  
  function saveToStorage() {
    try {
      const data = {
        frames: simpleBox.frames,
        duration: simpleBox.duration,
        easing: simpleBox.easing
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save to localStorage');
    }
  }
  
  function renderFramesList() {
    frameStatus.textContent = simpleBox.frames.length;
    framesList.innerHTML = simpleBox.frames.map((f, i) => `
      <div class="frame-item">
        <span>#${i + 1}</span>
        <button class="frame-delete" data-index="${i}">&times;</button>
      </div>
    `).join('');
    
    framesList.querySelectorAll('.frame-delete').forEach(btn => {
      btn.onclick = () => deleteFrame(parseInt(btn.dataset.index));
    });
  }
  
  function recordFrame() {
    simpleBox.frames.push({ ...simpleBox.state });
    renderFramesList();
    generateKeyframes();
    saveToStorage();
  }
  
  function deleteFrame(index) {
    simpleBox.frames.splice(index, 1);
    renderFramesList();
    generateKeyframes();
    saveToStorage();
  }
  
  function generateKeyframes() {
    if (simpleBox.frames.length < 2) {
      animCodeElem.innerHTML = '';
      return;
    }
    let css = `@keyframes morph {\n`;
    simpleBox.frames.forEach((s, i) => {
      let pct = Math.floor((i / (simpleBox.frames.length - 1)) * 100);
      let val = `${s.top}% ${100 - s.top}% ${100 - s.bottom}% ${s.bottom}% / ${s.left}% ${s.right}% ${100 - s.right}% ${100 - s.left}%`;
      css += `  ${pct}% { border-radius: ${val}; }\n`;
    });
    css += `}\n`;
    css += `\n.animated-shape {\n`;
    css += `  animation: morph ${simpleBox.duration}s infinite alternate ${simpleBox.easing};\n`;
    css += `}`;
    animCodeElem.innerHTML = css;
  }
  
  function togglePreview() {
    if (simpleBox.isPlaying) {
      simpleBox.isPlaying = false;
      simpleBox.shapeElem.style.animation = "";
      document.getElementById("play-anim").textContent = "Preview";
    } else {
      if (simpleBox.frames.length < 2) return;
      generateKeyframes();
      let style = document.getElementById("simple-anim-style-tag") || document.createElement('style');
      style.id = "simple-anim-style-tag";
      style.innerHTML = animCodeElem.innerText;
      document.head.appendChild(style);
      simpleBox.isPlaying = true;
      simpleBox.shapeElem.style.animation = `morph ${simpleBox.duration}s infinite alternate ${simpleBox.easing}`;
      document.getElementById("play-anim").textContent = "Stop";
    }
  }
  
  function clearFrames() {
    simpleBox.frames = [];
    simpleBox.isPlaying = false;
    renderFramesList();
    simpleBox.shapeElem.style.animation = "";
    animCodeElem.innerHTML = "";
    document.getElementById("play-anim").textContent = "Preview";
    saveToStorage();
  }
  
  function copyAnimationCode() {
    const code = animCodeElem.innerText;
    if (!code) return;
    navigator.clipboard.writeText(code).then(
      () => { showCopyFeedback(true); },
      () => { showCopyFeedback(false); }
    );
  }
  
  function showCopyFeedback(success = true) {
    const btn = document.getElementById("copy-anim");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = success 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Error`;
    btn.style.background = success ? '#00cc66' : '#ff4444';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 1500);
  }
  
  function loadPreset(presetName, presetFrames) {
    simpleBox.frames = presetFrames.map(f => ({ ...f }));
    simpleBox.isPlaying = false;
    simpleBox.shapeElem.style.animation = "";
    renderFramesList();
    generateKeyframes();
    saveToStorage();
    
    const firstFrame = simpleBox.frames[0];
    if (firstFrame) {
      Object.keys(firstFrame).forEach(key => {
        if (simpleBox.handles[key]) {
          simpleBox.handles[key].pos = firstFrame[key];
          simpleBox.handles[key].elem.style[simpleBox.handles[key].axis === 'x' ? 'left' : 'top'] = firstFrame[key] + '%';
        }
        simpleBox.state[key] = firstFrame[key];
      });
      simpleBox.updateBorderRadius();
    }
    
    document.getElementById("play-anim").textContent = "Preview";
    document.getElementById("preset-select").value = presetName;
  }
  
  document.getElementById("record-frame").onclick = recordFrame;
  document.getElementById("play-anim").onclick = togglePreview;
  document.getElementById("clear-frames").onclick = clearFrames;
  document.getElementById("copy-anim").onclick = copyAnimationCode;
  
  const durationSlider = document.getElementById("anim-duration");
  const durationValue = document.getElementById("duration-value");
  durationSlider.oninput = () => {
    simpleBox.duration = parseFloat(durationSlider.value);
    durationValue.textContent = simpleBox.duration + 's';
    if (simpleBox.frames.length >= 2) generateKeyframes();
  };
  
  document.getElementById("anim-easing").onchange = (e) => {
    simpleBox.easing = e.target.value;
    if (simpleBox.frames.length >= 2) generateKeyframes();
  };
  
  document.getElementById("preset-select").onchange = (e) => {
    if (e.target.value && SIMPLE_PRESETS[e.target.value]) {
      loadPreset(e.target.value, SIMPLE_PRESETS[e.target.value]);
    }
  };
}
