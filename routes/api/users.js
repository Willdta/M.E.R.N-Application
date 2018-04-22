const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const keys = require('../../config/keys')

// Validation for registration
const validateRegistration = require('../../validation/register')
const validateLogin = require('../../validation/login')

const User = require('../../models/User')

// User Registration Route
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegistration(req.body)

  if (!isValid) {
    return res.status(400).json({errors})
  }
  
  User
    .findOne({ email: req.body.email })
    .then(user => {
    
      if (user) {
        errors.email = 'Email already exits' 
        return res.status(400).json(errors)
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '100',
          r: 'pg',
          d: 'mm'
        })

        // Create new User instance 
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        })

        // Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err

            newUser.password = hash

            // Save to DB
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => res.json({ error: err }))
          })
        })  
      }
  })
})

// Login Route with token
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body)

  if (!isValid) {
    return res.status(400).json({ errors })
  }

  const email = req.body.email
  const password = req.body.password

  User
    .findOne({ email })
    .then(user => {
      
      // Check for user
      if (!user) {
        res.status(404).send({ email: 'Invalid email' })
      }

      // Check password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          
          if (isMatch) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar }

            // Assign token to user
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 100000 }, (err, token) => {
              res.json({ 
                success: true,
                token: `Bearer ${token}`
              })
              console.log(token)
            })

          } else {
            res.status(400).json({ password: 'Invalid Password' })
          }
        })
    })
})

module.exports = router