<template>
  <div class="street">
    <q-list >
      <q-list-header>Nearest</q-list-header>
      <q-item v-for="work in works"
              :key="work.uid"
              @click.native="openDetail(work.uid)">
        <q-item-side :image="work.imageUrl"/>
        <q-item-main :label="work.title"/>
        <q-item-side right icon="more_horiz"/>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  import { artworks } from './superadmin/artworks'

  export default {
    data() {
      return {
        works: artworks
      }
    },
    methods: {
      openDetail(id) {
        this.$router.push(`/detail/${uid}`)
      }
    }
  }
</script>

<style>
</style>

