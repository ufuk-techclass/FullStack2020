import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  //const [showAll, setShowAll] = useState(true)
  //const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogVisible, setBlogVisible] = useState(false)
  const [infoMessage, setInfoMessage] = useState(null)
  const [infoSuccess, setInfoSuccess] = useState(true)
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
      setInfoSuccess(true)
      setInfoMessage(`A new blog "${newBlog.title}" by "${newBlog.author}" is added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000);
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
      setInfoSuccess(false)
      setInfoMessage(`Validation error: ${error.response.data.error}`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000);
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
      setInfoSuccess(true)
      setInfoMessage(`User "${user.name}" logged in`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000);
    } catch (exception) {

      setUsername('')
      setPassword('')
      setInfoSuccess(false)
      setInfoMessage(`Validation error: ${exception.response.data.error}`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000);

      /* setErrorMessage('Wrong credentials')
       console.log("DFEFWEFWEFWF: ", exception.response.data)
       setTimeout(() => {
         setErrorMessage(null)
       }, 5000)*/
    }

    console.log('logging in with', username, password)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>

    )

  }


  //const addBlog = () => console.log("A")
  const handleBlogChange = () => {
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  }

  const logoutUser = () => {
    window.localStorage.clear()

    setInfoSuccess(true)
    setInfoMessage(`A new blog "${user.name}" logged out`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 3000);
    setUser(null)
  }


  const blogForm = (user) => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
      <div>
        <div>{user.username} logged in <button onClick={logoutUser}>logout</button></div>
        <br />
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>new  blog</button>
        </div>

        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
            newBlog={newBlog}
            handleTitleChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            handleAuthorChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            handleUrlChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            handleVisibility={() => setBlogVisible(false)}
          />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
        {
          blogs.map(blog => {
            if (user.username === blog.user.username) {
              return <Blog key={blog.id} blog={blog} username={user.username} />
            }
          })
        }
      </div>
    )
  }

  return (
    <div>
      <Notification message={infoMessage} infoSuccess={infoSuccess} />
      <h2>Blogs</h2>
      {user === null && loginForm()}
      {user !== null && blogForm(user)}

    </div>
  )
}

export default App