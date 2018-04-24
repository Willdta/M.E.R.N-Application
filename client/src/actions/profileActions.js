import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER } from './types'

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
export const createProfile = (userData, history) => dispatch => {
  axios.post('/api/profile', userData)
    .then(() => {
      history.push('/dashboard')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete profile
export const deleteProfile = (userData, history) => dispatch => {
  if (window.confirm('Are you sure you want to delete your account?')) {
    axios.delete('/api/profile')  
      .then(() => {     
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
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

// Add education
export const addEducation = (userData, history) => dispatch => {
  axios.post('/api/profile/education', userData)
    .then(() => history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}