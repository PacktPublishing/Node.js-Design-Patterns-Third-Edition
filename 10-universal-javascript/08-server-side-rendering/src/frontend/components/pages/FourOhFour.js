import react from 'react'
import htm from 'htm'
import { Link } from 'react-router-dom'
import { Header } from '../Header.js'

const html = htm.bind(react.createElement)

export class FourOhFour extends react.Component {
  render () {
    // indicates SSR that this component was rendered so
    // that the response status code can be set accordingly
    if (this.props.staticContext) {
      this.props.staticContext.statusCode = 404
    }

    return html`<div>
      <${Header}/>
      <div>
        <h2>404</h2>
        <h3>${this.props.error || 'Page not found'}</h3>
        <${Link} to="/">Go back to the home page</>
      </div>
    </div>`
  }
}
