import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost } from '../actions/postActions'
import PostContent from './PostContent'
import CommentForm from './CommentForm'
import { getCurrentProfile } from '../actions/profileActions'

class Post extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id

    if (id) {
      this.props.getPost(id)
    }

    // this.props.getCurrentProfile()
  }
  
  render() {
    const { post, loading } = this.props.post
    console.log(post)
    
    // const { profile } = this.props

    let postContent

    if (post === null || loading) {
      postContent = <h1>Loading...</h1>
    } 

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/post-feed" className="btn btn-light mb-3">Back to Posts</Link>
              <div className="card card-body mb-3">
                <div className="row">
                  <div className="col-md-2">
                    <Link to={`/profile`}>
                      <img className="rounded-circle d-none d-md-block" src={post.avatar}
                        alt="" />
                    </Link>
                    <br />
                    <p className="text-center">{post.name}</p>
                  </div>
                  <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                  </div>
                </div>
              </div>
              <CommentForm id={post._id} />
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

export default connect(mapStateToProps, { getPost })(Post)