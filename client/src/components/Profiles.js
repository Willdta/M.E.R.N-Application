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

    if (profiles === null || loading) {
      renderProfiles =  <h5>Loading..</h5>
    } else if (profiles.length > 0) {
      renderProfiles = <ProfilesContent profiles={profiles} />
    } else {
      renderProfiles = <h1>No profiles found</h1>
    }
    
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {renderProfiles}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps, { getProfiles })(Profiles)