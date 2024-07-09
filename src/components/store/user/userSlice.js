// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, signoutSuccess } = userSlice.actions;
export default userSlice.reducer;
