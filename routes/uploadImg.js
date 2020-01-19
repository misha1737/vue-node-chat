const express = require("express");
const router = express.Router();

const path = require("path");
var multer = require("multer");
var fs = require("fs");
var dirname = "uploads/upl";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      fs.statSync(dirname);
      console.log("file or directory exists");
    } catch (err) {
      if (err.code === "ENOENT") {
        fs.mkdirSync(dirname);
        console.log("file or directory does not exist");
      }
    }

    cb(null, dirname);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      const err = new Error("Extention");
      err.code = "EXTENTION";
      return cb(err);
    }
    cb(null, true);
  }
}).single("filedata");

router.post("/uploadImg", function(req, res, next) {
  upload(req, res, err => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.send("Файл дуже великий");
      } else if (err.code === "EXTENTION") {
        res.send("невірний формат");
      }
    } else {
      res.send("ok");
    }
  });
});

module.exports = router;
