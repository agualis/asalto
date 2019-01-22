import firebase from 'firebase'
import firebaseApp from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'

export const config = {
  apiKey: "AIzaSyAL4qpMw7E-jfxqJf1Zb5QxBgJCjEuiwqg",
  authDomain: "asalto.firebaseapp.com",
  databaseURL: "https://asalto.firebaseio.com",
  projectId: "asalto",
  storageBucket: "asalto.appspot.com",
  messagingSenderId: "876124045339"
}

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


