const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define userSchema
const postSchema = new Schema({
  creator: { type: String, unique: false },
  content: { type: String, unique: false },
  created: { type: Date, default: Date.now }
});

// Define schema methods
postSchema.methods = {
  // remove post if user is authenticated as creator
  // checkPassword: function(inputPassword) {
  //   return bcrypt.compareSync(inputPassword, this.local.password);
  // },
  // hashPassword: plainTextPassword => {
  //   return bcrypt.hashSync(plainTextPassword, 10);
  // }
};

// Create reference to User & export
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
