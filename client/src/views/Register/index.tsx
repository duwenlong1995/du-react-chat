// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import Logo from "@/assets/images/logo.svg";
import styles from "./register.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 全局引入react-toastify样式
import { useNavigate, Link } from "react-router-dom";
import { registerRoute } from "@/request/loginApi";
import { log } from "console";

export default function Register() {
  const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;
  const navigate = useNavigate();
  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: any) => {
    console.log({ ...values, [event.target.name]: event.target.value });

    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };
  // 注册账号
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const params: any = {
        username,
        email,
        password,
      };
      await registerRoute(params).then((res) => {
        if (res.status === false) {
          toast.error(res.msg, toastOptions);
        }
        if (res.status === true) {
          localStorage.setItem(apiUrl, JSON.stringify(res.user));
          navigate("/login");
        }
      });
    }
  };
  return (
    <>
      <div className={styles.registerPage}>
        <form action="" onSubmit={(event: any) => handleSubmit(event)}>
          <div className={styles.brand}>
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
