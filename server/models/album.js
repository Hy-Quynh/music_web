const { postgresql } = require("../config/connect");

module.exports = {
  getListAlbum: async () => {
    try {
      const result = await postgresql.query(`SELECT * FROM albums`);
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },

  createNewAlbum: async (name, description) => {
    try {
      const result = await postgresql.query(
        `INSERT INTO albums(name, description, created_day) VALUES('${name}', '${description}', Now())`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  updateAlbumData: async (id, name, description) => {
    try {
      const result = await postgresql.query(
        `UPDATE albums SET name='${name}', description='${description}' WHERE _id=${Number(
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
