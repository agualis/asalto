import { clickButton, getQInputValue, isDisabled, isEnabled } from '../../../test/component-interactions'

export class Page {
  constructor(wrapper) {
    this.wrapper = wrapper
  }

  text() {
    return this.wrapper.text()
  }

  html() {
    return this.wrapper.html()
  }

  getInputValue(id) {
    return getQInputValue(this.wrapper, id)
  }

  isDisabled(id) {
    return isDisabled(this.wrapper, id)
  }

  isEnabled(id) {
    return isEnabled(this.wrapper, id)
  }

  clickButton(id) {
    return clickButton(this.wrapper, id)
  }
}
