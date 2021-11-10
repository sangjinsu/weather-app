const form = document.querySelector('#searchForm')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const address = document.querySelector('#searchInput').value.trim()
  const forecastSentence = document.querySelector('#forecast')

  if (address.length === 0) {
    forecastSentence.innerText = 'Need an Address'
    return
  }

  try {
    const {
      data: { forecast },
    } = await axios.post('/weather', {
      address,
    })

    forecastSentence.innerText = forecast
  } catch (error) {
    forecastSentence.innerText =
      error.response.data ?? error.response.statusText ?? error.response.message
  }
})
