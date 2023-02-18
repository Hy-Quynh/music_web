const { postgresql } = require("../config/connect");
const { getByLimitAndOffset } = require("../utils/utils");

module.exports = {
  createNewSong: async (songData) => {
    try {
      const {
        name,
        link,
        description,
        category_id,
        album_id,
        country_id,
        avatar,
      } = songData;
      const result =
        await postgresql.query(`INSERT INTO songs(name, link, description, category_id, album_id, country_id, status, created_day, avatar, view) 
      VALUES('${name}', '${link}', '${description}', ${Number(category_id)}, ${
          album_id === -1 ? null : Number(album_id)
        }, ${Number(country_id)}, true, Now(), '${avatar}', 0)`);

      if (result) {
        const getLast = await postgresql.query(
          `SELECT * FROM songs ORDER BY created_day DESC LIMIT 1 OFFSET 0`
        );
        return getLast?.rows?.[0] || false;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  createSongSinger: async (songId, singerId) => {
    try {
      const result = await postgresql.query(
        `INSERT INTO song_singer(song_id, singer_id, created_day) VALUES(${Number(
          songId
        )}, ${Number(singerId)}, Now())`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  updateSongData: async (songId, songData) => {
    try {
      const {
        name,
        link,
        description,
        category_id,
        album_id,
        country_id,
        avatar,
      } = songData;

      const result =
        await postgresql.query(`UPDATE songs SET name='${name}', link='${link}', description='${description}',
      category_id=${Number(category_id)}, album_id=${
          album_id === -1 ? null : Number(album_id)
        }, country_id=${Number(
          country_id
        )}, avatar='${avatar}' WHERE _id=${Number(songId)}`);

      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  getListSong: async (
    limit,
    offset,
    category,
    album,
    country,
    singer,
    searchText
  ) => {
    try {
      const limitOffset = getByLimitAndOffset(limit, offset);
      const result = await postgresql.query(
        `SELECT s.*, c.name as country_name, al.name as album_name, ct.name as category_name
        FROM songs s JOIN countries c ON s.country_id = c._id 
        LEFT JOIN albums al ON s.album_id = al._id  
        JOIN categorys ct ON s.category_id = ct._id
        WHERE ${
          category && category !== "undefined"
            ? `s.category_id = ${category}`
            : "s._id is not null"
        } AND 
        ${
          album && album !== "undefined"
            ? `s.album_id = ${album}`
            : "s._id is not null"
        } AND 
        ${
          country && country !== "undefined"
            ? `s.country_id = ${Number(country)}`
            : "s._id is not null"
        } AND 
        ${
          singer && singer !== "undefined"
            ? `${
                Number(singer) +
                " IN (SELECT ss.singer_id FROM song_singer ss WHERE ss.song_id = s._id)"
              }`
            : "s._id is not null"
        } AND 
        ${
          searchText && searchText !== "undefined"
            ? `lower(s.name) LIKE '%${searchText.toLowerCase()}%'`
            : "s._id is not null"
        }
        ORDER BY s.created_day DESC ${limitOffset}`
      );
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },

  getTotalSong: async (category, album, country, singer, searchText) => {
    try {
      const result = await postgresql.query(
        `SELECT COUNT(_id) as total_song 
        FROM songs 
        WHERE ${
          category && category !== "undefined"
            ? `category_id = ${category}`
            : "_id is not null"
        } AND 
        ${
          album && album !== "undefined"
            ? `album_id = ${album}`
            : "_id is not null"
        } AND 
        ${
          country && country !== "undefined"
            ? `country_id = ${Number(country)}`
            : "_id is not null"
        } AND 
        ${
          singer && singer !== "undefined"
            ? `${
                Number(singer) +
                " IN (SELECT ss.singer_id FROM song_singer ss WHERE ss.song_id = _id)"
              }`
            : "_id is not null"
        } AND 
        ${
          searchText && searchText !== "undefined"
            ? `lower(name) LIKE '%${searchText.toLowerCase()}%'`
            : "_id is not null"
        }`
      );
      return result?.rows?.[0]?.total_song || 0;
    } catch (error) {
      return 0;
    }
  },

  getSongSinger: async (songerId) => {
    try {
      const result = await postgresql.query(
        `SELECT ss.singer_id as _id, s.name FROM song_singer ss JOIN singers s ON ss.singer_id = s._id WHERE ss.song_id = ${Number(
          songerId
        )}`
      );
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },

  deleteSongSinger: async (songId) => {
    try {
      const result = await postgresql.query(
        `DELETE FROM song_singer WHERE song_id = ${Number(songId)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  deleteSong: async (songId) => {
    try {
      const result = await postgresql.query(
        `DELETE FROM songs WHERE _id = ${Number(songId)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  getSongById: async (songId) => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM songs WHERE _id=${Number(songId)}`
      );
      return result?.rows?.[0] || {};
    } catch (error) {
      return {};
    }
  },

  getSongView: async (songId) => {
    try {
      const result = await postgresql.query(
        `SELECT view FROM songs WHERE _id=${Number(songId)}`
      );
      return result?.rows?.[0]?.view || 0;
    } catch (error) {
      return 0;
    }
  },

  updateSongView: async (songId, view) => {
    try {
      const result = await postgresql.query(
        `UPDATE songs SET view=${Number(view)} WHERE _id=${Number(songId)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  getHotSongData: async () => {
    try {
      const result = await postgresql.query(
        `SELECT s.*, c.name as country_name, al.name as album_name, ct.name as category_name
        FROM songs s JOIN countries c ON s.country_id = c._id 
        LEFT JOIN albums al ON s.album_id = al._id  
        JOIN categorys ct ON s.category_id = ct._id
        ORDER BY s.view DESC LIMIT 100 OFFSET 0`
      );
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },
};
