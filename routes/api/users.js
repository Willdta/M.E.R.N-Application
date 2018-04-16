const express = require('express')
const mongoose = require('mongoose')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const router = express.Router()

const User = require('../../models/User')

// @route GET /api/users/test
// @desc tests users route
// @access Public

router.get('/test', (req, res) => res.json({ message: 'Users Works' }))

// User Registration Route
router.post('/register', (req, res) => {
  User
  .findOne({ email: req.body.email })
  .then(user => {
    
    if (user) {
      res.status(400).json({ email: 'email exists' })
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
  const email = req.body.email
  const password = req.body.password

  User
    .findOne({ email })
    .then(user => {
      
      // Check for user
      if (!user) {
        res.status(404).send({ email:'Invalid email' })
      }

      // Check password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          
          if (isMatch) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar }

            // Assign token to user
            jwt.sign(payload, keys.jwtKey, { expiresIn: 3600 }, (err, token) => {
              res.json({ 
                success: true,
                token: `Bearer ${token}`
              })
            })

          } else {
            res.status(400).json({ password: 'Invalid Password' })
          }
        })
    })
})

module.exports = router