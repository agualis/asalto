<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="caption">Create new artwork</p>
      <q-field
        icon="brush"
        label="Artwork Name"
        :error="false"
        error-label="error"
      >
        <q-input v-model="name"/>
      </q-field>
      <q-field
        icon="face"
        label="Author"
        :error="false"
        error-label="error"
      >
        <q-input v-model="author"/>
      </q-field>

       <q-field
        icon="add_a_photo"
        label="Add one or more images"
        :error="false"
        error-label="error"
        orientation="vertical"
       >
         <FirebaseUploader :disabled="!name"
                           :firebase-storage="storageRef"
                           :multiple="false"
                           @uploaded="imageUploaded"
                           :name="fileNamePrefix"
         ></FirebaseUploader>
      </q-field>

    </div>
  </q-page>
</template>

<script>
  import firebase from 'firebase'
  const storage = firebase.storage()
  const storageRef = storage.ref('asalto')
  import FirebaseUploader from '@components/upload/FirebaseUploader'
  import { readFileAsDataUrl } from '../components/upload/async-files'
  export default {
    components: {
      FirebaseUploader,
    },
    data() {
      return {
        name: null,
        author: null,
        imageUrl: null,
        url: '',
        storageRef: storageRef,
      }
    },
    async created() {
      const url = await storageRef.child('banksy_800x669.jpg').getDownloadURL()
    },
    methods: {
      cropViaEvent() {
        let options = {
          format: 'jpeg',
        }
        this.$refs.croppieRef.result(options)
      },
      async onCropFinished(output) {
        await storageRef.child('preview').putString(output, 'data_url')
      },
      imageUploaded(firebaseFileName) {
        this.$q.notify(firebaseFileName)
      }
    },
    computed: {
      validImageUrl() {
        return this.imageUrl && this.imageUrl.startsWith('http')
      },
      fileNamePrefix() {
        return `${this.name}-${this.author}-${Date.now().toString()}`
      },
      uploaderDisabled() {
        return this.name.length > 5
      }
    }
  }
</script>
