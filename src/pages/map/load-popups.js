import Vue from 'vue'
import WorkPopup from './WorkPopup'

export function addPopUps(map, works, router) {
  Object.values(works).forEach(work => {
    const popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat(work.geometry.coordinates)
    .setHTML(`<div id="${work.uid}"></div>`)
    .addTo(map)

    new Vue({
      router,
      render: h => h(
        WorkPopup, {
          props: { work, map, popup },
        })
    }).$mount(`#${work.uid}`)
  })
}
