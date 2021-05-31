class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    return this.$el.textContent = text
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if(Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  on(eventType, calback) {
    if (eventType === 'keydown' || eventType === 'keyup' || eventType === 'keypress' || eventType === 'fullscreenchange') {
      document.addEventListener(eventType, calback)
    }
    this.$el.addEventListener(eventType, calback)
  }

  off(eventType, calback) {
    if (eventType === 'keydown' || eventType === 'keyup' || eventType === 'keypress' || eventType === 'fullscreenchange') {
      document.removeEventListener(eventType, calback)
    }
    this.$el.removeEventListener(eventType, calback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  find(selector) {
    return this.$el.querySelector(selector)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}