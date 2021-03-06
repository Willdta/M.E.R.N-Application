const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const router = express.Router()

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// Validation
const validatePost = require('../../validation/post')

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
            return res.status(401).json({ message: 'You can\'t delete someone elses posts' })
          } 

          post.remove().then(() => res.json({ message: 'Post sucessfully deleted' }))
        })
        .catch(err => res.json(err))
    })
})

// Like post
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile
    .findOne({ user: req.user.id })
    .then(() => {
      Post
        .findById(req.params.post_id)
        .then(post => {

          // Check if user already liked a post
          const likeCheck = post.likes.filter(like => like.user.toString() === req.user.id).length > 0
          
          if (likeCheck) {
            return res.status(400).json({ message: 'You can\'t like your post more than once' })
          }
          
          post.likes.unshift({ user: req.user.id })
          post.save().then(post => res.json(post))
        })
        .catch(err => res.json({ err }))    
    })
})

// Unlike post
router.post('/unlike/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile
    .findOne({ user: req.user.id })
    .then(() => {
      Post
        .findById(req.params.post_id)
        .then(post => {

          // Check if logged in user hasn't already liked the post
          const likeCheck = post.likes.filter(like => like.user.toString() === req.user.id).length === 0
          
          if (likeCheck) {
            return res.status(400).json({ message: 'You haven\'t liked this post yet' })
          }

          post.likes.splice(req.user.id, 1)
          post.save().then(post => res.json(post))
        })  
        .catch(err => res.json(err))
    })
})

// Add comment
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePost(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  
  Profile
    .findOne({ user: req.user.id })
    .then(() => {
      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            user: req.user.id,
            name: req.body.name,
            text: req.body.text,
            avatar: req.body.avatar
          }

          post.comments.unshift(newComment)
          post.save().then(comment => res.json(comment))
        })
    })
    .catch(err => res.json(err))
})

// Delete comment
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ id: req.user.id})
    .then(() => {
      Post
        .findById(req.params.id)
        .then(post => {
          const commentCheck = post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0
    
          if (commentCheck) {
            return res.status(404).json({ notFound: 'Comment not found' })
          }
    
          post.comments.remove({ _id: req.params.comment_id})
          post.save()
            .then(comment => res.json(comment))
        })
    })
    .catch(err => res.json(err))
})

module.exports = router