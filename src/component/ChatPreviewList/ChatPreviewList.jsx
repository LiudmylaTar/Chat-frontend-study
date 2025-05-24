import css from "./ChatPreviewList.module.css";
import ChatPreviewItem from "../ChatPreviewItem/ChatPreviewItem";

export default function ChatPreviewList({ filterChats, onAddClick }) {
  return (
    <div>
      <h3>Chats</h3>
      {filterChats.length === 0 ? (
        <div className={css.empty}>
          <p>No chats found</p>
          <button onClick={onAddClick}>Create new chat</button>
        </div>
      ) : (
        filterChats.map((chat) => <ChatPreviewItem key={chat.id} chat={chat} />)
      )}
    </div>
  );
}
