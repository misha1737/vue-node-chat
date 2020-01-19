//var mongoose = require('../libs/mongoose');
var Cat = require("./models/cats.js").Cat;

Cat.find({}).then(cat => {
  console.log(cat[0].catAge);
});
