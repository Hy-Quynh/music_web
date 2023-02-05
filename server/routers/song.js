const express = require("express");
const songController = require("../controllers/song");
const router = express.Router();

router.get("/", songController.getAllSong);
router.post("/", songController.createSong);
router.put("/:songId", songController.updateSong);
router.delete("/:songId", songController.deleteSong);
router.get("/:songId", songController.getSongDetail);

module.exports = router;
