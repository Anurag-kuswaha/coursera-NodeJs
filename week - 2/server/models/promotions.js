const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  label: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  featured: {
    type: Boolean,
  },
});
const promotions = mongoose.model("promotion", promotionSchema);
module.exports = promotions;
