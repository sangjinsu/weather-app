const axios = require('axios').default

module.exports = async function fetchLocation(searchText) {
  const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    searchText
  )}.json?`

  const loactionParams = {
    access_token: process.env.ACCESS_TOKEN,
  }

  try {
    const { data } = await axios.get(locationUrl, { params: loactionParams })
    if (data.features.length === 0) {
      throw new Error('Unable to find location. Try another search')
    }
    const latitude = data.features[0].center[1]
    const longitude = data.features[0].center[0]
    const placeName = data.features[0].place_name

    return { latitude, longitude, placeName }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Unable to connect to weather service')
    }
    throw error
  }
}
