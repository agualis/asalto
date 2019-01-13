import firebase from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'
import { config } from '../../config/firebase'

export default ({ app, router, Vue }) => {
  Vue.use(VueFire)
  firebase.initializeApp(config)
  const db = firebase.firestore()
  Vue.prototype.$db = db
  const settings = { timestampsInSnapshots: true}
  db.settings(settings)
}

export function logout(){
  firebase.auth().signOut().then(function() {
    console.log('Signed Out')
  }, function(error) {
    console.error('Sign Out Error', error)
  })
}


