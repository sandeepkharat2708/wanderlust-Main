const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
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

// Show new listing form
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// Create new listing
router.post("/", isLoggedIn, async (req, res) => {
  try {
    // Debug logs
    console.log("User:", req.user);
    console.log("Form data:", req.body.listing);

    // Create new listing object
    const newListing = new Listing({
      ...req.body.listing,
      owner: req.user._id,
      image: {
        url: req.body.listing.image.url,
        filename: req.body.listing.image.url.split("/").pop(), // Extract filename from URL
      },
    });

    // Validate listing
    const validationError = newListing.validateSync();
    if (validationError) {
      console.error("Validation Error:", validationError);
      req.flash("error", "Please fill all required fields correctly");
      return res.redirect("/listings/new");
    }

    // Save listing
    await newListing.save();
    console.log("New listing created:", newListing);

    req.flash("success", "Successfully created new listing!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.error("Error creating listing:", err);
    req.flash("error", err.message || "Error creating listing");
    res.redirect("/listings/new");
  }
});

// Show all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
  } catch (err) {
    console.error(err);
    req.flash("error", "Cannot find listings!");
    res.redirect("/");
  }
});

// Show single listing
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner");
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
  } catch (err) {
    console.error(err);
    req.flash("error", "Cannot find this listing!");
    res.redirect("/listings");
  }
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

// Add this route for debugging
router.get("/debug-session", (req, res) => {
  res.json({
    user: req.user,
    isAuthenticated: req.isAuthenticated(),
    session: req.session,
  });
});

module.exports = router;
