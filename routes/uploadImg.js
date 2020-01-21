const express = require("express");
const router = express.Router();
const path = require("path");
var multer = require("multer");
var fs = require("fs");
var dirname = "undefined";
var User = require("../models/user.js").User;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      fs.statSync('uploads/'+dirname);
      console.log("file or directory exists");
    } catch (err) {
      if (err.code === "ENOENT") {
        fs.mkdirSync('uploads/'+dirname);
        console.log("file or directory does not exist");
      }
    }

    cb(null, 'uploads/'+dirname);
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
  console.log(req.session.userLogin)
  dirname=req.session.userLogin;
  upload(req, res, err => {
   
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(413).send("file too big");
      } else if (err.code === "EXTENTION") {
        
        res.status(415).send("wrong format");
        
      }
    } else {
     console.log(req.file)
      User.findOneAndUpdate({'login':req.session.userLogin}, {$set: { logoUrl:  dirname+"/"+req.file.filename }},  function(err){
        console.log(err)

      });
      res.send("ok");
    }
  });
});

module.exports = router;
