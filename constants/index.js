const RESPONSE = {
  SUCCESS: "success",
  FAIL: "fail",
};

const MESSAGE = {
  INVAILD_EMAIL: "유효하지 않은 이메일입니다.",
  INVAILD_PASSWORD: "유효하지 않은 비밀번호입니다.",
  EXISTED_EMAIL: "중복되는 이메일입니다. 다시 입력 해주세요.",
  EXISTED_NICKNAME: "중복되는 닉네임입니다. 다시 입력 해주세요.",
  BAD_REQUEST: "유효하지 않은 접근입니다.",
  UNAUTHORIZED: "유효하지 않은 권한입니다.",
  INVAILD_OBJECT_ID: "유효하지 않은 object id입니다.",
};

const URL = {
  DEFAULT_IMAGE:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
};

module.exports = { RESPONSE, MESSAGE, URL };
