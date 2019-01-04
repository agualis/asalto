<template>
  <div class="street">URBAN
  <q-list dark>
    <q-list-header>Nearest</q-list-header>
    <q-item v-for="feature in features"
            :key="feature.id"
            @click.native="openDetail(feature.id)">
      <q-item-side :image="feature.imageUrl"/>
      <q-item-main :label="feature.title"/>
      <q-item-side right icon="more_horiz"/>
    </q-item>
  </q-list>
    </div>
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
  .q-item {
    cursor: pointer;
  }
</style>

