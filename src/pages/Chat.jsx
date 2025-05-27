import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConversationList from "../components/ConversationList";
import ChatBox from "../components/ChatBox";
import "../styles/Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { addConversation } from "../store/slices/conversationSlice";
import { initSocket, socket } from "../services/socket";

function Chat() {
    const [activeUsers, setActiveUsers] = useState([])
  const userData = useSelector((state) => state.authSlice.user);
  const [contactEmail, setContactEmail] = useState("");
  // Add state to control input visibility
  const [showInputBox, setShowInputBox] = useState(false);
  const dispatch = useDispatch();
  const { selectedConversation, conversation } = useSelector(
    (state) => state.conversationSlice
  );

  const handelAddConversation = async (e) => {
    e.preventDefault();
    try {
      dispatch(addConversation(contactEmail));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  const size = conversation.length;

  useEffect(()=>{
    initSocket()
    socket.on("active_users", (res)=> setActiveUsers(res))
  },[])

  useEffect(()=>{
    conversation.forEach(item => {
      socket.emit("join_room", item._id)      
    });
  },[size])
  
  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-info">
            <Link to="/chat/profile" className="user-profile">
              <div className="userImg">
                <img src={userData?.avatar} alt="" />
              </div>
              <h4>{userData?.fullName}</h4>
            </Link>
            <Link to="/login" className="logout-button">
              Logout
            </Link>
          </div>

          <div className="conversation-header-container">
            <h2>Conversations</h2>
            <button
              className="new-conversation-button"
              onClick={() => setShowInputBox(true)}
              style={{ display: showInputBox ? "none" : "block" }}
            >
              +
            </button>
          </div>

          {showInputBox && (
            <form
              className="email-input-container"
              onSubmit={handelAddConversation}
            >
              <input
                type="email"
                placeholder="Enter email address"
                className="email-input"
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
              <div className="input-actions">
                <button type="submit" className="add-button">
                  Add
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setShowInputBox(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <ConversationList activeUsers={activeUsers}/>
      </div>
     
     {
      selectedConversation
      ?
      <ChatBox conversation={selectedConversation} currentUser={userData} />
      :
      <div className="chat-box empty-chat">
        <div className="no-conversation-selected">
          <p>Select a conversation or start a new one</p>
        </div>
      </div>
     }
    </div>
  );
}

export default Chat;
