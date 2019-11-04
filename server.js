const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const routes = require('./routes/router')

app.set("view engine", "ejs")
app.set('views', './public');
app.use(express.static('public'));
app.use('/css', express.static('css'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/storesdb', { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('Connected to MongoDB'))
     .catch((err) => console.error('Could not connect to MongoDB..', err))


app.get('/', routes.login)
app.post('/auth', routes.auth)
app.get('/home', routes.home)
app.post('/newItem', routes.newItem)
app.get('/loadStore', routes.loadStore)
app.get('/sendData', routes.sendData)


const port = process.env.PORT || 3000
app.listen(port, () => {
     console.log(`Server is listening on Port ${port}`)
})


