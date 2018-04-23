import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, CREATE_PROFILE } from './types'

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios.get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    })
}

// Create profile
export const createProfile = userData => dispatch => {
  axios.post('/api/profile', userData)
    .then(res => {
      dispatch({
        type: CREATE_PROFILE,
        payload: userData
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      })
    })
}

// Load profile
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Logout profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}