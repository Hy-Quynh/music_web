import { request } from "../utils/request";

export async function getAllSong() {
  return request({
    method: "GET",
    url: "/song",
  });
}

export async function createNewSong(data) {
  return request({
    method: "POST",
    url: "/song",
    body: {
      ...data,
    },
  });
}

export async function updateSong(id, data) {
  return request({
    method: "PUT",
    url: `/song/${id}`,
    body: {
      ...data,
    },
  });
}

export async function deleteSongData(id) {
  return request({
    method: "DELETE",
    url: `/song/${id}`,
  });
}
