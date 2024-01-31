import request from "./index";

export const sendMessageRoute = (
  params: SendMessageAPIReq
): Promise<SendMessageAPIRes> =>
  request.post("/api/api/messages/addmsg", params);
export const recieveMessageRoute = (
  params: RecieveMessageAPIReq
): Promise<RecieveMessageAPIRes> =>
  request.post("/api/api/messages/getmsg", params);
