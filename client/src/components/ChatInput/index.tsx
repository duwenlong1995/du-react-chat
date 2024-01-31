import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import styles from "./chatInput.module.scss";

export default function ChatInput({ handleSendMsg }: any) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // 弹出emo框
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  // 选择emo表情
  const handleEmojiClick = (event: any, emojiObject: any) => {
    let message = msg;
    message += emojiObject.emoji;
    console.log(emojiObject);
    setMsg(message);
  };

  const sendChat = (event: any) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className={styles.chatInput}>
      <div className={styles.buttonContainer}>
        <div className={styles.emoji}>
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form
        className={styles.inputContainer}
        onSubmit={(event) => sendChat(event)}
      >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
