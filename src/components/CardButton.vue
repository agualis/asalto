<template>
  <q-btn fab color="primary" :icon="icon"
         class="absolute"
         @click.native="onClick"
         style="top: 0; right: 8px; transform: translateY(-50%);"/>
</template>

<script>
  export default {
    props: {
      onClick: { type: Function, required: true },
      icon: { type: String, default: 'place' }
    }
  }
</script>
