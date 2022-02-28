const jwt = require("jsonwebtoken");
const createError = require("http-errors");

exports.verifyToken = async (req, res, next) => {
  const accessToken = req.headers.accesstoken;

  if (!accessToken) {
    next(createError.Unauthorized("로그인이 필요한 유저입니다."));
    return;
  }

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      next(createError(401, "유효하지 않은 토큰입니다."));
      return;
    }

    req.userId = user._id;

    next();
  });
};
