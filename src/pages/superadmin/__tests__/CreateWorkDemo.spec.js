import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateWork from '../CreateWork'
import CreateWorkEmpty from '../CreateWorkEmpty'
import { Wrapper } from './Wrapper'
Vue.config.silent = true

const fakeCoordinates = { lat: -0.8862059, lng: 41.6525171 }

const newArtWork = {
  title: 'VueJS Graffiti',
  author: 'Evan You',
  description: `This big green V in the streets of Berlin represents the VueJs Logo.
  It was done at night with a green spray using stencil technique`,
  imageUrl: 'http://firebase.com/fake-vue-image.png'
}

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
      .withNotifier(notifySpy).build()
  })

  it('renders title (lets start with en Empty component (CreateWorkEmpty))', () => {
  })

  xit('shows geo-coordinates',() => {
    // 'new-artwork-latitude'
  })

  xit('shows disabled create button by default (lets start with an empty component)', () => {
    'create-work-button'
  })

  xit('the creation button is enabled when all mandatory fields are filled', () => {
    'new-artwork-title'
  })

  xit('the new artwork is created in the backend', () => {
    //getWorksRepository
  })

  xit('a notification is shown after creating the new artwork', () => {
  })

  xit('I am redirected to the map page after creating the new artwork',  () => {
  })
})

const fillAllFields = (page)=> {
    page.typeQInputValue('new-artwork-title', newArtWork.title)
    page.typeQInputValue('new-artwork-author', newArtWork.author)
    page.typeQTextValue('new-artwork-description', newArtWork.description)
    page.uploadFakeImage(newArtWork.imageUrl)
}
