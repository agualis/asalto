import { ARTWORKS } from '../../infrastructure/db'
import { artworks } from '../artworks'

export const resetDb = async (db) => {
  const collection = db.collection(ARTWORKS)
  const artworks = await collection.get()
  artworks.forEach(work => collection.doc(work.id).delete())
}

export const seedDb = async (db) => {
  await Object.values(artworks).forEach(work => {
    db.collection(ARTWORKS).add(work)
  })
}
