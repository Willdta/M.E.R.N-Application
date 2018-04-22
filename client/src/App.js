import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/index'
import { Provider } from 'react-redux'
import store from './store'

import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'

import './App.css'


// Saves token for user in case of page refresh
if (localStorage.jwtToken) {
  
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  
  // Decode token to get user info
  const decoded = jwt_decode(localStorage.jwtToken)

  // Set user and isAuth to true
  store.dispatch(setCurrentUser(decoded))
  
  // Delete token and logout user on expiration
  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {

    // Logout user
    store.dispatch(logoutUser())

    // Redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Register } />
            <Route path="/dashboard" component={ Dashboard } />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App