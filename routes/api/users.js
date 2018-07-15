const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load user model

const User = require("../../models/User");

// @route GET api/users/test
// @desc Tests users route
// @access pubblic route

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route GET api/users/register
// @desc      Register a user
// @access    pubblic route

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        sex: req.body.sex,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc      login a user
// @access    pubblic route

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then(user => {
    //check for users
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //UserMatch
        //res.json({ msg: "Success" });

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create jwt payload

        //SignIn token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 14400 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
