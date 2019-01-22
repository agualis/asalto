import { ARTWORKS } from '../../infrastructure/db'
import { worksSeed } from '../works-seed'

export const resetDb = async (db) => {
  const collection = db.collection(ARTWORKS)
  const works = await collection.get()
  const deleteByDocumentId = works => works.forEach(work => collection.doc(work.id).delete())
  deleteByDocumentId(works)
}


export const seedDb = async (db) => {
  await Object.values(worksSeed).forEach(work => {
    db.collection(ARTWORKS).add(work)
  })
}
