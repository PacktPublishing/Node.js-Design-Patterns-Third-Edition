import react from 'react'

export class AsyncPage extends react.Component {
  static async preloadAsyncData (props) {
    throw new Error('Must be implemented by sub class')
  }

  render () {
    throw new Error('Must be implemented by sub class')
  }

  constructor (props) {
    super(props)
    const location = props.match.url
    this.hasData = false

    let staticData
    let staticError

    const staticContext = typeof window !== 'undefined'
      ? window.__STATIC_CONTEXT__ // client side check for SSR preloaded data
      : this.props.staticContext // server side check for SSR preloaded data

    if (staticContext && staticContext[location]) {
      const { data, err } = staticContext[location]
      staticData = data
      staticError = err
      this.hasStaticData = true

      // this allows us to re-fetch fresh data the next time we visit
      // the same URL during the front end session
      typeof window !== 'undefined' && delete staticContext[location]
    }

    this.state = { ...staticData, staticError, loading: !this.hasStaticData }
  }

  async componentDidMount () {
    // browser only
    if (!this.hasStaticData) {
      let staticData
      let staticError
      try {
        const data = await this.constructor.preloadAsyncData(this.props)
        staticData = data
      } catch (err) {
        staticError = err
      }
      this.setState({ ...staticData, loading: false, staticError })
    }
  }
}
