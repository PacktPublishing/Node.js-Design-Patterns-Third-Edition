import react from 'react'
import reactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App.js'

const h = react.createElement

reactDOM.hydrate(
  h(BrowserRouter, {},
    h(App)
  ),
  document.getElementById('root')
)
