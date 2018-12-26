<template>
  <div>
      <img :src="feature.imageUrl" width="50" height="50" @click="popupClicked(feature)">
  </div>
</template>

<script>
  export default {
    props: {
      feature: { required: true }
    },
    methods: {
      popupClicked(feature) {
        alert(`${feature.title} clicked!`);
      }
    }
  }
</script>

<style scoped>
  img {
    border-radius: 50%;
  }
</style>
