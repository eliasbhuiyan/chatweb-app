import { useEffect, useState } from "react";
import { formatDistanceToNow } from "../utils/dateUtils";
import { chatServices } from "../services/api";
import { useSelector } from "react-redux";

function ConversationList({ selectedId }) {
  const userData = useSelector((state) => state.user);
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await chatServices.listConversation();
        setConversation(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!conversation || conversation.length === 0) {
    return (
      <div className="empty-conversations">
        <p>No conversations yet</p>
        <p>Start a new conversation using the button above</p>
      </div>
    );
  }

  return (
    <div className="conversation-list">
      {conversation.map((item) =>
        item.creator._id === userData._id ? (
          <div
            key={item._id}
            className={`conversation-item ${
              selectedId === conversation.id ? "selected" : ""
            }`}
          >
            <div className="avatar">
              {item.participent.avatar ? (
                <img src={item.participent.avatar} alt="" />
              ) : (
                item.participent.fullName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="conversation-details">
              <div className="conversation-header">
                <h3>{item.participent.fullName}</h3>
                {item.lastMessage && (
                  <span className="time">
                    {formatDistanceToNow(item.lastMessage.updatedAt)}
                  </span>
                )}
              </div>
              {item.lastMessage && (
                <p className="last-message">{item.lastMessage.content}</p>
              )}
            </div>
          </div>
        ) : (
          <div
            key={item._id}
            className={`conversation-item ${
              selectedId === conversation.id ? "selected" : ""
            }`}
          >
            <div className="avatar">
              {item.creator.avatar ? (
                <img src={item.creator.avatar} alt="" />
              ) : (
                item.creator.fullName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="conversation-details">
              <div className="conversation-header">
                <h3>{item.creator.fullName}</h3>
                {item.lastMessage && (
                  <span className="time">
                    {formatDistanceToNow(item.lastMessage.updatedAt)}
                  </span>
                )}
              </div>
              {item.lastMessage && (
                <p className="last-message">{item.lastMessage.content}</p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ConversationList;
