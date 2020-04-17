import react from 'react'
import htm from 'htm'
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import { Header } from '../Header.js'

const html = htm.bind(react.createElement)

export class AuthorsIndex extends react.Component {
  constructor (props) {
    super(props)
    this.state = {
      authors: [],
      loading: true
    }
  }

  async componentDidMount () {
    const { body } = await superagent.get('http://localhost:3001/api/authors')
    this.setState({ loading: false, authors: body })
  }

  render () {
    if (this.state.loading) {
      return html`<${Header}/><div>Loading ...</div>`
    }

    return html`<div>
      <${Header}/>
      <div>${this.state.authors.map((author) =>
        html`<div key=${author.id}>
          <p>
            <${Link} to="${`/author/${author.id}`}">${author.name}</>
          </p>
        </div>`)}
      </div>
    </div>`
  }
}
