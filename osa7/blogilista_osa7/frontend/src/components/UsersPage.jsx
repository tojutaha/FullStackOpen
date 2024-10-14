import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const UsersPage = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const usersBlogsCount = blogs.reduce((acc, blog) => {
    if (blog.user && blog.user.username) {
      acc[blog.user.id] = acc[blog.user.id] || { username: blog.user.username, count: 0 }
      acc[blog.user.id].count += 1
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
          {Object.entries(usersBlogsCount).map(([userId, { username, count }]) => (
            <tr key={userId}>
              <td>
                <Link to={`/users/${userId}`}>{username}</Link> {/* Link to user detail page */}
              </td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
