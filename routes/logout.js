const express = require("express");
const router = express.Router();
var User = require("../models/user.js").User;
const bcrypt = require("bcryptjs");

router.get("/logout", function(req, res) {
  if (req.session) {
    req.session.destroy(() => {
      res.status(200).send("logout");
    });
  } else {
    res.status(400).send("logout error");
  }
});

module.exports = router;
