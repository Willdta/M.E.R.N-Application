import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../actions/profileActions'

class Dashboard extends Component { 
  componentDidMount = () => {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if (profile === null || loading === true) {
      dashboardContent = <h4>Loading...</h4>
    } else if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <h1>Welcome { user.name }</h1>
          <img src={ user.avatar } alt="" />
        </div>
      )
    } else {
      dashboardContent = (
        <div>
          <h5>You haven't created a profile yet</h5>
          <Link to="/create-profile">Create profile</Link>
        </div>
      )
    }

    return (
      <div>
        { dashboardContent }
      </div>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile }
}

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)