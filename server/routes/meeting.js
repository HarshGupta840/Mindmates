const meeting = require("express").Router();
const nodemailer = require("nodemailer");
const MeetingRequest = require("../db/schema/meetingRequest");
const User = require("../db/schema/loginSchema");

meeting.post("/create", async (req, res) => {
  const { name, email, phone, topic, user, mindmate } = req.body;

  const obj = MeetingRequest({ name, email, phone, topic, user, mindmate });
  let data = await User.findOne({ _id: user });

  obj
    .save()
    .then(async (result) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const resp = await transporter.sendMail({
        to: email,
        subject: "Regarding Online session",
        text: `Hello MindMate! \n\nWe hope this email finds you well.\n\nThis mail is to inform you that one of our mates, ${data?.anonymous}, has requested for an online meet. They've expressed a desire to discuss some issues personally with you in a one-on-one session.\n\n Kindly revert back to the mate via chat box. \n\nRegards.`,
      });
      if (resp.accepted.includes(email)) {
        res.send(result);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

meeting.post("/update", async (req, res) => {
  const { id } = req.body;
  let data = await MeetingRequest.findOne({ _id: id });
  let response = await MeetingRequest.updateOne(
    { _id: id },
    { status: "Ongoing" }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const resp = await transporter.sendMail({
    to: data?.email,
    subject: "Online session update",
    text: `Hi Mate! Hope this mail finds you well. \n\nThis mail is to inform you that your MindMate has joined the online session. \nKindly join the session. \n\nRegards.`,
  });
  if (resp.accepted.includes(data?.email)) {
    res.send(response);
  }
});

meeting.post("/Complete", async (req, res) => {
  const { id } = req.body;
  let response = await MeetingRequest.updateOne(
    { _id: id },
    { status: "Completed" }
  );

  res.send(response);
});

meeting.post("/get-mindmate/:id", async (req, res) => {
  const { id } = req.params;

  const response = await MeetingRequest.find({ mindmate: id }).populate("user");
  res.send(response);
});

meeting.post("/get-mate/:id", async (req, res) => {
  const { id } = req.params;

  const response = await MeetingRequest.find({ user: id }).populate("mindmate");
  res.send(response);
});

module.exports = meeting;
