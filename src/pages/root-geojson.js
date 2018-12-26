export const rootGeoJson = (artworkFeatures) => ({
  'id': 'points',
  'type': 'symbol',
  'source': {
    'type': 'geojson',
    'data': {
      type: 'FeatureCollection',
      features: artworkFeatures
    }
  },
  'layout': {
    'icon-image': '{icon}-15',
    'text-field': '{title}',
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.6],
    'text-anchor': 'top'
  }
})
