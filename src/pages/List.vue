<template>
  <q-list class="street">
    <q-list-header>Nearest</q-list-header>
    <q-item v-for="feature in features"
            :key="feature.id"
            @click.native="openDetail(feature.id)">
      <q-item-side :image="feature.imageUrl"/>
      <q-item-main :label="feature.title"/>
      <q-item-side right icon="more_horiz"/>
    </q-item>
  </q-list>
</template>

<script>
  import { artworkFeatures } from './artwork-features'

  export default {
    data() {
      return {
        features: artworkFeatures
      }
    },
    methods: {
      openDetail(id) {
        this.$router.push(`/detail/${id}`)
      }
    }
  }
</script>

<style>
  .street {
    font-family: streetFont;
    font-size: 20px;
    cursor: pointer;
  }
</style>

