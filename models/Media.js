const mongoose = require("mongoose");

const InputSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GroupSchema = new mongoose.Schema(
  {
    interval: {
      type: Number,
      required: true,
    },
    inputs: {
      type: [InputSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MediaSchema = new mongoose.Schema(
  {
    media_id: {
      type: String,
      required: true,
    },
    media_link: {
      type: String,
      required: true,
    },
    groups: [GroupSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Media", MediaSchema);
