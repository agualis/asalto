<template>
  <img :src="feature.imageUrl" width="50" height="50"
       :title="feature.title"
       @click="popupClicked(feature)">
</template>

<script>
  export default {
    props: {
      feature: {type: Object, required: true},
      map: {type: Object, required: true}
    },
    methods: {
      popupClicked(feature) {
        this.map.flyTo({ center: feature.geometry.coordinates, zoom: 16  })
        // alert(`${feature.title} clicked!`);
      }
    }
  }
</script>

<style scoped>
  img {
    border-radius: 50%;
    cursor: pointer;
  }
</style>
