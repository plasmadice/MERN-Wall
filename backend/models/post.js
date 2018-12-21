const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  body: { type: String, min: 1 }
});

module.exports = mongoose.model("Post", PostSchema);
