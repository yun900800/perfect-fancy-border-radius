import AdjustableBox from './adjustable_box'
import Movable from './movable'

export default class SimpleControlBox extends AdjustableBox {
  constructor(...args) {
    super(...args)
    this.initImageUpload()
  }

  initImageUpload() {
    this.imageUploadBtn = document.getElementById('image-upload-btn')
    this.imageInput = document.getElementById('image-input')
    this.imageClearBtn = document.getElementById('image-clear-btn')
    this.imageControls = document.getElementById('image-controls')
    this.imageSizeSelect = document.getElementById('image-size-select')
    this.imagePositionSelect = document.getElementById('image-position-select')
    this.imageRepeatCheckbox = document.getElementById('image-repeat-checkbox')

    this.imageUrl = null
    this.imageSize = 'cover'
    this.imagePosition = 'center'
    this.imageRepeat = false

    if (this.imageUploadBtn) {
      this.imageUploadBtn.addEventListener('click', () => {
        this.imageInput.click()
      })
    }

    if (this.imageInput) {
      this.imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0]
        if (file) {
          this.loadImage(file)
        }
      })
    }

    if (this.imageClearBtn) {
      this.imageClearBtn.addEventListener('click', () => {
        this.clearImage()
      })
    }

    if (this.imageSizeSelect) {
      this.imageSizeSelect.addEventListener('change', (e) => {
        this.imageSize = e.target.value
        this.updateImageBackground()
      })
    }

    if (this.imagePositionSelect) {
      this.imagePositionSelect.addEventListener('change', (e) => {
        this.imagePosition = e.target.value
        this.updateImageBackground()
      })
    }

    if (this.imageRepeatCheckbox) {
      this.imageRepeatCheckbox.addEventListener('change', (e) => {
        this.imageRepeat = e.target.checked
        this.updateImageBackground()
      })
    }
  }

  loadImage(file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      this.imageUrl = e.target.result
      this.showImageControls()
      this.updateImageBackground()
    }
    reader.readAsDataURL(file)
  }

  clearImage() {
    this.imageUrl = null
    this.imageInput.value = ''
    this.hideImageControls()
    this.updateImageBackground()
  }

  showImageControls() {
    if (this.imageClearBtn) {
      this.imageClearBtn.style.display = 'flex'
    }
    if (this.imageControls) {
      this.imageControls.style.display = 'flex'
    }
  }

  hideImageControls() {
    if (this.imageClearBtn) {
      this.imageClearBtn.style.display = 'none'
    }
    if (this.imageControls) {
      this.imageControls.style.display = 'none'
    }
  }

  updateImageBackground() {
    if (this.imageUrl) {
      const repeatValue = this.imageRepeat ? 'repeat' : 'no-repeat'
      const sizeValue = this.imageSize
      this.shapeElem.style.background = [
        `url(${this.imageUrl}) ${this.imageRepeat ? 'repeat' : 'no-repeat'} ${this.imagePosition} / ${sizeValue}`,
        'linear-gradient(45deg, #05f 0%, #0ff 100%)'
      ].join(', ')
    } else {
      this.shapeElem.style.background = ''
      this.shapeElem.style.backgroundImage = ''
      this.shapeElem.style.backgroundSize = ''
      this.shapeElem.style.backgroundPosition = ''
      this.shapeElem.style.backgroundRepeat = ''
    }
    this.updateBorderRadius()
  }

  initState (state) {
    let defaultState = {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
      width: '',
      height: '',
      advancedMode: false,
      imageUrl: null,
      imageSize: 'cover',
      imagePosition: 'center',
      imageRepeat: false
    }
    this.state = state == null ? defaultState : state
  }
  initHandles (moveableElems) {
    return {
      left: new Movable(moveableElems.left, this.updateState.bind(this), 'y', this.state.left, this.saveUrlParams.bind(this)),
      right: new Movable(moveableElems.right, this.updateState.bind(this), 'y', this.state.right, this.saveUrlParams.bind(this)),
      top: new Movable(moveableElems.top, this.updateState.bind(this), 'x', this.state.top, this.saveUrlParams.bind(this)),
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', this.state.bottom, this.saveUrlParams.bind(this))
    }
  }
  updateBorderRadius () {
    var brd = this.state.top + '% '
    brd += (100 - this.state.top) + '% '
    brd += (100 - this.state.bottom) + '% '
    brd += this.state.bottom + '% / '
    brd += this.state.left + '% '
    brd += this.state.right + '% '
    brd += (100 - this.state.right) + '% '
    brd += (100 - this.state.left) + '% '
    this.shapeElem.style['border-radius'] = brd

    let cssCode = `border-radius: ${brd};`
    if (this.imageUrl) {
      const repeatValue = this.imageRepeat ? 'repeat' : 'no-repeat'
      cssCode = `background: url(your-image.jpg) ${repeatValue} ${this.imagePosition} / ${this.imageSize};\nborder-radius: ${brd};`
    }
    this.generatorElem.innerHTML = cssCode
  }
  saveUrlParams () {
    const { left, top, right, bottom, width, height } = this.state
    let hash = `${left}.${top}.${right}.${bottom}--${height}.${width}`
    this.setUrlHash(hash)
  }
}
