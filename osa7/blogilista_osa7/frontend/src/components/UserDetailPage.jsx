import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDetailPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const foundUser = blogs.find((blog) => blog.user.id === id)?.user
    setUser(foundUser)
  }, [id, blogs])

  if (!user) {
    return <div>Loading...</div>
  }

  const userBlogs = blogs.filter((blog) => blog.user.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetailPage
