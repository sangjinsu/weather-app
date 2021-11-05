const axios = require('axios').default
const fetchLocation = require('./fetchLocation')

module.exports = async function fetchWeather(searchText) {
  try {
    const { latitude, longitude, placeName } = await fetchLocation(searchText)

    const weatherUrl = 'http://api.weatherstack.com/current'
    const weatherParams = {
      access_key: process.env.ACCESS_KEY,
      query: `${latitude},${longitude}`,
    }

    const { data } = await axios.get(weatherUrl, { params: weatherParams })

    if (data.error?.code === 615) {
      throw new Error(data.error.info)
    } else if (data.error) {
      throw new Error(data.error.info)
    }

    const temperature = data.current.temperature
    const humidity = data.current.humidity
    const description = data.current.weather_descriptions[0].toLowerCase()

    return `${placeName} is currently ${description} and ${temperature} degrees, ${humidity}% humidity.`
  } catch (err) {
    console.error(err.message)
    console.log(err.stack)
  }
}
