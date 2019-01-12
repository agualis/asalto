<template>
  <q-page class="flex flex-center">
    <DetailModal :opened="modalOpened"
               :onClose="onModalClose"
               :detailId="artWorkOpenedId"
    ></DetailModal>
    <mapbox :access-token="token"
            :mapOptions="mapOptions"
            :geolocate-control="geolocateControl"
            :fullscreen-control="fullscreen"
            @map-load="mapLoaded"
    >
    </mapbox>
    <BackFabButton :click="onModalClose"/>
  </q-page>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue'
  import BackFabButton from '@components/BackFabButton'
  import { ARTWORK_POPUP_OPENED, MAP_ZOOMED } from '../bus/events'
  import { artworkFeatures } from './artwork-features'
  import { loadClusters } from './load-clusters'
  import { addPopUps } from './load-popups'
  import { bus } from './main'
  import { mapOptions } from './map-options'
  import DetailModal from '../layouts/DetailModal'

  export default {
    name: 'PageIndex',
    components: {Mapbox, DetailModal, BackFabButton},
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
      bus.$on(ARTWORK_POPUP_OPENED, this.openModal)
      if (!this.$route.params.coordinates) return
      this.mapOptions = mapOptions(this.$route.params.coordinates.split(','))
    },
    methods: {
      mapLoaded(map) {
        addPopUps(map, artworkFeatures, this.$router)
        loadClusters(map, null)

        map.on('moveend', ()=> {
          let unclusteredIds = map.queryRenderedFeatures({layers: ['unclustered-point']})
            .map((feature) => feature.properties.id)
          const event = { unclusteredIds: unclusteredIds, zoom: map.getZoom() }
          bus.$emit(MAP_ZOOMED, event)
        })
      },
      onModalClose() {
        this.modalOpened = false
      },
      openModal(id) {
        this.$router.push(`/${id}`)
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
