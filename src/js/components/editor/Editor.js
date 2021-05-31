import { AppComponent } from "../../core/AppComponent";


export class Editor extends AppComponent {
  static className = 'editor'
  static tagName = 'div'

  constructor($root, options) {
    super($root, {
      name: 'Editor',
      listeners: ['click', 'change', 'fullscreenchange'],
      ...options,
    })

    this.image = null
    this.imageNumber = 1
  }

  toHtml() {
    return `<div class="editor__buttons">
              <button class="button" data-type="reset">Reset</button>
              <button class="button button--active" data-type="next">Next picture</button>
              <label class="button button--load" for="btn-load">
                Load picture
                <input class="button__input" data-type="load" type="file" name="btn-load" placeholder="Load picture">
              </label>
              <button class="button" data-type="save">Save picture</button>
            </div>
            <img class="editor__img" src="images/img.jpg" alt="Picture">
            <button class="editor__fullsize" data-type="fullscreen"></button>`
  }

  init() {
    super.init()
    
    this.observer.subscribe('filters:input', data => {
      this.editorImg(data)
    })

    this.image = this.$root.find('.editor__img')
    this.time = this.date
    
  }

  editorImg(data) {
    this.image.style.setProperty(`--${data.property}`, `${data.value}${data.sizing}`)
  }

  onFullscreenchange() {
    if (document.fullscreenElement) {
        return
    } else {
        this.$root.find('[data-type="fullscreen"]').classList.remove('editor__fullsize--active')
    }
  }

  onClick(event) {
    if(event.target.dataset.type === 'reset') {
      this.image.style = ''
      this.observer.dispatch('editor:reset', true)
    }
    if(event.target.dataset.type === 'next') {
      this.image.src = 
      `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${this.getImage(this.time)}/${this.getImageNumber(this.imageNumber)}.jpg`
      this.imageNumber++ 
    }
    if(event.target.dataset.type === 'save') {
      const canvas = document.createElement('canvas')
      const newImage = new Image()

      newImage.setAttribute('crossOrigin', 'anonymous')
      newImage.src = this.image.src

      newImage.onload = () => {
        canvas.width = newImage.width
        canvas.height = newImage.height

        const ctx = canvas.getContext('2d')
        ctx.filter = getComputedStyle(this.image).filter
        ctx.drawImage(newImage, 0, 0)

        const link = document.createElement('a')
        link.download = 'image.png'
        link.href = canvas.toDataURL()
        link.click()
        link.delete
      }
    }
    if(event.target.dataset.type === 'fullscreen') {
      event.target.classList.toggle('editor__fullsize--active')
      if (document.fullscreenElement) {
          document.exitFullscreen()
      } else {
          document.documentElement.requestFullscreen();
      }
  }
  }

  onChange(event) {
    if(event.target.dataset.type === 'load') {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      this.image.title = selectedFile.name;
      console.log(this.image)
      reader.onload = event => {
        console.log(this.image)
        this.image.src = event.target.result;
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  get date() {
    const date = new Date()
    console.log(date.getHours())
    return date.getHours()
  }

  getImageNumber(number) {
    let imageSrc = ''
    if (number >= 0 && number < 10) {
      imageSrc = `0${number}`
    } else if (number >= 10 && number < 20) {
      imageSrc = `${number}`
    } else if (number === 20) {
      imageSrc = `${number}`
      this.imageNumber = 0
    }
    return imageSrc
  }

  getImage(time) {
    let timeNow = null
    if (time >= 6 && time < 12) {
      timeNow = 'morhing'
    } else if (time >= 12 && time < 18) {
      timeNow = 'day'
    } else if (time >= 18 && time < 24) {
      timeNow = 'evening'
    } else if (time >= 0 && time < 6) (
      timeNow = 'night'
    )
    return timeNow
  }
}