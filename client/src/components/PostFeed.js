import React, { Component } from 'react'
import PostForm from './PostForm'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'

class PostFeed extends Component {
  componentDidMount = () => {
    this.props.fetchPosts()
  }
  
  renderPostFeed = () => {
    const { posts } = this.props.post
    const { user } = this.props.auth

    return posts.map(post => (
      <div className="comments">
        <div className="container">
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                <a href="profile.html">
                  <img className="rounded-circle d-none d-md-block" src={user.avatar} alt="" />
                </a>
                <br />
                <p className="text-center">{user.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">{post.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
        {this.renderPostFeed()}
      </div>
    )
  }
}

const mapStateToProps = ({ auth, post }) => {
  return { auth, post }
}

export default connect(mapStateToProps, { fetchPosts })(PostFeed)