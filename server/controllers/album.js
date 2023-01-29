const asyncHandler = require("express-async-handler");
const {
  getListAlbum,
  createNewAlbum,
  updateAlbumData,
  deleteAlbumData,
} = require("../models/album");

module.exports = {
  getAllAlbum: asyncHandler(async (req, res) => {
    try {
      const listAlbum = await getListAlbum();
      return res.send({ success: true, payload: listAlbum });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy danh sách album thất bại",
      });
    }
  }),

  createAlbum: asyncHandler(async (req, res) => {
    try {
      const { name, description } = req?.body;
      const result = await createNewAlbum(name, description);
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Tạo album thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Tạo album thất bại",
      });
    }
  }),

  updateAlbum: asyncHandler(async (req, res) => {
    try {
      const { name, description } = req?.body;
      const { albumId } = req?.params;
      const result = await updateAlbumData(albumId, name, description);
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Cập nhật album thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Cập nhật album thất bại",
      });
    }
  }),

  deleteAlbum: asyncHandler(async (req, res) => {
    try {
      const { albumId } = req?.params;
      const result = await deleteAlbumData(albumId);
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Xoá album thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Xoá album thất bại",
      });
    }
  }),
};
