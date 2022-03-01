const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer");

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
