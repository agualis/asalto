<template>
  <q-page class="flex flex-center">
      <mapbox :access-token="token"
              :mapOptions="options"
      ></mapbox>
  </q-page>
</template>

<style>
</style>

<script>
import Mapbox from 'mapbox-gl-vue';

export default {
  name: 'PageIndex',
  components: { Mapbox },
  data(){
    return {
      token: 'pk.eyJ1IjoiYWd1YWxpcyIsImEiOiJjaWlwenVkcHEwMjBudG1rbmVsazJlMWd0In0.6flDDkOGrCrx_0Tpe1k8Ww',
      options:
        { container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9' }
    }
  }
}
</script>

<style scoped>
  #map {
  width: 100%;
  height: 800px;
}
</style>
