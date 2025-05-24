import css from "./MessageInput.module.css";
import { IoMdSend } from "react-icons/io";

export default function MessageInput({ chatId }) {
  return (
    <form className={css.inputForm}>
      <input
        type="text"
        placeholder="Type your message"
        className={css.inputField}
      ></input>
      <button className={css.sendButton} type="submit">
        <IoMdSend />
      </button>
    </form>
  );
}
