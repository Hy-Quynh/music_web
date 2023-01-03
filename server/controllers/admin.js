const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const {
  getAdminByEmail,
  createNewAccount,
  getAllAdminAccount,
  deleteAdminAccount,
} = require("../models/admin");

module.exports = {
  LOGIN: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const getAdmin = await getAdminByEmail(email);

    if (!getAdmin?._id) {
      return res.send({ success: false, error: "Email không tồn tại" });
    }

    const isMatchAdmin = bcrypt.compareSync(password, getAdmin?.password || "");

    if (!isMatchAdmin) {
      return res.send({ success: false, error: "Sai mật khẩu" });
    }

    if (!getAdmin?.status) {
      return res.send({ success: false, error: "Tài khoản đã bị vô hiệu hoá" });
    }
    return res.send({
      success: true,
      payload: { ...getAdmin, role: 2 },
    });
  }),

  createNewAccount: asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    const getAdmin = await getAdminByEmail(email);

    if (getAdmin?._id) {
      return res.send({ success: false, error: "Email đã tồn tại" });
    }

    const signupResult = await createNewAccount(email, name, password);

    if (!signupResult) {
      return res.send({ success: false, error: "Tạo tài khoản thất bại" });
    }
    return res.send({ success: true });
  }),

  getAllAccount: asyncHandler(async (req, res) => {
    try {
      const listAccount = await getAllAdminAccount();
      return res.send({ success: true, payload: listAccount });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy danh sách tài khoản thất bại",
      });
    }
  }),

  deleteAccount: asyncHandler(async (req, res) => {
    try {
      const { adminId } = req?.params;
      const listAccount = await deleteAdminAccount(adminId);
      if (listAccount) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Xoá tài khoản thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Xoá tài khoản thất bại",
      });
    }
  }),
};
