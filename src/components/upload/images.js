export function getPreviewImageSrc(storageRef, previewUrl) {
  if (!previewUrl) return null
  if (previewUrl.startsWith('http')) return previewUrl
  return `https://firebasestorage.googleapis.com/v0/b/asalto.appspot.com/o/asalto%2F${previewUrl}?alt=media`
  // return storageRef.child(previewUrl).getDownloadURL()
}

export function getPreviewImage(work) {
  if (work.previewUrl.startsWith('http')) return work.previewUrl
  return `https://firebasestorage.googleapis.com/v0/b/asalto.appspot.com/o/asalto%2F${work.previewUrl}?alt=media`
}

export function generateImageFileName(file) {
  const extension = file.type.split('/')[1]
  const filenameWithoutExtension = file.name.split('.')[0] + Date.now().toString()
  return `${filenameWithoutExtension}.${extension}`.replace(/\s+/g, '-')
}

export const CROP_HEIGHT = 200
export const CROP_WIDTH = 250
