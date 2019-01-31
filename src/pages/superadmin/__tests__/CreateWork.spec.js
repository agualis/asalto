import { mount } from '@vue/test-utils'
import { find, getInputValue, getQInputValue } from '../../../test/component-interactions'
import { fakeCoordinates } from '../../../test/fake-geolocation'
import { resolvePromises } from '../../../test/test-utils'
import CreateWork from '../CreateWork'

describe('CreateWork.vue', () => {
  it('renders title', () => {
    // https://github.com/vuejs/vue-test-utils/issues/532
    const wrapper = mount(CreateWork, { sync: false })
    expect(wrapper.text()).toContain('Add New Shit')
  })

  it('shows latitude', async () => {
    // https://github.com/vuejs/vue-test-utils/issues/532
    const wrapper = mount(CreateWork, { sync: false })
    await resolvePromises()

    expect(getQInputValue(wrapper,'new-artwork-latitude')).toContain(fakeCoordinates.lat)
  })
})
