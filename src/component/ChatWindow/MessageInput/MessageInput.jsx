import css from "./MessageInput.module.css";
import { IoMdSend } from "react-icons/io";

export default function MessageInput({ chatId }) {
  return (
    <form className={css.inputForm}>
      <input type="text" placeholder="Type your message"></input>
      <button type="submit">
        <IoMdSend />
      </button>
    </form>
  );
}
