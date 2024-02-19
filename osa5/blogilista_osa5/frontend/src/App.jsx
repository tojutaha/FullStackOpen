import { useState, useEffect } from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from '../components/Notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [notificationType, setNotificationType] = useState()
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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

      blogService.setToken(user.token)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const AddBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user
    }

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setNotificationType('success')
        setNotificationMessage(`a new blog ${title} by ${author} added`)
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

  const blogForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={AddBlog}>
        <div>
          title
          <input
            type='text'
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author
        <input
          type='text'
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        <div>
       url 
        <input
          type='text'
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

  const renderBlogs = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} notificationType={notificationType} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        {blogForm()}
        {renderBlogs()}
        </div>
      }

    </div>
  )
}

export default App
