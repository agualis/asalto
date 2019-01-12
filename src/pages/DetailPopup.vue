<template>
  <div v-if="feature">
    <q-card >
      <q-card-media overlay-position="top">
        <img :src="feature.imageUrl" class="responsive"/>
      </q-card-media>
      <q-card-title class="relative-position">
        <q-btn fab color="primary" icon="fullscreen"
               class="absolute"
               @click="carouselModalOpened=true"
               style="top: 0; right: 8px; transform: translateY(-50%);" />

        {{ feature.title }} <By/> {{ feature.author }}

      </q-card-title>
      <q-card-main>
        <span class="text-weight-light">{{feature.description}}</span>
      </q-card-main>
    </q-card>
    <q-modal v-model="carouselModalOpened" maximized>
      <q-carousel
        color="white"
        quick-nav
        class="text-white full-height"
      >
        <q-carousel-slide  :img-src="feature.imageUrl"/>
        <q-carousel-control
            slot="control-full"
            slot-scope="carousel"
            position="bottom-right"
            :offset="[18, 22]"
          >
            <q-btn
              rounded push
              color="primary"
              icon="close"
              label="Close me"
              @click="carouselModalOpened = false"
            />
          </q-carousel-control>
      </q-carousel>
   </q-modal>
  </div>
</template>

<script>
  import { artworkFeatures } from './artwork-features'
  import By from './By'

  export default {
    components: { By },
    props: {
      onClose: { type: Function, required: true },
      workId: { type: String, required: false },
    },
    data() {
      return {
        carouselModalOpened: false
      }
    },
    computed: {
      feature() {
        return artworkFeatures[this.workId]
      },
      gallery(){
        return
          [this.feature.imageUrl]
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

