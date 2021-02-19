import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, username }) => (

  <div className={"blogStyle"}>
    <div>Title: {blog.title}</div>
    <Togglable buttonLabel="view">
      <div>Author: {blog.author}</div>
      <div>URL:  {blog.url}</div>
      <div>Likes:  {blog.likes}<button >like</button></div>
      <div>Username: {username}</div>
    </Togglable>


  </div>
)

export default Blog
