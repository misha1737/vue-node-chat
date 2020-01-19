var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
server.listen(process.env.PORT || 5000, function() {
  console.log("listening on *http://kmuauto.ru:5000");
  (module.exports = server), io, app;
});
