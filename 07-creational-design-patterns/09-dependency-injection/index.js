import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { makeDb } from './db.js'
import { getAllPosts } from './blog.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main () {
  const db = await makeDb(join(__dirname, 'data.sqlite'))

  const posts = await getAllPosts(db)
  if (posts.length === 0) {
    console.log('No post available. Run `node import-posts.js` to load some sample posts')
  }

  posts.forEach((post) => {
    console.log(

`${post.title}
${'-'.repeat(post.title.length)}
Published on ${new Date(post.created_at).toISOString()}

${post.content}
`
    )
  })
}

main()
