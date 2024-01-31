import { useState, useEffect } from "react";
import Logo from "@/assets/images/logo.svg";
import styles from "./contacts.module.scss";
import useDraggable from "@/hooks/useDraggable";

export default function Contacts({ contacts, changeChat }: any) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem(apiUrl));
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    fetchData();
  }, []);
  const changeCurrentChat = (index: any, contact: any) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  // 将列表数据用函数返回
  const getAppList = () => {
    return contacts;
  };
  const {
    // 当前拖拽对象类
    oldDragItem,
    // 拖拽交换对象类
    newDragItem,
    // 是否拖拽类
    isActive,
    // 是否拖拽进行类
    isEnter,
    list,
    onDragStart,
    onDragEnter,
    onDragEnd,
  } = useDraggable(getAppList);
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className={styles.contacts}>
          <div className={styles.brand}>
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className={styles.contacts}>
            {list.map((contact: any, index: any) => {
              return (
                <div
                  key={contact._id}
                  className={
                    `${styles.contact} ${
                      index === currentSelected ? styles.selected : ""
                    }` ||
                    `${
                      oldDragItem == contact && isActive == contact.id
                        ? styles.active
                        : newDragItem == contact && isEnter == contact.id
                        ? styles.enter
                        : contact
                    }`
                  }
                  onClick={() => changeCurrentChat(index, contact)}
                  draggable={true}
                  onDragStart={() => {
                    onDragStart(contact);
                  }}
                  onDragEnter={() => {
                    onDragEnter(contact);
                  }}
                  onDragEnd={() => {
                    onDragEnd();
                  }}
                >
                  {/* <div
                    className={
                      oldDragItem == contact && isActive == contact.id
                        ? styles.active
                        : newDragItem == contact && isEnter == contact.id
                        ? styles.enter
                        : contact
                    }
                    draggable={true}
                    onDragStart={() => {
                      onDragStart(contact);
                    }}
                    onDragEnter={() => {
                      onDragEnter(contact);
                    }}
                    onDragEnd={() => {
                      onDragEnd();
                    }}
                  > */}
                  <div className={styles.avatar}>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className={styles.username}>
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.currentUser}>
            <div className={styles.avatar}>
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className={styles.username}>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
