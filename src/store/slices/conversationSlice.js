import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatServices } from "../../services/api";

export const fetchConversations = createAsyncThunk(
  "/chat/conversationlist",
  async () => {
    try {
      const res = await chatServices.listConversation();
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const addConversation = createAsyncThunk(
  "/chat/createconversation",
  async (participentEmail) => {
    try {
      const res = await chatServices.addConversation(participentEmail);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const fetchMessages = createAsyncThunk(
  "/chat/getmessage",
  async (conversationID) => {
    try {      
      const res = await chatServices.getMessages(conversationID);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const sendMessage = createAsyncThunk(
  "/chat/send",
  async (data) => {
    try {      
      const res = await chatServices.sendMessage(data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversation: null,
    selectedConversation: null,
    messages: [],
    status: "active",
    error: null,
  },
  reducers: {
    selectConversation: (state, actions)=>{
     state.selectedConversation = actions.payload;
    },
    newMessage: (state, actions)=>{
      state.messages.push(actions.payload)
    }
  },
  extraReducers: (builder) => {
    builder
    // Conversation logic
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
      })
      .addCase(addConversation.fulfilled, (state, action)=>{        
        state.conversation.unshift(action.payload)
      })
      // Messages Login
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })      
  },
});

export const {selectConversation, newMessage} = conversationSlice.actions;
export default conversationSlice.reducer;
