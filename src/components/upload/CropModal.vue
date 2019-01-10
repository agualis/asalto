<template>
  <q-modal v-model="opened" maximized>
    <h2>Select a representative preview image</h2>
    <q-btn @click.native="cropViaEvent()"
           color="primary">
      Crop Via Callback
    </q-btn>
    <vue-croppie
      ref="croppieRef"
      :enableOrientation="false"
      @result="onCropFinished"
      :viewport="{ width: 200, height: 200, type: 'circle' }"
      :enableResize="false">
    </vue-croppie>
  </q-modal>
</template>

<script>
  export default {
    props: {
      onCropFinished: { type: Function, required: true },
      opened: { type: Boolean, required: true }
    },
    methods: {
      bind(imageAsUrl) {
        this.$refs.croppieRef.bind({ url: imageAsUrl })
      },
      cropViaEvent() {
        let options = {
          format: 'jpeg'
        }
        this.$refs.croppieRef.result(options)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  .croppie-container {
    max-width: 500px;
    max-height: 500px;
    padding: 5%
  }
</style>
