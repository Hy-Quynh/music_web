import { request } from "../utils/request";

export async function getAllUserAccount() {
  return request({
    method: "GET",
    url: "/user/account",
  });
}

export async function changeUserStatus(userId, status) {
  return request({
    method: "PUT",
    url: `/user/status/${userId}`,
    body: { status },
  });
}

export async function changeUserRank(userId, rank) {
  return request({
    method: "PUT",
    url: `/user/rank/${userId}`,
    body: { rank },
  });
}
