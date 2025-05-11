import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../utils/dateUtils";
import { useEffect } from "react";
import { fetchMessages } from "../store/slices/conversationSlice";

function ChatBox() {
  const dispatch = useDispatch()
  const { selectedConversation, messages } = useSelector(
    (state) => state.conversationSlice
  );
  const user = useSelector((state) => state.authSlice.user);

  useEffect(()=>{        
    dispatch(fetchMessages(selectedConversation.conversationID))
  },[selectedConversation])  

  return (
    <div className="chat-box">
      <div className="chat-header">
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

      <div className="messages-container">
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

      <form className="message-input-form">
        <input type="text" placeholder="Type a message..." />
        <button type="button">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
