import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPosts, getPost } from '../actions/postActions'

class PostFeed extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    const { posts } = this.props.post
    
    return (
      <div>
        {posts.map(post => (
          <div>
            <h6>Name: {post.name}</h6>
            <h6>Comment: {post.text}</h6>
            <h6>Date: {post.date}</h6>
            <Link to={`/post/${post._id}`}>Comments</Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ post }) => {
  return { post }
}

export default connect(mapStateToProps, { fetchPosts })(PostFeed)