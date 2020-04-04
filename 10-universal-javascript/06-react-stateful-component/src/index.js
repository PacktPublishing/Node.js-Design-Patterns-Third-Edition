import react from 'react'
import ReactDOM from 'react-dom'
import { RecentGithubProjects } from './RecentGithubProjects.js'

const h = react.createElement

class App extends react.Component {
  render () {
    return h('div', null,
      h('h1', null, 'Recently updated JS projects'),
      h(RecentGithubProjects)
    )
  }
}

ReactDOM.render(
  h(App),
  document.getElementsByTagName('body')[0]
)
