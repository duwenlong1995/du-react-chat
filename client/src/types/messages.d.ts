// 发送消息的请求参数类型约束
interface SendMessageAPIReq {
  from: string;
  to: string;
  message: object;
}
//发送消息的响应类型约束
interface SendMessageAPIRes {}
// 接收消息的请求参数类型约束
interface RecieveMessageAPIReq {
  from: string;
  to: string;
  message: string;
}
//接收消息的响应类型约束
interface RecieveMessageAPIRes {
  data: Array;
}
