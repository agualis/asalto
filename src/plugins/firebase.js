import firebase from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'
import { config } from '../../config/firebase'

export default ({ app, router, Vue }) => {
  Vue.use(VueFire)
  firebase.initializeApp(config)
  const db = firebase.firestore()
}


