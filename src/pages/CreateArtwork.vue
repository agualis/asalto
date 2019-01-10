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
       <!--<q-input v-model="imageUrl" @input="updateImage"/>-->
       <FirebaseUploader :firebase-storage="storageRef" @uploaded="imageUploaded"></FirebaseUploader>

      </q-field>

      <!--<vue-croppie-->
        <!--ref="croppieRef"-->
        <!--:enableOrientation="true"-->
        <!--@result="result"-->
        <!--@update="update">-->
      <!--</vue-croppie>-->

      <img :src="imageUrl">

      <button @click="crop()">Crop Via Callback</button>

    </div>
  </q-page>
</template>

<script>
  import firebase from 'firebase'
  const storage = firebase.storage()
  const storageRef = storage.ref('asalto')
  import FirebaseUploader from '@components/upload/FirebaseUploader'
  export default {
    components: {
      FirebaseUploader
    },
    data() {
      return {
        name: null,
        author: null,
        imageUrl: null,
        cropped: null,
        url: '',
        storageRef: storageRef
      }
    },
    methods: {
      updateImage() {
        if (!this.validImageUrl) return
        this.$refs.croppieRef.bind({
          url: this.imageUrl
        })
      },
      result(output) {
        this.cropped = output
      },
      update(val) {
        console.log(val)
      },
      imageUploaded() {
        console.log('Image uploaded')
      }
    },
    computed: {
      validImageUrl() {
        return this.imageUrl && this.imageUrl.startsWith('http')
      },
    }
  }
</script>
