const mongoose = require("mongoose");

const MilestoneSchema = new mongoose.Schema({
  year: {
    type: Number,
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
    default: 'Public',
    enum: ['Public', 'Private']
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

module.exports = mongoose.model("Milestone", MilestoneSchema);
