const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

// Parse bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Passport
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// DB config
const db = require('./config/keys').mongoURI

// Connect to DB
mongoose
  .connect(db)
  .then(() => console.log('Connected to Mongo'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('hello')
})

// Our Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Port
const port = process.env.PORT || 5000

app.listen(5000, () => {
  console.log('App listening on port 5000!');
})