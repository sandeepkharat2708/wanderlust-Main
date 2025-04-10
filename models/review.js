const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: [true, "Review comment is required"],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
    validate: {
      validator: Number.isInteger,
      message: "Rating must be an integer",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Add index for better query performance
reviewSchema.index({ author: 1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
