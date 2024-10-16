const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes = 0 } = request.body
  if (!title || !url) {
    return response.status(400).json(request.body)
  }

  const user = request.user

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.comments = blog.comments.concat(comment)
  const updatedBlog = await blog.save()

  response.status(201).json(updatedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      return response
        .status(400)
        .json({
          error: 'only person who created the blog is allowed to delete it',
        })
    }
  },
)

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { title, author, url, likes, user } = request.body

  // Validate input
  if (typeof likes !== 'number') {
    return response.status(400).json({ error: 'Likes must be a number' });
  }

  const updatedBlog = {
    title,
    author,
    url,
    likes,
    user: user.id
  }

  try {
    const updated = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
    if (!updated) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    response.json(updated)
  } catch (error) {
    console.error('Error updating blog:', error)
    response.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = blogsRouter