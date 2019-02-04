import Vue from 'vue'
import { QPage } from 'quasar'
import Quasar from 'quasar'
import { db } from './plugins/firebase-plugin'
import useVueCroppie from './plugins/vue-croppie'
import { WorksRepository } from './plugins/works-repository'
import { useFakeGeolocation } from './test/fake-geolocation'
import FakeComponent from './test/FakeComponent'
import FakeQPage from './test/FakeQPage'
Vue.use(Quasar)

// We need to understand why import { format } from 'quasar' does not work in jest scope
import { utils } from 'quasar'
Vue.prototype.$humanStorageSize = utils.format.humanStorageSize

import { components } from 'quasar'

// console.log('YEYEYEEY', Quasar.components.QInput.name )

useVueCroppie({ Vue })
useFakeGeolocation({ Vue })

//This would be part of the page object wrapper
Vue.prototype.$worksRepository = {
  add: jest.fn()
}

Vue.component('CropModal', FakeComponent)
Vue.component('FirebaseUploader', FakeComponent)
Vue.component('q-page', FakeQPage)
