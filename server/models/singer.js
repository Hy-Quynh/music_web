const { postgresql } = require("../config/connect");

module.exports = {
  getListSinger: async () => {
    try {
      const result = await postgresql.query(`SELECT s.*, c.name as country_name FROM singers s LEFT JOIN countries c ON s.country_id = c._id ORDER BY s.created_day DESC`);
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },

  createNewSinger: async (name, description, avatar, countryId) => {
    try {
      const result = await postgresql.query(
        `INSERT INTO singers(name, description, avatar, created_day, country_id) VALUES('${name}', '${description}', '${avatar}', Now(), ${Number(
          countryId
        )})`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  updateSingerData: async (id, name, description, avatar, countryId) => {
    try {
      const result = await postgresql.query(
        `UPDATE singers SET name='${name}', description='${description}', avatar='${avatar}', country_id=${Number(
          countryId
        )} WHERE _id=${Number(id)}`
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

  changeSingerEffect: async (id, effect) => {
    try {
      const result = await postgresql.query(
        `UPDATE singers SET effect=${effect} WHERE _id=${Number(id)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  getPopularSingerData: async () => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM singers WHERE effect = true`
      );
      console.log("result >>> ", result);
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },
};
