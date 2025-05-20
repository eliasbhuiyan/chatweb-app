import io from 'socket.io-client';
import { store } from '../store';
import { newMessage } from '../store/slices/conversationSlice';
let socket;
export const initSocket = ()=>{
  socket = io.connect("http://localhost:8000")

  socket.on("new_message", (res)=>{
    store.dispatch(newMessage(res))    
  })
   
  socket.on("connect", ()=> console.log("Socket connected with server"));
}