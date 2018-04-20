import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Register extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <Link to="/">Back</Link>

        <div>
          <form action="" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange} />
            <input type="text" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} />
            <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
            <input type="text" placeholder="confirm password" name="password2" value={this.state.password2} onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
