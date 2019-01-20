import { ARTWORKS } from '../../infrastructure/db'
import { artworkFeatures } from '../artwork-features'

export const resetDb = async (db) => {
  const collection = db.collection(ARTWORKS)
  const artworks = await collection.get()
  artworks.forEach(work => collection.doc(work.id).delete())
}

export const seedDb = async (db) => {
  await Object.values(artworkFeatures).forEach(work => {
    db.collection(ARTWORKS).add(work)
  })
}
