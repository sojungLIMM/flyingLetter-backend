const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const User = require("../models/User");
const { RESPONSE, MESSAGE } = require("../constants");

exports.handleLogin = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const existedUser = await User.findOne({ id }).lean();

    if (!existedUser) {
      next(createError(400, MESSAGE.INVAILD_ID), {
        result: RESPONSE.FAIL,
      });
      return;
    }

    const decryptPassword = await bcrypt.compare(
      password,
      existedUser.password
    );

    if (!decryptPassword) {
      next(createError(400, MESSAGE.INVAILD_PASSWORD), {
        result: RESPONSE.FAIL,
      });
      return;
    }

    const accessToken = jwt.sign(
      { _id: existedUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      result: RESPONSE.SUCCESS,
      data: {
        user: {
          _id: existedUser._id,
          id: existedUser.id,
          nickname: existedUser.nickname,
          profileImage: existedUser.profileImage,
          country: existedUser.country,
          language: existedUser.language,
          lat: existedUser.lat,
          lng: existedUser.lng,
        },
        accessToken,
      },
    });
  } catch (err) {
    next(createError(err));
  }
};
