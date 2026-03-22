import AdjustableBox from './adjustable_box'
import Movable from './movable'

const STORAGE_KEY = 'fancy_border_animation';

const PRESETS = {
  blob: [
    { left: 10, right: 10, top: 10, bottom: 10, leftBottom: 90, rightBottom: 90, topRight: 90, bottomRight: 90, width: '', height: '' },
    { left: 40, right: 40, top: 60, bottom: 60, leftBottom: 60, rightBottom: 40, topRight: 40, bottomRight: 60, width: '', height: '' },
    { left: 10, right: 10, top: 10, bottom: 10, leftBottom: 90, rightBottom: 90, topRight: 90, bottomRight: 90, width: '', height: '' },
  ],
  breathing: [
    { left: 30, right: 30, top: 30, bottom: 30, leftBottom: 70, rightBottom: 70, topRight: 70, bottomRight: 70, width: '', height: '' },
    { left: 50, right: 50, top: 50, bottom: 50, leftBottom: 50, rightBottom: 50, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 30, right: 30, top: 30, bottom: 30, leftBottom: 70, rightBottom: 70, topRight: 70, bottomRight: 70, width: '', height: '' },
  ],
  morph1: [
    { left: 10, right: 40, top: 30, bottom: 60, leftBottom: 50, rightBottom: 20, topRight: 80, bottomRight: 40, width: '', height: '' },
    { left: 40, right: 10, top: 60, bottom: 30, leftBottom: 20, rightBottom: 50, topRight: 40, bottomRight: 80, width: '', height: '' },
    { left: 60, right: 20, top: 10, bottom: 80, leftBottom: 40, rightBottom: 60, topRight: 30, bottomRight: 70, width: '', height: '' },
    { left: 20, right: 60, top: 80, bottom: 10, leftBottom: 60, rightBottom: 40, topRight: 70, bottomRight: 30, width: '', height: '' },
  ],
  organic: [
    { left: 30, right: 70, top: 20, bottom: 80, leftBottom: 60, rightBottom: 40, topRight: 50, bottomRight: 30, width: '', height: '' },
    { left: 70, right: 30, top: 80, bottom: 20, leftBottom: 40, rightBottom: 60, topRight: 30, bottomRight: 50, width: '', height: '' },
    { left: 50, right: 50, top: 50, bottom: 50, leftBottom: 50, rightBottom: 50, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 20, right: 80, top: 40, bottom: 60, leftBottom: 70, rightBottom: 30, topRight: 60, bottomRight: 40, width: '', height: '' },
    { left: 80, right: 20, top: 60, bottom: 40, leftBottom: 30, rightBottom: 70, topRight: 40, bottomRight: 60, width: '', height: '' },
  ],
  waterdrop: [
    { left: 20, right: 20, top: 5, bottom: 90, leftBottom: 80, rightBottom: 80, topRight: 20, bottomRight: 20, width: '', height: '' },
    { left: 30, right: 30, top: 10, bottom: 70, leftBottom: 60, rightBottom: 60, topRight: 30, bottomRight: 30, width: '', height: '' },
    { left: 50, right: 50, top: 15, bottom: 50, leftBottom: 50, rightBottom: 50, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 30, right: 30, top: 10, bottom: 70, leftBottom: 60, rightBottom: 60, topRight: 30, bottomRight: 30, width: '', height: '' },
    { left: 20, right: 20, top: 5, bottom: 90, leftBottom: 80, rightBottom: 80, topRight: 20, bottomRight: 20, width: '', height: '' },
  ],
  leaf: [
    { left: 10, right: 90, top: 10, bottom: 90, leftBottom: 90, rightBottom: 10, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 30, right: 70, top: 30, bottom: 70, leftBottom: 70, rightBottom: 30, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 50, right: 50, top: 50, bottom: 50, leftBottom: 50, rightBottom: 50, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 30, right: 70, top: 30, bottom: 70, leftBottom: 70, rightBottom: 30, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 10, right: 90, top: 10, bottom: 90, leftBottom: 90, rightBottom: 10, topRight: 50, bottomRight: 50, width: '', height: '' },
  ],
  pill: [
    { left: 50, right: 50, top: 10, bottom: 90, leftBottom: 90, rightBottom: 90, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 50, right: 50, top: 20, bottom: 80, leftBottom: 80, rightBottom: 80, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 50, right: 50, top: 30, bottom: 70, leftBottom: 70, rightBottom: 70, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 50, right: 50, top: 20, bottom: 80, leftBottom: 80, rightBottom: 80, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 50, right: 50, top: 10, bottom: 90, leftBottom: 90, rightBottom: 90, topRight: 50, bottomRight: 50, width: '', height: '' },
  ],
  wobbly: [
    { left: 20, right: 80, top: 30, bottom: 70, leftBottom: 60, rightBottom: 40, topRight: 80, bottomRight: 20, width: '', height: '' },
    { left: 40, right: 60, top: 20, bottom: 80, leftBottom: 70, rightBottom: 30, topRight: 60, bottomRight: 40, width: '', height: '' },
    { left: 60, right: 40, top: 70, bottom: 30, leftBottom: 40, rightBottom: 60, topRight: 30, bottomRight: 70, width: '', height: '' },
    { left: 80, right: 20, top: 40, bottom: 60, leftBottom: 30, rightBottom: 70, topRight: 20, bottomRight: 80, width: '', height: '' },
    { left: 30, right: 70, top: 60, bottom: 40, leftBottom: 80, rightBottom: 20, topRight: 70, bottomRight: 30, width: '', height: '' },
    { left: 20, right: 80, top: 30, bottom: 70, leftBottom: 60, rightBottom: 40, topRight: 80, bottomRight: 20, width: '', height: '' },
  ],
  star: [
    { left: 10, right: 90, top: 50, bottom: 50, leftBottom: 50, rightBottom: 50, topRight: 90, bottomRight: 10, width: '', height: '' },
    { left: 30, right: 70, top: 30, bottom: 70, leftBottom: 70, rightBottom: 30, topRight: 70, bottomRight: 30, width: '', height: '' },
    { left: 50, right: 50, top: 10, bottom: 90, leftBottom: 90, rightBottom: 10, topRight: 50, bottomRight: 50, width: '', height: '' },
    { left: 30, right: 70, top: 70, bottom: 30, leftBottom: 30, rightBottom: 70, topRight: 30, bottomRight: 70, width: '', height: '' },
    { left: 10, right: 90, top: 50, bottom: 50, leftBottom: 50, rightBottom: 50, topRight: 90, bottomRight: 10, width: '', height: '' },
  ],
};

