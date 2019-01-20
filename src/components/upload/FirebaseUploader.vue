<template>
  <div>
    <CropModal ref="cropModal"
               :opened="cropModalOpened"
               :onCropFinished="onCropFinished">
    </CropModal>
    <q-input-frame
      ref="input"
      class="no-margin"

      :prefix="prefix"
      :suffix="suffix"
      :stack-label="stackLabel"
      :float-label="floatLabel"
      :error="error"
      :disable="disable"
      inverted
      :before="before"
      :after="after"
      :color="color"
      :align="align"

      :length="length"
      additional-length
    >
      <div
        class="col row items-center q-input-target"
        v-html="label"
      ></div>

      <q-spinner
        v-if="uploading"
        slot="after"
        size="24px"
        class="q-if-control"
      ></q-spinner>

      <q-icon
        v-if="uploading"
        slot="after"
        class="q-if-control"
        name="clear"
        @click.native="abort"
      ></q-icon>

      <q-icon
        v-if="!uploading"
        slot="after"
        name="add"
        class="q-uploader-pick-button q-if-control relative-position overflow-hidden"
        @click.native="__pick"
        :disabled="addDisabled"
      >
        <input
          type="file"
          ref="file"
          class="q-uploader-input absolute-full cursor-pointer"
          :accept="extensions"
          :multiple="multiple"
          data-test="upload-file"
          @change="__add"
        >
      </q-icon>
    </q-input-frame>

    <div class="q-uploader-files scroll" v-if="croppedDataUrls">
      <q-item
        v-for="(file, index) in files"
        :key="file.name"
        class="q-uploader-file"
      >
        <q-progress v-if="!hideUploadProgress"
                    class="q-uploader-progress-bg absolute-full"
                    :color="file.__failed ? 'negative' : 'grey'"
                    :percentage="file.__progress"
        ></q-progress>

        <div class="q-uploader-progress-text absolute" v-if="!hideUploadProgress">
          {{ file.__progress }}%
        </div>

        <q-item-side v-if="file.__img" :image="file.__img.src">
           <q-item-tile :color="color" :label="true">Original</q-item-tile>
        </q-item-side>
        <q-item-side v-else icon="insert_drive_file" :color="color"></q-item-side>

        <q-item-side v-if="croppedDataUrls[index]" :image="croppedDataUrls[index]">
          <q-item-tile :color="color" :label="true">Preview</q-item-tile>
        </q-item-side>

        <q-item-main :label="file.name" :sublabel="file.__size"></q-item-main>

        <q-item-side right>
          <q-item-tile v-if="file.__doneUploading"
            :icon="file.__doneUploading ? 'clear' : 'clear'"
            :color="color"
            class="cursor-pointer"
            @click.native="__remove(file)"
          ></q-item-tile>
        </q-item-side>
      </q-item>
    </div>
  </div>
</template>

