import { useState, useMemo } from "react";
import ChatSearchInput from "./component/ChatSearchInput/ChatSearchInput";
import ChatPreviewList from "./component/ChatPreviewList/ChatPreviewList";
import "./App.css";
import Header from "./component/Header/Header";
import ChatWindow from "./component/ChatWindow/ChatWindow";
import { mockChats } from "./data/mockChats";
import NewChatModal from "./component/NewChatModal/NewChatModal";

import { useDebounce } from "use-debounce";

function App() {
  const [selectedChat] = useState(mockChats[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState([...mockChats]);

  const [search, setSearch] = useState("");
  const [debouncedInputValue] = useDebounce(search, 500);

  const handleCreateChat = (newChat) => {
    setChats((prev) => [...prev, newChat]);
  };

  const searchChat = useMemo(() => {
    return chats.filter((chat) =>
      `${chat.firstName} ${chat.lastName}`
        .toLowerCase()
        .includes(debouncedInputValue.toLowerCase())
    );
  }, [debouncedInputValue, chats]);

  const deleteChat = (chatId) => {
    setChats((prevChats) => {
      return prevChats.filter((chat) => chat.id !== chatId);
    });
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <aside className="sidebar">
          <ChatSearchInput
            value={search}
            onFilter={setSearch}
            onAddClick={() => setIsModalOpen(true)}
          />
          <NewChatModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateChat}
          />
          <ChatPreviewList
            filterChats={searchChat}
            onAddClick={() => setIsModalOpen(true)}
            onDelete={deleteChat}
          />
        </aside>
        <main className="chat-area">
          <ChatWindow chat={selectedChat} />
        </main>
      </div>
    </>
  );
}

export default App;
