const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true
  },

  email: {
    type: String,
    required: [true, 'where the email'],
    trim: true,
    validate: [isEmail]
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },

  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('User', UserSchema)