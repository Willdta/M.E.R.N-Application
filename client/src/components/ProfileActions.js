import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      <Link to="/edit-profile">Edit profile</Link>
      <Link to="/add-experience">Add experience</Link>
      <Link to="/add-education">Add education</Link>
    </div>
  )
}
