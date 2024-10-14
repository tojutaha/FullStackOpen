import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { setNotificationWithTimeout } from './reducers/notificationReducer'

function App() {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser)
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = { username: event.target.username.value, password: event.target.password.value }
      await dispatch(loginUser(credentials))
      dispatch(setNotificationWithTimeout('Successfully logged in', 'success', 5000))
    } catch (exception) {
      dispatch(setNotificationWithTimeout('Wrong username or password', 'error', 5000))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setNotificationWithTimeout('Logged out successfully', 'success', 5000))
  }

  const addNewBlog = async (blogObject) => {
    await dispatch(createBlog(blogObject))
    dispatch(setNotificationWithTimeout(`A new blog "${blogObject.title}" by ${blogObject.author} added`, 'success', 5000))
  }

  const updateBlog = async (id, updatedBlog) => {
    await dispatch(likeBlog(id, updatedBlog))
    dispatch(setNotificationWithTimeout(`Updated blog "${updatedBlog.title}"`, 'success', 5000))
  }

  const deleteBlog = async (blogObject) => {
    await dispatch(removeBlog(blogObject))
    dispatch(setNotificationWithTimeout(`Removed blog "${blogObject.title}"`, 'success', 5000))
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification.message} notificationType={notification.type} />

      {!user && (
        <form onSubmit={handleLogin}>
          <div>
            username <input name="username" />
          </div>
          <div>
            password <input name="password" type="password" />
          </div>
          <button type="submit">login</button>
        </form>
      )}

      {user && (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addNewBlog} />
          </Togglable>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
