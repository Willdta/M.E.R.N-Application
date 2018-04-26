import { GET_ERRORS, GET_POSTS, GET_POST, ADD_POST } from './types'
import axios from 'axios'

export const fetchPosts = () => dispatch => {
  axios.get('/api/posts')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    })
}

export const getPost = id => dispatch => {
  axios.get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
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