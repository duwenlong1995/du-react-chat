import request from "./index";

export const allUsersRoute = (
  params: AllUsersAPIReq
): Promise<AllUsersAPIRes> =>
  request.get(`/api/api/auth/allusers/${params.id}`, params);
