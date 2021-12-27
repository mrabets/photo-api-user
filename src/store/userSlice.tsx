import {createSlice} from '@reduxjs/toolkit'
import {IUserSliceState} from '../types/data'

const initialState: IUserSliceState = {
  user_id: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null,
  email: null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null ,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user_id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;

      localStorage.setItem("user_id", state.user_id || '')
      localStorage.setItem("token", state.token || '')
    },
    removeUser(state) {
      state.user_id = null;
      state.email = null;
      state.token = null;

      localStorage.removeItem("user_id")
      localStorage.removeItem("token")
    }
  }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer