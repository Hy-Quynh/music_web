import { request } from "../utils/request";

export async function getAllAlbum(limit, offset, keyFilter) {
  return request({
    method: "GET",
    url: `/album?limit=${limit}&offset=${offset}&keyFilter=${keyFilter}`,
  });
}

export async function createNewAlbum(name, description, avatar) {
  return request({
    method: "POST",
    url: "/album",
    body: {
      name,
      description,
      avatar
    },
  });
}

export async function updateAlbum(id, name, description, avatar) {
  return request({
    method: "PUT",
    url: `/album/${id}`,
    body: {
      name,
      description,
      avatar
    },
  });
}

export async function deleteAlbumData(id) {
  return request({
    method: "DELETE",
    url: `/album/${id}`,
  });
}
