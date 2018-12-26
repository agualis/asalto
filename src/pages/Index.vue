<template>
  <q-page class="flex flex-center">
      <mapbox :access-token="token"
              :mapOptions="options"
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
import Mapbox from 'mapbox-gl-vue';
import { rootGeoJson } from './root-geojson'

export default {
  name: 'PageIndex',
  components: { Mapbox },
  data(){
    return {
      token: 'pk.eyJ1IjoiYWd1YWxpcyIsImEiOiJjaWlwenVkcHEwMjBudG1rbmVsazJlMWd0In0.6flDDkOGrCrx_0Tpe1k8Ww',
      options:
        { container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
        },
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
       map.addLayer(rootGeoJson)
    }
  }
}
</script>

<style scoped>
  #map {
  width: 100%;
  height: 600px;
}
</style>
