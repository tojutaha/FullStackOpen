import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

const UsersPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const usersBlogsCount = blogs.reduce((acc, blog) => {
    if (blog.user && blog.user.username) {
      acc[blog.user.username] = (acc[blog.user.username] || 0) + 1
    }
    return acc
  }, {})

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(usersBlogsCount).map(([username, count]) => (
            <tr key={username}>
              <td>{username}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
