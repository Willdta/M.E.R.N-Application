import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/index'
import { clearCurrentProfile } from './actions/profileActions'
import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './common/PrivateRoute'

import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import CreateProfile from './components/CreateProfile'
import EditProfile from './components/EditProfile'
import AddEducation from './components/AddEducation'
import AddExperience from './components/AddExperience'
import Profiles from './components/Profiles'
import Profile from './components/Profile'

import './App.css'

// Saves token for user in case of page refresh
if (localStorage.jwtToken) {
  
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  
  // Decode token to get user info
  const decoded = jwt_decode(localStorage.jwtToken)

  // Set user and isAuth to true
  store.dispatch(setCurrentUser(decoded))
  
  const currentTime = Date.now() / 1000
  
  // Delete token and logout user on expiration
  if (decoded.exp < currentTime) {

    // Logout user
    store.dispatch(logoutUser())

    // Clear profile
    store.dispatch(clearCurrentProfile())

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
            <Switch>
              <PrivateRoute path="/dashboard" component={ Dashboard } />
            </Switch>
            <Switch>
              <PrivateRoute path="/create-profile" component={ CreateProfile } />
            </Switch>
            <Switch>
              <PrivateRoute path="/edit-profile" component={ EditProfile } />
            </Switch>
            <Switch>
              <PrivateRoute path="/add-education" component={ AddEducation } />
            </Switch>
            <Switch>
              <PrivateRoute path="/add-experience" component={ AddExperience } />
            </Switch>
            <Route path="/profiles" component={ Profiles } />
            <Route path="/profile/:handle" component={ Profile } />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App