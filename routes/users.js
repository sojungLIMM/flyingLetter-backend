const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken");
const { getAll, createLetter } = require("../controllers/users.controller");

router.get("/", verifyToken, getAll);
router.post("/:userId/letters", verifyToken, upload.single("letterPaperImage"), createLetter);

module.exports = router;
