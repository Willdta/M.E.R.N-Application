import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component { 
  render() {
    const { user } = this.props.auth
    
    return (
      <div>
        <h1>Welcome { user.name }</h1>
        <img src={ user.avatar } alt=""/>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(Dashboard)