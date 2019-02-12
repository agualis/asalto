import { clickButton, getQInputValue, isDisabled, isEnabled, typeQInputValue, typeQTextValue, uploadFakeImage } from '../../../test/component-interactions'

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

  typeQInputValue(id, value) {
    return typeQInputValue(this.wrapper, id, value)
  }

  typeQTextValue(id, value) {
    return typeQTextValue(this.wrapper, id, value)
  }

  uploadFakeImage(imageUrl) {
    return uploadFakeImage(this.wrapper, imageUrl)
  }

  get worksRepository() {
    return this.wrapper.vm.$worksRepository
  }

  matchesSnapshot() {
    expect(this.wrapper.html()).toMatchSnapshot()
  }

}
