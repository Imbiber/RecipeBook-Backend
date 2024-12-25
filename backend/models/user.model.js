const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
    default:
      "https://i.ibb.co/3krVF2w/chef-hat-logo-icon-vector-600nw-2297100465.webp",
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
