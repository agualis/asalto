<template>
  <q-layout-drawer
    :value="leftDrawerOpen"
    :content-class="$q.theme === 'mat' ? 'bg-primary' : null"
    @on-layout="checkLogin"
  >
    <div class="row justify-center spinner">
      <q-spinner-bars v-if="loading" color="white" class="spinner" />
    </div>
    <div v-if="logged">
      <q-item>
        <img src="~assets/avatar.png" style='height: 80px' class="inline-block">
      </q-item>
      <div>
        <span class="text-white">{{user.email}}</span>
        <hr>
      </div>
    </div>
    <q-list
      no-border
      link
      inset-delimiter
    >
      <q-item v-if="notLogged" @click.native="$router.replace('/login')">
        <q-item-side icon="lock"/>
        <q-item-main label="Login" sublabel="Report artwork yourself"/>
      </q-item>

      <q-item @click.native="$router.replace('/')">
        <q-item-side icon="my_location"/>
        <q-item-main label="Map" sublabel="Near your location"/>
      </q-item>

      <q-item @click.native="$router.replace('/create-artwork')">
        <q-item-side icon="add_photo_alternate"/>
        <q-item-main label="Report" sublabel="Report artwork yourself"/>
      </q-item>

      <q-item @click.native="$router.replace('/list')">
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
      <q-list-header>
        <img src="/statics/asalto.gif"/>
      </q-list-header>
    </q-list>
  </q-layout-drawer>
</template>

<script>
  import firebase from 'firebase'

  export default {
    props: {
      leftDrawerOpen: { default: false }
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
      }
    },
    computed: {
      logged() {
        return !this.loading && this.user
      },
      notLogged() {
        return !this.loading && !this.user
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  .spinner {
    width: 100 px;
    height: 100px;
  }
</style>
