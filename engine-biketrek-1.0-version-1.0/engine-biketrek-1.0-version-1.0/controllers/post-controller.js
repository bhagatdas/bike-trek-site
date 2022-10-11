const Post = require("../models/post");
const slugify = require("slugify");
const HttpError = require("../exceptions/http-error");

exports.create = async (req, res) => {
  try {
    console.log("post data ", req.body);
    req.body.slug = slugify(req.body.title);
    const newPost = await new Post(req.body).save();
    res.json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create post failed" + err);
  }
};

exports.read = async (req, res) => {
  try {
   let posts = await Post.find({});
   res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).send("read post failed" + err);
  }
};