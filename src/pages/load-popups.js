import Vue from 'vue'
import ArtPopup from './ArtPopup'

export function addPopUps(map, works, router) {
  Object.values(works).forEach(work => {
    console.log('work imageSrc ', work)
    const popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat(work.geometry.coordinates)
    .setHTML(`<div id="${work.id}"></div>`)
    .addTo(map)

    new Vue({
      router,
      render: h => h(
        ArtPopup, {
          props: { work, map, popup },
        })
    }).$mount(`#${work.id}`)
  })
}
