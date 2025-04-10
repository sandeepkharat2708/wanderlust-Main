const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { number } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Trending",
      "Mountains",
      "Lake",
      "Beach",
      "Camping",
      "City",
      "Hotel",
      "Cabin",
    ],
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  rooms: {
    type: Number,
    required: true,
    min: 1,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  tax: {
    type: Number,
    default: 0,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
