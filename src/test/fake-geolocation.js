
export function useFakeGeolocation({ Vue }) {
  const fakeCoordinates = { lat: -0.8862059, lng: 41.6525171 }
  Vue.prototype.$getLocation = () => Promise.resolve(fakeCoordinates)
}
