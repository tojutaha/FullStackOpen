import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload.message
    },
    clearNotification() {
      return ''
    }
  }
})

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(addNotification({ message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer