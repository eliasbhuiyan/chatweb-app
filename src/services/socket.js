import io from 'socket.io-client';
import { store } from '../store';
import { newMessage } from '../store/slices/conversationSlice';
let socket;
const initSocket = ()=>{
  socket = io.connect("http://localhost:8000")

  socket.on("new_message", (res)=>{
    store.dispatch(newMessage(res))
  })   

  socket.emit("join_user", store.getState().authSlice.user._id)  
}

export {initSocket, socket}