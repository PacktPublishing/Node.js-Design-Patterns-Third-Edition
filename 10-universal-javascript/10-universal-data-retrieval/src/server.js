import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import react from 'react'
import reactServer from 'react-dom/server.js'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import { StaticRouter, matchPath } from 'react-router-dom'
import { routes } from './frontend/routes.js'
import { App } from './frontend/App.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const h = react.createElement
const server = fastify({ logger: true })

const template = ({ content, serverData }) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My library</title>
  </head>
  <body>
    <div id="root">${content}</div>
    ${serverData ? `<script type="text/javascript">${serverData}</script>` : ''}
    <script type="text/javascript" src="/public/main.js"></script>
  </body>
</html>`

server.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'public'),
  prefix: '/public/'
})

server.get('*', async (req, reply) => {
  const location = req.raw.originalUrl
  let component
  let match
  let matched = false
  for (const route of routes) {
    component = route.component
    match = matchPath(location, route)
    if (match) {
      matched = true
      break
    }
  }

  let code = 200
  if (!matched) {
    code = 404
  }

  let staticData
  let staticError
  let hasStaticContext = false
  if (typeof component.preloadAsyncData === 'function') {
    hasStaticContext = true
    try {
      const data = await component.preloadAsyncData({ match })
      staticData = data
    } catch (err) {
      staticError = err
    }
  }

  const staticContext = { [location]: { data: staticData, err: staticError } }
  const app = h(StaticRouter, { location, context: staticContext }, h(App))
  const content = reactServer.renderToString(app)
  const serverData = hasStaticContext ? `window.__STATIC_CONTEXT__=${JSON.stringify(staticContext)}` : ''
  const html = template({ content, serverData })

  if (staticContext.statusCode) {
    code = staticContext.statusCode
  }

  reply.code(code).type('text/html').send(html)
})

const port = Number.parseInt(process.env.PORT) || 3000
const address = process.env.ADDRESS || '127.0.0.1'

server.listen(port, address, function (err, addr) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
