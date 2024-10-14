import { createSlice } from '@reduxjs/toolkit'
import LoginService from '../services/login'
import BlogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await LoginService.login(credentials)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    BlogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      BlogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }
}

export default userSlice.reducer
