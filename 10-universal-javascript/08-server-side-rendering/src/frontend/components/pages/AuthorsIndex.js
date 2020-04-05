import react from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../Header.js'
import { authors } from '../../../data/authors.js'

const h = react.createElement

export class AuthorsIndex extends react.Component {
  constructor (props) {
    super(props)
    this.state = {
      authors
    }
  }

  render () {
    return h('div', null,
      h(Header),
      h('div', null,
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
