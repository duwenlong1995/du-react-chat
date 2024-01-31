import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatContainer from "@/components/ChatContainer";
import Contacts from "@/components/Contacts";
import Welcome from "@/components/Welcome";
import styles from "./chat.module.scss";
import { ws } from "@/utils/ws";
import { allUsersRoute } from "@/request/allUsersApi";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef(io(ws));
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem(apiUrl)) {
        setCurrentUser(await JSON.parse(localStorage.getItem(apiUrl)));
      }
    };
    fetchData();
  }, []);

  // 初始化websocket io
  useEffect(() => {
    if (currentUser) {
      socket.current = io(ws);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const params = { id: currentUser._id };
          await allUsersRoute(params).then((res) => {
            setContacts(res);
          });
        } else {
          navigate("/setAvatar");
        }
      }
    };
    // 调用异步函数
    fetchData();
  }, [currentUser]);
  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <div className={styles.chatPage}>
        <div className={styles.container}>
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}
