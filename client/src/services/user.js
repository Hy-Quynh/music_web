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

export async function getUserById(id) {
  return request({
    method: "GET",
    url: `/user/${id}/info`,
  });
}

export async function updateUserInfo(id, name, email, birthday) {
  return request({
    method: "PUT",
    url: `/user/${id}/info`,
    body: {
      name, 
      email,
      birthday
    }
  });
}