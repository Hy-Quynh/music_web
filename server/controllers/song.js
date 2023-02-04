const asyncHandler = require("express-async-handler");
const {
  createSongSinger,
  createNewSong,
  getListSong,
  getSongSinger,
  deleteSongSinger,
  deleteSong,
  updateSongData,
  getTotalSong,
} = require("../models/song");

module.exports = {
  getAllSong: asyncHandler(async (req, res) => {
    try {
      const { limit, offset, album, category } = req?.query;
      const result = await getListSong(limit, offset, category, album);
      const totalSong = await getTotalSong();
      if (result) {
        for (let i = 0; i < result?.length; i++) {
          const singer = await getSongSinger(result?.[i]?._id);
          result[i].singer = [...singer];
        }

        return res.send({
          success: true,
          payload: { song: result, totalItem: totalSong },
        });
      }

      return res.send({
        success: false,
        error: "Lấy danh sách bài hát thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Lấy danh sách bài hát thất bại",
      });
    }
  }),

  createSong: asyncHandler(async (req, res) => {
    try {
      const bodyData = req?.body;
      const { singer } = bodyData;
      const songResult = await createNewSong(bodyData);

      if (songResult?._id) {
        for (let i = 0; i < singer?.length; i++) {
          await createSongSinger(songResult?._id, singer?.[i]?._id);
        }

        return res.send({
          success: true,
        });
      }

      return res.send({
        success: false,
        error: "Tạo bài hát thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Tạo bài hát thất bại",
      });
    }
  }),

  updateSong: asyncHandler(async (req, res) => {
    try {
      const { songId } = req?.params;
      const bodyData = req?.body;
      const { singer } = bodyData;

      const songResult = await updateSongData(songId, bodyData);
      if (songResult) {
        await deleteSongSinger(songId);
        for (let i = 0; i < singer?.length; i++) {
          await createSongSinger(songId, singer?.[i]?._id);
        }

        return res.send({
          success: true,
        });
      }

      return res.send({
        success: false,
        error: "Cập nhật bài hát thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Cập nhật bài hát thất bại",
      });
    }
  }),

  deleteSong: asyncHandler(async (req, res) => {
    try {
      const { songId } = req?.params;
      const singerSong = await deleteSongSinger(songId);
      if (singerSong) {
        const songResult = await deleteSong(songId);
        if (songResult) {
          return res.send({
            success: true,
          });
        }
      }

      return res.send({
        success: false,
        error: "Xoá bài hát thất bại",
      });
    } catch (error) {
      return res.send({
        success: false,
        error: "Xoá bài hát thất bại",
      });
    }
  }),


};
