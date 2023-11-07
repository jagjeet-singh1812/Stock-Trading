const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who created the bookmark
  },
  { timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
