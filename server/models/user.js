const { postgresql } = require("../config/connect");
const { getByLimitAndOffset } = require("../utils/utils");
const moment = require("moment");

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

  getAllUserAccount: async (limit, offset, except_id, keySearch) => {
    try {
      const limitOffset = getByLimitAndOffset(limit, offset);

      const result = await postgresql.query(
        `SELECT * FROM users WHERE ${
          except_id && except_id !== "undefined"
            ? `_id != ${Number(except_id)}`
            : "_id is not null"
        } AND ${
          keySearch && keySearch !== "undefined"
            ? `lower(email) LIKE '%${keySearch.toLowerCase()}%'`
            : "_id is not null"
        }
        ORDER BY created_day DESC ${limitOffset}`
      );
      return result?.rows || [];
    } catch (error) {
      console.log("getAllUserAccount >>>> ", error);
      return [];
    }
  },

  getTotalAccount: async (except_id, keySearch) => {
    try {
      const result = await postgresql.query(
        `SELECT COUNT(*) as total_item FROM users WHERE ${
          except_id && except_id !== "undefined"
            ? `_id != ${Number(except_id)}`
            : "_id is not null"
        } AND ${
          keySearch && keySearch !== "undefined"
            ? `lower(email) LIKE '%${keySearch.toLowerCase()}%'`
            : "_id is not null"
        }`
      );
      return result?.rows?.[0]?.total_item || 0;
    } catch (error) {
      return 0;
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

  getTotalUserByDate: async (fromDate, toDate) => {
    try {
      const date_from =
        fromDate && fromDate !== "undefined"
          ? moment(
              moment(fromDate, "YYYY-MM-DD")?.startOf("day").toDate()
            ).format("YYYY-MM-DD hh:mm:ss")
          : "";

      const date_to =
        toDate && toDate !== "undefined"
          ? moment(moment(toDate, "YYYY-MM-DD")?.endOf("day").toDate()).format(
              "YYYY-MM-DD hh:mm:ss"
            )
          : "";

      const result = await postgresql.query(
        `SELECT COUNT(_id) as total_user FROM users WHERE ${
          date_from && date_from !== "undefined"
            ? `date(created_day) >= date('${date_from}')`
            : " created_day is not null "
        } AND ${
          date_to && date_to !== "undefined"
            ? `date(created_day) <= date('${date_to}')`
            : "created_day is not null "
        }`
      );
      return result?.rows?.[0]?.total_user || 0;
    } catch (error) {
      console.log('error >>> ', error);
      return 0;
    }
  },
};
