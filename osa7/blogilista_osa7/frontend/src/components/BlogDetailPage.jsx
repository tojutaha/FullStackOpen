import { useParams } from 'react-router-dom'

const BlogDetailPage = ({ blogs, updateBlog }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

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

    // console.log('Updated blog object:', updatedBlog)
    updateBlog(blog.id, updatedBlog).catch(err => console.error(err))
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={handleLikeButton}>Like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogDetailPage
