const mongoose = require("mongoose");
const createError = require("http-errors");

const User = require("../models/User");
const Letter = require("../models/Letter");
const { RESPONSE, MESSAGE } = require("../constants");

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const totalUsers = await User.find({ _id: { $ne: req.userId } }).countDocuments();
    const users = await User
      .find({ _id: { $ne: req.userId } })
      .limit(parseInt(limit))
      .skip((page - 1) * parseInt(limit))
      .select("-password")
      .lean();

    let isNext = true;

    if (parseInt(page) * limit >= totalUsers) {
      isNext = false;
    }

    res.status(200).json({
      result: RESPONSE.SUCCESS,
      data: {
        users,
        isNext,
      },
    });
  } catch (error) {
    next(createError(error));
  }
};

exports.createLetter = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      next(createError(400, MESSAGE.INVAILD_OBJECT_ID));
      return;
    }

    const { from, to, content, arrivedAt, lat, lng, letterId, newFromLat, newFromLng } = req.body;

    if (letterId) {
      await Letter.findByIdAndDelete(letterId);
    }

    await Letter.create({
      from,
      to,
      content,
      arrivedAt,
      lat,
      lng,
      newFromLat,
      newFromLng,
      letterWallPaper: req.file ? req.file.location : "",
    });

    res.status(201).json({
      result: RESPONSE.SUCCESS,
    });
  } catch (error) {
    next(createError(error));
  }
};

exports.getLetters = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, today, isDelivered, count } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      next(createError(400, MESSAGE.INVAILD_OBJECT_ID));
      return;
    }

    if (count) {
      const deliveredLetterCount = await Letter
        .find({ to: userId, arrivedAt: { $lte: new Date(today) } })
        .countDocuments();
      const inTransitLetterCount = await Letter
        .find({ to: userId, arrivedAt: { $gt: new Date(today) } })
        .countDocuments();
      const leavedLetters = await Letter
        .find({ to: { $exists: false } })
        .populate("from")
        .lean();

      res.status(200).json({
        result: RESPONSE.SUCCESS,
        data: {
          leavedLetters,
          counts: {
            deliveredLetterCount,
            inTransitLetterCount,
          },
        },
      });
      return;
    }

    const options = {
      ...({ to: userId }),
      ...(isDelivered === "true" && { arrivedAt: { $lte: new Date(today) } }),
      ...(isDelivered === "false" && { arrivedAt: { $gt: new Date(today) } }),
    };

    const totalLetters = await Letter.find(options).countDocuments();
    const letters = await Letter
      .find(options)
      .limit(parseInt(limit))
      .skip((page - 1) * parseInt(limit))
      .populate("from")
      .lean();

    let isNext = true;

    if (parseInt(page) * limit >= totalLetters) {
      isNext = false;
    }

    res.status(200).json({
      result: RESPONSE.SUCCESS,
      data: {
        letters,
        isNext,
      },
    });
  } catch (error) {
    next(createError(error));
  }
};
