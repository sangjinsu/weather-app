const form = document.querySelector('#searchForm')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const address = document.querySelector('#searchInput').value

  if (address.length === 0) {
    return
  }

  const {
    data: { forecast },
  } = await axios
    .post('http://localhost:3000/weather/', {
      address,
    })
    .catch((err) => {
      console.err(err)
    })
  const forecastSentence = document.querySelector('#forecast')
  console.log(forecast)
  forecastSentence.innerText = forecast
})
