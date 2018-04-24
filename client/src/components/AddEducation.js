import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addEducation } from '../actions/profileActions'

class AddEducation extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      description: ''
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
      description: this.state.description,
    }
    
    this.props.addEducation(newEducation, this.props.history)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h1>Add Education</h1>
        <form>
          <input 
            type="text"
            name="school"
            value={this.state.school}
            placeholder="school"
            onChange={this.onChange}
          />        
          <input 
            type="text"
            name="degree"
            value={this.state.degree}
            placeholder="degree"
            onChange={this.onChange}
          />        
          <input 
            type="text"
            name="fieldofstudy"
            value={this.state.fieldofstudy}
            placeholder="fieldofstudy"
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
          {/* <input 
            type="text"
            name="current"
            value={this.state.current}
            placeholder="current"
            onChange={this.onChange}
          />         */}
          <input 
            type="text"
            name="description"
            value={this.state.description}
            placeholder="description"
            onChange={this.onChange}
          />
          <button onClick={this.addEducation}>Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { addEducation })(withRouter(AddEducation))