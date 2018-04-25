import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../actions/profileActions'

class ShowEducation extends Component {
  deleteEducation = id => {
    this.props.deleteEducation(id)
  }

  renderEducation = () => {
    const { education } = this.props

    return education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            ' Now'
          ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
        </td>
        <td>
          <button
            onClick={() => this.deleteEducation(edu._id)}
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
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {this.renderEducation()}
          </thead>
        </table>
      </div>
    )
  }
}

export default connect(null, { deleteEducation })(ShowEducation)