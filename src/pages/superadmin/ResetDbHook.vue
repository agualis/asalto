<template>
  <div>
   RESETING...
  </div>
</template>

<script>
  import { resetDb, seedDb } from './db-seed'

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
