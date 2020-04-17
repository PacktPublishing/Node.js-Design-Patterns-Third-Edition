import react from 'react'
import ReactDOM from 'react-dom'
import htm from 'htm'

const html = htm.bind(react.createElement)

class Hello extends react.Component {
  render () {
    return html`<h1>
      Hello ${this.props.name || 'World'}
    </h1>`
  }
}

ReactDOM.render(
  html`<${Hello} name="React"/>`,
  document.getElementsByTagName('body')[0]
)
