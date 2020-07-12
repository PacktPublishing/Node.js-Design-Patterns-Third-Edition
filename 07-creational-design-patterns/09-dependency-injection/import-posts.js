import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Blog } from './blog.js'
import { createDb } from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const posts = [
  {
    id: 'my-first-post',
    title: 'My first post',
    content: 'Hello World!\nThis is my first post',
    created_at: new Date('2020-02-03')
  },
  {
    id: 'iterator-patterns',
    title: 'Node.js iterator patterns',
    content: 'Let\'s talk about some iterator patterns in Node.js\n\n...',
    created_at: new Date('2020-02-06')
  },
  {
    id: 'dependency-injection',
    title: 'Dependency injection in Node.js',
    content: 'Today we will discuss about dependency injection in Node.js\n\n...',
    created_at: new Date('2020-02-29')
  }
  // ...
]

async function main () {
  const db = createDb(join(__dirname, 'data.sqlite'))
  const blog = new Blog(db)
  await blog.initialize()

  await Promise.all(
    posts.map(
      (post) => blog.createPost(
        post.id,
        post.title,
        post.content,
        post.created_at
      )
    )
  )
  console.log('All posts imported')
}

main().catch(console.error)
