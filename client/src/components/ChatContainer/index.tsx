import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../ChatInput";
import Logout from "../Logout";
import { v4 as uuidv4 } from "uuid";
import styles from "./chatContainer.module.scss";
import { sendMessageRoute, recieveMessageRoute } from "@/request/Messages";

export default function ChatContainer({ currentChat, socket }: any) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef<HTMLDivElement>();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;

  // 发送消息
  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem(apiUrl));
      const params: any = {
        from: data._id,
        to: currentChat._id,
      };
      console.log(params);

      await sendMessageRoute(params).then((res) => {
        setMessages(res);
      });
    };
    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem(apiUrl))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  // 点击网名发起请求
  const handleSendMsg = async (msg: any) => {
    const data = await JSON.parse(localStorage.getItem(apiUrl));
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    const params = {
      from: data._id,
      to: currentChat._id,
      message: msg,
    };
    console.log(params);

    await recieveMessageRoute(params).then((res) => {
      console.log(res);
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: any) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.userDetails}>
          <div className={styles.avatar}>
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className={styles.username}>
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      {/* 聊天区域 */}
      <div className={styles.chatMessages}>
        {messages.map((message: any) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`${styles.message} ${
                  message.fromSelf ? styles.sended : styles.recieved
                }`}
              >
                <div className={styles.content}>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
