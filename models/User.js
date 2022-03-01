const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "이메일은 반드시 필요합니다."],
    unique: [true, "이메일은 중복될 수 없습니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호는 반드시 필요합니다."],
  },
  nickname: {
    type: String,
    trim: true,
    maxlength: [15, "별명은 최대 15자까지 가능합니다."],
    required: [true, "별명은 반드시 필요합니다."],
    unique: [true, "별명은 중복될 수 없습니다."],
  },
  profileImage: {
    type: String,
    required: [true, "프로필 사진은 반드시 필요합니다."],
  },
  language: {
    type: String,
    required: [true, "사용 언어는 반드시 필요합니다."],
  },
  country: {
    type: String,
    required: [true, "거주 국가는 반드시 필요합니다."],
  },
  lat: {
    type: Number,
    required: [true, "위도는 반드시 필요합니다."],
  },
  lng: {
    type: Number,
    required: [true, "경도는 반드시 필요합니다."],
  },
});

module.exports = mongoose.model("User", UserSchema);
