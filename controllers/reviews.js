const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!!!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("Error creating review:", err);
    req.flash("error", "Failed to create review");
    res.redirect(`/listings/${req.params.id}`);
  }
};

module.exports.destroyReview = async (req, res) => {
  try {
    let { id, reviewId } = req.params;

    // Find the listing and review
    const listing = await Listing.findById(id);
    const review = await Review.findById(reviewId);

    if (!listing || !review) {
      req.flash("error", "Listing or review not found");
      return res.redirect("/listings");
    }

    // Remove review from listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!!!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error deleting review:", err);
    req.flash("error", "Failed to delete review");
    res.redirect(`/listings/${req.params.id}`);
  }
};
