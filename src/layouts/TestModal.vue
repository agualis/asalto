<template>
  <q-modal v-model="opened" maximized>
    <q-toolbar
      color="primary"
      :glossy="$q.theme === 'mat'"
      :inverted="$q.theme === 'ios'"
    >
      <ToolbarTitle/>
    </q-toolbar>

    <h2>TEST</h2>
    <q-btn @click.native="onClose()"
           color="primary">
      CLOSE
    </q-btn>
    <List></List>
  </q-modal>
</template>

<script>
  import ToolbarTitle from '../layouts/ToolbarTitle'
  import List from '../pages/List'

  export default {
    components: {ToolbarTitle, List},
    props: {
      onClose: {type: Function, required: true},
      opened: {type: Boolean, required: true}
    },
    created() {
      document.addEventListener("backbutton", onBackKeyDown, false)
      function onBackKeyDown(event) {
        this.$q.notify({
        color: 'secondary',
        message: 'Done opening and closing'
      })
      }
    }
  }
</script>
