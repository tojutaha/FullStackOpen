import { useState } from 'react'

const Blog = ({ updateBlog, deleteBlog, blog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const handleLikeButton = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, newBlog)
  }

  const handleDeleteButton = () => {
    const msg = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(msg)) {
      deleteBlog(blog)
    }
  }

  return (
    <div>
      {visible ? (
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisible}>Hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={handleLikeButton}>Like</button>
          <br />
          {blog.author}
          <br />
          {user && user.username === blog.user.username && (
            <button onClick={handleDeleteButton}>Remove</button>
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisible}>View</button>
        </div>
      )}
    </div>
  )
}

export default Blog
