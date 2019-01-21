<template>
  <div>
    <q-card>
      <q-card-media overlay-position="top">
        <img :src="work.imageUrl"/>
      </q-card-media>
      <q-card-title class="relative-position">
        <q-btn fab color="primary" icon="place"
               class="absolute"
               @click.native="goToGeoLocation"
               style="top: 0; right: 8px; transform: translateY(-50%);" />

        {{ work.title }} <By/> {{ work.author }}

      </q-card-title>
      <q-card-main>
        <span class="text-weight-light">{{work.description}}</span>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import { artworks } from './superadmin/artworks'
  import By from './By'

  export default {
    components: { By },
    data() {
      return {
        work: null
      }
    },
    created() {
      this.work = artworks[this.$route.params.workId]
    },
    methods: {
      goBack() {
        this.$router.replace('/list')
      },
      goToGeoLocation() {
        this.$router.push('/map/' + this.work.geometry.coordinates.join(','))
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

