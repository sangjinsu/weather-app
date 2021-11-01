require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const port = 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')

app.set('view engine', 'hbs')
// veiw path 설정
// templates 로 views 폴더 이름을 바꿀 수 있다
// const viewsPath = path.join(__dirname, '../templates')
// app.set('views', viewsPath)
app.set('views', viewsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Sang Jinsu',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App',
    name: 'Sang Jinsu',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: '도움 관련 안내문',
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'forecast',
    location: 'Incheon',
  })
})

app.listen(port, () => {
  console.log('server is on http://localhost:%d', port)
})
