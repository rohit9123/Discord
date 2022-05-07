const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    min: 3,
    max: 18,
  },
  password: {
    type: String,
    min: 6,
    max: 16,
  },
});

module.exports = mongoose.model("user", userSchema);
