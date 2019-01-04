<template>
  <q-page class="flex flex-center">
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
  import { rootGeoJson } from './root-geojson'

  export default {
    name: 'PageIndex',
    components: {Mapbox},
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
        }
      }
    },
    created() {
      if (!this.$route.params.coordinates) return
      this.mapOptions = mapOptions(this.$route.params.coordinates.split(','))
    },
    methods: {
      mapLoaded(map) {
        map.on('zoom', () => {
          console.log(map.getZoom())
          bus.$emit('mapZoomed', map.getZoom())
        })
        map.addLayer(rootGeoJson(artworkFeatures))
        addPopUps(map, artworkFeatures, this.$router)
        loadClusters(map, null)
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
