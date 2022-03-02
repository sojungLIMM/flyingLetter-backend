const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken");
const { getAll, getLetters, createLetter } = require("../controllers/users.controller");

router.get("/", verifyToken, getAll);
router.get("/:userId/letters/to", verifyToken, getLetters);
router.post("/:userId/letters", verifyToken, upload.single("letterWallPaper"), createLetter);

module.exports = router;
