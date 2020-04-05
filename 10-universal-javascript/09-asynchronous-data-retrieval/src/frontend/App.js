import react from 'react'
import { Switch, Route } from 'react-router-dom'
import { AuthorsIndex } from './components/pages/AuthorsIndex.js'
import { Author } from './components/pages/Author.js'
import { FourOhFour } from './components/pages/FourOhFour.js'

const h = react.createElement

export class App extends react.Component {
  render () {
    return h(Switch, null,
      h(Route, { path: '/', exact: true, component: AuthorsIndex }),
      h(Route, { path: '/author/:authorId', component: Author }),
      h(Route, { path: '*', component: FourOhFour })
    )
  }
}
