const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const cats = require("./routes/api/cats");

const passport = require("passport");
const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

//BOdyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect To MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello!!"));

// Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/cats", cats);

const port = process.env.PORT || 500;

app.listen(port, () => console.log(`Server running on port ${port}`));
