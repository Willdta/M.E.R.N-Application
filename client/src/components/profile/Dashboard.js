import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteProfile } from '../../actions/profileActions'
import ProfileActions from './ProfileActions'
import ShowEducation from './ShowEducation'
import ShowExperience from './ShowExperience'

class Dashboard extends Component { 
  componentDidMount = () => {
    this.props.getCurrentProfile()
  }

  deleteAccount = () => {
    this.props.deleteProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if (profile === null || loading) {
    
      dashboardContent = <h4>Loading...</h4>
    
    } else if (Object.keys(profile).length > 0) {
      
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <ShowExperience experience={profile.experience} />
          <ShowEducation education={profile.education} />
          <div style={{ marginBottom: '60px' }} />
          <button
            onClick={this.deleteAccount}
            className="btn btn-danger"
          >
            Delete My Account
          </button>
        </div>
      )
    
    } else {
      
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      )
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile }
}

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(Dashboard)