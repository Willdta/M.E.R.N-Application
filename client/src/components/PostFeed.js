import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'
import PostForm from './PostForm'
import PostContent from './PostContent'

class PostFeed extends Component {
  componentDidMount = () => {
    this.props.fetchPosts()
  }

  render() {
    const { posts, loading } = this.props.post

    let postContent

    if (posts === null || loading) {
      postContent = <h1>Loading...</h1>
    } else {
      postContent = <PostContent posts={posts} />
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ post }) => {
  return { post }
}

export default connect(mapStateToProps, { fetchPosts })(PostFeed)