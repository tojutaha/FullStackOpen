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
  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
