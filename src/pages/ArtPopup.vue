<template>
  <div v-if="show" @click="popupClicked" class="preview" :class="zIndexClass">
    <img v-if="!opened"
         :src="feature.imageUrl" width="50" height="50"
         :title="feature.title">
    <q-card v-if="false">
      <q-card-media>
        <CloseButton :onClick="popupClose"></CloseButton>
        <img :src="feature.imageUrl">
      </q-card-media>
      <q-card-title class="relative-position">
         <CardButton :onClick="openDetail" icon="more_horiz"></CardButton>
        {{feature.title}}
        <div class="row items-center">
          <By/> &nbsp; {{feature.author}}
        </div>
      </q-card-title>
      <q-card-main>
         <!--<q-btn icon="more_horiz" left @click.native="openDetail">more</q-btn>-->
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
  import { CLUSTER_MAX_ZOOM } from './load-clusters'
  import { bus } from './main'
  import CardButton from '../components/CardButton'
  import CloseButton from '../components/CloseButton'
  import By from './By'
  const POPUP_OPENED = 'popupOpened'

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
      bus.$on(POPUP_OPENED, (zoomedId) => {
        // this.opened = this.feature.id === zoomedId ? true : false
      })
      bus.$on('mapZoomed', (event) => {
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
        if (this.opened) return this.opened = false
        this.flyTo(this.feature)
        bus.$emit(POPUP_OPENED, this.feature.id)
      },
      popupClose() {
        this.opened = false
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
      },
      zIndexClass() {
        return this.opened ? 'front' : 'back'
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

  .front {
    z-index: 1
  }

  .back {
    z-index: -1
  }

  img {
    z-index: -1;
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
