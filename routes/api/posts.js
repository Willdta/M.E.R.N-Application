const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const router = express.Router()

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// Validation
const validatePost = require('../../validation/post')

// @route GET /api/posts/test
// @desc tests posts route
// @access Public

router.get('/test', (req, res) => res.json({ message: 'Posts Works' }))

// Get all posts
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
  })

  router.get('/:post_id', (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => res.json(post))
      .catch(err => res.json({ error: 'No such post found' }))
  })

// Create new post
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePost(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  })

  newPost
    .save()
    .then(post => res.json(post)
    .catch(err => res.json(err)))
})

// Delete post
router.delete('/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'You can\'t delete someone elses posts'})
          } 

          post.remove().then(() => res.json({ message: 'Post sucessfully deleted' }))
        })
        .catch(err => res.json(err))
    })
})

module.exports = router