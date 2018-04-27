import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addExperience } from '../../actions/profileActions'
import { Link } from 'react-router-dom'

class AddExperience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      disabled: false
    }
  }

  addExperience = e => {
    e.preventDefault()

    const newExperience = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    }

    this.props.addExperience(newExperience, this.props.history)
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
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.addExperience}>
                <input
                  className="form-control form-control-lg"                  
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  />
                  { errors ? errors.company : '' }

                <input
                  className="form-control form-control-lg mt-4"                
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  />
                  { errors ? errors.title : '' }                
               
                <input
                  className="form-control form-control-lg mt-4"                
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
                
                <h6 className="mb-0 mt-4">From Date</h6>
                <input
                  className="form-control form-control-lg" 
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                />
                { errors ? errors.from : '' }
                
                <h6 className="mb-0 mt-4">To Date</h6>                
                <input
                  className="form-control form-control-lg"           
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check">
                  <input
                    className="mt-4 form-check-input"           
                    type="checkbox"
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
                  className="form-control form-control-lg mt-4"                
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  info="Tell us about the the position"
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

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience))