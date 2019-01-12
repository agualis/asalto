<template>
  <div v-if="show" @click="popupClicked" class="preview">
    <img :src="feature.imageUrl" width="50" height="50"
         :title="feature.title">
  </div>
</template>

<script>
  import { ARTWORK_POPUP_OPENED, MAP_ZOOMED } from '../bus/events'
  import { CLUSTER_MAX_ZOOM } from './load-clusters'
  import { bus } from './main'
  import CardButton from '../components/CardButton'
  import CloseButton from '../components/CloseButton'
  import By from './By'

  export default {
    components: {
      By, CardButton, CloseButton
    },
    props: {
      feature: { type: Object, required: true },
      map: { type: Object, required: true },
      popup: { type: Object, required: true }
    },
    created() {
      bus.$on(MAP_ZOOMED, (event) => {
        this.unclusteredIds = event.unclusteredIds
        this.zoomLevel = event.zoom
      })
    },
    data() {
      return {
        opened: false,
        zoomLevel: this.map.getZoom(),
        unclusteredIds: []
      }
    },
    methods: {
      popupClicked() {
        this.flyTo(this.feature)
        bus.$emit(ARTWORK_POPUP_OPENED, this.feature.id)
      },
      flyTo(feature) {
         this.map.flyTo({
          center: feature.geometry.coordinates,
          zoom: 16,
          offset: [0, 0]
        })
      },
      openDetail() {
        this.$router.push(`/detail/${this.feature.id}`)
      }
    },
    computed: {
      show() {
        const show = this.unclusteredIds.includes(this.feature.id) || this.zoomLevel >= CLUSTER_MAX_ZOOM +1
        if (!show) this.popup.remove()
        else this.popup.addTo(this.map)
        return show
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" scoped>
  @import '~variables'

  .preview {
    border-radius: 50%;
    cursor: pointer;
  }

  img {
    object-fit: cover;
  }

 .q-card-media {
    max-height: 8rem;
  }

 .q-card {
    max-width: 15rem;
   border-color: $primary;
   border-bottom: 2px solid $primary;
  }

</style>
