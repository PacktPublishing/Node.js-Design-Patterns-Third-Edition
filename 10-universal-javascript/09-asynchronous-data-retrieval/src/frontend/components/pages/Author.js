import react from 'react'
import htm from 'htm'
import superagent from 'superagent'
import { FourOhFour } from './FourOhFour.js'
import { Header } from '../Header.js'

const html = htm.bind(react.createElement)

export class Author extends react.Component {
  constructor (props) {
    super(props)
    this.state = {
      author: null,
      loading: true
    }
  }

  async loadData () {
    let author = null
    this.setState({ loading: false, author })
    try {
      const { body } = await superagent.get(`http://localhost:3001/api/author/${this.props.match.params.authorId}`)
      author = body
    } catch (e) {}
    this.setState({ loading: false, author })
  }

  componentDidMount () {
    this.loadData()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.authorId !== this.props.match.params.authorId) {
      this.loadData()
    }
  }

  render () {
    if (this.state.loading) {
      return html`<${Header}/><div>Loading ...</div>`
    }

    if (!this.state.author) {
      return html`<${FourOhFour}
        staticContext=${this.props.staticContext}
        error="Author not found"
      />`
    }

    return html`<div>
      <${Header}/>
      <h2>${this.state.author.name}</h2>
      <p>${this.state.author.bio}</p>
      <h3>Books</h3>
      <ul>
        ${this.state.author.books.map((book) =>
          html`<li key=${book.id}>${book.title} (${book.year})</li>`
        )}
      </ul>
    </div>`
  }
}
