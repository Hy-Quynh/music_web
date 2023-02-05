const asyncHandler = require("express-async-handler");
const {
  getListAlbum,
  createNewAlbum,
  updateAlbumData,
  deleteAlbumData,
  getTotalAlbum,
  getAlbumDetail,
} = require("../models/album");

module.exports = {
  getAllAlbum: asyncHandler(async (req, res) => {
    try {
      const { limit, offset, keyFilter, country, singer } = req?.query;
      const listAlbum = await getListAlbum(limit, offset, keyFilter, country, singer);
      const totalAlbum = await getTotalAlbum(keyFilter, country, singer);
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

  getAlbumById: asyncHandler(async (req, res) => {
    try {
      const { id } = req?.params;
      const albumDetail = await getAlbumDetail(id);

      return res.send({
        success: true,
        payload: albumDetail,
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy thông tin chi tiết album thất bại",
      });
    }
  }),

  createAlbum: asyncHandler(async (req, res) => {
    try {
      const { name, description, avatar, singerId, countryId } = req?.body;
      const result = await createNewAlbum(name, description, avatar, singerId, countryId );
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
      const { name, description, avatar, singerId, countryId  } = req?.body;
      const { albumId } = req?.params;
      const result = await updateAlbumData(albumId, name, description, avatar, singerId, countryId );
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
