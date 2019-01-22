export function createArtwork({title, author, imageUrl, longitude, latitude, description}) {
  const uid = 'uid' + Date.now().toString()
  return {
    type: 'Feature',
    title,
    author,
    uid,
    properties: {
      uid
    },
    imageUrls: [imageUrl],
    imageUrl: imageUrl,
    previewUrl: 'preview-' + imageUrl,
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    description
  }
}
