import react from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Header } from '../Header.js'

const h = react.createElement

export class AuthorsIndex extends react.Component {
  constructor (props) {
    super(props)
    this.state = {
      authors: [],
      loading: true
    }
  }

  async componentDidMount () {
    const { data } = await axios.get('http://localhost:3001/api/authors')
    this.setState({
      loading: false,
      authors: data
    })
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
              (author) => h('div', { key: author.id, className: 'col text-center' },
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
