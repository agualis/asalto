<template>
  <q-layout-drawer
    :value="leftDrawerOpen"
    :content-class="$q.theme === 'mat' ? 'bg-primary' : null"
  >
    <q-list
      no-border
      link
      inset-delimiter
    >
      <q-list-header>Art</q-list-header>
      <q-item @click.native="$router.replace('/login')">
        <q-item-side icon="lock"/>
        <q-item-main label="Login" sublabel="Report artwork yourself"/>
      </q-item>
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
        <img src="/statics/asalto.gif"/>
      </q-list-header>
    </q-list>
  </q-layout-drawer>
</template>

<script>
  export default {
    props: {
      leftDrawerOpen: { default: false }
    }
  }
</script>
