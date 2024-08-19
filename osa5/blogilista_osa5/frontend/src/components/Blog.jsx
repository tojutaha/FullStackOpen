import { useState } from 'react'

const Blog = ({ updateBlog, deleteBlog, blog }) => {

  const [visible, setVisible] = useState(false)

  const hiddenStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? 'none' : ''
  }

  const viewStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: visible ? '' : 'none'
  }

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
      <div style={hiddenStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisible}>View</button>
      </div>
      <div style={viewStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisible}>Hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={handleLikeButton}>Like</button>
        <br />
        {blog.author}
        <br />
        <button onClick={handleDeleteButton}>Remove</button>
      </div>
    </div>
  )
}

export default Blog
