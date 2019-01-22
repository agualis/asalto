import { ARTWORKS } from '../../infrastructure/db'
import { worksSeed } from '../works-seed'

export const resetDb = async (db) => {
  const collection = db.collection(ARTWORKS)
  const artworks = await collection.get()
  artworks.forEach(work => collection.doc(work.id).delete())
}

export const seedDb = async (db) => {
  await Object.values(worksSeed).forEach(work => {
    db.collection(ARTWORKS).add(work)
  })
}
