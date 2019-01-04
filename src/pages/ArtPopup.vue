<template>
  <div v-if="enoughZoom" @click="popupClicked(feature)" class="preview">
    <img v-if="!opened"
         :src="feature.imageUrl" width="50" height="50"
         :title="feature.title">
    <q-card v-if="opened" color="primary">
      <q-card-media>
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
  import By from './By'

  export default {
    components: {
      By, CardButton
    },
    props: {
      feature: {type: Object, required: true },
      map: {type: Object, required: true }
    },
    created() {
      bus.$on('featureZoomed', (zoomedId) => {
        this.opened = this.feature.id === zoomedId ? true : false
      })
      bus.$on('mapZoomed', (zoomLevel) => {
        console.log('YEAH', this.feature.id)
        this.zoomLevel = zoomLevel
      })
    },
    data() {
      return {
        opened: false,
        zoomLevel: this.map.getZoom()
      }
    },
    methods: {
      popupClicked(feature) {
        if (this.opened) return this.opened = false
        this.flyTo(feature)
        bus.$emit('featureZoomed', this.feature.id);
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
      enoughZoom() {
        return this.zoomLevel >= CLUSTER_MAX_ZOOM
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
    max-height: 12rem;
  }
</style>
