<template>
  <div class="street">
    DETAIL
  </div>
</template>

<script>
  import { artworkFeatures } from './artwork-features'

  export default {
    data() {
      return {
      }
    },
    created() {
       const feature = artworkFeatures[this.$route.params.workId]
    }
  }
</script>

<style>
</style>

