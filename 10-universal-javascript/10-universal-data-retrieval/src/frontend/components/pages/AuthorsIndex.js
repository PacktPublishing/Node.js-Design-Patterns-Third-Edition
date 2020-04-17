import react from 'react'
import htm from 'htm'
import { Link } from 'react-router-dom'
import superagent from 'superagent'
import { AsyncPage } from './AsyncPage.js'
import { Header } from '../Header.js'

const html = htm.bind(react.createElement)

export class AuthorsIndex extends AsyncPage {
  static async preloadAsyncData (props) {
    const { body } = await superagent.get('http://localhost:3001/api/authors')
    return { authors: body }
  }

  render () {
    if (this.state.loading) {
      return html`<div>
        <${Header}/>
        <div>Loading ...</div>
      </div>`
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
