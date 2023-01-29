const { postgresql } = require("../config/connect");

module.exports = {
  getListSinger: async () => {
    try {
      const result = await postgresql.query(`SELECT * FROM singers`);
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },

  createNewSinger: async (name, description, avatar) => {
    try {
      const result = await postgresql.query(
        `INSERT INTO singers(name, description, avatar, created_day) VALUES('${name}', '${description}', '${avatar}', Now())`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  updateSingerData: async (id, name, description, avatar) => {
    try {
      const result = await postgresql.query(
        `UPDATE singers SET name='${name}', description='${description}', avatar='${avatar}' WHERE _id=${Number(
          id
        )}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  deleteSingerData: async (id) => {
    try {
      const result = await postgresql.query(
        `DELETE FROM singers WHERE _id=${Number(id)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },
};
