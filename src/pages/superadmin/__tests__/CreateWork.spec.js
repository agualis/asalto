import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { clickButton, getInputValue, getQInputValue, isDisabled, typeQInputValue, typeQTextValue } from '../../../test/component-interactions'
import { fakeCoordinates } from '../../../test/fake-geolocation'
import { resolvePromises } from '../../../test/test-utils'
import CreateWork from '../CreateWork'


describe('CreateWork.vue', () => {
   let notifySpy = jest.fn(()=>Promise.resolve({}))
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()
  router.replace = jest.fn()
  let wrapper
  beforeEach(() => {
    // https://github.com/vuejs/vue-test-utils/issues/532
    Vue.config.silent = true
    wrapper = mount(CreateWork, {
      sync: true ,
      localVue,
      router
    })
    wrapper.vm.$notify = notifySpy
  })

  it('renders title', () => {
    expect(wrapper.text()).toContain('Add New Shit')
  })

  it('shows coordinates latitude', async () => {
    expect(getQInputValue(wrapper, 'new-artwork-latitude')).toContain(fakeCoordinates.lat)
    expect(getQInputValue(wrapper, 'new-artwork-longitude')).toContain(fakeCoordinates.lng)
  })

  it('shows disabled create button by default', async () => {
    expect(isDisabled(wrapper, 'create-work-button')).toBeTruthy()
  })

  it('the creation button is enabled when all mandatory fields are filled', async () => {
    fillAllFields(wrapper)
    // await resolvePromises()
    // await resolvePromises()
    expect(isDisabled(wrapper, 'create-work-button')).toBeFalsy()
  })

  it('the new artwork is created in the backend', async () => {
    fillAllFields(wrapper)
    clickButton(wrapper, 'create-work-button')
    //Darle una vuelta a como testeo el contrato del payload de newArtWok...
    expect(wrapper.vm.$worksRepository.add)
      .toHaveBeenCalledWith(expect.objectContaining(newArtWork))
  })

  it('a notification is shown after creating the new artwork', async () => {
    fillAllFields(wrapper)
    clickButton(wrapper, 'create-work-button')
    await resolvePromises()

    expect(notifySpy).toHaveBeenCalledWith('Congrats, you created a new artwork!')
  })

  it('the route changes after creating the new artwork', async () => {
    fillAllFields(wrapper)
    clickButton(wrapper, 'create-work-button')
    await resolvePromises()

    expect(router.replace).toHaveBeenCalledWith('/')
  })
})

function uploadFakeImage(wrapper, imageUrl) {
  wrapper.setData({imageUrl})
}

// This object can be a json that I can leave in my test template for the live code
const newArtWork = {
  title: 'VueJS Graffiti',
  author: 'Evan You',
  description: `This big green V in the streets of Berlin represents the VueJs Logo.
  It was done at night with a green spray using stencil technique`,
  imageUrl: 'http://firebase.com/fake-vue-image.png'
}

const fillAllFields = (wrapper)=> {
   typeQInputValue(wrapper, 'new-artwork-title', newArtWork.title)
    typeQInputValue(wrapper, 'new-artwork-author', newArtWork.author)
    typeQTextValue(wrapper, 'new-artwork-description', newArtWork.description)
    uploadFakeImage(wrapper, newArtWork.imageUrl)
}
