const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLogin(data) {
  let errors = {}
  
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email format'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field required'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
