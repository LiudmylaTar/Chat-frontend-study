import MessageItem from "../MessageItem/MessageItem";
import css from "./MessageList.module.css";
import { useEffect, useRef } from "react";

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className={css.chatArea}>
      {messages.map((msg) => (
        <MessageItem key={msg.id || msg._id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