export default class FullControlBox extends AdjustableBox {
  initState (state) {
    let defaultState = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
      leftBottom: 90,
      rightBottom: 90,
      topRight: 90,
      bottomRight: 90,
      width: '',
      height: '',
      advancedMode: false
    }
    this.state = state == null ? defaultState : state
  }

  initHandles (moveableElems) {
    return {
      left: new Movable(moveableElems.left, this.updateState.bind(this), 'y', this.state.left, this.saveUrlParams.bind(this)),
      right: new Movable(moveableElems.right, this.updateState.bind(this), 'y', this.state.right, this.saveUrlParams.bind(this)),
      top: new Movable(moveableElems.top, this.updateState.bind(this), 'x', this.state.top, this.saveUrlParams.bind(this)),
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', this.state.bottom, this.saveUrlParams.bind(this)),
      leftBottom: new Movable(moveableElems.leftBottom, this.updateState.bind(this), 'y', this.state.leftBottom, this.saveUrlParams.bind(this)),
      rightBottom: new Movable(moveableElems.rightBottom, this.updateState.bind(this), 'y', this.state.rightBottom, this.saveUrlParams.bind(this)),
      topRight: new Movable(moveableElems.topRight, this.updateState.bind(this), 'x', this.state.topRight, this.saveUrlParams.bind(this)),
      bottomRight: new Movable(moveableElems.bottomRight, this.updateState.bind(this), 'x', this.state.bottomRight, this.saveUrlParams.bind(this))
    }
  }
  updateBorderRadius () {
    var brd = this.state.top + '% '
    brd += (100 - this.state.topRight) + '% '
    brd += (100 - this.state.bottomRight) + '% '
    brd += this.state.bottom + '% / '
    brd += this.state.left + '% '
    brd += this.state.right + '% '
    brd += (100 - this.state.rightBottom) + '% '
    brd += (100 - this.state.leftBottom) + '% '
    this.shapeElem.style['border-radius'] = brd
    this.generatorElem.innerHTML = brd
  }
  saveUrlParams () {
    const { left, top, right, bottom, width, height, leftBottom, topRight, rightBottom, bottomRight } = this.state
    let hash = `${left}.${top}.${right}.${bottom}-${leftBottom}.${topRight}.${rightBottom}.${bottomRight}-${height}.${width}`
    this.setUrlHash(hash)
  }

  initAnimation() {
    this.frames = [];
    this.duration = 3;
    this.easing = 'ease-in-out';
    this.isPlaying = false;
    this.animCodeElem = document.getElementById("anim-css-code");
    this.frameStatus = document.getElementById("frame-status");
    this.framesList = document.getElementById("frames-list");
    
    this.loadFromStorage();
    this.bindAnimationEvents();
    this.renderFramesList();
  }

  bindAnimationEvents() {
    document.getElementById("record-frame").onclick = () => this.recordFrame();
    document.getElementById("play-anim").onclick = () => this.togglePreview();
    document.getElementById("clear-frames").onclick = () => this.clearFrames();
    document.getElementById("copy-anim").onclick = () => this.copyAnimationCode();
    
    const durationSlider = document.getElementById("anim-duration");
    const durationValue = document.getElementById("duration-value");
    durationSlider.oninput = () => {
      this.duration = parseFloat(durationSlider.value);
      durationValue.textContent = this.duration + 's';
      if (this.frames.length >= 2) this.generateKeyframes();
    };

    document.getElementById("anim-easing").onchange = (e) => {
      this.easing = e.target.value;
      if (this.frames.length >= 2) this.generateKeyframes();
    };

    document.getElementById("preset-select").onchange = (e) => {
      if (e.target.value && PRESETS[e.target.value]) {
        this.loadPreset(e.target.value, PRESETS[e.target.value]);
      }
    };
  }

  loadPreset(presetName, presetFrames) {
    this.frames = presetFrames.map(f => ({ ...f }));
    this.isPlaying = false;
    this.shapeElem.style.animation = "";
    this.renderFramesList();
    this.generateKeyframes();
    this.saveToStorage();
    
    const firstFrame = this.frames[0];
    if (firstFrame) {
      Object.keys(firstFrame).forEach(key => {
        if (this.handles[key]) {
          this.handles[key].pos = firstFrame[key];
          this.handles[key].elem.style[this.handles[key].axis === 'x' ? 'left' : 'top'] = firstFrame[key] + '%';
        }
        this.state[key] = firstFrame[key];
      });
      this.updateBorderRadius();
    }
    
    document.getElementById("play-anim").textContent = "Preview";
    const presetSelect = document.getElementById("preset-select");
    presetSelect.value = presetName;
  }

  recordFrame() {
    this.frames.push({ ...this.state });
    this.renderFramesList();
    this.generateKeyframes();
    this.saveToStorage();
  }

  deleteFrame(index) {
    this.frames.splice(index, 1);
    this.renderFramesList();
    this.generateKeyframes();
    this.saveToStorage();
  }

  renderFramesList() {
    this.frameStatus.textContent = this.frames.length;
    this.framesList.innerHTML = this.frames.map((f, i) => `
      <div class="frame-item">
        <span>#${i + 1}</span>
        <button class="frame-delete" onclick="window.myBox.deleteFrame(${i})">&times;</button>
      </div>
    `).join('');
  }

  generateKeyframes() {
    if (this.frames.length < 2) {
      this.animCodeElem.innerHTML = '';
      return;
    }
    let css = `@keyframes morph {\n`;
    this.frames.forEach((s, i) => {
      let pct = Math.floor((i / (this.frames.length - 1)) * 100);
      let val = `${s.top}% ${100 - s.topRight}% ${100 - s.bottomRight}% ${s.bottom}% / ${s.left}% ${s.right}% ${100 - s.rightBottom}% ${100 - s.leftBottom}%`;
      css += `  ${pct}% { border-radius: ${val}; }\n`;
    });
    css += `}\n`;
    css += `\n.animated-shape {\n`;
    css += `  animation: morph ${this.duration}s infinite alternate ${this.easing};\n`;
    css += `}`;
    this.animCodeElem.innerHTML = css;
  }

  togglePreview() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.shapeElem.style.animation = "";
      document.getElementById("play-anim").textContent = "Preview";
    } else {
      if (this.frames.length < 2) return;
      this.generateKeyframes();
      let style = document.getElementById("anim-style-tag") || document.createElement('style');
      style.id = "anim-style-tag";
      style.innerHTML = this.animCodeElem.innerText;
      document.head.appendChild(style);
      this.isPlaying = true;
      this.shapeElem.style.animation = `morph ${this.duration}s infinite alternate ${this.easing}`;
      document.getElementById("play-anim").textContent = "Stop";
    }
  }

  clearFrames() {
    this.frames = [];
    this.isPlaying = false;
    this.renderFramesList();
    this.shapeElem.style.animation = "";
    this.animCodeElem.innerHTML = "";
    document.getElementById("play-anim").textContent = "Preview";
    this.saveToStorage();
  }

  copyAnimationCode() {
    const code = this.animCodeElem.innerText;
    if (!code) return;
    navigator.clipboard.writeText(code).then(
      () => { this.showCopyFeedback(true); },
      () => { this.showCopyFeedback(false); }
    );
  }

  showCopyFeedback(success = true) {
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

  saveToStorage() {
    try {
      const data = {
        frames: this.frames,
        duration: this.duration,
        easing: this.easing
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save to localStorage');
    }
  }

  loadFromStorage() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data) {
        this.frames = data.frames || [];
        this.duration = data.duration || 3;
        this.easing = data.easing || 'ease-in-out';
        
        document.getElementById("anim-duration").value = this.duration;
        document.getElementById("duration-value").textContent = this.duration + 's';
        document.getElementById("anim-easing").value = this.easing;
        
        if (this.frames.length >= 2) {
          this.generateKeyframes();
        }
      }
    } catch (e) {
      console.warn('Could not load from localStorage');
    }
  }
}

window.myBox = null;
