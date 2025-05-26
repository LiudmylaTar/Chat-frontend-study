import Modal from "react-modal";
import css from "./NewChatModal.module.css";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { updateChat, createChat } from "../../chat-api";

export default function NewChatModal({ isOpen, onClose, onSave, initialData }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || "");
      setLastName(initialData.lastName || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) return;

    try {
      let chat;
      if (initialData._id) {
        // edit
        chat = await updateChat(initialData._id, { firstName, lastName });
      } else {
        // created
        chat = await createChat({ firstName, lastName });
      }

      onSave(chat);
      setFirstName("");
      setLastName("");
      onClose();
    } catch (err) {
      console.error("Failed to save chat:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="AddChat Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <h2>{initialData?._id ? "Edit Chat" : "Create New Chat"}</h2>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          placeholder="First name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className={css.input}
          placeholder="Last name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit" className={css.addBtn}>
          {initialData?._id ? "Update Chat" : "Add new Chat"}
        </button>
        <button type="button" onClick={onClose} className={css.closeBtn}>
          <IoClose size="24" />
        </button>
      </form>
    </Modal>
  );
}
