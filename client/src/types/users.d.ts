// 所有用户的请求参数类型约束
interface AllUsersAPIReq {
  id: string;
}
// 所有用户的响应类型约束
interface AllUsersAPIRes {
  msg: string;
  code: number;
  data: Array;
}
