require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../public')))

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'forecast',
    location: 'Incheon',
  })
})

app.listen(port, () => {
  console.log('server is on http://localhost:%d', port)
})
