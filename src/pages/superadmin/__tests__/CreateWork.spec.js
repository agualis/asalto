import { mount } from '@vue/test-utils'
import { find, getInputValue, getQInputValue, isButtonDisabled, isDisabled } from '../../../test/component-interactions'
import { fakeCoordinates } from '../../../test/fake-geolocation'
import { resolvePromises } from '../../../test/test-utils'
import CreateWork from '../CreateWork'

describe('CreateWork.vue', () => {

  let wrapper
  beforeEach(()=> {
    // https://github.com/vuejs/vue-test-utils/issues/532
    wrapper = mount(CreateWork, { sync: false })
  })

  it('renders title', () => {
    expect(wrapper.text()).toContain('Add New Shit')
  })

  it('shows coordinates latitude', async () => {
    expect(getQInputValue(wrapper,'new-artwork-latitude')).toContain(fakeCoordinates.lat)
    expect(getQInputValue(wrapper,'new-artwork-longitude')).toContain(fakeCoordinates.lng)
  })

  it('shows disabled create button by default', async () => {
    expect(isDisabled(wrapper, 'create-work-button')).toBeTruthy()
  })
})
