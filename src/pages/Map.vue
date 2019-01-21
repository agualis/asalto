<template>
  <q-page class="flex flex-center">
    <DetailModal :opened="modalOpened"
               :onClose="onModalClose"
               :workDetail="openedWork"
    ></DetailModal>
      <QSpinner v-if="!works"
                data-test="works-loading-spinner"
                color="primary"
                :size="60"></QSpinner>
      <QProgress v-if="works && loading"
                 data-test="map-loading-progress"
                 indeterminate color="primary"/>
      <mapbox v-if="works"
              :access-token="token"
              :mapOptions="mapOptions"
              :geolocate-control="geolocateControl"
              :fullscreen-control="fullscreen"
              @map-load="mapLoaded"
      >
      </mapbox>
    <FullScreenButton :click="onModalClose"/>
  </q-page>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue'
  import { ARTWORK_POPUP_OPENED, MAP_ZOOMED } from '../bus/events'
  import FullScreenButton from '@components/FullScreenButton'
  import { ARTWORKS } from '../infrastructure/db'
  import { CLUSTER_MAX_ZOOM, loadClusters } from './load-clusters'
  import { addPopUps } from './load-popups'
  import { bus } from './main'
  import { mapOptions } from './map-options'
  import DetailModal from '../layouts/DetailModal'

  export default {
    components: {FullScreenButton, Mapbox, DetailModal},
    data() {
      return {
        token: process.env.MAPBOX_TOKEN,
        mapOptions: mapOptions(),
        geolocateControl: {
          show: true,
          position: 'top-left'
        },
        fullscreen: {
          show: false,
          position: 'top-left'
        },
        modalOpened: false,
        openedWork: null,
        works: null,
        loading: true
      }
    },
    async created() {
      this.$q.addressbarColor.set()
      const works = await this.$bind(ARTWORKS, this.$db.collection(ARTWORKS))
      this.works = Object.freeze(works)
      console.log('this.works', this.works)
      bus.$on(ARTWORK_POPUP_OPENED, this.openModal)
      if (!this.$route.params.coordinates) return
      this.mapOptions = mapOptions(this.$route.params.coordinates.split(','))
      this.mapOptions.zoom = CLUSTER_MAX_ZOOM +1
    },
    methods: {
      mapLoaded(map) {
        console.log('MAP LOADED')
        this.loading = false
        addPopUps(map, this.works, this.$router)
        loadClusters(map, this.works)

        map.on('moveend', ()=> {
          let unclusteredIds = map.queryRenderedFeatures({layers: ['unclustered-point']})
            .map((work) => work.uid)
          const event = { unclusteredIds: unclusteredIds, zoom: map.getZoom() }
          bus.$emit(MAP_ZOOMED, event)
        })
      },
      onModalClose() {
        this.modalOpened = false
      },
      openModal(uid) {
        this.$router.push(`/${uid}`)
        this.modalOpened = true
        this.openedWork = this.works.find(work => work.uid === uid)
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
