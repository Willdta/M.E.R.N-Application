import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileByHandle } from '../actions/profileActions'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCredentials from './ProfileCredentials'
import ProfileGithub from './ProfileGithub'

class Profile extends Component {
  componentDidMount = () => {
    const handle = this.props.match.params.handle
    
    if (handle) {
      this.props.getProfileByHandle(handle)
    }  
  }
  
  render() {
    const { profile, loading } = this.props.profile

    let profileContent

    if (profile === null || loading) {
      profileContent = <h1>Loading...</h1>
    } else {
      profileContent = (
        <div>
          <Link to="/profiles">Back to profiles</Link>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCredentials profile={profile} />
          {/* <ProfileGithub username={profile.githubusername} /> */}
          {profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}
        </div>
      )
    }

    return (
      <div>
        { profileContent }
      </div>
    )
  }
}

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { getProfileByHandle })(Profile)