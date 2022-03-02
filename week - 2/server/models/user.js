const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new Schema(
  {admin: {
    type: Boolean,
    default: false,
  },
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("users", userSchema);
module.exports = User;
