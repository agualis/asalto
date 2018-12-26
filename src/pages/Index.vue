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

<style>
</style>

<script>
  import Mapbox from 'mapbox-gl-vue'
  import { artworkFeatures } from './artwork-features'
  import { addPopUps } from './load-popups'
  import { mapOptions } from './map-options'
  import { rootGeoJson } from './root-geojson'

  export default {
    name: 'PageIndex',
    components: {Mapbox},
    data() {
      return {
        token: process.env.MAPBOX_TOKEN,
        mapOptions: mapOptions,
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
    methods: {
      mapLoaded(map) {
        map.addLayer(rootGeoJson(artworkFeatures))

        addPopUps(map, artworkFeatures)
        // loadClusters(map, null)
      }
    }
  }
</script>

<style scoped>
  #map {
    width: 100%;
    height: 600px;
  }
</style scoped>
