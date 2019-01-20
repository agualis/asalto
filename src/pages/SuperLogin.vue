<template>
  <div class="login">
    <h3>Asalto Login</h3>
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
    <button @click="login"
            class="button"
            data-test="superlogin-submit"
    >
      Enter
    </button>
    <p><router-link to="/signup">
      New Here? Create a new account
    </router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase'

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
