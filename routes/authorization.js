const express = require("express");
const router = express.Router();
var User = require("../models/user.js").User;
const bcrypt = require("bcryptjs");

router.post("/authorization", function(req, res) {
  if (!req.body.login) {
    res.status(401).send("error");
  } else if (!req.body.password) {
    res.status(401).send("error");
  } else {
    User.findOne({ login: req.body.login }).then(user => {
      if (!user) {
        res.status(401).send("user not found");
      } else {
        var dbHash = user.password;
        bcrypt.compare(req.body.password, dbHash).then(result => {
          if (result) {
            // console.info(user.login +' autorithation success');
            // console.log(user.id);
            // console.log(user.login);

            req.session.userId = user.id;
            req.session.userLogin = user.login;
           
           
            User.findOne({ login: req.session.userLogin }).then(user => {
           
              res.status(200).send({ login: req.session.userLogin, logoUrl:user.logoUrl });
             });
          } else {
            res.status(401).send("password error");
          }
        });
      }
    });
  }
});

module.exports = router;
