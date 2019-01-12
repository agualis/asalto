<template>
  <q-modal :value="opened" minimized @hide="hideModal" @escape-key="hideModal"
           :no-esc-dismiss="false"
  >
    <q-btn @click.native="onClose()"
           color="primary">
      CLOSE
    </q-btn>
    <DetailPopup :workId="detailId" :onClose="onClose"></DetailPopup>
  </q-modal>
</template>

<script>
  import ToolbarTitle from '../layouts/ToolbarTitle'
  import List from '../pages/List'
  import DetailPopup from '../pages/DetailPopup'

  export default {
    components: {ToolbarTitle, List, DetailPopup},
    props: {
      onClose: {type: Function, required: true},
      opened: {type: Boolean, required: true},
      detailId: {type: String, required: false}
    },
    methods: {
      hideModal() {
        this.onClose()
        this.$q.notify({
        color: 'secondary',
        message: 'Done closing'
      })
      }
    }
  }
</script>
