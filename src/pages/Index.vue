<template>
  <q-page class="flex flex-center">
      <mapbox :access-token="token"
              :mapOptions="options"
              :geolocate-control="geolocate"
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
import { geojson } from './geojson'

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
      geolocate: {
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
       map.addLayer( {
           'id': 'points',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          'data': geojson},
          'layout': {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
       })
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
