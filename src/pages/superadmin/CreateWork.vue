<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption urban">Add New Shit</p>
      <!--'preview-{{imageUrl}}'-->
      <q-field
        icon="brush"
        label="Artwork Title"
        :error="false"
        error-label="error"
      >
        <q-input
          data-test="new-artwork-title"
          v-model="title"/>
      </q-field>

      <q-field
        icon="face"
        label="Author"
        :error="false"
        error-label="error"
      >
        <q-input
          data-test="new-artwork-author"
          v-model="author"/>
      </q-field>

       <q-field
        icon="add_a_photo"
        label="Add one or more images"
        :error="false"
        error-label="error"
        orientation="vertical"
       >
         <FirebaseUploader :disabled="!title"
                           :firebase-storage="$storageRef"
                           :multiple="false"
                           @uploaded="imageUploaded"
                           :name="fileNamePrefix"
         ></FirebaseUploader>
      </q-field>

      <q-field
        label="Description"
        :error="false"
        orientation="vertical"
        icon="description"
      >
        <q-input v-model="description"
                 class="q-ma-xs"
                 data-test="new-artwork-description"
                 color="primary"
                 rows="5"
                 type="textarea" />

      </q-field>

      <q-field
        icon="place"
        label="Coordinates"
        :error="false"
        orientation="vertical"
      >
        <q-input
          stack-label="Latitude"
          data-test="new-artwork-latitude"
          v-model="latitude"/>
        <q-input stack-label="Longitude"
                 data-test="new-artwork-longitude"
                 v-model="longitude"/>
        <q-btn flat
               data-test="open-gmaps-geolocation"
               @click="openGoogleMapsUrl">
            Check in google maps
        </q-btn>
      </q-field>


      <q-field orientation="vertical">
        <q-btn color="primary"
               :loading="loading"
               :disabled="!canCreate"
               @click="createWork"
               inverted>
          Create
        </q-btn>
      </q-field>
    </div>
  </q-page>
</template>

<script>
  import firebase from 'firebase'
  // const storage = firebase.storage()
  // const storageRef = storage.ref('asalto')
  import FirebaseUploader from '@components/upload/FirebaseUploader'
  import { openURL } from 'quasar'
  import { createWork } from '../../components/works'
  import { ARTWORKS } from '../../infrastructure/db'

  export default {
    components: {
      FirebaseUploader,
    },
    data() {
      return {
        title: null,
        author: null,
        imageUrl: null,
        url: '',
        latitude: null,
        longitude: null,
        description: null,
        artwork: null,
        loading: false
      }
    },
    async created() {
      const coordinates = await this.$getLocation({})
      this.latitude = coordinates.lat
      this.longitude = coordinates.lng
    },
    methods: {
      imageUploaded(firebaseFileName) {
        this.imageUrl = firebaseFileName
      },
      openGoogleMapsUrl() {
        openURL(`http://maps.google.com/maps?q=${this.latitude},${this.longitude}`)
      },
      async createWork() {
        this.artwork = createWork({
          title: this.title,
          author: this.author,
          imageUrl: this.imageUrl,
          description: this.description,
          latitude: this.latitude,
          longitude: this.longitude
        })
        this.loading = true
        await this.$db.collection(ARTWORKS).add(this.artwork)
        this.loading = false
        this.$q.notify('Congrats, you created a new artwork!')
        this.$router.replace('/')
      }
    },
    computed: {
      fileNamePrefix() {
        return `${this.title}-${this.author}-${Date.now().toString()}`
      },
      uploaderDisabled() {
        return this.title.length > 5
      },
      canCreate() {
        return this.title && this.author && this.description && this.imageUrl
      }
    }
  }
</script>
