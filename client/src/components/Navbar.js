import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/index'
import { clearCurrentProfile } from '../actions/profileActions'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  logout = e => {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated } = this.props.auth    

    const authenticated = (
      <div>
        <a 
          href="/" 
          onClick={this.logout}>
          Logout
        </a>
      </div>
    )

    const guest = (
      <div>
        <Link to="/register">
          Signup
        </Link>
        <Link to="/login">
          Log in
        </Link>
      </div>
    ) 

    return (
      isAuthenticated ? authenticated : guest 
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar)