const { postgresql } = require("../config/connect");

module.exports = {
  getListCategory: async () => {
    try {
      const result = await postgresql.query(`SELECT * FROM categorys`);
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },

  createNewCategory: async (name, description) => {
    try {
      const result = await postgresql.query(
        `INSERT INTO categorys(name, description, created_day) VALUES('${name}', '${description}', Now())`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  updateCategoryData: async (id, name, description) => {
    try {
      const result = await postgresql.query(
        `UPDATE categorys SET name='${name}', description='${description}' WHERE _id=${Number(
          id
        )}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  deleteCategoryData: async (id) => {
    try {
      const result = await postgresql.query(
        `DELETE FROM categorys WHERE _id=${Number(id)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },
};
