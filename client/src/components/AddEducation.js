import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addEducation } from '../actions/profileActions'
import { Link } from 'react-router-dom'

class AddEducation extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      disabled: false
    }
  }
  
  addEducation = e => {
    e.preventDefault()

    const newEducation = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    }
    
    this.props.addEducation(newEducation, this.props.history)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }
  
  render() {
    const { errors } = this.props

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.addEducation}>
                <input
                  className="form-control form-control-lg"                               
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                />
                {errors ? errors.school : ''}
                
                <input
                  className="form-control form-control-lg mt-4"                               
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                />
                {errors ? errors.degree : ''}
                
                <input
                  className="form-control form-control-lg mt-4"                
                
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                />
                {errors ? errors.fieldofstudy : ''}
                
                <h6 className="mb-0 mt-4">From Date</h6>
                <input
                  className="form-control form-control-lg"                                
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                />
                {errors ? errors.from : ''}
                
                <h6 className="mb-0 mt-4">To Date</h6>
                <input
                  className="form-control form-control-lg"                               
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <textarea
                  className="form-control form-control-lg"                                
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ errors }) => {
  return { errors }
}

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))