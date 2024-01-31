import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styles from "./logout.module.scss";
import { logoutRoute } from "@/request/loginApi";

export default function Logout() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;

  const handleClick = async () => {
    const id = await JSON.parse(localStorage.getItem(apiUrl))._id;
    localStorage.removeItem("token");
    const params = { id: id };
    logoutRoute(params).then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    });
  };
  return (
    <div className={styles.logOut} onClick={handleClick}>
      <BiPowerOff />
    </div>
  );
}
