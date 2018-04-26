import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions/postActions'

class PostForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      text: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addPost = e => {
    e.preventDefault()

    const { user } = this.props.auth

    const newPost = {
      name: user.name,
      text: this.state.text,
      avatar: user.avatar
    }

    this.props.addPost(newPost)
  }

  render() {
    const { errors } = this.props

    return (
      <div class="post-form mb-3">
        <div class="card card-info">
          <div class="card-header bg-info text-white">
            Say Something...
          </div>
          <div class="card-body">
            <form onSubmit={this.addPost}>
              <div class="form-group">
                <textarea 
                  class="form-control form-control-lg" 
                  placeholder="Create a post" 
                  value={this.state.text}
                  onChange={this.handleChange}
                  name="text"  
                />
                {errors ? errors.text : null}
              </div>
              <button type="submit" class="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, post, errors }) => {
  return { auth, post, errors }
}

export default connect(mapStateToProps, { addPost })(PostForm)