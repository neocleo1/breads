//DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')

//CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
const mongoose = require('mongoose')

//MONGOOSE
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to mongo: ', process.env.MONGO_URI)
  }
)

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})

//Breads
const breadsController = require('./controllers/breads_controllers.js')
app.use('/breads', breadsController)

// bakers
const bakersController = require('./controllers/bakers_controllers.js')
app.use('/bakers', bakersController)

//LISTEN
app.listen(PORT, () => {
  console.log('baking at', PORT, 'degrees')
})

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})
