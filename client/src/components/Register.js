import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { registerUser } from "../actions/index";

class Register extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.props

    return (
      <div>
        <h1>Register</h1>
        <Link to="/">Back</Link>

        <div>
          <form action="" onSubmit={this.handleSubmit}>
            { errors ? <h5>{errors.name}</h5> : '' }
            <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange} />
            { errors ? <h5>{errors.email}</h5> : null }            
            <input type="text" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} />
            { errors ? <h5>{errors.password}</h5> : null }                        
            <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
            { errors ? <h5>{errors.password2}</h5> : null }                        
            <input type="text" placeholder="confirm password" name="password2" value={this.state.password2} onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, errors }) => {
  return { auth, errors }
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
