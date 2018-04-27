import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ProfileGithub extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      clientID: 'b9bcd4982a3ef355a3bd',
      clientSecret: '92739f630521a373457f254e79af3987dd0ad6cd',
      count: 5,
      sort: 'created: asc',
      repos: []
    }
  }
  
  componentDidMount = () => {
    const { username } = this.props
    const { clientID, clientSecret, count, sort } = this.state

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_scret=${clientSecret}`)
      .then(res => res.json())  
      .then(data => this.setState({ repos: data }))
      .catch(err => console.log(err))
  }

  renderRepos = () => {
    const { repos } = this.state
    
    return repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {this.renderRepos()}
      </div>
    )
  }
}