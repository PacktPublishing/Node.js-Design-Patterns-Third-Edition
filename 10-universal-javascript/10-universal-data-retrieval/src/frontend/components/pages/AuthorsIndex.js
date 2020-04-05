import react from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AsyncPage } from './AsyncPage.js'
import { Header } from '../Header.js'

const h = react.createElement

export class AuthorsIndex extends AsyncPage {
  static async preloadAsyncData (props) {
    const { data } = await axios.get('http://localhost:3001/api/authors')
    return { authors: data }
  }

  render () {
    return h('div', null,
      h(Header),
      this.state.loading
        ? h('div', null, 'Loading ...')
        : h('div', null,
          h('h2', null, 'Authors'),
          h('div', null,
            this.state.authors.map(
              (author) => h('div', { key: author.id },
                h(Link, { to: `/author/${author.id}` },
                  h('p', null, author.name)
                )
              )
            )
          )
        )
    )
  }
}
