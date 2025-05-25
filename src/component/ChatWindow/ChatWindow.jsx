import css from "./ChatWindow.module.css";
import AvatarWithStatus from "../AvatarWithStatus/AvatarWithStatus";
import MessageList from "./MessageList/MessageList";
import MessageInput from "./MessageInput/MessageInput";

export default function ChatWindow({ chat, onAddMessage }) {
  if (!chat) return <p>Select a chat to start messaging</p>;

  const fullName = `${chat.firstName} ${chat.lastName}`.trim();

  return (
    <div className={css.chatWindow}>
      <div className={css.headChat}>
        <AvatarWithStatus />
        <p className={css.name}>{fullName}</p>
      </div>

      <MessageList messages={chat.messages} />
      <MessageInput chatId={chat._id} onAddMessage={onAddMessage} />
    </div>
  );
}
