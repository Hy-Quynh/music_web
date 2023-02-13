const asyncHandler = require("express-async-handler");
const {
  getAllUserAccount,
  changeUserStatus,
  changeUserRank,
  getUserByEmail,
  getUserById,
  updateUserInfo,
  getTotalAccount,
} = require("../models/user");

module.exports = {
  getAllAccount: asyncHandler(async (req, res) => {
    try {
      const { limit, offset, except_id } = req?.query;
      const listAccount = await getAllUserAccount(limit, offset, except_id);
      const totalAccount = await getTotalAccount(except_id);
      return res.send({
        success: true,
        payload: { user: listAccount, totalItem: totalAccount },
      });
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

  getUserById: asyncHandler(async (req, res) => {
    try {
      const { id } = req?.params;
      const result = await getUserById(id);
      return res.send({ success: true, payload: result });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy thông tin người dùng thất bại",
      });
    }
  }),

  updateUserInfo: asyncHandler(async (req, res) => {
    try {
      const { id } = req?.params;
      const { name, email, birthday } = req?.body;
      const getUser = await getUserByEmail(email);

      if (getUser?._id && Number(getUser?._id) !== Number(id)) {
        return res.send({ success: false, error: "Email đã tồn tại" });
      }

      const result = await updateUserInfo(id, name, email, birthday);
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Cập nhật thông tin khách hàng thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Cập nhật thông tin khách hàng thất bại",
      });
    }
  }),
};
