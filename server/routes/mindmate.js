const express = require("express");
const mindmate = express.Router();
const Mindmate = require("../db/schema/mindmateSchema");
const User = require("../db/schema/loginSchema");
const Message = require("../db/schema/messageSchema");
const jwt = require("jsonwebtoken");
const { validateToken } = require("../middleware/index");

mindmate.get("/get-messages/:mate_id/:mindmate_id", async (req, res) => {
  const { mindmate_id, mate_id } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: mindmate_id, receiver: mate_id },
        { sender: mate_id, receiver: mindmate_id },
      ],
    }).sort({
      time: 1,
    });

    res.send(messages);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

mindmate.post("/seen/:id", validateToken, async (req, res) => {
  let { id } = req.params; // Trubuddy Id

  const response = await Message.updateMany(
    {
      $or: [
        { sender: req?.id, receiver: id },
        { sender: id, receiver: req?.id },
      ],
    },
    { seenByTrubuddy: true }
  );

  res.status(200).send(response);
});

mindmate.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let response = await Mindmate.findOne({ email });

  if (response) {
    if (response?.password === password) {
      const jwtToken = jwt.sign(
        {
          user: response._id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );
      res.json({ message: "Login successfully", jwtToken, user: response });
    } else {
      res.status(202).send("Invalid credentials");
    }
  } else {
    res.status(202).send("Invalid credentials");
  }
});

mindmate.post("/create", (req, res) => {
  const { email, password, name } = req.body;

  const mate = Mindmate({ email, password, name });
  mate
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

mindmate.post("/get", validateToken, async (req, res) => {
  const { id } = req;

  const response = await Mindmate.findById(id);
  res.send(response);
});

mindmate.post("/update", validateToken, async (req, res) => {
  const { id } = req;
  const {
    email,
    password,
    name,
    bio,
    expertise,
    address,
    anonymous,
    meeting_url,
    profile,
    availability,
  } = req.body;

  const response = await Mindmate.updateOne(
    { _id: id },
    {
      email,
      password,
      name,
      bio,
      expertise,
      address,
      anonymous,
      meeting_url,
      profile,
      availability,
    }
  );
  res.send(response);
});

mindmate.get("/get-all", async (req, res) => {
  const response = await Mindmate.find();
  res.send(response);
});

mindmate.post("/mates/:mindmate/:user_id", async (req, res) => {
  const { mindmate, user_id } = req.params;
  console.log(mindmate, user_id);
  Mindmate.updateOne({ _id: mindmate }, { $push: { mates: user_id } })
    .then(async (resp) => {
      console.log(resp);
      let data = await User.findOne({ _id: user_id });
      console.log(data);
      if (resp.modifiedCount == 1) {
        User.updateOne({ _id: user_id }, { $push: { mindmates: mindmate } })
          .then((response) => {
            console.log(response);
            res.send(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = mindmate;
