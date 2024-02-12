const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
//const Blog = require('../models/blog')

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('all blogs are identified by id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.something.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'Test Title No Likes',
    author: 'Test Author',
    url: 'www.something.com',
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('blog without title or url is not added', async() => {
  const newBlog = {
    //title: 'Test Title',
    author: 'Test Author',
    //url: 'www.something.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})