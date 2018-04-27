import React, { Component } from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import formOptions from '../../common/formOptions'
import isEmpty from '../../validation/is-empty'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'


class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displaySocialInputs: false,
      handle: '',
      status: '',
      company: '',
      website: '',
      location: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }
  }

  componentDidMount = () => {
    this.props.getCurrentProfile()
  }
  
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile

      const skillsCSV = profile.skills.join(',')

      // Check for empty values
      profile.company = !isEmpty(profile.company) ? profile.company : ''
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''

      // Set component state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderOptions = () => {
    return _.map(formOptions, ({ value, label }) => {
      return (
        <option key={value} value={value}>{label}</option>
      )
    })
  }

  submitProfile = e => {
    e.preventDefault()

    const newProfile = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }

    this.props.createProfile(newProfile, this.props.history)
  }

  render() {
    const { errors } = this.props

    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Edit Profile</h1>
                <small className="d-block pb-3">* = required fields</small>
                <form style={{ display: 'block' }} onSubmit={this.submitProfile}>
                  <input
                    className="form-control form-control-lg"          
                    placeholder="Handle"
                    type="text"
                    value={this.state.handle}
                    onChange={this.handleChange}
                    name="handle"
                  />
                  {errors ? <h5>{errors.handle}</h5> : ''}

                  <select 
                    className="form-control form-control-lg mt-4"
                    name="status" 
                    onChange={this.handleChange} 
                    value={this.state.status}>
                    {this.renderOptions()}
                  </select>
                  {errors ? <h5>{errors.status}</h5> : ''}

                  <input
                    className="form-control form-control-lg mt-4"                  
                    placeholder="Company"
                    type="text"
                    value={this.state.company}
                    onChange={this.handleChange}
                    name="company"
                  />

                  <input
                    className="form-control form-control-lg mt-4"                 
                    placeholder="Website"
                    type="text"
                    value={this.state.website}
                    onChange={this.handleChange}
                    name="website"
                  />
                  {errors ? <h5>{errors.website}</h5> : ''}
                  
                  <input
                    className="form-control form-control-lg mt-4"                  
                    placeholder="Location"
                    type="text"
                    value={this.state.location}
                    onChange={this.handleChange}
                    name="location"
                  />

                  <input
                    className="form-control form-control-lg mt-4"                 
                    name="skills"
                    id=""
                    cols=""
                    rows="1"
                    placeholder="Skills"
                    value={this.state.skills}
                    onChange={this.handleChange}
                  />
                  {errors ? <h5>{errors.skills}</h5> : ''}
                  
                  <input
                    className="form-control form-control-lg mt-4"                 
                    placeholder="Github Username"
                    type="text"
                    value={this.state.githubusername}
                    onChange={this.handleChange}
                    name="githubusername"
                  />
                  <textarea
                    className="form-control form-control-lg mt-4"                 
                    placeholder="Bio"
                    type="text"
                    value={this.state.bio}
                    onChange={this.handleChange}
                    name="bio"
                  />

                  <input
                    className="form-control form-control-lg mt-4"                  
                    placeholder="YouTube"
                    type="text"
                    value={this.state.youtube}
                    onChange={this.handleChange}
                    name="youtube"
                  />
                  {errors ? <h5>{errors.youtube}</h5> : ''}

                  <input
                    className="form-control form-control-lg mt-4"                  
                    placeholder="LinkedIn"
                    type="text"
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                    name="linkedin"
                  />
                  {errors ? <h5>{errors.linkedin}</h5> : ''}

                  <input
                    className="form-control form-control-lg mt-4"                  
                    placeholder="Twitter"
                    type="text"
                    value={this.state.twitter}
                    onChange={this.handleChange}
                    name="twitter"
                  />
                  {errors ? <h5>{errors.twitter}</h5> : ''}

                  <input
                    className="form-control form-control-lg mt-4"                 
                    placeholder="Facebook"
                    type="text"
                    value={this.state.facebook}
                    onChange={this.handleChange}
                    name="facebook"
                  />
                  {errors ? <h5>{errors.facebook}</h5> : ''}

                  <input
                    className="form-control form-control-lg mt-4"                 
                    placeholder="Instagram"
                    type="text"
                    value={this.state.instagram}
                    onChange={this.handleChange}
                    name="instagram"
                  />
                  {errors ? <h5>{errors.instagram}</h5> : ''}
                  
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4 mb-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ profile, errors }) => {
  return { profile, errors }
}

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))