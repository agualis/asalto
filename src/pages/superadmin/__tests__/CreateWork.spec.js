import Vue from 'vue'
import VueRouter from 'vue-router'
import { resolvePromises } from '../../../test/test-utils'
import CreateWork from '../CreateWork'
import { Wrapper } from './Wrapper'
Vue.config.silent = true

const newArtWork = {
  title: 'VueJS Graffiti',
  author: 'Evan You',
  description: `This big green V in the streets of Berlin represents the VueJs Logo.
  It was done at night with a green spray using stencil technique`,
  imageUrl: 'http://firebase.com/fake-vue-image.png'
}

const fakeCoordinates = { lat: -0.8862059, lng: 41.6525171 }

describe('CreateWork page', () => {
  let notifySpy = jest.fn(() => Promise.resolve({}))
  const routerSpy = new VueRouter()
  routerSpy.replace = jest.fn()
  const worksRepositoryMock = { add: jest.fn() }
  let page
  beforeEach(() => {
    page = Wrapper(CreateWork)
      .withFakeGeolocation(Vue, fakeCoordinates)
      .withWorksRepository(worksRepositoryMock)
      .withNotifier(notifySpy)
      .withRouter(routerSpy)
      .build()
  })

  it('matches snapshot', () => {
    page.matchesSnapshot()
  })

  it('renders title', () => {
    expect(page.text()).toContain('Add New Artwork')
  })

  it('shows coordinates latitude', async () => {
    expect(page.getInputValue('new-artwork-latitude')).toContain(fakeCoordinates.lat)
    expect(page.getInputValue('new-artwork-longitude')).toContain(fakeCoordinates.lng)
  })

  it('shows disabled create button by default', async () => {
    expect(page.isDisabled('create-work-button')).toBeTruthy()
  })

  it('the creation button is enabled when all mandatory fields are filled', async () => {
    fillAllFields(page)
    expect(page.isEnabled('create-work-button')).toBeTruthy()
  })

  it('the new artwork is created in the backend OLD', async () => {
    fillAllFields(page)
    page.clickButton('create-work-button')
    expect(page.worksRepository.add)
      .toHaveBeenCalledWith(expect.objectContaining(newArtWork))
  })

  it('the new artwork is created in the backend NEW', async () => {
    fillAllFields(page)
    page.clickButton('create-work-button')

    expect(page.worksRepository.add)
      .toHaveBeenCalledWith(expect.objectContaining(newArtWork))
  })

  it('a notification is shown after creating the new artwork', async () => {
    fillAllFields(page)
    page.clickButton('create-work-button')
    await resolvePromises()

    expect(notifySpy).toHaveBeenCalledWith('Congrats, you created a new artwork!')
  })

  it('I am redirected to the root page after creating the new artwork', async () => {
    fillAllFields(page)
    page.clickButton('create-work-button')
    await resolvePromises()

    expect(routerSpy.replace).toHaveBeenCalledWith('/')
  })
})

const fillAllFields = (page)=> {
    page.typeQInputValue('new-artwork-title', newArtWork.title)
    page.typeQInputValue('new-artwork-author', newArtWork.author)
    page.typeQTextValue('new-artwork-description', newArtWork.description)
    page.uploadFakeImage(newArtWork.imageUrl)
}
