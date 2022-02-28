const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const { verifyToken } = require("../middlewares/verifyToken");
const {
  handleLogin,
  handleSignup,
  checkSignupInfo,
  getInfo,
} = require("../controllers/auth.controller");

router.post("/login", handleLogin);
router.post("/signup", upload.single("profileImage"), handleSignup);
router.post("/signup/check", checkSignupInfo);
router.get("/users", verifyToken, getInfo);

module.exports = router;
