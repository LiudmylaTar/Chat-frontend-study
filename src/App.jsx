import { useState, useMemo, useEffect } from "react";
import ChatSearchInput from "./component/ChatSearchInput/ChatSearchInput";
import ChatPreviewList from "./component/ChatPreviewList/ChatPreviewList";
import "./App.css";
import Header from "./component/Header/Header";
import ChatWindow from "./component/ChatWindow/ChatWindow";
// import { mockChats } from "./data/mockChats";
import NewChatModal from "./component/NewChatModal/NewChatModal";
import axios from "axios";
import { useDebounce } from "use-debounce";

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedInputValue] = useDebounce(search, 500);
  const [editChat, setEditChat] = useState(null);
  const isModalOpen = !!editChat;

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/chat`);
        setChats(res.data);
        setSelectedChat(res.data[0] || null); // перший чат — як активний
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };
    fetchChats();
  }, []);

  const handleCreateChat = async (newChatData) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/chat`, newChatData);
      const createdChat = res.data;

      setChats((prev) => [...prev, createdChat]);
      setEditChat(null);
    } catch (err) {
      console.error("Failed to create chat:", err);
    }
  };

  const searchChat = useMemo(() => {
    return chats.filter((chat) =>
      `${chat.firstName} ${chat.lastName}`
        .toLowerCase()
        .includes(debouncedInputValue.toLowerCase())
    );
  }, [debouncedInputValue, chats]);

  const deleteChat = (chatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
    if (selectedChat?._id === chatId) {
      setSelectedChat(null); // якщо видалили активний чат
    }
  };

  const addMessageToChat = (chatId, message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
    if (selectedChat?._id === chatId) {
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
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

  return (
    <>
      <Header />
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
              if (chat._id) {
                handleUpdateChat(chat);
              } else {
                handleCreateChat(chat);
              }
            }}
          />
          <ChatPreviewList
            filterChats={searchChat}
            onChatSelect={setSelectedChat}
            selectedChatId={selectedChat?._id}
            onDelete={deleteChat}
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
