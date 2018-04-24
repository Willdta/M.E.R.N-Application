import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addExperience } from '../actions/profileActions'

class AddExperience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      description: ''
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
      description: this.state.description,
    }

    this.props.addExperience(newExperience, this.props.history)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Add Experience</h1>
        <form>
          <input
            type="text"
            name="title"
            value={this.state.title}
            placeholder="title"
            onChange={this.onChange}
          />
          <input
            type="text"
            name="company"
            value={this.state.company}
            placeholder="company"
            onChange={this.onChange}
          />
          <input
            type="text"
            name="location"
            value={this.state.location}
            placeholder="location"
            onChange={this.onChange}
          />
          <input
            type="text"
            name="from"
            value={this.state.from}
            placeholder="from"
            onChange={this.onChange}
          />
          <input
            type="text"
            name="to"
            value={this.state.to}
            placeholder="to"
            onChange={this.onChange}
          />
          <input
            type="text"
            name="description"
            value={this.state.description}
            placeholder="description"
            onChange={this.onChange}
          />
          <button onClick={this.addExperience}>Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { addExperience })(withRouter(AddExperience))