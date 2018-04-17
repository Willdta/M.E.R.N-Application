const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateProfile = require('../../validation/profile')

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route GET /api/profile/test
// @desc tests profile route
// @access Public

router.get('/test', (req, res) => res.json({ message: 'Profile Works' }))

// Get current user profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {}

  Profile
    .findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'Invalid profile'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// Get specific user's profile by handle
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  
  Profile
    .findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No Such profile exists'
        res.status(404).json(errors)
      }
      
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// Get specific user's profile by id
router.get('/user/:user_id', (req, res) => {
  const errors = {}
  
  Profile
    .findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No Such profile exists'
        res.status(404).json(errors)
      }
      
      res.json(profile)
    })
    .catch(err => res.status(404).json({ err: 'No such profile exits' }))
})

router.get('/all', (req, res) => {
  Profile
    .find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => res.json(profiles))
    .catch(err => res.json({ err: 'something happened' }))
})

// Create / Edit user profile
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfile(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.status) profileFields.status = req.body.status
  if (req.body.githubUser) profileFields.githubUser = req.body.githubUser
  
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',')
  }
  
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram

  // Update profile
  Profile
    .findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        Profile
          .findOneAndUpdate(
            { user: req.user.id},
            { $set: profileFields },
            { new: true}
          )
          .then(profile => res.json(profile))
      } else {
    
        // Find profile by handle
        Profile
          .findOne({ handle: profileFields.handle})
          .then(profile => {
            if (profile) {
              res.status(400).json({ message: 'This handle is taken' })
            }
    
            // Create profile for that user
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile))
          })
      }
    })
})

module.exports = router