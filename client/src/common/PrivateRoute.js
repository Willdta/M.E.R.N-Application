import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route 
    {...rest} 
    render={props => 
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(PrivateRoute)