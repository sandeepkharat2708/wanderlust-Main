const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// add review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

// Create Review
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);

    await review.save();
    await listing.save();

    req.flash("success", "✨ Review added successfully!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    req.flash("error", "Failed to add review");
    res.redirect(`/listings/${req.params.id}`);
  }
});

// Delete Review
router.delete("/:reviewId", isLoggedIn, async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "🗑️ Review deleted successfully");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    req.flash("error", "Failed to delete review");
    res.redirect(`/listings/${req.params.id}`);
  }
});

module.exports = router;
