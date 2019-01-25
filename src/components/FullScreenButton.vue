<template>
  <q-btn v-if="show"
    round
    color="primary"
    @click="toggleFullscreenMode"
    class="fixed"
    icon="fullscreen"
    style="right: 18px; bottom: 30px"
  />
</template>

<script>
  export default {
    props: {
      click: {type: Function, required: true}
    },
    methods: {
      toggleFullscreenMode() {
        this.$q.fullscreen.toggle()
      }
    },
    computed: {
      show() {
        return this.$q.fullscreen.isCapable
      }
    }
  }
</script>
