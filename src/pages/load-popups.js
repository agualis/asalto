import Vue from 'vue'
import ArtPopup from './ArtPopup'

export function addPopUps(map, features) {
  features.forEach(feature => {
      let popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat(feature.geometry.coordinates)
    .setHTML(`<div id="${feature.id}"></div>`)
    .addTo(map);

    new Vue({
      render: h => h(
        ArtPopup,
        {
          props: {
            feature: feature
          }
        })
    }).$mount(`#${feature.id}`)
  })
}
