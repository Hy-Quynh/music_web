const { postgresql } = require("../config/connect");
const bcrypt = require("bcrypt");

module.exports = {
  userSignUp: async (email, password) => {
    try {
      const hash = bcrypt.hashSync(password, 10);
      const signupRes = await postgresql.query(
        `INSERT INTO users(email, password, status, created_day) VALUES('${email}', '${hash}', true, now())`
      );
      if (signupRes) return true;
      return false;
    } catch (error) {
      console.log("user sign up error >>>> ", error);
      return false;
    }
  },
};
