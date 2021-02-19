import React from 'react'

const BlogForm = ({ newBlog, addBlog, handleTitleChange,
  handleAuthorChange, handleUrlChange }) => {


  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>Title: <input
          value={newBlog.title}
          onChange={handleTitleChange}
        /></div>
        <div>Author: <input
          value={newBlog.author}
          onChange={handleAuthorChange}
        /></div>
        <div>URL: <input
          value={newBlog.url}
          onChange={handleUrlChange}
        /></div>
        <button type="submit">Add blog</button>
      </form>
    </div>

  )
}

export default BlogForm