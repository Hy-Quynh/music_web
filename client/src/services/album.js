import { request } from "../utils/request";

export async function getAllAlbum() {
  return request({
    method: "GET",
    url: "/album",
  });
}

export async function createNewAlbum(name, description) {
  return request({
    method: "POST",
    url: "/album",
    body: {
      name,
      description,
    },
  });
}

export async function updateAlbum(id, name, description) {
  return request({
    method: "PUT",
    url: `/album/${id}`,
    body: {
      name,
      description,
    },
  });
}

export async function deleteAlbumData(id) {
  return request({
    method: "DELETE",
    url: `/album/${id}`,
  });
}
