const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "보낸 사람은 반드시 필요합니다."],
    ref: "User",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: [true, "편지 내용은 반드시 필요합니다."],
  },
  letterWallPaper: {
    type: String,
  },
  arrivedAt: {
    type: Date,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  newFromLat: {
    type: Number,
  },
  newFromLng: {
    type: Number,
  },
});

module.exports = mongoose.model("Letter", LetterSchema);
