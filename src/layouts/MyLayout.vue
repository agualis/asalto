<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Asalto
          <div slot="subtitle">Festival Internacional de Arte Urbano</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-primary' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Art</q-list-header>
        <q-item @click.native="$router.replace('/')">
          <q-item-side icon="my_location"/>
          <q-item-main label="Map" sublabel="Near your location"/>
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
          <img src="/statics/asalto.gif" class="totoro"/>
        </q-list-header>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
