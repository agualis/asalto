<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <p class="q-caption danger">🔥SUPERADMIN STUFF🔥</p>

      <q-field orientation="vertical">
        <q-btn color="primary"
               @click="reset"
               data-test="reset-db"
               inverted>
          Reset the fucking DB
        </q-btn>
      </q-field>
    </div>
  </q-page>
</template>

<script>
  import { resetDb, seedDb } from './db-seed'

  export default {
    methods: {
      async reset() {
        if (process.env.PROD) return this.$q.notify('This a production environment, are you insane?')
        try {
          await resetDb(this.$db)
          await seedDb(this.$db)
          this.$q.notify('RESET SUCCESS 🤘🤘🤘')
        } catch(error) {
          this.$q.notify('Error, check your firebase setup: \n' + error)
        }
      }
    }
  }
</script>
