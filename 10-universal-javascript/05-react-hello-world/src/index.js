import react from 'react'
import ReactDOM from 'react-dom'

const h = react.createElement // ①

class Hello extends react.Component { // ②
  render () { // ③
    return h('h1', null, [ // ④
      'Hello ',
      this.props.name || 'World'
    ])
  }
}

ReactDOM.render( // ⑤
  h(Hello, { name: 'React' }),
  document.getElementsByTagName('body')[0]
)
