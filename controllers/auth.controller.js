const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const User = require("../models/User");
const { RESPONSE, MESSAGE, URL } = require("../constants");

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
  } catch (error) {
    next(createError(error));
  }
};

exports.handleSignup = async (req, res, next) => {
  try {
    const { id, password, nickname, country, language, lat, lng } = req.body;

    const encryptPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );

    await User.create({
      id,
      password: encryptPassword,
      nickname,
      profileImage: req.file?.location ? req.file.location : URL.DEFAULT_IMAGE,
      language,
      country,
      lat,
      lng,
    });

    res.status(201).json({
      result: RESPONSE.SUCCESS,
    });
  } catch (error) {
    next(createError(error));
  }
};

exports.checkSignupInfo = async (req, res, next) => {
  try {
    const { id, nickname } = req.body;

    if (id) {
      const existedId = await User.findOne({ id });

      if (existedId) {
        next(createError(400, MESSAGE.EXISTED_ID), {
          result: RESPONSE.FAIL,
        });
        return;
      }
    }

    if (nickname) {
      const existedNickname = await User.findOne({ nickname });

      if (existedNickname) {
        next(createError(400, MESSAGE.EXISTED_NICKNAME), {
          result: RESPONSE.FAIL,
        });
        return;
      }
    }

    res.status(200).json({
      result: RESPONSE.SUCCESS,
    });
  } catch (error) {
    next(createError(error));
  }
};

exports.getInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).lean();

    res.status(200).json({
      result: "success",
      data: {
        user: {
          _id: user._id,
          id: user.id,
          nickname: user.nickname,
          profileImage: user.profileImage,
          country: user.country,
          language: user.language,
          lat: user.lat,
          lng: user.lng,
        },
      },
    });
  } catch (error) {
    next(createError(error));
  }
};
