<template>
  <div class="row justify-left">
      <q-card inline class="menu-card"
              v-for="work in works"
              :key="work.uid"
              data-test="list-item"
              @click.once.native="openDetail(work.uid)">
      <q-card-media overlay-position="top">
        <img :src="imageUrl(work)"/>
      </q-card-media>
        <q-card-main>
          <div class="text-weight-bolder ellipsis">{{ work.title }}</div>
          <div class="ellipsis author"><By/> {{ work.author }}</div>
        </q-card-main>
      </q-card>
  </div>
</template>

<script>
  import { getPreviewImage, getPreviewImageSrc } from '../../components/images'
  import { ARTWORKS } from '../../infrastructure/db'
  import By from '../../components/By'

  export default {
    components: { By },
    data() {
      return {
        works: null
      }
    },
    created() {
      this.loadWorks()
    },
    methods: {
      async loadWorks() {
        const works = await this.$bind(ARTWORKS, this.$db.collection(ARTWORKS))
        this.works = Object.freeze(works)
      },
      openDetail(uid) {
        this.$router.push(`/detail/${uid}`)
      },
      imageUrl(work) {
        return getPreviewImage(work)
      }
    },
    computed: {
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .menu-card:hover {
    background: alpha(black, 30%);
    opacity: 0.5;
    cursor: pointer;
  }

  .q-card-media {
    max-height: 8rem;
  }

  .q-card-title
    color black
    font-weight bold
    font-size 150%

  .q-card
    margin: 1%;
    max-width: 48%;

  .author
    padding-top: 0.2rem;
    padding-bottom: 0.5rem;

  .street
    vertical-align: middle;

</style>


