import css from "./ChatPreviewList.module.css";
import ChatPreviewItem from "../ChatPreviewItem/ChatPreviewItem";

export default function ChatPreviewList({
  filterChats,
  onAddClick,
  onDelete,
  onChatSelect,
  selectedChatId,
  onEdit,
}) {
  return (
    <div>
      <h3>Chats</h3>
      {filterChats.length === 0 ? (
        <div className={css.empty}>
          <p>No chats found</p>
          <button onClick={onAddClick}>Create new chat</button>
        </div>
      ) : (
        filterChats.map((chat) => (
          <ChatPreviewItem
            key={chat._id}
            chat={chat}
            onDeleted={onDelete}
            onClick={() => onChatSelect(chat)}
            isSelected={chat._id === selectedChatId}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}
