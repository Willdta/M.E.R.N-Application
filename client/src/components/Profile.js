import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileByHandle } from '../actions/profileActions'
import ProfileHeader from './ProfileHeader'

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