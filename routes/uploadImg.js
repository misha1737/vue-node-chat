const express = require("express");
const router = express.Router();
const path = require("path");
var multer = require("multer");
var fs = require("fs");
var dirname = "undefined";
var User = require("../models/user.js").User;
var cropImage = require("../libs/crop-image");
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


     User.findOne({'login':req.session.userLogin}).then(user => {
      if (user.logoUrl) {
          console.log('image yes');
          //удалить старое изображения
          fs.unlink("./uploads/"+user.logoUrl, function(err) {
            if (err){  console.log(err);}
          
            console.log('file deleted');
           
          });
     
          new Promise( function (resolve) {
           //обрезка и запись в базу (login,url,coordinates,user)
          
            resolve( cropImage(req.session.userLogin, dirname+"/"+req.file.filename, req.body.coordinates, user));
        }).then(response => {
          res.send(response);
        });
      }else{

        console.log('image no');
        //обрезка и запись в базу (login,url,coordinates,user)
     
        new Promise(function (resolve) {
          //обрезка и запись в базу (login,url,coordinates,user)
          resolve(cropImage(req.session.userLogin, dirname+"/"+req.file.filename, req.body.coordinates, user));
       }).then(response => {
         res.send(response);
       });


      }
     });

      
    }
  });
});

module.exports = router;
