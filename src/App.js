import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const addBlog = () => console.log("A")
  const handleBlogChange = () => {
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  }

  const blogForm = (user) => (
    <div>
      <h2>Blogs</h2>
      <div>{user.username} logged in</div>

      <form onSubmit={addBlog}>
        <input
          value={newBlog}
          onChange={handleBlogChange}
        />
        <button type="submit">save</button>
        {
          blogs.map(blog => {
            if (user.username === blog.user.username) {
              return <Blog key={blog.id} blog={blog} username={user.username} />
            }
          }
          )
        }
      </form>
    </div>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm(user)}
    </div>
  )
}

export default App