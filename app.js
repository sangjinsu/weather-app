const axios = require('axios').default
require('dotenv').config()

async function fetchWeather(latitude, longitude) {
  try {
    const weatherUrl = 'http://api.weatherstack.com/current'
    const weatherParams = {
      access_key: process.env.ACCESS_KEY,
      query: `${latitude},${longitude}`,
    }
    const { data } = await axios.get(weatherUrl, { params: weatherParams })

    if (data.error.code === 615) {
      throw new Error(data.error.info)
    } else if (data.error) {
      throw new Error(data.error.info)
    }

    const temperature = data.current.temperature
    const humidity = data.current.humidity
    const description = data.current.weather_descriptions[0].toLowerCase()

    console.log(
      `It is currently ${description} and ${temperature} degrees, ${humidity}% humidity `
    )
  } catch (err) {
    console.error(err.message)
  }
}

async function fetchLocation(searchText) {
  try {
    const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}?`
    const loactionParams = {
      access_token: process.env.ACCESS_TOKEN,
    }
    const { data } = await axios.get(locationUrl, { params: loactionParams })
    if (data.features.length === 0) {
      throw new Error('Unable to find location. Try another search')
    }

    const latitude = data.features[0].center[1]
    const longitude = data.features[0].center[0]

    console.log(latitude, longitude)
  } catch (err) {
    if (err.response.status === 404) {
      console.error(err.message)
      console.error('Unable to connect to weatehr service')
    } else {
      console.error(err.message)
    }
  }
}
