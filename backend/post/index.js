const express = require("express");
const router = express.Router();
const Post = require("../db/models/post");

// this route is just used to get the user basic info
router.get("/user", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

router.get("/getposts", (req, res) => {
  Post.find({}, (err, allPosts) => {
    if (allPosts) {
      return res.json({
        allPosts
      });
    }
  });
});

router.post("/create", (req, res) => {
  if (req.user) {
    const newPost = new Post({
      creatorId: req.user._id,
      creatorUsername: req.body.username,
      content: req.body.content
    });

    newPost.save((err, savedPost) => {
      if (err) return res.json(err);
      return res.json(savedPost);
    });
  } else {
    return res.json({
      error: "You must be signed in to create a post"
    });
  }
});

router.post("/delete", (req, res) => {
  if (req.user._id == req.body.creatorId) {
    console.log("matches current user");
    Post.findOneAndDelete({ _id: req.body.postId }, (err, post) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ post });
      }
    });
  } else {
    return res.json({
      error: "You are not the user who created this post"
    });
  }
});

module.exports = router;
