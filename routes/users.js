const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { getAll } = require("../controllers/users.controller");

router.get("/", verifyToken, getAll);

module.exports = router;
