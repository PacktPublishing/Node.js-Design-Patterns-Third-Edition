import react from 'react'
import reactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app.js'

const h = react.createElement

reactDOM.render(
  h(BrowserRouter, {},
    h(App)
  ),
  document.getElementById('root')
)
