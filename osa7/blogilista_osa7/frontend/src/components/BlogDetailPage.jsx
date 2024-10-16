import { useParams } from 'react-router-dom'
import { useState } from 'react'

const BlogDetailPage = ({ blogs, updateBlog }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

  const [comments, setComments] = useState(blogs.comments || [])
  const [newComment, setNewComment] = useState('')

  if (!blog) {
    return <div>Blog not found</div>
  }

  const handleLikeButton = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlog(blog.id, updatedBlog).catch(err => console.error(err))
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch(`/api/blogs/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: newComment }),
    })

    if (response.ok) {
      const addedComment = await response.json()
      setComments(comments.concat(addedComment))
    }

    setNewComment('')
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={handleLikeButton}>Like</button></p>
      <p>added by {blog.user.name}</p>

      <h3>Comments</h3>
      <ul>
        {blog.comments && blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  )
}

export default BlogDetailPage
