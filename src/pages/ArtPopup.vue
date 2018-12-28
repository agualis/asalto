<template>
  <div @click="popupClicked(feature)">
    <img v-if="!opened"
         class="preview"
         :src="feature.imageUrl" width="50" height="50"
         :title="feature.title">
    <q-card v-if="opened" color="primary" >
      <q-card-media>
        <img :src="feature.imageUrl">
      </q-card-media>
      <q-card-title>
        {{feature.title}}
        <div slot="right" class="row items-center">
          by {{ feature.author }}
        </div>
      </q-card-title>
      <q-card-main>
        {{ feature.properties.description }}
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import { bus } from '../../.quasar/app'

  export default {
    props: {
      feature: {type: Object, required: true },
      map: {type: Object, required: true }
    },
    created() {
      bus.$on('featureZoomed', (zoomedId) => {
        this.opened = this.feature.id === zoomedId ? true : false
      })
    },
    data() {
      return {
        opened: false
      }
    },
    methods: {
      popupClicked(feature) {
        if (this.opened) return this.opened = false
        this.flyTo(feature)
        bus.$emit('featureZoomed', this.feature.id);
      },
      flyTo(feature) {
         this.map.flyTo({
          center: feature.geometry.coordinates,
          zoom: 16,
          offset: [0, 0]
        })
      }
    }
  }
</script>

<style scoped>
  .preview {
    border-radius: 50%;
    cursor: pointer;
  }
  img {
    object-fit: cover;
  }
</style>
