import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment } from '../actions/postActions'
import { withRouter } from 'react-router-dom'

class CommentFeed extends Component {
  deleteComment = commentId => {
    const { id } = this.props
    
    this.props.deleteComment(id, commentId, this.props.history)
  }

  componentDidUpdate() {
    console.log(this.props.comments);
  }
  
  render() {
    const { auth, comments } = this.props

    return (
      comments.map(comment => (
        <div key={comment._id} className="posts">
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                <a href="profile.html">
                  <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                </a>
                <br />
                <p className="text-center">{comment.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">{comment.text}</p>
                {comment.user === auth.user.id ? <button onClick={() => this.deleteComment(comment._id)} type="button" className="btn btn-danger mr-1">
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

export default connect(mapStateToProps, { deleteComment })(withRouter(CommentFeed))