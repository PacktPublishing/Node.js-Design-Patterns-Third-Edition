import react from 'react'
import htm from 'htm'
import { Link } from 'react-router-dom'

const html = htm.bind(react.createElement)

export class Header extends react.Component {
  render () {
    return html`<header>
      <h1>
        <${Link} to="/">My library</>
      </h1>
    </header>`
  }
}
