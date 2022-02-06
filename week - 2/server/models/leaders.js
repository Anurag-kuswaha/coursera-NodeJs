const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  designation: {
    type: String,
  },
  abbr: {
    type: String,
  },
  description: {
    type: String,
  },
  featured: {
    type: String,
  },
});
const leader = mongoose.model('leader',leaderSchema);
module.exports =leader;
