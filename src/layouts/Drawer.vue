<template>
  <q-layout-drawer
    :value="value"
    @input="$.emit('input', !value)"
    :content-class="$q.theme === 'mat' ? 'bg-primary' : null"
    @on-layout="checkLogin"
  >
    <div class="row">
      <q-spinner-bars v-if="loading" color="white" class="spinner left" />
    </div>

    <div v-if="logged">
       <q-item>
          <q-item-side>
            <q-item-tile avatar>
              <img v-if='userAvatar' :src="userAvatar">
              <img v-else
                   data-test="superadmin-avatar"
                   src="~assets/obey-face.jpg">
            </q-item-tile>
          </q-item-side>
          <q-item-main :label="user.email" />
          <q-item-side right>
            <q-btn @click="logout"
                   data-test="logout"
                   outline>Logout</q-btn>
          </q-item-side>
        </q-item>
      <div>

      </div>
    </div>

    <q-list
      no-border
      link
      inset-delimiter
    >
      <q-item v-if='notLogged' @click.native="$router.push('/login-ui')">
        <q-item-side icon="fa fa-lock"/>
        <q-item-main label="Login" sublabel="Login with your Google account"/>
      </q-item>

      <q-item @click.native="$router.replace('/')">
        <q-item-side icon="my_location"/>
        <q-item-main label="Map" sublabel="Near your location"/>
      </q-item>

      <q-item v-if='logged' @click.native="$router.push('/create-artwork')">
        <q-item-side icon="add_photo_alternate"/>
        <q-item-main label="Report" sublabel="Report artwork yourself"/>
      </q-item>

      <q-item @click.native="$router.push('/list')">
        <q-item-side icon="brush"/>
        <q-item-main label="Works" sublabel="Ordered by proximity"/>
      </q-item>

      <q-list-header>About</q-list-header>

      <q-item @click.native="openURL('http://www.festivalasalto.com/')">
        <q-item-side icon="bookmark"/>
        <q-item-main label="Official Website" sublabel="www.festivalasalto.com"/>
      </q-item>

      <q-item @click.native="openURL('https://github.com/agualis/asalto/')">
        <q-item-side icon="code"/>
        <q-item-main label="GitHub" sublabel="github.com/agualis/asalto"/>
      </q-item>

      <q-list-header>Admin</q-list-header>


       <q-item v-if="notLogged" @click.native="$router.push('/login')">
        <q-item-side icon="lock"/>
        <q-item-main label="Cutre Login admin" sublabel="Login to Private Area"/>
      </q-item>
    </q-list>
  </q-layout-drawer>
</template>

<script>
  import firebase from 'firebase'
  import { logout } from '../plugins/firebase'

  export default {
    props: {
      value: { default: false }
    },
    data() {
      return {
        user: null,
        loading: true
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(this.setUser)
    },
    methods: {
      checkLogin(opened) {
        if (opened) console.log(this.$q.sessionStorage.get.item('user'))
      },
      setUser(user) {
        this.user = user
        this.loading = false
      },
      logout() {
        logout()
      }
    },
    computed: {
      logged() {
        return !this.loading && this.user
      },
      notLogged() {
        return !this.loading && !this.user
      },
      userAvatar() {
        if (this.user && this.user.photoURL) return this.user.photoURL
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  .spinner {
    width: 10 px;
    height: 10px;
  }
</style>
