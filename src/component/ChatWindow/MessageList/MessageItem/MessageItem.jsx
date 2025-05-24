import css from "./MessageItem.module.css";

export default function MessageItem({ message }) {
  const { sender, text, createdAt } = message;

  const isUser = sender === "user"; // need to check after avtorisation

  return (
    <div className={isUser ? css.userMsg : css.botMsg}>
      <p>{text}</p>
      <span>{new Date(createdAt).toLocaleTimeString()}</span>
    </div>
  );
}
