import css from "./MessageInput.module.css";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { useState } from "react";

export default function MessageInput({ chatId, onAddMessage }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;
    const userMsg = {
      id: Date.now(),
      text,
      sender: "user",
      createdAt: new Date().toISOString(),
    };

    onAddMessage(chatId, userMsg);
    setText("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat/message", {
        chatId,
        message: text,
      });

      const botMsg = {
        id: Date.now() + 1,
        text: res.data.autoResponse,
        sender: "bot",
        createdAt: new Date().toISOString(),
      };

      onAddMessage(chatId, botMsg);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className={css.inputForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message"
        className={css.inputField}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button className={css.sendButton} type="submit">
        <IoMdSend />
      </button>
    </form>
  );
}
