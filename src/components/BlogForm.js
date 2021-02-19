import React from 'react'

const BlogForm = ({ newBlog, addBlog, handleTitleChange,
  handleAuthorChange, handleUrlChange }) => {


  return (
    <div>
      <h2>Create new blog</h2>
      <form id='testform1' onSubmit={addBlog}>
        <div>Title: <input
          id='testtitle'
          value={newBlog.title}
          onChange={handleTitleChange}
          type="text"
        /></div>
        <div>Author: <input
          id='testauthor'
          value={newBlog.author}
          onChange={handleAuthorChange}
          type="text"
        /></div>
        <div>URL: <input
          id='testurl'
          value={newBlog.url}
          onChange={handleUrlChange}
          type="text"
        /></div>
        <button id="addblog-button" type="submit">Add blog</button>
      </form>
    </div>

  )
}

export default BlogForm