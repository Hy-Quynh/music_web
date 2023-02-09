const { postgresql } = require("../config/connect");

module.exports = {
  getUserByEmail: async (email) => {
    try {
      const user = await postgresql.query(
        `SELECT * FROM users WHERE email='${email}'`
      );
      if (user?.rows?.length) {
        return user?.rows[0];
      }
      return {};
    } catch (error) {
      console.log("get user by email error >>>> ", error);
      return {};
    }
  },

  getAllUserAccount: async () => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM users ORDER BY created_day DESC`
      );
      return result?.rows || [];
    } catch (error) {
      console.log("getAllUserAccount >>>> ", error);
      return [];
    }
  },

  changeUserStatus: async (userId, status) => {
    try {
      const result = await postgresql.query(
        `UPDATE users SET status=${status} WHERE _id=${Number(userId)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  changeUserRank: async (userId, rank) => {
    try {
      const result = await postgresql.query(
        `UPDATE users SET rank='${rank}' WHERE _id=${Number(userId)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },

  getUserById: async (userId) => {
    try {
      const result = await postgresql.query(
        `SELECT * FROM users WHERE _id=${Number(userId)}`
      );

      return result?.rows?.[0] || {};
    } catch (error) {
      return {};
    }
  },

  updateUserInfo: async (id, name, email, birdthday) => {
    try {
      const result = await postgresql.query(
        `UPDATE users SET name='${name}', email='${email}', birdthday=${
          birdthday?.toString()?.length ? `'${birdthday}'` : null
        }  WHERE _id=${Number(id)}`
      );
      return result?.rows ? true : false;
    } catch (error) {
      return false;
    }
  },
};
