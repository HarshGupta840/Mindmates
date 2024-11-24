const posts = require("express").Router();
const Posts = require("../db/schema/postSchema");

posts.get("/get-all", async (req, res) => {
  const response = await Posts.find()
    .populate("user")
    .populate("comments.user");
  res.send(response);
});

posts.post("/create", async (req, res) => {
  const { text, user } = req.body;

  const data = Posts({ text, user });
  data
    .save()
    .then((resp) => {
      res.send(resp);
    })
    .catch((errr) => {
      console.log(errr);
    });
});

posts.post("/delete", async (req, res) => {
  const response = await Posts.deleteOne({ _id: req.body.id });
  res.send(response);
});

posts.post("/like", async (req, res) => {
  let { id, post_id } = req.body;
  let data = await Posts.findOne({ _id: post_id });

  if (data?.likes?.includes(id)) {
    const response = Posts.updateOne(
      { _id: post_id },
      { $pull: { likes: id } }
    );
    res.send(response);
  } else {
    const response = Posts.updateOne(
      { _id: post_id },
      { $push: { likes: id } }
    );
    res.send(response);
  }
});

posts.post("/comment", async (req, res) => {
  const { id, post_id, text } = req.body;

  const response = await Posts.updateOne(
    { _id: post_id },
    { $push: { comments: { text, user: id } } }
  );
  res.send(response);
});

module.exports = posts;
