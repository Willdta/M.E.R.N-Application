import React from 'react'

const ShowExperience = ({ profile }) => {
  return (
    <div>
      <div>
        <h1>Education:</h1>
        {profile.experience.map(item => {
          return (
            <div>
              <h5>Title: {item.title}</h5>
              <h5>Company: {item.company}</h5>
              <h5>Location: {item.location}</h5>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShowExperience