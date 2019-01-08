<template>
  <div class="row justify-left">
      <q-card inline class="menu-card"
              v-for="feature in features"
              :key="feature.id"
              @click.once.native="openDetail(feature.id)">
      <q-card-media overlay-position="top">
        <img :src="feature.imageUrl"/>
      </q-card-media>
        <q-card-main>
          <div class="text-weight-bolder ellipsis">{{ feature.title }}</div>
          <div class="ellipsis author"><By/> {{ feature.author }}</div>
        </q-card-main>
      </q-card>
  </div>
</template>

<script>
  import { artworkFeatures } from './artwork-features'
  import By from './By'

  export default {
    components: { By },
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

<style lang="stylus" scoped>
  @import '~variables'

  .menu-card:hover {
    background: alpha(black, 30%);
    opacity: 0.5;
    cursor: pointer;
  }

  .q-card-media {
    max-height: 8rem;
  }

  .q-card-title
    color black
    font-weight bold
    font-size 150%

  .q-card
    margin: 1%;
    max-width: 48%;

  .author
    padding-top: 0.2rem;
    padding-bottom: 0.5rem;

  .street
    vertical-align: middle;

</style>


