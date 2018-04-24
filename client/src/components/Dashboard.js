import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteProfile } from '../actions/profileActions'
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

    if (profile === null || loading === true) {
    
      dashboardContent = <h4>Loading...</h4>
    
    } else if (Object.keys(profile).length > 0) {
      
      dashboardContent = (
        <div>
          <p>Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
          <ProfileActions />
          <ShowEducation profile={profile}/>
          <ShowExperience profile={profile} />
          <button style={{marginTop: '100px'}} onClick={this.deleteAccount}>Delete account</button>
        </div>
      )
    
    } else {
      
      dashboardContent = (
        <div>
          <h5>You haven't created a profile yet</h5>
          <Link to="/create-profile">Create profile</Link>
          <button onClick={this.deleteAccount}>Delete account</button>          
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

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(Dashboard)