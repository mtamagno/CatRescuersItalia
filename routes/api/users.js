const express = require("express");
const router = express.Router();

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
  User.findOne({ email: req.body.email });
});

module.exports = router;
