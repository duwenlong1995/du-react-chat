import { useState, useEffect } from "react";
import Robot from "@/assets/images/robot.gif";
import styles from "./welcome.module.scss";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setUserName(await JSON.parse(localStorage.getItem(apiUrl)).username);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.welcome}>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}
