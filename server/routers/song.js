const express = require("express");
const songController = require("../controllers/song");
const router = express.Router();

router.get("/", songController.getAllSong);
router.post("/", songController.createSong);
router.put("/:songId", songController.updateSong);
router.delete("/:songId", songController.deleteSong);
router.get("/:songId", songController.getSongDetail);
router.get("/view/:songId", songController.updateSongView);
router.get("/hot/list", songController.getHotSong);

module.exports = router;
