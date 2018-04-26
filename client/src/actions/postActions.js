import { GET_POSTS, GET_POST } from './types'
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