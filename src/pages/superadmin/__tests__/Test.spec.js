import { mount } from '@vue/test-utils'
import Test from '../Test'

describe('Test.vue', () => {
  it('renders title', () => {
    const wrapper = mount(Test, {
      stubs: ['router-link']
    })
    expect(wrapper.html()).toContain('HELLO')
  })
})
