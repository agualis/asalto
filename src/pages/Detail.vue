<template>
  <div>
    <q-card>
      <q-card-media overlay-position="top">
        <img :src="feature.imageUrl"/>
      </q-card-media>
      <q-card-title class="relative-position">
        <q-btn fab color="secondary" icon="place"
               class="absolute"
               @click.native="goToGeoLocation"
               style="top: 0; right: 8px; transform: translateY(-50%);" />

        {{ feature.title }} <span class="street">by</span> {{ feature.author }}

      </q-card-title>
      <q-card-main>
        <span class="text-weight-light">{{feature.properties.description}}</span>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import { artworkFeatures } from './artwork-features'

  export default {
    data() {
      return {
        feature: null
      }
    },
    created() {
      this.feature = artworkFeatures[this.$route.params.workId]
    },
    methods: {
      goBack() {
        this.$router.replace('/list')
      },
      goToGeoLocation() {
        this.$router.push('/')
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

  .q-card-media {
    max-height: 22rem;
  }
</style>

