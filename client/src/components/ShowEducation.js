import React from 'react'

const ShowEducation = ({ profile }) => {
  return (
    <div>
      <div>
        {profile.education.map(item => {
          return (
            <div>
              <h5>{item.school}</h5>
              <h5>{item.degree}</h5>
              <h5>{item.fieldofstudy}</h5>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShowEducation