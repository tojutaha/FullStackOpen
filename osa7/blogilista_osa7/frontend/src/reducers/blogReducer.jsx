import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    }
  }
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await BlogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await BlogService.create(blogObject)
    dispatch(addBlog(newBlog))
  }
}

export const removeBlog = (blogObject) => {
  return async dispatch => {
    await BlogService.remove(blogObject.id)
    dispatch(deleteBlog(blogObject))
  }
}

export const likeBlog = (id, newBlog) => {
  return async dispatch => {
    const updatedBlog = await BlogService.update(id, newBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer
