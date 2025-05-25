import Modal from "react-modal";
import css from "./NewChatModal.module.css";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";

export default function NewChatModal({ isOpen, onClose, onSave, initialData }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
      let response;

      if (initialData?._id) {
        // edit
        response = await axios.put(
          `http://localhost:5000/api/chat/${initialData._id}`,
          {
            firstName,
            lastName,
          }
        );
      } else {
        // created
        response = await axios.post("http://localhost:5000/api/chat", {
          firstName,
          lastName,
        });
      }

      onSave(response.data);
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
        <button type="submit">
          {initialData?._id ? "Update Chat" : "Add new Chat"}
        </button>
        <button type="button" onClick={onClose} className={css.closeBtn}>
          <IoClose size="24" />
        </button>
      </form>
    </Modal>
  );
}
