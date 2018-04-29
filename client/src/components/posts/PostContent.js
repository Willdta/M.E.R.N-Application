import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { deletePost, likePost, unlikePost } from '../../actions/postActions'
import { connect } from 'react-redux'

class PostContent extends Component {
  deletePost = id => {
    this.props.deletePost(id)
  }

  likePost = id => {
    this.props.likePost(id)
  }

  unlikePost = id => {
    this.props.unlikePost(id)
  }

  render() {
    const { posts, auth } = this.props
    
    return (
      posts.map(post => (
        <div key={post._id} className="posts">
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
                <br />
                <p className="text-center">{post.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">{post.text}</p>
                <button 
                  onClick={() => this.likePost(post._id)} 
                  type="button" 
                  className="btn btn-light mr-1">
                  <i className="text-info fas fa-thumbs-up"></i>
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button 
                  onClick={() => this.unlikePost(post._id)}
                  type="button" 
                  className="btn btn-light mr-1">
                  <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>

                {post.user === auth.user.id ? <button onClick={() => this.deletePost(post._id)} type="button" className="btn btn-danger mr-1">
                  <i className="fas fa-times" />
                </button> : null}
              </div>
            </div>
          </div>
        </div>
      ))
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(PostContent)