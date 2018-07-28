const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation

const validateProfileInput = require("../../validation/profile");
const validateCatsInput = require("../../validation/cats");

//Load Profile Model
const Cats = require("../../models/Cats");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route GET api/profile/handle/:handle
// @desc Get Profile by Handle
// @access pubblic route

router.get("/cats/catHandle/:handle", (req, res) => {
  const errors = {};
  Cats.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(cat => {
      if (!cat) {
        errors.noCat = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(cat);
    })
    .catch(err => res.status(404));
});

// @route GET api/cat/user/:user_id
// @desc Get Cat by user ID
// @access pubblic route

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Cats.find({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(cat => {
      if (!cat) {
        errors.noCat = "There is no cat for this user";
        res.status(404).json(errors);
      }
      res.json(cat);
    })
    .catch(err => res.status(404).json({ cat: "there is no cat for this ID" }));
});

// @route GET api/cat/user/:user_id
// @desc Get Cat by user ID
// @access pubblic route

router.get("/profile/:handle", (req, res) => {
  const errors = {};
  Profile.find({ handle: req.params.handle })
    .populate("user", "_id")
    .then(profile => {
      {
        userId = profile[0].user._id;
      }
      Cats.find({ user: userId })
        .populate("user", ["name", "avatar"])
        .then(cat => {
          if (!cat) {
            errors.noCat = "There is no cat for this user";
            res.status(404).json(errors);
          }
          res.json(cat);
        })
        .catch(err =>
          res.status(404).json({ cat: "there is no cat for this ID" })
        );
    });
});

// @route GET api/profile/all
// @desc Get all profiles
// @access pubblic route

router.get("/all", (req, res) => {
  Cats.find()
    .populate("user", ["name", "avatar"])
    .then(cats => {
      if (!cats) {
        errors.noCats = "There are no Cats";
        return res.status(404).json(errors);
      }

      res.json(cats);
    })
    .catch(err => res.status(404).json({ profile: "there are no profiles" }));
});

//router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route GET api/profile
// @desc Tests profiles route
// @access private route

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Cats.find({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(cat => {
        if (!cat) {
          errors.nopcat = "There is no cat for this user";
          return res.status(404).json(errors);
        }
        res.json(cat);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// @desc Create user profile
// @access private route

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCatsInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors) + res.body;
    }
    // Get fields
    const catFields = {};
    catFields.user = req.user.id;
    if (req.body.handle) catFields.handle = req.body.handle;
    if (req.body.photo) catFields.photo = req.body.photo;
    if (req.body.name) catFields.name = req.body.name;
    if (req.body.color) catFields.color = req.body.color;
    if (req.body.description) catFields.description = req.body.description;
    if (req.body.age) catFields.age = req.body.age;
    if (req.body.telephone) catFields.telephone = req.body.telephone;
    if (req.body.email) catFields.email = req.body.email;
    if (req.body.race) catFields.race = req.body.race;
    if (req.body.vaxins) catFields.vaxins = req.body.vaxins;
    if (req.body.needAdoption) catFields.needAdoption = req.body.needAdoption;
    if (req.body.fivN) catFields.fivN = req.body.fivN;
    if (req.body.felvN) catFields.felvN = req.body.felvN;

    /*Cats.findOne({ user: req.user.id }).then(cat => {
      if (cat) {
        //Update
        Cats.findOneAndUpdate(
          { user: req.user.id },
          { $set: catFields },
          { new: true }
        ).then(cat => res.json(cat));
      } else {*/
    //Create

    //CHeck if handle exists
    Cats.findOne({ handle: catFields.handle }).then(cat => {
      if (cat) {
        errors.handle = "That handle already exists";
        res.status(400).json(errors);
      }

      //Save Profile
      new Cats(catFields).save().then(cat => res.json(cat));
    });
  }
);

// @route GET api/cats
// @desc Add cats
// @access Private

router.post(
  "/cats",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Input validation
    const { errors, isValid } = validateCatsInput(req.body);
    console.log("ciao");
    if (!isValid) {
      return res.status(400).json(errors) + res.body;
    }

    //Cats creation
    Cats.findOne({ user: req.user.id }).then(cat => {
      const newCat = {
        handle: req.body.handle,
        name: req.body.name,
        color: req.body.color,
        age: req.body.age,
        telephone: req.body.telephone,
        email: req.body.email,
        description: req.body.description,
        fivN: req.body.fivN,
        felvN: req.body.felvN,
        race: req.body.race,
        vaxins: req.body.vaxins,
        needAdoption: req.body.needAdoption,
        photo: req.body.photo
      };

      // Add to cat array
      cat.cats.unshift(newCat);
      cat.save().then(cat => res.json(cat));
    });
  }
);

// @route POST api/profile/cats/:cat_id
// @desc Delete cat
// @access Private

router.delete(
  "/cats/:cat_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cats.findOneAndRemove({ _id: req.cats.id }).then(() =>
      res.json({ success: true })
    );
  }
);

module.exports = router;
