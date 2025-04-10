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
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully created new listing!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    console.log(err);
    req.flash("error", "Error creating listing");
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
    const listing = await Listing.findById(req.params.id)
      .populate("owner")
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      });
    res.render("listings/show", { listing });
  } catch (err) {
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

// Edit route
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Check if user is admin or owner
    if (req.user && (req.user.isAdmin || listing.owner.equals(req.user._id))) {
      res.render("listings/edit", { listing });
    } else {
      req.flash("error", "You don't have permission to do that!");
      res.redirect(`/listings/${req.params.id}`);
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
});

// Update route
router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Check if user is admin or owner
    if (req.user && (req.user.isAdmin || listing.owner.equals(req.user._id))) {
      // Add geometry data
      if (!req.body.listing.geometry) {
        req.body.listing.geometry = {
          type: "Point",
          coordinates: [0, 0],
        };
      }

      await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      req.flash("success", "Successfully updated listing!");
      res.redirect(`/listings/${id}`);
    } else {
      req.flash("error", "You don't have permission to do that!");
      res.redirect(`/listings/${id}`);
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong!");
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

// Add this route for debugging
router.get("/debug-session", (req, res) => {
  res.json({
    user: req.user,
    isAuthenticated: req.isAuthenticated(),
    session: req.session,
  });
});

module.exports = router;
