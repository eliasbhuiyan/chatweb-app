import { formatDistanceToNow } from '../utils/dateUtils'

function ConversationList({ conversations, selectedId }) {
  if (!conversations || conversations.length === 0) {
    return (
      <div className="empty-conversations">
        <p>No conversations yet</p>
        <p>Start a new conversation using the button above</p>
      </div>
    )
  }

  return (
    <div className="conversation-list">
      {conversations.map(conversation => (
        <div 
          key={conversation.id} 
          className={`conversation-item ${selectedId === conversation.id ? 'selected' : ''}`}
        >
          <div className="avatar">
            {conversation.user.name.charAt(0).toUpperCase()}
          </div>
          <div className="conversation-details">
            <div className="conversation-header">
              <h3>{conversation.user.name}</h3>
              {conversation.lastMessage && (
                <span className="time">
                  {formatDistanceToNow(conversation.lastMessage.timestamp)}
                </span>
              )}
            </div>
            {conversation.lastMessage && (
              <p className="last-message">{conversation.lastMessage.text}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConversationList 