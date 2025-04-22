import { formatTime } from '../utils/dateUtils'

function ChatBox({ conversation, currentUser }) {
  // Static messages for design purposes
  const messages = [
    {
      id: 'm1',
      text: 'Hello there!',
      sender: conversation?.user,
      timestamp: new Date().getTime() - 3600000
    },
    {
      id: 'm2',
      text: 'Hi! How are you?',
      sender: currentUser,
      timestamp: new Date().getTime() - 3500000
    },
    {
      id: 'm3',
      text: 'I\'m doing well, thanks for asking!',
      sender: conversation?.user,
      timestamp: new Date().getTime() - 3400000
    },
    {
      id: 'm4',
      text: 'That\'s great to hear. What have you been up to lately?',
      sender: currentUser,
      timestamp: new Date().getTime() - 3300000
    },
    {
      id: 'm5',
      text: 'Just working on some projects. How about you?',
      sender: conversation?.user,
      timestamp: new Date().getTime() - 3200000
    }
  ]

  if (!conversation) {
    return (
      <div className="chat-box empty-chat">
        <div className="no-conversation-selected">
          <p>Select a conversation or start a new one</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="avatar">{conversation.user.name.charAt(0).toUpperCase()}</div>
          <div className="user-details">
            <h3>{conversation.user.name}</h3>
            <p>{conversation.user.email}</p>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender.id === currentUser.id ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>

      <form className="message-input-form">
        <input
          type="text"
          placeholder="Type a message..."
        />
        <button type="button">
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatBox 