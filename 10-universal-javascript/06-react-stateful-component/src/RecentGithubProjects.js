import react from 'react'

const h = react.createElement

export class RecentGithubProjects extends react.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      projects: []
    }
  }

  async componentDidMount () {
    const response = await fetch(
      'https://api.github.com/search/repositories?q=javascript&sort=updated',
      { mode: 'cors' }
    )
    const projects = await response.json()
    this.setState({ projects: projects.items, loading: false })
  }

  render () {
    if (this.state.loading) {
      return 'Loading ...'
    }

    return (
      h('ul', null,
        this.state.projects.map(project => (
          h('li', { key: project.id },
            h('a', { href: project.html_url }, project.full_name),
            `: ${project.description}`
          )
        ))
      )
    )
  }
}
