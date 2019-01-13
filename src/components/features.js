export function createFeature({title, author, imageUrl, longitude, latitude, description}) {
  const id = 'id' + Date.now().toString()
  return {
    type: 'Feature',
    title,
    author,
    id,
    properties: {
      id
    },
    imageUrls: [imageUrl],
    imageUrl: imageUrl,
    previewUrl: 'preview' + imageUrl,
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    description
  }
}
