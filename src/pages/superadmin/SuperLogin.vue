<template>
  <q-page padding class="docs-input justify-center">
    <h3>Superlogin!</h3>
    <input
      type="text"
      v-model="email"
      data-test="superlogin-email"
      placeholder="Email address"
      class="input"
      required>
    <br/>
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      data-test="superlogin-password"
      class="input"
      required>
    <br/>
    <q-btn @click="login"
            color="primary"
            data-test="superlogin-submit"
    >
      Enter
    </q-btn>
    <div>
      <img src="/statics/asalto.gif"/>
    </div>
    <!--<p><router-link to="/signup">-->
      <!--New Here? Create a new account-->
    <!--</router-link></p>-->
  </q-page>

</template>

<script>
  import firebase from '@src/plugins/firebase'

  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$q.sessionStorage.set('user', user)
          this.$router.replace('/')
        }).catch((err) => {
          alert(err.message)
        })
      }
    }
  }
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  align-self: center;
  margin: 10px 0;
  width: auto;
  padding: 15px;
}
button {
  margin: 10px 0;
  background-color: #0476F2;
}
a {
  color: black;
  text-decoration: underline;
}

p {
  margin-top: 40px;
  font-size: 13px;
}
h1, h2 {
  font-weight: normal;
}
</style>
