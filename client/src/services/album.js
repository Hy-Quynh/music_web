import { request } from "../utils/request";

export async function getAllAlbum(limit, offset, keyFilter, country, singer) {
  return request({
    method: "GET",
    url: `/album?limit=${limit}&offset=${offset}&keyFilter=${keyFilter}&country=${country}&singer=${singer}`,
  });
}

export async function getAlbumById(id) {
  return request({
    method: "GET",
    url: `/album/${id}`,
  });
}

export async function createNewAlbum(
  name,
  description,
  avatar,
  singerId,
  countryId
) {
  return request({
    method: "POST",
    url: "/album",
    body: {
      name,
      description,
      avatar,
      singerId,
      countryId,
    },
  });
}

export async function updateAlbum(
  id,
  name,
  description,
  avatar,
  singerId,
  countryId
) {
  return request({
    method: "PUT",
    url: `/album/${id}`,
    body: {
      name,
      description,
      avatar,
      singerId,
      countryId,
    },
  });
}

export async function deleteAlbumData(id) {
  return request({
    method: "DELETE",
    url: `/album/${id}`,
  });
}
