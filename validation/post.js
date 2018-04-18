const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePost(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field required'
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Your mesage must be between 10 and 300 character'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
