import React, { Component } from 'react'

export default class ProfileHeader extends Component {
  render() {
    const { profile } = this.props
    return (
      <div>
        <h1>Header</h1>
        <img src={profile.user.avatar} alt=""/>
        <h5>{profile.handle}</h5>
        <h5>{profile.status}</h5>
        <h5>{profile.location}</h5>
        <h5>{profile.social.twitter ? profile.social.twitter : 'none' }</h5>
        <h5>{profile.social.facebook ? profile.social.facebook : 'none' }</h5>
        <h5>{profile.social.instagram ? profile.social.instagram : 'none' }</h5>
        <h5>{profile.social.linkedin ? profile.social.linkedin : 'none' }</h5>
        <h5>{profile.social.youtube ? profile.social.youtube : 'none' }</h5>
      </div>
    )
  }
}
