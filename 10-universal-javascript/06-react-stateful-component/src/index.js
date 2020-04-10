import react from 'react'
import ReactDOM from 'react-dom'
import htm from 'htm'
import { App } from './App.js'

const html = htm.bind(react.createElement)

ReactDOM.render(
  html`<${App}/>`,
  document.getElementsByTagName('body')[0]
)
