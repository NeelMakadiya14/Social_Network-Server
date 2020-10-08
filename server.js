const express = require("express");
const dotnev = require("dotenv");
const connectDB = require("./config/db.js");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");

// Load Config
dotnev.config({ path: "./config/config.env" });

const app = express();

// Passport Config
require("./config/passport")(passport);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Logging
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  }
});

/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, POST, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type Authorization");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/users", (req, res) => {
  res.send(200, "Hello..");
});

//Routes
app.use("/users", require("./routes/user"));
