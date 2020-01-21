//import authorization from '/authorization';
const authorization = require("./authorization");
const registration = require("./registration");
const logout = require("./logout");
const uploadImg = require("./uploadImg");
const getUser = require("./getUser");
module.exports = {
  authorization,
  registration,
  logout,
  uploadImg,
  getUser
};
