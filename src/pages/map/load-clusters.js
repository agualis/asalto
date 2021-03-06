const ARTWORKS_SOURCE = 'artworks'
export const CLUSTER_MAX_ZOOM = 15

export function loadClusters(map, works) {

  addGeoJsonArtWorksSource()
  addLayerForClusterCircles()
  addLayerForClusterCount()
  addLayerForUnclusteredPoints()
  map.on('click', 'clusters', onClusterClick)


  function addGeoJsonArtWorksSource() {
    map.addSource(ARTWORKS_SOURCE, {
      type: "geojson",
      data: buildClusterData(works),
      cluster: true,
      clusterMaxZoom: CLUSTER_MAX_ZOOM, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    })
  }

  function addLayerForClusterCircles() {
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: ARTWORKS_SOURCE,
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
    })
  }

  function addLayerForClusterCount() {
    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: ARTWORKS_SOURCE,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 14
      }
    })
  }

  function addLayerForUnclusteredPoints() {
    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: ARTWORKS_SOURCE,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#ff2b9e",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    })
  }

  function onClusterClick(e) {
    let works = map.queryRenderedFeatures(e.point, {layers: ['clusters']})
    let clusterId = works[0].properties.cluster_id
    map.getSource(ARTWORKS_SOURCE).getClusterExpansionZoom(clusterId, function (err, zoom) {
      if (err)
        return
      map.easeTo({
        center: works[0].geometry.coordinates,
        zoom: zoom
      })
    })
  }
}


export const buildClusterData = works => (
  {
    "type": "FeatureCollection",
    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
    "features": works
  }
)
