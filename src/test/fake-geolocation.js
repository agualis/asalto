export const fakeCoordinates = { lat: -0.8862059, lng: 41.6525171 }

export function useFakeGeolocation({ Vue }) {
  Vue.prototype.$getLocation = () => Promise.resolve(fakeCoordinates)
}
