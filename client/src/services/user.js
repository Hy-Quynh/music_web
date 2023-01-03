import { request } from "../utils/request";

export async function getAllUserAccount() {
  return request({
    method: "GET",
    url: "/user/account",
  });
}