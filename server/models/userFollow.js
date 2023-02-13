const { postgresql } = require("../config/connect");

module.exports = {
  createUserFollow: async (user_id, followed) => {
    try {
      const result = await postgresql.query(
        `INSERT INTO user_flow(user_id, followed, created_day) VALUES(${Number(
          user_id
        )}, ${Number(followed)}, now())`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  deleteUserFollow: async (user_id, followed) => {
    try {
      const result = await postgresql.query(
        `DELETE FROM user_flow WHERE user_id=${Number(
          user_id
        )} AND followed=${Number(followed)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  getUserFollow: async (user_id) => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM user_flow WHERE user_id=${Number(user_id)}`
      );
      return result?.rows || [];
    } catch (error) {
      return [];
    }
  },

  checkUserFollower: async (userId, followed) => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM user_flow WHERE user_id=${Number(
          userId
        )} AND followed=${Number(followed)}`
      );
      return result?.rows?.length ? true : false;
    } catch (error) {
      return false;
    }
  },
};
