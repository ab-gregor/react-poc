import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};


export const loginUserAsync = createAsyncThunk(
  'user/loginAsync',
  async (userData, thunkAPI) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userData);
      }, 1000);
    });
  }
);

const initialState = {
  name: null,
  role: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.name = null;
      state.role = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
    });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
