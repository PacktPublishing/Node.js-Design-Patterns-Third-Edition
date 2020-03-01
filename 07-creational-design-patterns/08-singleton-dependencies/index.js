import { getAllPosts } from './blog.js'

(async () => {
  const posts = await getAllPosts()
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
})()
