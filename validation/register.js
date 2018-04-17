const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegistration (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'You must provide a value'
  }
  
  if (Validator.isEmpty(data.email)) {
    errors.email = 'You must provide a value'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email must be in format example@email.com'
  }
  
  if (Validator.isEmpty(data.password)) {
    errors.password = 'You must provide a value'
  }
  
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters'
  }
  
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'You must provide a value'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}