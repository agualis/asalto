<template>
  <q-page class="flex flex-center">
    <TestModal :opened="modalOpened"
               :onClose="onModalClose"
               :detailId="artWorkOpenedId"
    ></TestModal>

     <!--<q-modal v-model="modalOpened" :content-css="{minWidth: '50vw'}">-->
      <!--<div style="padding: 50px">-->
        <!--<div class="q-display-1 q-mb-md">Basic Modal</div>-->
        <!--<p v-for="n in 25" :key="`a-${n}`">Scroll down to close</p>-->
        <!--<q-btn color="primary" @click="basicModal = false" label="Close" />-->
      <!--</div>-->
    <!--</q-modal>-->

    <mapbox :access-token="token"
            :mapOptions="mapOptions"
            :geolocate-control="geolocateControl"
            :fullscreen-control="fullscreen"
            @map-load="mapLoaded"
    >
    </mapbox>
  </q-page>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue'
  import { artworkFeatures } from './artwork-features'
  import { loadClusters } from './load-clusters'
  import { addPopUps } from './load-popups'
  import { bus } from './main'
  import { mapOptions } from './map-options'
  import TestModal from '../layouts/TestModal'

  export default {
    name: 'PageIndex',
    components: {Mapbox, TestModal},
    data() {
      return {
        token: process.env.MAPBOX_TOKEN,
        mapOptions: mapOptions(),
        geolocateControl: {
          show: true,
          position: 'top-left'
        },
        fullscreen: {
          show: true,
          position: 'top-left'
        },
        modalOpened: false,
        artWorkOpenedId: null
      }
    },
    created() {
      bus.$on('popupOpened', this.openModal)
      if (!this.$route.params.coordinates) return
      this.mapOptions = mapOptions(this.$route.params.coordinates.split(','))
    },
    methods: {
      mapLoaded(map) {
        addPopUps(map, artworkFeatures, this.$router)
        // map.addLayer(rootGeoJson(artworkFeatures))
        loadClusters(map, null)

        map.on('moveend', ()=> {
          let unclusteredIds = map.queryRenderedFeatures({layers: ['unclustered-point']})
            .map((feature) => feature.properties.id)
          console.error('ZOOM', map.getZoom())
          const event = { unclusteredIds: unclusteredIds, zoom: map.getZoom() }
          bus.$emit('mapZoomed', event)
        })
      },
      onModalClose() {
        this.modalOpened = false
      },
      openModal(id) {
        this.modalOpened = true
        this.artWorkOpenedId = id
      }
    }
  }
</script>

<style scoped>
  #map {
    width: 100%;
    height: 50rem;
  }
</style>
