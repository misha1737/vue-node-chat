const express = require("express");
const router = express.Router();
var User = require("../models/user.js").User;

router.get("/", function(req, res) {

    if (req.session.userLogin) {

        // res.status(200).send({ login: req.session.userLogin });
        User.findOne({ login: req.session.userLogin }).then(user => {
           
           res.status(200).send({ login: req.session.userLogin, logoUrl:user.logoUrl });
          });
          
      } else {
        res.status(401).send("access error");
      }

});

module.exports = router;