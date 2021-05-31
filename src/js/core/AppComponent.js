import { DomListener } from "./DomListener";

export class AppComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
  }

  toHtml() {
    return ''
  }

  init() {
    this.initDomListeners()
  }
  destroy() {
    this.removeDomListeners()
  }
}