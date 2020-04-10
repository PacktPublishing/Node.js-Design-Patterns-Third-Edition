import react from 'react'
import reactDOM from 'react-dom'
import htm from 'htm'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App.js'

const html = htm.bind(react.createElement)

reactDOM.render(
  html`<${BrowserRouter}><${App}/></>`,
  document.getElementById('root')
)
