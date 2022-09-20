const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  industry: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Post", PostSchema);
