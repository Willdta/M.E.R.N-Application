import React from 'react'

export default ({ profile }) => {
  return (
    <div>
      <h5>Bio: {profile.bio ? profile.bio : 'none'}</h5>
      <h5>Skills: {profile.skills}</h5>
    </div>
  )
}
