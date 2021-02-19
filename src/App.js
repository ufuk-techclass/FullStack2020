import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {

    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      ...newBlog, id: Date.now()
    }
    /*
        const result = persons.filter(p => p.name === newName)
    
        //if input name matches with the list
        if (result.length !== 0) {
          //update number, if confirmed
          if (window.confirm(`${newName}  is already in the phonebook, replace the old number with a new one?`)) {
            //update person object with the new number
            const updatedPerson = { ...result[0], number: newNumber }
    
            personService
              .update(result[0].id, updatedPerson)
              .then(() => {
                hook();
                setNewName('');
                setNewNumber('');
                setInfoSuccess(true)
                setInfoMessage(`${updatedPerson.name}'s phone numeber is updated`)
                setTimeout(() => {
                  setInfoMessage(null)
                }, 2000);
              })
              .catch(error => {
                setInfoSuccess(false)
                setInfoMessage(`Validation error: ${error.response.data.error}`)
                setTimeout(() => {
                  setInfoMessage(null)
                }, 2000);
                console.log("error: ", error.response.data)
              })
    
          }
          //reset states, if unconfirmed
          else {
            setNewName('')
            setNewNumber('')
            setMyFilter('')
          }
    
        }
        //input name does not match with the list
        //add new person to the list
        else {*/

    try {
      await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
      //setPersons(persons.concat(returnedBlogs));
      //setNewName('')
      //setNewNumber('')
      //setMyFilter('')
      //setInfoSuccess(true)
      //setInfoMessage(`${returnedPerson.name} is added`)
      //setTimeout(() => {
      // setInfoMessage(null)
      //}, 2000)

    } catch (error) {
      console.log("error-add: ", error.response.data)
    }
    //catch(error => {
    // setInfoSuccess(false)
    // setInfoMessage(`Validation error: ${error.response.data.error} `)
    // setTimeout(() => {
    //   setInfoMessage(null)
    // }, 2000)
    //   console.log("error-add: ", error.response.data)
    // })

    //}
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      console.log("DFEFWEFWEFWF: ", exception.response.data)
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

  //const addBlog = () => console.log("A")
  const handleBlogChange = () => {
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  }

  const logoutUser = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const blogForm = (user) => (
    <div>
      <h2>Blogs</h2>
      <div>{user.username} logged in <button onClick={logoutUser}>logout</button></div>
      <br />
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>Title: <input
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        /></div>
        <div>Author: <input
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        /></div>
        <div>URL: <input
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        /></div>
        <button type="submit">Add blog</button>
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