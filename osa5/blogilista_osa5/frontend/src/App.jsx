import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogService from './services/blogs'
import LoginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

function App() {
  const [blogs, setBlogs] = useState([])
  const [notificationType, setNotificationType] = useState()
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    BlogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      BlogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await LoginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      BlogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationType('error')
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
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
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    BlogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationType('success')
        setNotificationMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(error.message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (id, newBlog) => {
    BlogService.update(id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => (blog.id === id) ? returnedBlog : blog));
        setNotificationType('success')
        setNotificationMessage(`Updated blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(error.message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = (blogObject) => {
    BlogService.remove(blogObject.id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id));
        setNotificationType('success')
        setNotificationMessage(`removed blog ${blogObject.title} by ${blogObject.author}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(error.message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const renderBlogs = () => {
    // Sort by likes
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return (
      <div>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} notificationType={notificationType} />

      {!user && loginForm()}
      {user && <div>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} userName={user} />
        </Togglable>
        {renderBlogs()}
        </div>
      }

    </div>
  )
}

export default App
