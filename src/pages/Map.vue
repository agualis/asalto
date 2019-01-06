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
