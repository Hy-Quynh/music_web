import { request } from "../utils/request";

export async function getAllSinger() {
  return request({
    method: "GET",
    url: "/singer",
  });
}

export async function createNewSinger(name, description, avatar) {
  return request({
    method: "POST",
    url: "/singer",
    body: {
      name,
      description,
      avatar,
    },
  });
}

export async function updateSinger(id, name, description, avatar) {
  return request({
    method: "PUT",
    url: `/singer/${id}`,
    body: {
      name,
      description,
      avatar,
    },
  });
}

export async function deleteSingerData(id) {
  return request({
    method: "DELETE",
    url: `/singer/${id}`,
  });
}

export async function changeSingerEffect(id, effect) {
  return request({
    method: "PUT",
    url: `/singer/effect/${id}`,
    body: { effect },
  });
}

export async function getPopularSinger() {
  return request({
    method: "GET",
    url: `/singer/effect/list`,
  });
}
