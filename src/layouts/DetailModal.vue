<template>
  <q-modal :value="opened" minimized @hide="hideModal" @escape-key="hideModal"
           :no-esc-dismiss="false"
  >
    <DetailPopup :work="workDetail" :onClose="onClose"></DetailPopup>
  </q-modal>
</template>

<script>
  import ToolbarTitle from '../layouts/ToolbarTitle'
  import List from '../pages/lists/List'
  import DetailPopup from '../pages/map/DetailPopup'

  export default {
    components: {ToolbarTitle, List, DetailPopup},
    props: {
      onClose: {type: Function, required: true},
      opened: {type: Boolean, required: true},
      workDetail: {type: Object, required: false}
    },
    methods: {
      hideModal() {
        this.onClose()
      }
    }
  }
</script>
