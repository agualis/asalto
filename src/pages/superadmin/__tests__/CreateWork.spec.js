import { mount } from '@vue/test-utils'
import CreateWork from '../CreateWork'

describe('CreateWork.vue', () => {
  it('renders title', () => {
    // https://github.com/vuejs/vue-test-utils/issues/532
    const wrapper = mount(CreateWork, { sync: false })
    expect(wrapper.text()).toContain('Add New Shit')
  })
})
