<template>
  <q-modal v-model="opened" maximized
           no-route-dismiss
           no-esc-dismiss
           no-backdrop-dismiss
  >
    <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <ToolbarTitle/>
    </q-toolbar>

    <h2>Select a representative preview image</h2>
    <q-btn @click.native="cropViaEvent()"
           color="primary">
      Crop
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
  import ToolbarTitle from '../../layouts/ToolbarTitle'

  export default {
    components: { ToolbarTitle },
    props: {
      onCropFinished: {type: Function, required: true},
      opened: {type: Boolean, required: true}
    },
    methods: {
      bind(imageAsUrl) {
        this.$refs.croppieRef.bind({url: imageAsUrl})
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
