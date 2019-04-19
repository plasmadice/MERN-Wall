const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Date formatting
function formatDate(date) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}

// Define userSchema
const postSchema = new Schema({
  creatorId: { type: String, unique: false },
  creatorUsername: { type: String, unique: false },
  content: { type: String, unique: false },
  created: { type: String, default: formatDate(new Date()) }
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
