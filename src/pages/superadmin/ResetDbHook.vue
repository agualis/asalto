<template>
  <div>
   RESETING...
  </div>
</template>

<script>

  import { resetDb, seedDb } from './db-hooks'

  export default {
    methods: {
      async created() {
        if (process.env.PROD) return 'This a production environment, are you insane?'
        await resetDb(this.$db)
        await seedDb(this.$db)
      }
    }
  }
</script>
