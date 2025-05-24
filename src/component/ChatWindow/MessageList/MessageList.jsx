import MessageItem from "../MessageItem/MessageItem";
import css from "./MessageList.module.css";
export default function MessageList({ messages }) {
  return (
    <div className={css.chatArea}>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}
