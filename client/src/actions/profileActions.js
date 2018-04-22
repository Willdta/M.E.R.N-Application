import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, GET_ERORRS, CLEAR_CURRENT_PROFILE } from './types'

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