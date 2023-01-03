const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  getAllUserAccount,
} = require("../models/user");

module.exports = {
  getAllAccount: asyncHandler(async (req, res) => {
    try {
      const listAccount = await getAllUserAccount();
      return res.send({ success: true, payload: listAccount });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy danh sách tài khoản thất bại",
      });
    }
  }),
};
