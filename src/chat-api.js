import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchChats = async () => {
  const res = await axios.get(`${BASE_URL}/api/chat`);
  return res.data;
};

export const createChat = async (chatData) => {
  const res = await axios.post(`${BASE_URL}/api/chat`, chatData);
  return res.data;
};

export const deleteChat = async (chatId) => {
  const res = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
    method: "DELETE",
  });
  return res.json();
};
export const updateChat = async (chatId, chatData) => {
  const res = await axios.put(`${BASE_URL}/api/chat/${chatId}`, chatData);
  return res.data;
};
