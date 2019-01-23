<template>
  <div v-if="work">
    <q-card>
      <q-card-media overlay-position="full">
        <img :src="previewImageUrl(work.previewUrl)"/>
        <q-btn
          slot="overlay"
          icon="close"
          round
          dense
          color="primary"
          class="float-left q-ml-sm q-mt-sm"
          size="btn_size_dense_round_xs"
          @click="onClose"
        />

      </q-card-media>

      <q-card-title class="relative-position">
        <q-btn fab color="primary" icon="collections"
               data-test="detail-carousel"
               class="absolute"
               @click="carouselModalOpened=true"
               style="top: 0; right: 8px; transform: translateY(-50%);"/>

        {{ work.title }}
        <By/>
        {{ work.author }}

      </q-card-title>
      <q-card-main>
        <span class="text-weight-light">{{work.description}}</span>
      </q-card-main>
    </q-card>
    <q-modal v-model="carouselModalOpened" maximized>
      <q-carousel
        color="white"
        quick-nav
        class="text-white full-height"
        height="300px"
      >
        <q-carousel-slide
          :img-src="previewImageUrl(imageUrl)" v-for="imageUrl in work.imageUrls"
          :key="imageUrl"
          arrows="true"
          :height="cropHeight"
          :width="cropWidth"
          color="primary"
        />
        <!--<q-carousel-control-->
          <!--slot="control-full"-->
          <!--slot-scope="carousel"-->
          <!--position="bottom-right"-->
          <!--:offset="[18, 22]"-->
        <!--&gt;-->
          <!--<q-btn-->
            <!--rounded push-->
            <!--color="primary"-->
            <!--icon="close"-->
            <!--data-test="close-detail-carousel"-->
            <!--label="Close me"-->
            <!--@click="carouselModalOpened = false"-->
          <!--/>-->
        <!--</q-carousel-control>-->
      </q-carousel>
    </q-modal>
  </div>
</template>

<script>
  import By from '../../components/By'
  import { CROP_HEIGHT, CROP_WIDTH, getPreviewImageSrc } from '../../components/upload/images'

  export default {
    components: {By},
    props: {
      onClose: {type: Function, required: true},
      work: {type: Object, required: false}
    },
    data() {
      return {
        carouselModalOpened: false
      }
    },
    methods: {
      previewImageUrl(previewUrl) {
        return getPreviewImageSrc(null, previewUrl)
      }
    },
    computed: {
      cropWidth: () => CROP_WIDTH,
      cropHeight: () => CROP_HEIGHT
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


</style>

