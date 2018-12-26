import { artworkGeojson } from './artwork-geojson'

export const rootGeoJson = {
  'id': 'points',
  'type': 'symbol',
  'source': {
    'type': 'geojson',
    'data': artworkGeojson
  },
  'layout': {
    'icon-image': '{icon}-15',
    'text-field': '{title}',
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.6],
    'text-anchor': 'top'
  }
}
