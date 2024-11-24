const mongoose = require("mongoose");

const mindmateSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: true,
  },
  profile: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  password: String,
  bio: String,
  expertise: Array,
  address: String,
  anonymous: String,
  meeting_url: String,
  availability: String,
  mates: Array,
});

const Mindmate = mongoose.model("Mindmate", mindmateSchema);
module.exports = Mindmate;
