import MessageItem from "./MessageItem/MessageItem";

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}
