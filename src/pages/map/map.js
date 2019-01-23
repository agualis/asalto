import { CLUSTER_MAX_ZOOM } from './load-clusters'

export const flyTo = (map, artwork) => {
  map.flyTo({
    center: artwork.geometry.coordinates,
    zoom: CLUSTER_MAX_ZOOM + 1,
    offset: [0, 0]
  })
}
