const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // Validate rating
    const rating = parseInt(req.body.review.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      req.flash("error", "Rating must be between 1 and 5");
      return res.redirect(`/listings/${listing._id}`);
    }

    const newReview = new Review({
      ...req.body.review,
      rating: rating,
      author: req.user._id,
    });

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("Error creating review:", err);
    req.flash("error", err.message || "Failed to create review");
    res.redirect(`/listings/${req.params.id}`);
  }
};

module.exports.destroyReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    const listing = await Listing.findById(id);
    const review = await Review.findById(reviewId);

    if (!listing || !review) {
      req.flash("error", "Listing or review not found");
      return res.redirect("/listings");
    }

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error deleting review:", err);
    req.flash("error", "Failed to delete review");
    res.redirect(`/listings/${req.params.id}`);
  }
};
