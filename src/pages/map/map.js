import { CLUSTER_MAX_ZOOM } from './load-clusters'

export const flyTo = (map, artwork) => {
  map.flyTo({
    center: artwork.geometry.coordinates,
    zoom: CLUSTER_MAX_ZOOM + 1,
    offset: [0, 0]
  })
}

export const flyToCoordinates = (map, coordinates) => {
  map.flyTo({
    center: coordinates.split(','),
    zoom: CLUSTER_MAX_ZOOM + 1,
    offset: [0, 0]
  })
}
