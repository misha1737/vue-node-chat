const mongoose = require("mongoose");
async function start() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (e) {
    console.log(e);
  }
}
start();
module.exports = mongoose;
