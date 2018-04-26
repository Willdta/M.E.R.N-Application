import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost } from '../actions/postActions'

class Post extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id

    if (id) {
      this.props.getPost(id)
    }
  }
  
  render() {
    const { post } = this.props.post
    return (
      <div>
        <h5>{post.data}</h5>
        <h5>{post.text}</h5>
        <h5>{post.name}</h5>
      </div>
    )
  }
}

const mapStateToProps = ({ post }) => {
  return { post }  
}

export default connect(mapStateToProps, { getPost })(Post)