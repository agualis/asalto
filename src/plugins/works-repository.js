import { ARTWORKS } from '../infrastructure/db'

export class WorksRepository {
  constructor(db) {
    this.$db = db
  }
  async add(artwork) {
    console.log('BIGARDO')
    return this.$db.collection(ARTWORKS).add(artwork)
  }
}
