import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatServices } from "../../services/api";

export const fetchConversations = createAsyncThunk(
  "/chat/conversationlist",
  async () => {
    const res = await chatServices.listConversation();
    return res;
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversation: null,
    status: "active",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversation = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default conversationSlice.reducer;
