var express = require("express");
var router = express.Router();

router.use("/api", require("./api"));

// // GET Login Page
// router.get("/login", (req, res) => {
//   console.log("login page");
//   res.send("NOT YET IMPLEMENTED: login page");
// });

// router.post("/login", (req, res) => {
//   res.send("NOT YET IMPLEMENTED: user login request");
// });

// // POST create new user
// router.post("/create", (req, res) => {
//   res.send("NOT YET IMPLEMENTED: user create request");
// });

module.exports = router;
