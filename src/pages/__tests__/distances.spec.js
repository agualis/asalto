import geolib from 'geolib'

describe('distance calculations', () => {
  it('calculates distance between two points', () => {
    const zaragozaCenter = [-0.8862059, 41.6525171]
    const alcanizCenter = [-0.1335373, 41.0510353]
    expect(getDistance(zaragozaCenter, alcanizCenter)).toBe(106814)
  })
})


function getDistance(point1, point2) {
 return geolib.getDistance(
    {latitude: point1[0], longitude: point1[1]},
    {latitude: point2[0], longitude: point2[1]}
  )
}
