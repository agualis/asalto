<template>
  <div v-if="feature">
    <q-card >
      <q-card-media overlay-position="top">
        <img :src="feature.imageUrl"/>
      </q-card-media>
      <q-card-title class="relative-position">
        <q-btn fab color="primary" icon="place"
               class="absolute"
               @click.native="goToGeoLocation"
               style="top: 0; right: 8px; transform: translateY(-50%);" />

        {{ feature.title }} <By/> {{ feature.author }}

      </q-card-title>
      <q-card-main>
        <span class="text-weight-light">{{feature.description}}</span>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import { artworkFeatures } from './artwork-features'
  import By from './By'

  export default {
    components: { By },
    props: {
      workId: { type: String, required: false }
    },
    data() {
      return {}
    },
    computed: {
      feature() {
        return artworkFeatures[this.workId]
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import '~variables'

  .block {
    margin: 0.5rem;
    font-size: 1.1rem;
  }

  .q-card-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .q-card-main {
    font-size: 1.1rem;
  }

  .q-card {
    max-width: 30rem;
  }

  .q-card-media {
    max-height: 12rem;
  }
</style>

