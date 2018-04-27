import React, { Component } from 'react'
import { loginUser } from '../../actions/index'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  
  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
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


  render() {
    const { errors } = this.props

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevSocial account
              </p>
              <form onSubmit={this.handleSubmit} className="form-group">
                <input 
                  className="form-control form-control-lg"
                  type="text" 
                  placeholder="email" 
                  name="email" 
                  value={this.state.email} 
                  onChange={this.handleChange} 
                />
                {errors.email ? <h5>{errors.email}</h5> : ''}
                
                <input
                  className="form-control form-control-lg mt-4"                   
                  type="text" 
                  placeholder="password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.handleChange} 
                />
                {errors.password ? <h5>{errors.password}</h5> : ''}
                
                <input 
                  type="submit" 
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

const mapStateToProps = ({ auth, errors }) => {
  return { auth, errors }
}

export default connect(mapStateToProps, { loginUser })(Login) 