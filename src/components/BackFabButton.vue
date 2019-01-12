<template>
  <q-btn
    round
    color="primary"
    @click="click"
    class="fixed"
    icon="mail"
    style="right: 18px; bottom: 18px"
  />
</template>

<script>
  export default {
    props: {
      click: {type: Function, required: true}
    }
  }
</script>
