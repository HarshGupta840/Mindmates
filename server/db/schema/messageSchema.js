const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  time: {
    type: Date,
    default: new Date(),
  },
  seenByUser: {
    type: Boolean,
    default: false,
  },
  seenByTrubuddy: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
