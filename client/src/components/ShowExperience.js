import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteExperience } from '../actions/profileActions'

class ShowExperience extends Component {
  deleteExperience = id => {
    this.props.deleteExperience(id)
  }

  render() {
    const { profile } = this.props
    return (
      <div>
        <div>
          <h1>Experience:</h1>
          {profile.experience.map(item => {
            return (
              <div key={item._id}>
                <h5>Title: {item.title}</h5>
                <h5>Company: {item.company}</h5>
                <h5>Location: {item.location}</h5>
                <button onClick={() => this.deleteExperience(item._id)}>Delete Experience</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(null, { deleteExperience })(ShowExperience)