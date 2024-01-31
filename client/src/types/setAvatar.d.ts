//的请求参数类型约束
interface SetAvatarAPIReq {
  id: string;
}
//的响应类型约束
interface SetAvatarAPIRes {
  isSet: string;
  image: string;
}
//的请求参数类型约束
interface SetAvatarImageAPIReq {}
//的响应类型约束
interface SetAvatarImageAPIRes {
  data: object;
}
