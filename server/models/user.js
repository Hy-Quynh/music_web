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
      const result = await postgresql.query(`SELECT * FROM users`);
      return result?.rows || [];
    } catch (error) {
      console.log("getAllUserAccount >>>> ", error);
      return [];
    }
  },
};
