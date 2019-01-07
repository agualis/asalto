<template>
  <q-btn fab-mini color="primary" icon="cancel" size="xs"
         class="absolute"
         @click="onClick"
         style="left: 2px; top: 2px;"/>
</template>

<script>
  export default {
    props: {
      onClick: { type: Function, required: true },
    }
  }
</script>
