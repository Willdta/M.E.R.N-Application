import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
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
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
               
                <input
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  error={errors.name}
                />
                { errors ? <h5>{errors.name}</h5> : '' }

                <input
                  className="form-control form-control-lg mt-4"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                { errors ? <h5>{errors.email}</h5> : '' }

                <input
                  className="form-control form-control-lg mt-4"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  error={errors.password}
                />
                { errors ? <h5>{errors.password}</h5> : '' }

                <input
                  className="form-control form-control-lg mt-4"
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.handleChange}
                  error={errors.password2}
                />
                { errors ? <h5>{errors.password2}</h5> : '' }                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, errors }) => {
  return { auth, errors }
}

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
