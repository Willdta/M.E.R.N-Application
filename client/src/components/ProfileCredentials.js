import React from 'react'

export default ({ profile }) => {
  return (
    <div>
      <h1>Credentials:</h1>
      <h1>Experience</h1>
      {profile.experience.map(item => (
        <div>
          <h5>{item.title}</h5>
          <h5>{item.location}</h5>
          <h5>{item.to}</h5>
          <h5>{item.from}</h5>
          <h5>{item.description}</h5>
        </div>
      ))}
      
      <h1>Education</h1>
      {profile.education.map(item => (
        <div>
          <h5>{item.school}</h5>
          <h5>{item.degree}</h5>
          <h5>{item.fieldofstudy}</h5>
          <h5>{item.from}</h5>
          <h5>{item.to}</h5>
          <h5>{item.description}</h5>
        </div>
      ))}
    </div>
  )
}