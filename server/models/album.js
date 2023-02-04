const { postgresql } = require("../config/connect");
const { getByLimitAndOffset } = require("../utils/utils");

module.exports = {
  getListAlbum: async (limit, offset, keyFilter) => {
    try {
      const limitOffset = getByLimitAndOffset(limit, offset);
      const result = await postgresql.query(
        `SELECT al.*, s.name as singer_name, c.name as country_name
        FROM albums al LEFT JOIN singers s ON al.singer_id = s._id 
        LEFT JOIN countries c ON al.country_id = c._id 
        WHERE ${
          keyFilter === "al" || !keyFilter || keyFilter === "undefined"
            ? "al.name is not null"
            : keyFilter === "number"
            ? "lower(al.name) SIMILAR TO '[0-9]%'"
            : `lower(al.name) SIMILAR TO '(${keyFilter})%'`
        } ORDER BY al.created_day DESC ${limitOffset}`
      );
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },

  getAlbumDetail: async (id) => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM albums WHERE _id=${Number(id)}`
      );
      return result?.rows?.[0] || {};
    } catch (error) {
      return {};
    }
  },

  getTotalAlbum: async (keyFilter) => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM albums WHERE ${
          keyFilter === "al" || !keyFilter || keyFilter === "undefined"
            ? "name is not null"
            : keyFilter === "number"
            ? "lower(name) SIMILAR TO '[0-9]%'"
            : `lower(name) SIMILAR TO '(${keyFilter})%'`
        } `
      );
      return result?.rows?.length || 0;
    } catch (error) {
      return 0;
    }
  },

  createNewAlbum: async (name, description, avatar, singerId, countryId) => {
    try {
      const result = await postgresql.query(
        `INSERT INTO albums(name, description, created_day, avatar, country_id, singer_id) VALUES('${name}', '${description}', Now(), '${avatar}', ${Number(
          countryId
        )}, ${Number(singerId)})`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  updateAlbumData: async (
    id,
    name,
    description,
    avatar,
    singerId,
    countryId
  ) => {
    try {
      const result = await postgresql.query(
        `UPDATE albums SET name='${name}', description='${description}', avatar='${avatar}',country_id=${Number(countryId)}, singer_id=${Number(singerId)}  WHERE _id=${Number(
          id
        )}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  deleteAlbumData: async (id) => {
    try {
      const result = await postgresql.query(
        `DELETE FROM albums WHERE _id=${Number(id)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },
};
