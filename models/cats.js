var mongoose = require("../libs/mongoose");
Schema = mongoose.Schema;

var schema = new Schema(
  {
    catName: {
      type: String,
      required: true,
      unique: true
    },
    catAge: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

exports.Cat = mongoose.model("Cat", schema);
