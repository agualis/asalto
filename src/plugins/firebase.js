import firebase from 'firebase'
import firebaseApp from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'
import { config } from '../../config/firebase'

firebaseApp.initializeApp(config)
export const db = firebaseApp.firestore()
const settings = { timestampsInSnapshots: true}
db.settings(settings)

export default ({ app, router, Vue }) => {
  Vue.use(VueFire)
  Vue.prototype.$db = db
  const storage = firebase.storage()
  Vue.prototype.$storageRef = storage.ref('asalto')
}

export function logout(){
  firebaseApp.auth().signOut().then(function() {
    console.log('Signed Out')
  }, function(error) {
    console.error('Sign Out Error', error)
  })
}


