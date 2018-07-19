const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = require("../../models/Post");

//Profile model
const Profile = require("../../models/Profile");

//Post Validation

const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Tests posts route
// @access pubblic route

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route GET api/posts/posts
// @desc Get posts
// @access pubblic route

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts here" }));
});

// @route GET api/posts/:id
// @desc Get posts
// @access pubblic route for single post

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: "No post here" }));
});

// @route POST api/posts/post
// @desc Create posts route
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route DELETE api/posts/:id
// @desc Get posts
// @access private route for single post

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauth: "User not authorized" });
          }

          //Delete
          post.remove().then(() => res.json({ succes: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post here" }));
    });
  }
);

// @route POST api/posts/like/:id
// @desc Get posts
// @access private route for single post

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          //Add the user to likes
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post here" }));
    });
  }
);

// @route POST api/posts/unlike/:id
// @desc Get posts
// @access private route for single post

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "U have not yet liked this post" });
          }

          //Remove likes
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post here" }));
    });
  }
);

// @route POST api/posts/comment/:id
// @desc POST a comment
// @access private route for comment

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          const { errors, isValid } = validatePostInput(req.body);

          //Check Validation
          if (!isValid) {
            return res.status(400).json(errors);
          }

          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };

          //Add to comments array
          post.comments.unshift(newComment);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post here" }));
    });
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc DELETE a comment
// @access private route for comment

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check if the comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotfound: "There is no comment with this ID" });
          }

          //Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

          post.comments.splice(removeIndex, 1);

          //Add to comments array

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post here" }));
    });
  }
);

module.exports = router;
