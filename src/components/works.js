export function createWorkPayload({title, author, imageUrl, longitude, latitude, description}) {
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
    previewUrl: createPreviewUrl(imageUrl),
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    description
  }
}

export function createPreviewUrl(imageName) {
  return 'preview-' + imageName
}
