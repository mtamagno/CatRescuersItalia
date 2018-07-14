const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc Tests posts route
// @access pubblic route

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

module.exports = router;
