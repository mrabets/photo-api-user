import {createSlice} from '@reduxjs/toolkit'
import {IUserSliceState} from '../types/data'

const initialState: IUserSliceState = {
  id: null,
  email: null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null ,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;

      localStorage.setItem("token", state.token || '')
    },
    removeUser(state) {
      state.id = null;
      state.email = null;
      state.token = null;

      localStorage.removeItem("token")
    }
  }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer