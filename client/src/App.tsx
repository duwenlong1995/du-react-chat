import { useEffect } from "react";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import router from "./router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 全局引入react-toastify样式

const toastOptions: any = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const apiUrl = import.meta.env.VITE_REACT_APP_LOCALHOST_KEY;
// 去往登录页的组件
function ToLogin() {
  const navigateTo = useNavigate();
  // 加载完这个组件之后实现跳转
  useEffect(() => {
    // 加载完组件之后执行这里的代码
    navigateTo("/login");
    toast.error("您还没有登录，请登录后再访问！", toastOptions);
  }, []);
  return <div></div>;
}
// 去往首页的组件
function ToChat() {
  const navigateTo = useNavigate();
  // 加载完这个组件之后实现跳转
  useEffect(() => {
    // 加载完组件之后执行这里的代码
    navigateTo("/chat");
    toast.error("您已经登录过了！", toastOptions);
  }, []);
  return <div></div>;
}
// 手写封装路由守卫
function BeforeRouterEnter() {
  const outlet = useRoutes(router);
  /*
    后台管理系统两种经典的跳转情况：
    1、如果访问的是登录页面， 并且有token， 跳转到首页
    2、如果访问的不是登录页面，并且没有token， 跳转到登录页
    3、其余的都可以正常放行
  */
  const location = useLocation();
  let token = localStorage.getItem("token");

  //1、如果访问的是登录页面， 并且有token， 跳转到首页
  if (location.pathname === "/login" && token) {
    // 这里不能直接用 useNavigate 来实现跳转 ，因为需要BeforeRouterEnter是一个正常的JSX组件
    toast.success("登录成功！", toastOptions);
    return <ToChat />;
  }
  //2、如果访问的不是登录页面，并且没有token， 跳转到登录页
  if (
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    !token
  ) {
    return <ToLogin />;
  }

  return outlet;
}

function App() {
  return (
    <div className="App">
      {/* <Link to="/home">Home</Link> |
      <Link to="/about">About</Link> |
      <Link to="/user">User</Link> */}

      {/* 占位符组件，类似于窗口，用来展示组件的，有点像vue中的router-view */}
      {/* <Outlet></Outlet> */}
      {/* {outlet} */}
      <BeforeRouterEnter />
    </div>
  );
}

export default App;
