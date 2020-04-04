import react from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../Header.js'

const h = react.createElement

export class FourOhFour extends react.Component {
  render () {
    return h('div', null,
      h(Header),
      h('div', null,
        h('h2', null, '404'),
        h('h3', null, this.props.error || 'Page not found'),
        h(Link, { to: '/' }, 'Go back to the home page')
      )
    )
  }
}
