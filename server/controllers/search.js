const asyncHandler = require("express-async-handler");
const { createKeyWordSearch, getSongMostSearch } = require("../models/search");

module.exports = {
  createKeyWordSearch: asyncHandler(async (req, res) => {
    const { search } = req?.body;
    const response = await createKeyWordSearch(search);
    res.send({ success: response });
  }),

  getSongMostSearch: asyncHandler(async (req, res) => {
    try {
      const result = await getSongMostSearch();
      const singer = await getSongSinger(songId);
      result.singer = [...singer];
      res.send({ success: true, payload: result });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy danh sách nhạc thất bại",
      });
    }
  }),
};
