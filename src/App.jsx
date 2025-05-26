import { useState, useMemo, useEffect, useRef } from "react";
import ChatSearchInput from "./component/ChatSearchInput/ChatSearchInput";
import ChatPreviewList from "./component/ChatPreviewList/ChatPreviewList";
import "./App.css";
import Header from "./component/Header/Header";
import ChatWindow from "./component/ChatWindow/ChatWindow";
import NewChatModal from "./component/NewChatModal/NewChatModal";
import { useDebounce } from "use-debounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchChats, deleteChat } from "./chat-api";

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedInputValue] = useDebounce(search, 500);
  const [editChat, setEditChat] = useState(null);
  const isModalOpen = !!editChat;
  const selectedChatIdRef = useRef(selectedChat?._id);

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
        setSelectedChat(data[0] || null); // перший чат — як активний
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };
    getChats();
  }, []);

  useEffect(() => {
    selectedChatIdRef.current = selectedChat?._id;
  }, [selectedChat]);

  const searchChat = useMemo(() => {
    return chats.filter((chat) =>
      `${chat.firstName} ${chat.lastName}`
        .toLowerCase()
        .includes(debouncedInputValue.toLowerCase())
    );
  }, [debouncedInputValue, chats]);

  const handleDelete = async (chatId) => {
    try {
      const remove = await deleteChat(chatId);
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));

      if (selectedChat?._id === chatId) {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error("❌ Delete Error:", error);
    }
  };

  const addMessageToChat = (chatId, message) => {
    if (chatId !== selectedChatIdRef.current && message.sender === "bot") {
      toast.info(`New message ${message.text}`);
    }

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };
  const handleUpdateChat = (updatedChat) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === updatedChat._id ? updatedChat : chat
      )
    );
    if (selectedChat?._id === updatedChat._id) {
      setSelectedChat(updatedChat);
    }
    setEditChat(null);
  };

  const handleOpenModal = () => {
    setEditChat({ firstName: "", lastName: "" });
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="main-container">
        <aside className="sidebar">
          <ChatSearchInput
            value={search}
            onFilter={setSearch}
            onAddClick={handleOpenModal}
          />
          <NewChatModal
            isOpen={isModalOpen}
            initialData={editChat}
            onClose={() => setEditChat(null)}
            onSave={(chat) => {
              if (editChat?._id) {
                handleUpdateChat(chat);
              } else {
                setChats((prev) => [...prev, chat]);
              }
            }}
          />
          <ChatPreviewList
            filterChats={searchChat}
            onChatSelect={handleChatSelect}
            selectedChatId={selectedChat?._id}
            onDelete={handleDelete}
            onEdit={setEditChat}
            onAddClick={handleOpenModal}
          />
        </aside>
        <main className="chat-area">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} onAddMessage={addMessageToChat} />
          ) : (
            <p style={{ padding: "1rem" }}>Select or create a chat</p>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
