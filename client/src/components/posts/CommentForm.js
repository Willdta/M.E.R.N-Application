import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../actions/postActions'

class CommentForm extends Component {
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

  addComment = e => {
    e.preventDefault()

    const { user } = this.props.auth
    const { id } = this.props

    const newComment = {
      name: user.name,
      text: this.state.text,
      avatar: user.avatar
    }

    this.props.addComment(id, newComment)

    if (this.state.text.length > 10) {
      this.setState({ text: '' })
    }
  }

  render() {
    const { errors } = this.props

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Add a comment
          </div>
          <div className="card-body">
            <form onSubmit={this.addComment}>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Reply"
                  value={this.state.text}
                  onChange={this.handleChange}
                  name="text"
                />
                {errors ? errors.text : null}
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, errors }) => {
  return { auth, errors }
}

export default connect(mapStateToProps, { addComment })(CommentForm)