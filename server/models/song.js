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
        await postgresql.query(`INSERT INTO songs(name, link, description, category_id, album_id, country_id, status, created_day, avatar) 
      VALUES('${name}', '${link}', '${description}', ${Number(category_id)}, ${
          album_id === -1 ? null : Number(album_id)
        }, ${Number(country_id)}, true, Now(), '${avatar}')`);

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

  getListSong: async (limit, offset) => {
    try {
      const limitOffset = getByLimitAndOffset(limit, offset);
      const result = await postgresql.query(
        `SELECT s.*, c.name as country_name, al.name as album_name, ct.name as category_name
        FROM songs s JOIN countries c ON s.country_id = c._id 
        LEFT JOIN albums al ON s.album_id = al._id  
        JOIN categorys ct ON s.category_id = ct._id
        ${limitOffset} `
      );
      return result?.rows || [];
    } catch (error) {
      return [];
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
};
