import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfileByHandle } from '../actions/profileActions'

class Profile extends Component {
  componentDidMount = () => {
    const handle = this.props.match.params.handle
    
    if (handle) {
      this.props.getProfileByHandle(handle)
    }  
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { getProfileByHandle })(Profile)