<script>
  import FrameMixin from 'quasar/src/mixins/input-frame'
  import { humanStorageSize } from 'quasar/src/utils/format'
  import CropModal from '@components/upload/CropModal'
  import { readFileAsBlob, readFileAsDataUrl } from './async-files'


  function initFile(file) {
    file.__doneUploading = false
    file.__failed = false
    file.__uploaded = 0
    file.__progress = 0
  }

  export default {
    name: 'q-uploader',
    mixins: [FrameMixin],
    components: {CropModal},
    props: {
      name: {
        type: String,
        default: 'file'
      },
      headers: Object,
      firebaseStorage: {
        type: [Object, Function],
        required: false
      },
      fileFilter: {
        type: Function,
        required: false
      },
      method: {
        type: String,
        default: 'POST'
      },
      extensions: String,
      multiple: Boolean,
      hideUploadButton: Boolean,
      hideUploadProgress: Boolean,
      noThumbnails: Boolean,

      color: {
        type: String,
        default: 'primary'
      },


    },
    data() {
      return {
        queue: [],
        files: [],
        uploading: false,
        uploadedSize: 0,
        totalSize: 0,
        xhrs: [],
        firebaseStorageUploadTasks: [],
        focused: false,
        lastFileResult: null,
        cropModalOpened: false,
        croppedDataUrls: [],
        firebaseFileName: null
      }
    },
    computed: {
      length() {
        return this.queue.length
      },
      label() {
        const total = humanStorageSize(this.totalSize)
        if (!this.uploading && this.files[0] && this.files[0].__doneUploading) return ''
        return this.uploading
          ? `${(this.progress).toFixed(2)}% (${humanStorageSize(this.uploadedSize)} / ${total})`
          : `${this.length} (${total})`
      },
      progress() {
        return this.totalSize ? Math.min(99.99, this.uploadedSize / this.totalSize * 100) : 0
      },
      addDisabled() {
        return !this.multiple && this.length >= 1
      }
    },
    methods: {
      async __add(e) {
        if (this.addDisabled) {
          return
        }
        let files = Array.prototype.slice.call(e.target.files)

        // allow filtering the files
        if (typeof this.fileFilter === 'function') {
          const filteredFiles = files.filter(this.fileFilter)
          const amountOfDiscardedFiles = files.length - filteredFiles.length
          if (amountOfDiscardedFiles > 0) {
            this.$emit('filtered', files.filter(file => !~filteredFiles.indexOf(file)))
            files = filteredFiles
          }
        }

        this.$refs.file.value = ''
        files = files.filter(file => !this.queue.some(f => file.name === f.name))
          .map(file => {
            initFile(file)
            file.__size = humanStorageSize(file.size)

            if (this.noThumbnails || !file.type.startsWith('image')) {
              this.queue.push(file)
            } else {
              const reader = new FileReader()
              reader.onload = (e) => {
                let img = new Image()
                img.src = e.target.result
                this.lastFileResult = reader.result
                file.__img = img
                this.queue.push(file)
                this.__computeTotalSize()
                //AUTOMATICALLY UPLOADING IF THE FILE FORMAT IS CORRECT
                this.upload()
              }
              reader.readAsDataURL(file)
            }
            return file
          })

        this.files = this.files.concat(files)
        this.$emit('add', files)
        this.__computeTotalSize()
      },
      __computeTotalSize() {
        this.totalSize = this.length
          ? this.queue.map(f => f.size).reduce((total, size) => total + size)
          : 0
      },
      __remove(file) {
        const
          name = file.name,
          done = file.__doneUploading

        if (this.uploading && !done) {
          this.$emit('remove:abort', file, file.xhr)
          file.xhr.abort()
          this.uploadedSize -= file.__uploaded
        } else {
          this.$emit(`remove:${done ? 'done' : 'cancel'}`, file, file.xhr)
        }

        if (!done) {
          this.queue = this.queue.filter(obj => obj.name !== name)
        }

        file.__removed = true
        this.files = this.files.filter(obj => obj.name !== name)
        this.__computeTotalSize()
      },
      __removeUploaded() {
        this.files = this.files.filter(f => !f.__doneUploading)
        this.__computeTotalSize()
      },
      __pick() {
        if (!this.addDisabled && this.$q.platform.is.mozilla) {
          this.$refs.file.click()
        }
      },
      async __getFirebaseUploadPromise(file) {
        initFile(file)
        const extension = file.type.split('/')[1]
        this.firebaseFileName = this.name + this.files.length.toString() + '.' + extension
        this.firebaseFileName = 'patata' + '.' + extension
        const uploadTask = this.firebaseStorage.child(this.firebaseFileName).putString(this.lastFileResult)
        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed', snapshot => {
            // upload in progresss
            if (file.__removed) {
              return
            }
            const uploaded = snapshot.bytesTransferred
            this.uploadedSize += uploaded - file.__uploaded
            file.__uploaded = uploaded
            file.__progress = Math.min(99, parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100, 10))
          }, error => {
            // error while uploading
            file.__failed = true
            this.$emit('fail', file, uploadTask, error)
            reject(uploadTask)
          }, () => {
            // upload successful
            file.__doneUploading = true
            file.__progress = 100
            this.$emit('uploaded', this.firebaseFileName)
            this.cropModalOpened = true
            this.$refs.cropModal.bind(this.lastFileResult)
            resolve(file)
          })
          this.firebaseStorageUploadTasks.push(uploadTask)
        })
      },
      upload() {
        const length = this.length
        if (length === 0) {
          return
        }

        let filesDone = 0
        this.uploadedSize = 0
        this.uploading = true
        this.xhrs = []
        this.firebaseStorageUploadTasks = []
        this.$emit('start')

        let solved = () => {
          filesDone++
          if (filesDone === length) {
            this.uploading = false
            this.xhrs = []
            this.firebaseStorageUploadTasks = []
            this.queue = this.queue.filter(f => !f.__doneUploading)
            this.__computeTotalSize()
            this.$emit('finish')
          }
        }

        this.$q.notify('CALLING __getFirebaseUploadPromise')
        this.queue.map(file => this.__getFirebaseUploadPromise(file))
          .forEach(promise => {
            promise
              .then(solved)
              .catch((error)=> console.error(error))
          })
      },
      abort() {
        this.xhrs.forEach(xhr => {
          xhr.abort()
        })
        this.firebaseStorageUploadTasks.forEach(uploadTask => {
          uploadTask.cancel()
        })
      },
      reset() {
        this.abort()
        this.files = []
        this.queue = []
        this.__computeTotalSize()
        this.$emit('reset')
      },
      async onCropFinished(output) {
        await this.firebaseStorage.child('preview-' + this.firebaseFileName).putString(output, 'data_url')
        this.croppedDataUrls.push(output)
        this.cropModalOpened = false
      },
    }
  }
</script>
