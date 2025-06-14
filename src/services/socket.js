import io from 'socket.io-client';
import { store } from '../store';
import { newMessage } from '../store/slices/conversationSlice';
let socket;
const initSocket = ()=>{
  socket = io.connect(import.meta.env.VITE_API_BASE_URL)

  socket.on("new_message", (res)=>{
    store.dispatch(newMessage(res))
  })   

  socket.emit("join_user", store.getState().authSlice.user._id)  
}

export {initSocket, socket}