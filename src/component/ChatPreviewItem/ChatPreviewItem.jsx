import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import css from "./ChatPreviewItem.module.css";

export default function ChatPreviewItem({ chat, onDeleted, onEdit }) {
  const { firstName, lastName, messages, id } = chat;
  const fullName = `${firstName} ${lastName}`.trim();

  const lastMessageObj = messages[messages.length - 1];
  const lastMessage = lastMessageObj?.text || "No messages yet";
  const lastMessageDate = lastMessageObj?.createdAt || null;

  const formattedDate = lastMessageDate
    ? new Date(lastMessageDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className={css.preview}>
      <FaUserCircle className={css.avatar} />
      <button
        className={`${css.button} ${css.deleteButton}`}
        onClick={() => onDeleted(id)}
        type="button"
      >
        <RiDeleteBinLine size={18} />
      </button>
      <div className={css.info}>
        <h4 className={css.name}>{fullName}</h4>
        <p className={css.message}>{lastMessage}</p>
      </div>
      <div className={css.date}>{formattedDate}</div>
      <button
        className={`${css.button} ${css.editButton}`}
        onClick={() => onEdit(initialData)}
        type="button"
      >
        <RiEdit2Line size={18} />
      </button>
    </div>
  );
}
