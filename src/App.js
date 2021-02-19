import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  //const [showAll, setShowAll] = useState(true)
  //const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  //const [blogVisible, setBlogVisible] = useState(false)
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

  const blogFormRef = useRef()

  useEffect(() => {

    const fetchData = async () => {
      const blogs = await blogService.getAll()
      //sorting blog posts by the number of likes
      blogs.sort((a, b) => {
        return a.likes - b.likes
      }).reverse()
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

  const addLike = async (blog) => {

    const result = await blogs.filter(p => p.id === blog.id)
    const newLikes = result[0].likes + 1
    const updatedBlog = { ...result[0], likes: newLikes }
    try {
      await blogService.update(blog.id, updatedBlog)
      const updatedBlogs = await blogService.getAll()

      //sorting blog posts by the number of likes
      updatedBlogs.sort((a, b) => {
        return a.likes - b.likes
      }).reverse()

      setBlogs(updatedBlogs)


      setInfoSuccess(true)
      setInfoMessage(`The blog: "${result[0].title}" got +1 like`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000);


    } catch (error) {
      setInfoSuccess(false)
      setInfoMessage(`Some error: ${error.response.data.error}`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000);
      console.log("error-add: ", error.response.data)
    }

  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Delete ${blog.title} `)) {
      try {
        await blogService.deleteBlog(blog.id)
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => {
          return a.likes - b.likes
        }).reverse()
        setBlogs(blogs)
        setInfoSuccess(true)
        setInfoMessage(`The blog: "${blog.title}" is successfully deleted `)
        setTimeout(() => {
          setInfoMessage(null)
        }, 2000)

      } catch (error) {
        setInfoSuccess(false)
        setInfoMessage(`Validation error: ${error.response.data.error}`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 3000);
        console.log("error-add: ", error.response.data)
      }
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

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
      //sorting blog posts by the number of likes
      blogs.sort((a, b) => {
        return a.likes - b.likes
      }).reverse()
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
  /*/const handleBlogChange = () => {
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  }*/

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

    return (
      <div>
        <div>{user.name} logged in <button onClick={logoutUser}>logout</button></div>
        <br />


        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm
            addBlog={addBlog}
            newBlog={newBlog}
            handleTitleChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            handleAuthorChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            handleUrlChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}

          />
        </Togglable>
        {
          blogs.map(blog => {

            return (
              <Blog key={blog.id} blog={blog} username={user.username} addLike={addLike} handleDelete={handleDelete} />
            )

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