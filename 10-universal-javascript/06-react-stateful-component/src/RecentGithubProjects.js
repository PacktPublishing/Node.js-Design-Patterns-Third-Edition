import react from 'react'
import htm from 'htm'

const html = htm.bind(react.createElement)

function createRequestUri (query) {
  return `https://api.github.com/search/repositories?q=${
    encodeURIComponent(query)
  }&sort=updated`
}

export class RecentGithubProjects extends react.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      projects: []
    }
  }

  async loadData () {
    this.setState({ loading: true, projects: [] })
    const response = await fetch(
      createRequestUri(this.props.query),
      { mode: 'cors' }
    )
    const responseBody = await response.json()
    this.setState({
      projects: responseBody.items,
      loading: false
    })
  }

  componentDidMount () {
    this.loadData()
  }

  componentDidUpdate (prevProps) {
    if (this.props.query !== prevProps.query) {
      this.loadData()
    }
  }

  render () {
    if (this.state.loading) {
      return 'Loading ...'
    }

    return html`<ul>
      ${this.state.projects.map(project => html`
        <li key=${project.id}>
          <a href=${project.html_url}>${project.full_name}</a>:
          ${' '}${project.description}
        </li>
      `)}
    </ul>`
  }
}
