<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="q-caption danger">🔥SUPERADMIN STUFF🔥</p>

      <q-field orientation="vertical">
        <q-btn color="primary"
               @click="resetDb"
               inverted>
          Reset the fucking DB
        </q-btn>
      </q-field>
    </div>
  </q-page>
</template>

<script>
  import { ARTWORKS } from '../infrastructure/db'
  import { artworkFeatures } from './artwork-features'

  export default {
    methods: {
      async resetDb() {
        if (process.env.PROD) return this.$q.notify('This a production environment, are you insane?')
        const db = this.$db
        const collection = db.collection(ARTWORKS)
        const artworks = await collection.get()
        await artworks.forEach(work => collection.doc(work.id).delete())
        await Object.values(artworkFeatures).forEach(work => {
          this.$db.collection(ARTWORKS).add(work)
        })
        this.$q.notify('RESET SUCCESS 🤘🤘🤘')
      }
    }
  }
</script>
