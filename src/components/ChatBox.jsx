import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../utils/dateUtils";
import { useEffect, useRef, useState } from "react";
import { fetchMessages, selectConversation, sendMessage } from "../store/slices/conversationSlice";

function ChatBox() {
  const chatContainer = useRef(null)
  const [content, setContent] = useState("")
  const dispatch = useDispatch()
  const { selectedConversation, messages } = useSelector(
    (state) => state.conversationSlice
  );
  const user = useSelector((state) => state.authSlice.user);

  useEffect(()=>{        
    dispatch(fetchMessages(selectedConversation.conversationID))   
  },[selectedConversation])  

  useEffect(() => {
    const container = chatContainer.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    
  }, [messages]);

  const handelSendMessage = (e)=>{
    e.preventDefault()
    dispatch(sendMessage({content,reciverId: selectedConversation._id,conversationId: selectedConversation.conversationID}))
    setContent("")
  } 
  
  return (
    <div className={`chat-box ${selectedConversation ? "active" : ""}`}>
      <div className="chat-header">
        <button className="back-button" onClick={() => dispatch(selectConversation(null))}>&#8678;</button>
        <div className="chat-user-info">
          <div className="avatar">
            {
             selectedConversation?.fullName?.charAt(0).toUpperCase()  
            }
          </div>
          <div className="user-details">
            <h3>{selectedConversation?.fullName}</h3>
            <p>{selectedConversation?.email}</p>
          </div>
        </div>
      </div>

      <div ref={chatContainer} className="messages-container">
        {
        messages.length > 0
        ?
        messages.map((message) => (
          <div
            key={message._id}
            className={`message ${
              message?.sender === user?._id ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              <p>{message?.content}</p>
              <span className="message-time">
                {formatTime(message?.timestamp)}
              </span>
            </div>
          </div>
        ))
        :
        <p className="no-message">No message</p>
        }
      </div>

      <form onSubmit={handelSendMessage} className="message-input-form">
        <input value={content} required onChange={(e)=>setContent(e.target.value)} type="text" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
