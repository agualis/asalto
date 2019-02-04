import { format } from 'quasar'
const { humanStorageSize } = format

export default ({app, router, Vue}) => {
  Vue.prototype.$humanStorageSize = humanStorageSize
  Vue.prototype.$notify = Vue.prototype.$q.notify
}


