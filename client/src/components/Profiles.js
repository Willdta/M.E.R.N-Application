import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfiles } from '../actions/profileActions' 
import ProfilesContent from './ProfilesContent'

class Profiles extends Component {
  componentDidMount = () => {
    this.props.getProfiles()
  }
  
  render() {
    const { profiles, loading } = this.props.profile

    let renderProfiles

    if (profiles === null || loading === true) {
      renderProfiles =  <h5>Loading..</h5>
    } else if (profiles.length > 0) {
      renderProfiles = (
        <div>
          <h1>Profiles</h1>
          <ProfilesContent profiles={profiles} />
        </div>
      )
    } else {
      renderProfiles = <h1>No profiles found</h1>
    }
    
    return (
      <div>
        {renderProfiles}
      </div>
    )
  }
}

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { getProfiles })(Profiles)