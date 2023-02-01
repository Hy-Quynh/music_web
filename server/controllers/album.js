const asyncHandler = require("express-async-handler");
const {
  getListAlbum,
  createNewAlbum,
  updateAlbumData,
  deleteAlbumData,
  getTotalAlbum,
} = require("../models/album");

module.exports = {
  getAllAlbum: asyncHandler(async (req, res) => {
    try {
      const { limit, offset, keyFilter } = req?.query;
      const listAlbum = await getListAlbum(limit, offset, keyFilter);
      const totalAlbum = await getTotalAlbum(keyFilter);
      return res.send({
        success: true,
        payload: { album: listAlbum, totalItem: totalAlbum },
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy danh sách album thất bại",
      });
    }
  }),

  createAlbum: asyncHandler(async (req, res) => {
    try {
      const { name, description, avatar } = req?.body;
      const result = await createNewAlbum(name, description, avatar);
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
      const { name, description, avatar } = req?.body;
      const { albumId } = req?.params;
      const result = await updateAlbumData(albumId, name, description, avatar);
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
