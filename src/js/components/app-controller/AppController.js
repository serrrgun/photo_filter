import { $ } from "../../core/dom"
import { Observer } from "../../core/Observer"

export class AppController {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.observer = new Observer()
  }

  getRoot() {
    console.log(this.$el)
    const $root = $.create('div', 'container')

    const componentOptions = {
      observer: this.observer
    }
    
    this.components = this.components.map(Component => {
      if(Component instanceof Array) {
        const $wrapper = $.create(Component[0].wrapeprTagName, Component[0].wrapperClassName) 

        const components = Component.map(Component => {
          const $el = $.create(Component.tagName, Component.className) 
          const component = new Component($el, componentOptions)
          $el.html(component.toHtml())
          $wrapper.append($el)
          return component
        })
        $root.append($wrapper)
        return components
      } else {
        const $el = $.create(Component.tagName, Component.className) 
        const component = new Component($el, componentOptions)
        $el.html(component.toHtml())
        $root.append($el)
        return component
      }
    });
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.flat().forEach(component => component.init())
  }
}