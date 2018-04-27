import axios from 'axios'
import { GET_ERRORS, GET_POSTS, GET_POST, ADD_POST, DELETE_POST, POST_LOADING } from './types'

export const fetchPosts = () => dispatch => {
  dispatch(postLoading())
  
  axios.get('/api/posts')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    })
}

export const getPost = id => dispatch => {
  dispatch(postLoading())
  
  axios.get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      })
    })
}

export const addPost = (post) => dispatch => {
  axios.post('/api/posts', post)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const deletePost = id => dispatch => {
  axios.delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
}

export const likePost = id => dispatch => {
  axios.post(`/api/posts/like/${id}`)
    .then(res => {
      dispatch(fetchPosts())
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const unlikePost = id => dispatch => {
  axios.post(`/api/posts/unlike/${id}`)
    .then(res => {
      dispatch(fetchPosts())
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const addComment = (id, comment) => dispatch => {
  axios.post(`/api/posts/comment/${id}`, comment)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const postLoading = () => {
  return {
    type: POST_LOADING
  }
}