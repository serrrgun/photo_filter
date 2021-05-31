import { AppComponent } from "../../core/AppComponent";

export class Filters extends AppComponent {
  static className = 'filters'
  static tagName = 'div'
  static wrapeprTagName = 'main'
  static wrapperClassName = 'main'

  constructor($root, options) {
    super($root, {
      name: 'Filters',
      listeners: ['input'],
      ...options
    })
    this.inputs = null
    this.outputs = null
  }

  toHtml() {
    return `<div class="filters__item">
              <label class="filters__item-label" for="blur">Blur:</label>
              <input data-type="blur" data-units="px" class="filters__item-input" name="blur" type="range" min="0" max="10" value="0">
              <output data-out="blur" class="filters__item-output" name="result">0</output>
            </div>
            <div class="filters__item">
              <label class="filters__item-label" for="invert">Invert:</label>
              <input data-type="invert" data-units="%" class="filters__item-input" name="invert" type="range" min="0" max="100" value="0">
              <output data-out="invert" class="filters__item-output" name="result">0</output>
            </div>
            <div class="filters__item">
              <label class="filters__item-label" for="sepia">Sepia:</label>
              <input data-type="sepia" data-units="%" class="filters__item-input" name="sepia" type="range" min="0" max="100" value="0">
              <output data-out="sepia" class="filters__item-output" name="result">0</output>
            </div>
            <div class="filters__item">
              <label class="filters__item-label" for="saturate">Saturate:</label>
              <input data-type="saturate" data-units="%" class="filters__item-input" name="saturate" type="range" min="0" max="200" value="100">
              <output data-out="saturate" class="filters__item-output" name="result">100</output></output>
            </div>
            <div class="filters__item">
              <label class="filters__item-label" for="rotate">Hue rotate:</label>
              <input data-type="hue" data-units="deg" class="filters__item-input" name="rotate" type="range" min="0" max="360" value="0">
              <output data-out="hue" class="filters__item-output" name="result">0</output>
            </div>`
  }

  init() {
    super.init()
    
    this.observer.subscribe('editor:reset', data => {
      this.resetFilters(data)
    })

    this.inputs = this.$root.findAll('.filters__item-input')
    this.outputs = this.$root.findAll('.filters__item-output')
  }

  onInput(event) {
    if (event.target.dataset.type) {
      const inputTarget = event.target.dataset.type
      const outputValue = event.target.value
      console.log(event.target.value)
      this.$root.find(`[data-out="${inputTarget}"]`).textContent = outputValue
      this.observer.dispatch('filters:input', {
        'property': inputTarget, 
        'value': outputValue, 
        'sizing': event.target.dataset.units
      })
    }
  }

  resetFilters(flag) {
    if(flag === true) {
      this.inputs.forEach((input, inx) => {
        if (input.getAttribute("data-type") === "saturate") {
          input.value = 100
          this.outputs[inx].textContent = 100
        } else {
          this.outputs[inx].textContent = 0 
          input.value = 0
        }
        
      });
    }
  }
}