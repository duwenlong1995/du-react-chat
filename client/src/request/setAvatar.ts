import request from "./index";

const imageApi = `https://api.multiavatar.com/4645646`;

export const setAvatarRoute = (
  params: SetAvatarAPIReq
): Promise<SetAvatarAPIRes> =>
  request.post(`/api/api/auth/setavatar/${params.id}`, { image: params.image });
export const setAvatarImageRoute = (
  params: SetAvatarImageAPIReq
): Promise<SetAvatarImageAPIRes> =>
  request.get(`${imageApi}/${Math.round(Math.random() * 1000)}`, params);
