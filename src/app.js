require('dotenv').config()
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
// veiw path 설정
// templates 로 views 폴더 이름을 바꿀 수 있다
// const viewsPath = path.join(__dirname, '../templates')
// app.set('views', viewsPath)
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

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
    title: 'About',
    name: 'Sang Jinsu',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: '도움 관련 안내문',
    name: 'Sang Jinsu',
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'forecast',
    location: 'Incheon',
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sang Jinsu',
    errorMessage: 'Help article not found',
  })
})

// express 는 위에서부터 아래로 매칭되는지 확인한다
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sang Jinsu',
    errorMessage: 'Page not found.',
  })
})

app.listen(port, () => {
  console.log('server is on http://localhost:%d', port)
})
