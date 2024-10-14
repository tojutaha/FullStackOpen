import { configureStore, combineReducers } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationRedurec from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationRedurec
  }
})

export default store