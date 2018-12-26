import { artworkFeatures } from './artwork-features'

export function loadClusters(map, features) {
  map.addSource("artworks", {
    type: "geojson",
    data: {
      type: 'FeatureCollection',
      features: artworkFeatures
    },
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  })
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "artworks",
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1"
      ],
      "circle-radius": [
        "step",
        ["get", "point_count"],
        20,
        100,
        30,
        750,
        40
      ]
    }
  });
}
