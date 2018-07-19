const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation

const validateProfileInput = require("../../validation/profile");
const validateCatsInput = require("../../validation/cats");

//Load Profile Model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile/handle/:handle
// @desc Get Profile by Handle
// @access pubblic route

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404));
});

// @route GET api/profile/user/:user_id
// @desc Get Profile by user ID
// @access pubblic route

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "there is no profile for this ID" })
    );
});

// @route GET api/profile/all
// @desc Get all profiles
// @access pubblic route

router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
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

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
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
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors) + res.body;
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.WebSite) profileFields.WebSite = req.body.WebSite;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.Bio) profileFields.Bio = req.body.Bio;

    //Social handling

    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        //CHeck if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
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

    if (!isValid) {
      return res.status(400).json(errors) + res.body;
    }

    //Cats creation
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newCat = {
        name: req.body.name,
        color: req.body.color,
        description: req.body.description,
        fivN: req.body.fivM,
        felvN: req.body.felvN,
        race: req.body.race,
        vaxins: req.body.vaxins
      };

      // Add to cat array
      profile.cats.unshift(newCat);
      profile.save().then(profile => res.json(profile));
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
    //Cats creation
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get ID to remove
        const removeIndex = profile.cats
          .map(item => item.id)
          .indexOf(req.params.cat_id);

        //Splice out of array
        profile.cats.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// @desc Delete user and profile
// @access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove((_id = req.user.id)).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
