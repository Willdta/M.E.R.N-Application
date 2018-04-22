import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../actions/profileActions'

class Dashboard extends Component { 
  componentDidMount = () => {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth

    return (
      <div>
        <h1>Welcome { user.name }</h1>
        <img src={ user.avatar } alt="" />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => {
  return { auth, profile }
}

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)