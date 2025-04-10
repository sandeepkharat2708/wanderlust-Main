const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { sampleListings } = require("../data.js");

// Debug middleware for listings
router.use((req, res, next) => {
  if (sampleListings) {
    console.log("Debug Info:");
    console.log(`Number of listings: ${sampleListings.length}`);
    console.log("First listing title:", sampleListings[0]?.title);
    console.log(
      "Available listing IDs:",
      sampleListings.map((l) => l.id)
    );
  }
  next();
});

// index route
// create new listing route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show listing route
// update listing route
// delete listing route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Index route
router.get("/", (req, res) => {
  try {
    if (!Array.isArray(sampleListings)) {
      throw new Error("sampleListings is not an array");
    }
    console.log("Rendering listings with", sampleListings.length, "listings");
    res.render("listings/index", {
      listings: sampleListings,
      totalListings: sampleListings.length,
    });
  } catch (error) {
    console.error("Error in listings route:", error);
    res.status(500).send("Something went wrong!");
  }
});

// Show listing route
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Looking for listing with ID:", id);
    const listing = sampleListings.find(
      (l) =>
        l.id.toString() === id.toString() || l._id?.toString() === id.toString()
    );

    if (!listing) {
      console.log("No listing found for ID:", id);
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    console.log("Found listing:", listing.title);
    res.render("listings/show", { listing });
  } catch (err) {
    console.error("Error in show route:", err);
    req.flash("error", "Error loading listing");
    res.redirect("/listings");
  }
});

// Booking route
router.post("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const booking = req.body.booking;
    console.log("New booking received:", booking);
    req.flash("success", "Booking confirmed!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Booking error:", err);
    req.flash("error", "Failed to process booking");
    res.redirect(`/listings/${id}`);
  }
});

module.exports = router;
