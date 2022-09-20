const mongoose = require("mongoose");

const MilestoneSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  eventType: {
    type: String,
    require: true,
  },
  userNotes: {
    type: String,
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
