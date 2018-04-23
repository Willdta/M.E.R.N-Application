import React, { Component } from 'react'
import _ from 'lodash'
import formOptions from '../common/formOptions'
// import { connect } from 'react-redux'
// import { createProfile } from '../actions/profileActions'

export default class CreateProfile extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
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
      githubusername: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }
    
    // this.props.createProfile(newProfile)
  }
  
  render() {
    return (
      <div>
        <form style={{display: 'block'}} onSubmit={this.submitProfile}>
          <input 
            placeholder="Handle"
            type="text" 
            value={this.state.handle}
            onChange={this.handleChange}
            name="handle"
          />

          <select name="status" onChange={this.handleChange} value={this.state.status}>
            {this.renderOptions()}
          </select>

          <input
            placeholder="Company"
            type="text"
            value={this.state.company}
            onChange={this.handleChange}
            name="company"
          />
          <input
            placeholder="Website"
            type="text"
            value={this.state.website}
            onChange={this.handleChange}
            name="website"
          />
          <input
            placeholder="Location"
            type="text"
            value={this.state.location}
            onChange={this.handleChange}
            name="location"
          />
          <input 
            name="skills" 
            id="" 
            cols="" 
            rows="1"
            placeholder="Skills"
            value={this.state.skills}
            onChange={this.handleChange}
          />
          <input
            placeholder="Github Username"
            type="text"
            value={this.state.githubusername}
            onChange={this.handleChange}
            name="githubusername"
          />
          <textarea
            placeholder="Bio"
            type="text"
            value={this.state.bio}
            onChange={this.handleChange}
            name="bio"
          />
          <input
            placeholder="YouTube"
            type="text"
            value={this.state.youtube}
            onChange={this.handleChange}
            name="youtube"
          />
          <input
            placeholder="LinkedIn"
            type="text"
            value={this.state.linkedin}
            onChange={this.handleChange}
            name="linkedin"
          />
          <input
            placeholder="Twitter"
            type="text"
            value={this.state.twitter}
            onChange={this.handleChange}
            name="twitter"
          />
          <input
            placeholder="Facebook"
            type="text"
            value={this.state.facebook}
            onChange={this.handleChange}
            name="facebook"
          />
          <input
            placeholder="Instagram"
            type="text"
            value={this.state.instagram}
            onChange={this.handleChange}
            name="instagram"
          />

          <button>Submit</button>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = ({ auth, profile, errors }) => {
//   return { auth, profile, errors }
// }

// export default connect(mapStateToProps, { createProfile })(CreateProfile)