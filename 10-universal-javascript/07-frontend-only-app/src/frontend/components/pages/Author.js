import react from 'react'
import { FourOhFour } from './FourOhFour.js'
import { Header } from '../Header.js'
import { authors } from '../../../data/authors.js'

const h = react.createElement

export class Author extends react.Component {
  constructor (props) {
    super(props)
    const author = authors.find(
      author => author.id === props.match.params.authorId
    )
    this.state = {
      author
    }
  }

  render () {
    if (!this.state.author) {
      return h(FourOhFour, {
        error: 'Author not found'
      })
    }

    return h('div', null,
      h(Header),
      h('div', null,
        h('h2', null, this.state.author.name),
        h('div', null,
          h('p', null,
            this.state.author.bio
          )
        ),
        h('h3', null, 'Books'),
        h('ul', null,
          this.state.author.books.map((book) =>
            h('li', { key: book.id }, `${book.title} (${book.year})`)
          )
        )
      )
    )
  }
}
