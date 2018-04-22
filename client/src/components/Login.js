import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../actions/index'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'

class Login extends Component {
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

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(user)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  } 

  render() {
    const { auth, errors } = this.props

    return (
      <div>
        <h1>Login</h1>
        <Link to="/">Back</Link>

        <div>
          <form action="" onSubmit={this.handleSubmit}>
            { errors.email ? <h5>{ errors.email }</h5> : '' }
            <input type="text" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} />
            {errors.password ? <h5>{errors.password}</h5> : ''}
            <input type="text" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
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

export default connect(mapStateToProps, { loginUser })(Login) 