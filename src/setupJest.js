import Vue from 'vue'
Vue.use(Quasar)
import { QPage } from 'quasar'
import Quasar from 'quasar'
import useVueCroppie from './plugins/vue-croppie'
import { useFakeGeolocation } from './test/fake-geolocation'
import FakeComponent from './test/FakeComponent'
import FakeQPage from './test/FakeQPage'

useVueCroppie({ Vue })
useFakeGeolocation({ Vue })

Vue.component('CropModal', FakeComponent)
Vue.component('FirebaseUploader', FakeComponent)
Vue.component('q-page', FakeQPage)
