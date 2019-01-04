import { artworkFeatures } from './artwork-features'

export const data =
  {
    "type": "FeatureCollection",
    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
    "features": Object.values(artworkFeatures)
  }

