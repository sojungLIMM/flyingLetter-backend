const mongoose = require("mongoose");
const createError = require("http-errors");

const User = require("../models/User");
const Letter = require("../models/Letter");
const { RESPONSE, MESSAGE } = require("../constants");

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const totalUsers = await User.find({
      _id: { $ne: req.userId },
    }).countDocuments();
    const users = await User.find({ _id: { $ne: req.userId } })
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

    const { from, to, content, arrivedAt } = req.body;

    await Letter.create({
      from,
      to,
      content,
      arrivedAt,
      letterPaperImage: req.file ? req.file.location : "",
    });

    res.status(201).json({
      result: RESPONSE.SUCCESS,
    });
  } catch (error) {
    next(createError(error));
  }
};
