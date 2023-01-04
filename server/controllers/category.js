const asyncHandler = require("express-async-handler");
const { getListCategory, createNewCategory, updateCategoryData, deleteCategoryData } = require("../models/category");

module.exports = {
  getAllCategory: asyncHandler(async (req, res) => {
    try {
      const listCategory = await getListCategory();
      return res.send({ success: true, payload: listCategory });

    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy danh sách thể loại thất bại",
      });
    }
  }),

  createCategoty: asyncHandler(async (req, res) => {
    try {
      const {name, description} = req?.body
      const result = await createNewCategory(name, description)
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Tạo thể loại thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Tạo thể loại thất bại",
      });
    }
  }),

  updateCategoty: asyncHandler(async (req, res) => {
    try {
      const {name, description} = req?.body
      const {categoryId} = req?.params
      const result = await updateCategoryData(categoryId, name, description)
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Cập nhật thể loại thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Cập nhật thể loại thất bại",
      });
    }
  }),

  deleteCategoty: asyncHandler(async (req, res) => {
    try {
      const {categoryId} = req?.params
      const result = await deleteCategoryData(categoryId)
      if (result) {
        return res.send({ success: true });
      }
      return res.send({
        success: false,
        error: "Xoá thể loại thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Xoá thể loại thất bại",
      });
    }
  }),
};
