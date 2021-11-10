const axios = require('axios').default
const fetchLocation = require('./fetchLocation')

module.exports = async function fetchWeather(searchText) {
  const { latitude, longitude, placeName } = await fetchLocation(searchText)

  const weatherUrl = 'http://api.weatherstack.com/current'
  const weatherParams = {
    access_key: process.env.ACCESS_KEY,
    query: `${latitude},${longitude}`,
  }

  try {
    const { data } = await axios.get(weatherUrl, { params: weatherParams })

    const temperature = data.current.temperature
    const humidity = data.current.humidity
    const description = data.current.weather_descriptions[0].toLowerCase()

    return `${placeName} is currently ${description} and ${temperature} degrees, ${humidity}% humidity.`
  } catch (error) {
    throw error
  }
}
