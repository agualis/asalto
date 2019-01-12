<template>
  <q-page>
    <div id="firebaseui-auth-container"></div>
  </q-page>
</template>
<script>
  import firebase from 'firebase'
  import firebaseui from 'firebaseui'

  export default {
    name: 'login',
    async mounted() {
      const uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
      }
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)

      firebase.auth().onAuthStateChanged(function (user) {
        if ((user) && !user.emailVerified) {
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
        }
      });
    }
  }
</script>
