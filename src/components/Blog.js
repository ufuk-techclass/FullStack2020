import React from 'react'
const Blog = ({ blog, username }) => (

  <div>
    {blog.title} {blog.author} {username}
  </div>
)

export default Blog
