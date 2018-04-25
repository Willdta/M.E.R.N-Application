import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../actions/profileActions'

class ShowExperience extends Component {
  deleteExperience = id => {
    this.props.deleteExperience(id)
  }

  renderExperience = () => {
    const { experience } = this.props

    return experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
        </td>
        <td>
          <button
            onClick={() => this.deleteExperience(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  }

  render() {
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {this.renderExperience()}
          </thead>
        </table>
      </div>
    )
  }
}

export default connect(null, { deleteExperience })(ShowExperience)