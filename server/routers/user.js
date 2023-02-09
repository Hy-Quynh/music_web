const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/account", userController.getAllAccount);
router.put("/status/:userId", userController.changeStatus);
router.put("/rank/:userId", userController.changeRank);
router.get("/:id/info", userController.getUserById);
router.put("/:id/info", userController.updateUserInfo);

module.exports = router;
