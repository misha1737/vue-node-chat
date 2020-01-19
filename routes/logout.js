const express = require("express");
const router = express.Router();

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
