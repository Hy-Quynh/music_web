const asyncHandler = require("express-async-handler");
const { getAllUserAccount, changeUserStatus, changeUserRank } = require("../models/user");

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

  changeStatus: asyncHandler(async (req, res) => {
    try {
      const { userId } = req?.params;
      const { status } = req?.body;
      const result = await changeUserStatus(userId, status);
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Thay đổi trạng thái thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Thay đổi trạng thái thất bại",
      });
    }
  }),

  changeRank: asyncHandler(async (req, res) => {
    try {
      const { userId } = req?.params;
      const { rank } = req?.body;
      const result = await changeUserRank(userId, rank);
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Thay đổi hạng thành viên thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Thay đổi hạng thành viên thất bại",
      });
    }
  }),
};
