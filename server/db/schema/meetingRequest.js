const mongoose = require("mongoose");

const meetingRequest = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  email: {
    type: String,
    require: true,
  },
  name: String,
  phone: String,
  topic: String,
  mindmate: { type: mongoose.Schema.Types.ObjectId, ref: "Mindmate" },
  status: {
    type: String,
    default: "Pending",
  },
});

const MeetingRequest = mongoose.model("Meeting", meetingRequest);
module.exports = MeetingRequest;
