import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, username, addLike, handleDelete }) => (

  <div className={'blogStyle'}>
    Title: {blog.title}
    <Togglable buttonLabel="view">
      <div>Author: {blog.author}</div>
      <div>URL:  {blog.url}</div>
      <div>Likes:  {blog.likes}<button onClick={() => addLike(blog)} >like</button></div>
      <div>Added by: {blog.user.name}</div>
    </Togglable>
    <div>
      {
        blog.user.username === username && <button onClick={() => handleDelete(blog)} >delete</button>
      }
    </div>
  </div >
)

export default Blog
