import react from 'react'

const h = react.createElement
const REQUEST_URI = 'https://api.github.com/search/repositories?q=javascript&sort=updated'

export class RecentGithubProjects extends react.Component {
  constructor (props) { // ①
    super(props) // ②
    this.state = { // ③
      loading: true,
      projects: []
    }
  }

  async componentDidMount () { // ④
    const response = await fetch(
      REQUEST_URI,
      { mode: 'cors' }
    )
    const projects = await response.json()
    this.setState({
      projects: projects.items,
      loading: false
    })
  }

  render () { // ⑤
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
