export function useFakeGeolocation(wrapper, fakeCoordinates) {
  wrapper.vm.$getLocation = () => Promise.resolve(fakeCoordinates)
}
