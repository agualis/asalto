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
        label="Add an Image"
        :error="false"
        error-label="error"
        orientation="vertical"
       >
         <FirebaseUploader :firebase-storage="storageRef" :multiple="false" @uploaded="imageUploaded"
         ></FirebaseUploader>
      </q-field>

      <CropModal ref="cropModal"
                 :opened="cropModalOpened"
                 :onCropFinished="onCropFinished">
      </CropModal>

      <!--<q-modal v-model="cropModalOpened" maximized>-->
        <!--<h2>Select a representative preview image</h2>-->
        <!--<q-btn @click.native="cropViaEvent()"-->
               <!--color="primary">-->
          <!--Crop Via Callback-->
        <!--</q-btn>-->
          <!--<vue-croppie-->
            <!--ref="croppieRef"-->
            <!--:enableOrientation="false"-->
            <!--@result="onCropFinished"-->
            <!--:viewport="{ width: 200, height: 200, type: 'circle' }"-->
            <!--:enableResize="false"-->
            <!--@update="update">-->
          <!--</vue-croppie>-->
      <!--</q-modal>-->




      THE RESULT:
      <img v-bind:src="cropped">
    </div>
  </q-page>
</template>

<script>
  import firebase from 'firebase'
  const storage = firebase.storage()
  const storageRef = storage.ref('asalto')
  import FirebaseUploader from '@components/upload/FirebaseUploader'
  import CropModal from '@components/upload/CropModal'
  export default {
    components: {
      FirebaseUploader,
      CropModal
    },
    data() {
      return {
        name: null,
        author: null,
        imageUrl: null,
        cropped: null,
        url: '',
        storageRef: storageRef,
        cropModalOpened: false
      }
    },
    async created() {
      const url = await storageRef.child('banksy_800x669.jpg').getDownloadURL()
      console.log('HEHEEH', url)
    },
    methods: {
      cropViaEvent() {
        let options = {
          format: 'jpeg',
        }
        this.$refs.croppieRef.result(options)
      },
      async onCropFinished(output) {
        const uploadResult = await storageRef.child('preview').put(output)
        this.cropped = output
        this.cropModalOpened = false
      },
      imageUploaded(file, uploadTask, imageAsUrl) {
        this.$refs.cropModal.bind(imageAsUrl)
        this.cropModalOpened = true
      }
    },
    computed: {
      validImageUrl() {
        return this.imageUrl && this.imageUrl.startsWith('http')
      },
    }
  }
</script>
