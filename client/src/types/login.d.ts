// 这个文件专门定义请求参数的类型，和响应的类型

// 登录请求参数类型约束
interface LoginAPIReq {
  username: string;
  password: string;
}
// 登录的响应类型约束
interface LoginAPIRes {
  msg: string;
  code: number;
  token: string;
  status: boolean;
  user: string;
}
// 注册请求参数类型约束
interface RegisterAPIReq {
  username: string;
  password: string;
  email: string;
}
// 注册响应类型约束
interface RegisterAPIRes {
  msg: string;
  code: number;
  status: boolean;
  user: string;
}
// 登出请求参数类型约束
interface LogoutAPIReq {
  id: string;
}
// 登出响应类型约束
interface LogoutAPIRes {
  status: number;
}
