const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

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

// Port
const port = process.env.PORT || 5000

app.listen(5000, () => {
  console.log('App listening on port 5000!');
})