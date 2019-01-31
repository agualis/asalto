import { mount } from '@vue/test-utils'
import Signup from '../Signup'

describe('Signup.vue', () => {
  it('renders title', () => {
    const wrapper = mount(Signup, {
      stubs: ['router-link']
    })
    expect(wrapper.text()).toContain('Sign Up!')
  })
})
