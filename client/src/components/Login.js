import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
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
        <h1>Login</h1>
        <Link to="/">Back</Link>

        <div>
          <form action="" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} />
            <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

