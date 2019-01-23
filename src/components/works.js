export function createWork({title, author, imageName, longitude, latitude, description}) {
  const uid = 'uid' + Date.now().toString()
  return {
    type: 'Feature',
    title,
    author,
    uid,
    properties: {
      uid
    },
    imageUrls: [imageName],
    imageUrl: imageName,
    previewUrl: createPreviewUrl(imageName),
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
