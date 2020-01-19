//import authorization from '/authorization';
const authorization = require("./authorization");
const registration = require("./registration");
const chat = require("./chat");
const logout = require("./logout");
const uploadImg = require("./uploadImg");
module.exports = {
  authorization,
  registration,
  chat,
  logout,
  uploadImg
};
