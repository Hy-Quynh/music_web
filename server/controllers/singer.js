const asyncHandler = require("express-async-handler");
const {
  getListSinger,
  createNewSinger,
  updateSingerData,
  deleteSingerData,
  changeSingerEffect,
  getPopularSingerData,
} = require("../models/singer");

module.exports = {
  getAllSinger: asyncHandler(async (req, res) => {
    try {
      const listSinger = await getListSinger();
      return res.send({ success: true, payload: listSinger });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy danh sách ca sĩ thất bại",
      });
    }
  }),

  createSinger: asyncHandler(async (req, res) => {
    try {
      const { name, description, avatar } = req?.body;
      const result = await createNewSinger(name, description, avatar);
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Tạo ca sĩ thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Tạo ca sĩ thất bại",
      });
    }
  }),

  updateSinger: asyncHandler(async (req, res) => {
    try {
      const { name, description, avatar } = req?.body;
      const { singerId } = req?.params;
      const result = await updateSingerData(
        singerId,
        name,
        description,
        avatar
      );
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Cập nhật ca sĩ thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Cập nhật ca sĩ thất bại",
      });
    }
  }),

  deleteSinger: asyncHandler(async (req, res) => {
    try {
      const { singerId } = req?.params;
      const result = await deleteSingerData(singerId);
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Xoá ca sĩ thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Xoá ca sĩ thất bại",
      });
    }
  }),

  changeSingerEffect: asyncHandler(async (req, res) => {
    try {
      const { effect } = req?.body;
      const { singerId } = req?.params;
      const result = await changeSingerEffect(singerId, effect);
      return res.send({ success: true, payload: result });
    } catch (error) {
      return res.send({
        success: false,
        error: "Chuyển đổi trạng thái thất bại",
      });
    }
  }),

  getPopularSinger: asyncHandler(async (req, res) => {
    try {
      const result = await getPopularSingerData();
      return res.send({ success: true, payload: result });
    } catch (error) {
      return res.send({
        success: false,
        error: "Chuyển đổi trạng thái thất bại",
      });
    }
  }),
};
