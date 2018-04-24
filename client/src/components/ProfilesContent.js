import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ProfilesContent extends Component {
  render() {
    const { profiles } = this.props

    return (
      <div>
        {profiles.map(item => {
          return (
            <div key={item._id}>
              <h5>{item.user.name}</h5>
              <img src={item.user.avatar} alt="" />
              <h5>{item.company ? item.company : 'none'}</h5>
              <Link to={`/profile/${item.handle}`}>Profile</Link>
            </div>
          )
        })}
      </div>
    )
  }
}