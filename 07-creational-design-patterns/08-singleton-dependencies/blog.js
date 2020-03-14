import { db } from './db.js'

export function createPost (id, title, content, createdAt) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO posts VALUES (?, ?, ?, ?)',
      id, title, content, createdAt,
      (err) => {
        if (err) {
          return reject(err)
        }
        resolve(id)
      }
    )
  })
}

export function getAllPosts () {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM posts ORDER BY created_at DESC',
      (err, posts) => {
        if (err) {
          return reject(err)
        }

        resolve(posts)
      }
    )
  })
}
