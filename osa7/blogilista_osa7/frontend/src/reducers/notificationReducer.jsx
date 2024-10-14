import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, type: '' },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return { message: null, type: '' }
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (message, type, timeout) => {
  return dispatch => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer
