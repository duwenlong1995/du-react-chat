import { useState, useEffect } from "react";
import Logo from "@/assets/images/logo.svg";
import styles from "./login.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 全局引入react-toastify样式
import { useNavigate, Link } from "react-router-dom";
import { loginRoute } from "@/request/loginApi";

export default function Login() {
  /**
   * 安装依赖的时候后面加上--legacy-peer-deps兼容版本
   */
  // localStorage.setItem("lege-react-management-token", "111111");
  const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;

  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  // 登录方法
  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      // const { data } = await axios.post(loginRoute, {
      //   username,
      //   password,
      // });
      const params: any = {
        username: username,
        password: password,
      };
      loginRoute(params).then((res) => {
        if (res.status === false) {
          toast.error(res.msg, toastOptions);
        }
        if (res.status === true) {
          localStorage.setItem(apiUrl, JSON.stringify(res.user));
          localStorage.setItem("token", JSON.stringify(res.token));
          navigate("/");
        }
      });
    }
  };
  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className={styles.loginPage}>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className={styles.brand}>
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
