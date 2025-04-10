const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Comment out Mapbox for now
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error loading listings");
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you are trying to access does not exists!!!");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  try {
    // Get coordinates from location
    let response = await geocodingClient
      .forwardGeocode({
        query: `${req.body.listing.location}, ${req.body.listing.country}`,
        limit: 1,
      })
      .send();

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // Set geometry from geocoding response
    if (response.body.features && response.body.features.length > 0) {
      newListing.geometry = response.body.features[0].geometry;
    } else {
      // Default to India coordinates if no location found
      newListing.geometry = {
        type: "Point",
        coordinates: [77.209, 28.6139], // Delhi coordinates
      };
    }

    let savedListing = await newListing.save();
    console.log("Created listing with coordinates:", savedListing.geometry);
    req.flash("success", "New Listing Created!!!");
    res.redirect("/listings");
  } catch (err) {
    console.error("Error creating listing:", err);
    req.flash("error", "Error creating listing");
    res.redirect("/listings/new");
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you are trying to access does not exists!!!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Update geometry if location is provided
    if (req.body.listing.location) {
      let response = await geocodingClient
        .forwardGeocode({
          query: `${req.body.listing.location}, ${req.body.listing.country}`,
          limit: 1,
        })
        .send();

      if (response.body.features && response.body.features.length > 0) {
        req.body.listing.geometry = response.body.features[0].geometry;
      } else {
        // Keep existing coordinates if no new location found
        req.body.listing.geometry = listing.geometry;
      }
    }

    // Update image if new file is uploaded
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      req.body.listing.image = { url, filename };
    }

    // Update the listing
    listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true, runValidators: true }
    );

    if (!listing) {
      req.flash("error", "Failed to update listing!");
      return res.redirect("/listings");
    }

    console.log("Updated listing with coordinates:", listing.geometry);
    req.flash("success", "Listing Updated!!!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error updating listing:", err);
    req.flash("error", "Error updating listing");
    res.redirect("/listings");
  }
};

module.exports.destroyListing = async (req, res) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Check if user is admin or owner
    if (req.user && (req.user.isAdmin || listing.owner.equals(req.user._id))) {
      // Delete the listing (this will trigger the post middleware to delete reviews)
      const deletedListing = await Listing.findByIdAndDelete(id);

      if (!deletedListing) {
        req.flash("error", "Failed to delete listing!");
        return res.redirect("/listings");
      }

      console.log("Deleted listing and its reviews:", id);
      req.flash("success", "Listing and its reviews deleted successfully!");
      res.redirect("/listings");
    } else {
      req.flash("error", "You don't have permission to delete this listing!");
      res.redirect(`/listings/${id}`);
    }
  } catch (err) {
    console.error("Error deleting listing:", err);
    req.flash("error", "Error deleting listing");
    res.redirect("/listings");
  }
};

module.exports.searchListings = async (req, res) => {
  console.log("heree");
  const { country } = req.query;

  // Use case-insensitive search with regex
  // const listings = await Listing.find({
  //     country: { $regex: country, $options: "i" }
  // });

  res.render("listings/index.ejs");
};
