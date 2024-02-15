const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially some blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

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

  describe('addition of a new blog', () => {
    test('a valid blog can be added with status code of 201', async () => {
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

    test('blog without title or url is not added with status code of 400', async () => {
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
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDB()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const ids = blogsAtEnd.map(b => b.id)
      expect(ids).not.toContain(blogToDelete.id)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if modified propery matches to what we set it to', async () => {
      const blogs = await helper.blogsInDB()
      const blogToUpdate = blogs[0]

      blogToUpdate.likes = 999

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const updatedBlog = await Blog.findById(blogToUpdate.id)
      expect(updatedBlog.likes).toBe(999)
    })
  })

})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  /*
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('expected `username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  */

})

afterAll(async () => {
  await mongoose.connection.close()
})