import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser } from '../api';

const USER_SLICE_NAME = 'user';

export const authUser = createAsyncThunk(
  `${USER_SLICE_NAME}/authUser`,
  async (params, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await createUser(params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState: {
    user: null,
    error: null,
    isFetching: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
      state.user = null;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.user = null;
    });
  },
});

export default userSlice.reducer;
