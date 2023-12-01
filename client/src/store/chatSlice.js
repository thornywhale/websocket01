import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllMessages } from '../api';

const CHAT_SLICE_NAME = 'chat';

export const getChat = createAsyncThunk(
  `${CHAT_SLICE_NAME}/getChat`,
  async (params, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await getAllMessages();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: CHAT_SLICE_NAME,
  initialState: {
    messages: [],
    error: null,
    isFetching: false,
  },
  reducers: {
    addMessage: (state, action) => {
      state.error = null;
      state.messages.push(action.payload);
    },
    errMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChat.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.messages.push(...action.payload);
    });
    builder.addCase(getChat.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});

export const { addMessage, errMessage } = chatSlice.actions;
export default chatSlice.reducer;
