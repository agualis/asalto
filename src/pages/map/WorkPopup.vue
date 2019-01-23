<template>
  <div v-if="show" @click="popupClicked" class="preview">
    <div v-if="!imageSrc">LOADING</div>
    <img :src="imageSrc"
         width="50" height="50"
         :title="work.title">
   <!--<progressive-img-->
    <!--:src="work.imageUrl"-->
     <!--no-ratio-->
    <!--/>-->
  </div>
</template>

<script>
  import { ARTWORK_POPUP_OPENED, MAP_ZOOMED } from '../../bus/events'
  import { getPreviewImageSrc } from '../../components/upload/images'
  import { CLUSTER_MAX_ZOOM } from './load-clusters'
  import { bus } from '../main'
  import CardButton from '../../components/CardButton'
  import CloseButton from '../../components/CloseButton'
  import By from '../../components/By'
  import { flyTo } from './map'

  export default {
    components: {
      By, CardButton, CloseButton
    },
    props: {
      work: { type: Object, required: true },
      map: { type: Object, required: true },
      popup: { type: Object, required: true }
    },
    async created() {
      this.imageSrc = await getPreviewImageSrc(this.$storageRef, this.work.previewUrl)
      bus.$on(MAP_ZOOMED, (event) => {
        this.unclusteredIds = Object.freeze(event.unclusteredIds)
        this.zoomLevel = event.zoom
      })
    },
    data() {
      return {
        opened: false,
        zoomLevel: this.map.getZoom(),
        unclusteredIds: [],
        imageSrc: null
      }
    },
    methods: {
      popupClicked() {
        flyTo(this.map, this.work)
        bus.$emit(ARTWORK_POPUP_OPENED, this.work.uid)
      },
      openDetail() {
        this.$router.push(`/detail/${this.work.uid}`)
      }
    },
    computed: {
      show() {
        const show = this.unclusteredIds.includes(this.work.uid) || this.zoomLevel >= CLUSTER_MAX_ZOOM + 0.5
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
