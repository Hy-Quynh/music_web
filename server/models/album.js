const { postgresql } = require("../config/connect");
const { getByLimitAndOffset } = require("../utils/utils");

module.exports = {
  getListAlbum: async (limit, offset, keyFilter) => {
    try {
      const limitOffset = getByLimitAndOffset(limit, offset);
      const result = await postgresql.query(
        `SELECT * FROM albums WHERE ${
          keyFilter === "al" || !keyFilter || keyFilter === 'undefined'
            ? "name is not null"
            : keyFilter === "number"
            ? "lower(name) SIMILAR TO '[0-9]%'"
            : `lower(name) SIMILAR TO '(${keyFilter})%'`
        } ORDER BY created_day DESC ${limitOffset}`
      );
      return result?.rows || [];
    } catch (error) {
      console.log('error >> ', error);
      return [];
    }
  },

  getTotalAlbum: async (keyFilter) => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM albums WHERE ${
          keyFilter === "al" || !keyFilter || keyFilter === 'undefined'
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

  createNewAlbum: async (name, description, avatar) => {
    try {
      const result = await postgresql.query(
        `INSERT INTO albums(name, description, created_day, avatar) VALUES('${name}', '${description}', Now(), '${avatar}')`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  updateAlbumData: async (id, name, description, avatar) => {
    try {
      const result = await postgresql.query(
        `UPDATE albums SET name='${name}', description='${description}', avatar='${avatar}' WHERE _id=${Number(
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
