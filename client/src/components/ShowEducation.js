import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteEducation } from '../actions/profileActions'

class ShowEducation extends Component {
  deleteEducation = id => {
    this.props.deleteEducation(id)
  }

  render() {
    const { profile } = this.props
    return (
      <div>
        <div>
          <h1>Education:</h1>
          {profile.education.map(item => {
            return (
              <div key={item._id}>
                <h5>School: {item.school}</h5>
                <h5>Degree: {item.degree}</h5>
                <h5>Field of Study: {item.fieldofstudy}</h5>
                <button onClick={() => this.deleteEducation(item._id)}>Delete Education</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(null, { deleteEducation })(ShowEducation)