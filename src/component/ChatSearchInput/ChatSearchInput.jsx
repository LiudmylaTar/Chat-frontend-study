import css from "./ChatSearchInput.module.css";
import { MdOutlinePostAdd } from "react-icons/md";

export default function ChatSearchInput({ value, onFilter, onAddClick }) {
  return (
    <div className={css.wrapper}>
      <input
        className={css.input}
        name="search"
        autoFocus
        placeholder="Search or start new chat"
        type="text"
        value={value}
        onChange={(event) => onFilter(event.target.value)}
      ></input>
      <button onClick={onAddClick}>
        {" "}
        <MdOutlinePostAdd size={18} />
      </button>
    </div>
  );
}
