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

      <q-modal v-model="cropModalOpened" maximized>
        <h2>Select a representative preview image</h2>
        <q-btn @click.native="crop()"
               color="primary">
          Crop Via Callback
        </q-btn>
          <vue-croppie
            ref="croppieRef2"
            :enableOrientation="false"
            @result="result"
            :viewport="{ width: 200, height: 200, type: 'circle' }"
            :enableResize="false"
            @update="update">
          </vue-croppie>
      </q-modal>
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
    mounted() {
        // Upon mounting of the component, we accessed the .bind({...})
        // function to put an initial image on the canvas.
        this.$refs.croppieRef2.bind({
            url: 'http://i.imgur.com/Fq2DMeH.jpg',
        })
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
    created() {
      // console.log('HELLO', storageRef.child('banksy_800x669.jpg'))
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
      imageUploaded(file, uploadTask, result) {
        console.log('Image uploaded', result)
        console.log('Image uploaded', file)
        this.$refs.croppieRef2.bind({ url: result })
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

<style lang="stylus" scoped>
  @import '~variables'
  .croppie-container {
    max-width: 500px;
    max-height: 500px;
    padding: 5%
  }
</style>
