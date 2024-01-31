import React, { lazy } from "react";
// Navigate重定向组件
import { Navigate } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import SetAvatar from "../views/SetAvatar";
const Chat = lazy(() => import("../views/Chat"));
const Page301 = lazy(() => import("../views/Page301/index"));

// 报错A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator.
// 懒加载的模式的组件的写法，外面需要套一层 Loading 的提示加载组件

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

const routes = [
  //  嵌套路由 开始-------------------
  {
    path: "/",
    element: <Navigate to="/chat" />,
  },
  {
    path: "/",
    element: <Home />,
  },
  // 嵌套路由 结束-------------------
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/setAvatar",
    element: <SetAvatar />,
  },
  {
    path: "/Page301",
    element: <Page301 />,
  },
  // 访问其余路径的时候直接跳到首页
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;
