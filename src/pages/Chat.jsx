import { Link } from "react-router-dom";
import { useState } from "react";
import ConversationList from "../components/ConversationList";
import ChatBox from "../components/ChatBox";
import "../styles/Chat.css";
import { useSelector } from "react-redux";

function Chat() {
  const userData = useSelector((state) => state.user);
  // Add state to control input visibility
  const [showInputBox, setShowInputBox] = useState(false);

  // Static conversation data
  const conversations = [
    {
      id: "conv1",
      user: { id: "user456", name: "Jane Doe", email: "jane@example.com" },
      lastMessage: {
        text: "Hello there!",
        timestamp: new Date().getTime() - 3600000,
      },
    },
    {
      id: "conv2",
      user: { id: "user789", name: "John Smith", email: "john@example.com" },
      lastMessage: {
        text: "Good to see you",
        timestamp: new Date().getTime() - 7200000,
      },
    },
    {
      id: "conv3",
      user: { id: "user101", name: "Sarah Wilson", email: "sarah@example.com" },
      lastMessage: {
        text: "Thanks for your help!",
        timestamp: new Date().getTime() - 86400000,
      },
    },
  ];

  // Static selected conversation
  const selectedConversation = conversations[0];

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-info">
            <Link to="/chat" className="user-profile">
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
            <div className="email-input-container">
              <input
                type="email"
                placeholder="Enter email address"
                className="email-input"
              />
              <div className="input-actions">
                <button
                  className="add-button"
                  onClick={() => setShowInputBox(false)}
                >
                  Add
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setShowInputBox(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <ConversationList
          conversations={conversations}
          selectedId={selectedConversation.id}
        />
      </div>

      <ChatBox conversation={selectedConversation} currentUser={userData} />
    </div>
  );
}

export default Chat;
