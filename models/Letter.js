const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "보낸 사람은 반드시 필요합니다."],
    ref: "User",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "받는 사람은 반드시 필요합니다."],
    ref: "User",
  },
  content: {
    type: String,
    required: [true, "편지 내용은 반드시 필요합니다."],
  },
  letterPaperImage: {
    type: String,
  },
  arrivedAt: {
    type: Date,
    required: [true, "도착 시간은 반드시 필요합니다."],
  }
});

module.exports = mongoose.model("Letter", LetterSchema);
