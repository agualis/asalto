<template>
  <div>
    <q-card>
      <q-card-media overlay-position="top">
        <img :src="feature.imageUrl"/>
      </q-card-media>
      <q-card-title>
        <h5>{{ feature.title }} <span class="street">by</span> {{ feature.author }}</h5>
        <q-btn slot="right" flat round color="secondary" size="2rem">
          <q-icon name="my_location" @click.native="goToGeoLocation"/>
        </q-btn>
        <q-btn slot="right" flat round color="secondary" size="2rem">
          <q-icon name="arrow_back" @click.native="goBack"/>
        </q-btn>
      </q-card-title>
      <q-card-main>
        <span>{{feature.properties.description}}</span>
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
        this.$router.replace('/')
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import '~variables'

  img {
    max-width: 40%;
    max-height: 40%;
  }

  .block {
    margin: 0.5rem;
    font-size: 1.1rem;
  }

  .q-card-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .q-card {
    min-width : 320px
    margin-top: -8px
    margin-left: -8px
    margin-right: -8px
  }

  .q-card-main {
    font-size: 1.2rem;
  }
</style>

