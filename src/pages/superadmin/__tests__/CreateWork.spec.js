import { mount } from '@vue/test-utils'
import CreateWork from '../CreateWork'

describe('CreateWork.vue', () => {
  it('renders something', () => {
    const wrapper = mount(CreateWork)
    expect(wrapper.text()).toContain('hello')
  })
})
