const zaragozaCenter = [-0.8862059, 41.6525171]

export const mapOptions = (center = zaragozaCenter) => ({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center,
  zoom: 14
})
