import Vue from 'vue'
import ArtPopup from './ArtPopup'

export function addPopUps(map, features) {
  Object.values(features).forEach(feature => {
    new mapboxgl.Popup({closeOnClick: false})
    .setLngLat(feature.geometry.coordinates)
    .setHTML(`<div id="${feature.id}"></div>`)
    .addTo(map)

    new Vue({
      render: h => h(
        ArtPopup, {
          props: { feature, map }
        })
    }).$mount(`#${feature.id}`)
  })
}
