const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//Load user model

const User = require("../../models/User");

// @route GET api/users/test
// @desc Tests users route
// @access pubblic route

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route POST api/users/register
// @desc      Register a user
// @access    pubblic route

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
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
  const { errors, isValid } = validateLoginInput(req.body);

  //check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then(user => {
    //check for users
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json({ email: errors });
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
        errors.password = "Password incorrect";
        return res.status(400).json({ password: errors });
      }
    });
  });
});

// @route GET api/users/current
// @desc      return the current user
// @access    private route

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      email: req.user.email
    });
  }
);

module.exports = router;
