import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={ Landing } />
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
        </div>
      </Router>
    )
  }
}

export default App