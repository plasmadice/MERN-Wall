const express = require("express");
const path = require("path"); // TODO: remove ?
const bodyParser = require("body-parser");
const passport = require("passport");

// Research cors
const cors = require("cors");

const morgan = require("morgan");
const errorHandler = require("errorhandler");

// Added for alternate TODO:
const session = require("express-session");
MongoStore = require("connect-mongo")(session);
const dbConnection = require("./db"); // loads our connection to the mongo database

const API_PORT = 3001;
const app = express();

// TODO: Remove ?
// Configure mongoose's promise to global promise
// mongoose.promise = global.Promise;
// const mongoose = require("mongoose");
// require('dotenv').config()
// Configure isProduction variable
// const isProduction = process.env.NODE_ENV === 'production';

// Middleware Setup
// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(
  session({
    secret: "ninja-turtles",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

// TODO: Possibly remove, serves files from '/public' as if they were in '/'
app.use(express.static(path.join(__dirname, "public")));

// Models and Routes
require("./models/Users");
require("./config/passport");

// Configure mongoose
const dbRoute =
  "mongodb+srv://haku:chocobo@cluster0-vbghb.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
// mongoose.connect(
//   dbRoute,
//   { dbName: "cluster0", useNewUrlParser: true }
// );

// mongoose.set("debug", true);

// let db = mongoose.connection;

// db.once("open", () => console.log("connected to the database"));

// // checks if connection with the database is successful
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Error handlers & middlewares TODO: define isproduction
// if (!isProduction) {
//   app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: err
//       }
//     });
//   });
// }

/*  PASSPORT SETUP  */
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

app.get("/success", (req, res) =>
  res.send("Welcome " + req.query.username + "!!")
);
app.get("/error", (req, res) => res.send("error logging in"));

/* Express app ROUTING */
app.use("/auth", require("./auth"));

// ====== Error handler ====
app.use(function(err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`Listening on port: ${API_PORT}`));
