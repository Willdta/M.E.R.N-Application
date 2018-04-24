import React from 'react'

const ShowEducation = ({ profile }) => {
  return (
    <div>
      <div>
        <h1>Education:</h1>
        {profile.education.map(item => {
          return (
            <div>
              <h5>School: {item.school}</h5>
              <h5>Degree: {item.degree}</h5>
              <h5>Field of Study: {item.fieldofstudy}</h5>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShowEducation