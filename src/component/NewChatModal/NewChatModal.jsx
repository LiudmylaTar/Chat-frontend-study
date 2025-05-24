import Modal from "react-modal";
import css from "./NewChatModal.module.css";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function NewChatModal({ isOpen, onClose, onCreate }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    const newChat = {
      id: Date.now().toString(),
      firstName,
      lastName,
      lastMessage: "",
      lastMessageDate: new Date().toISOString(),
      messages: [],
    };
    onCreate(newChat);
    setFirstName("");
    setLastName("");
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="AddChat Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <h2>Created New Chat</h2>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          placeholder="First name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Add new Chat</button>
        <button type="button" onClick={onClose} className={css.closeBtn}>
          <IoClose size="24" />
        </button>
      </form>
    </Modal>
  );
}
