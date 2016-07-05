import R from 'ramda'

export const removeEmpty = (markers) => {
  let filteredMarkers = R.filter((item) => {
    return item.latitude && item.longitude
  }, markers)
  return filteredMarkers
}

export const calculateRegion = (locations, options) => {
  const latPadding = options && options.latPadding ? options.latPadding : 0.1
  const longPadding = options && options.longPadding ? options.longPadding : 0.1
  const mapLocations = removeEmpty(locations)
  // Only do calculations if there are locations
  if (mapLocations.length > 0) {
    let allLatitudes = R.map((l) => {
      if (l.latitude && !l.latitude.isNaN) return l.latitude
    }, mapLocations)

    let allLongitudes = R.map((l) => {
      if (l.longitude && !l.longitude.isNaN) return l.longitude
    }, mapLocations)

    let minLat = R.reduce(R.min, Infinity, allLatitudes)
    let maxLat = R.reduce(R.max, -Infinity, allLatitudes)
    let minLong = R.reduce(R.min, Infinity, allLongitudes)
    let maxLong = R.reduce(R.max, -Infinity, allLongitudes)

    let middleLat = (minLat + maxLat) / 2
    let middleLong = (minLong + maxLong) / 2
    let latDelta = (maxLat - minLat) + latPadding
    let longDelta = (maxLong - minLong) + longPadding

    // return markers
    return {
      latitude: middleLat,
      longitude: middleLong,
      latitudeDelta: latDelta,
      longitudeDelta: longDelta
    }
  }
}
