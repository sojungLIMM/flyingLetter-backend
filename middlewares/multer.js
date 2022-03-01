const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const storage = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: "public-read",
  key: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    cb(null, Date.now().toString() + extension);
  },
});

exports.upload = multer({ storage });
