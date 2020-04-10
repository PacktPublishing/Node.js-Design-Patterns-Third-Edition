import react from 'react'
import htm from 'htm'
import { Switch, Route } from 'react-router-dom'
import { routes } from './routes.js'

const html = htm.bind(react.createElement)

export class App extends react.Component {
  render () {
    return html`<${Switch}>
      ${routes.map(routeConfig =>
        html`<${Route} key=${routeConfig.path} ...${routeConfig}/>`
      )}
    </>`
  }
}
