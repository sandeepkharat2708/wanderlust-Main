const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
// Comment out Razorpay
// const Razorpay = require("razorpay");
const { sampleListings } = require("./data.js");

// Basic Express setup
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
const sessionConfig = {
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// Setup session and flash
app.use(session(sessionConfig));
app.use(flash());

// Middleware to make flash messages available to all templates
app.use((req, res, next) => {
  res.locals.currUser = null; // Set default user state
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Debug middleware to check listings data
app.use((req, res, next) => {
  if (sampleListings) {
    console.log("Debug Info:");
    console.log(`Number of listings: ${sampleListings.length}`);
    console.log("First listing title:", sampleListings[0]?.title);
    console.log(
      "Available listing IDs:",
      sampleListings.map((l) => l.id)
    );
  } else {
    console.log("Warning: sampleListings is undefined");
  }
  next();
});

// Add this immediately after the import to verify the data
console.log("INITIAL DATA CHECK:");
console.log("Type of sampleListings:", typeof sampleListings);
console.log("Is Array?", Array.isArray(sampleListings));
console.log("Length:", sampleListings?.length);
console.log("First item:", sampleListings?.[0]?.title);

// Routes
app.get("/", (req, res) => {
  try {
    if (!Array.isArray(sampleListings)) {
      throw new Error("sampleListings is not an array");
    }
    console.log("Rendering home with", sampleListings.length, "listings");
    res.render("listings/index", {
      listings: sampleListings,
      totalListings: sampleListings.length,
    });
  } catch (error) {
    console.error("Error in root route:", error);
    res.status(500).send("Something went wrong!");
  }
});

app.get("/listings", (req, res) => {
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

app.get("/listings/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log("Looking for listing:", id);

    const listing = sampleListings.find((l) => l.id === parseInt(id));

    if (!listing) {
      console.log("Listing not found");
      return res.status(404).send("Listing not found");
    }

    console.log("Found listing:", listing);
    res.render("listings/show", { listing });
  } catch (err) {
    console.error("Error in show route:", err);
    res.status(500).send("Something went wrong!");
  }
});

// Search route
app.get("/search", (req, res) => {
  const searchTerm = req.query.country || "";
  const filteredListings = sampleListings.filter((listing) =>
    listing.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.render("results", { listings: filteredListings, search: searchTerm });
});

// Example of using flash messages
app.get("/test-flash", (req, res) => {
  req.flash("success", "This is a test success message!");
  res.redirect("/listings");
});

// Booking routes
app.get("/listings/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested booking for listing ID:", id);

    const listing = sampleListings.find((l) => l.id === parseInt(id));
    console.log("Found listing:", listing);

    if (!listing) {
      console.log("No listing found for ID:", id);
      return res.status(404).send("Listing not found");
    }

    res.render("listings", { listing });
  } catch (err) {
    console.error("Error in booking route:", err);
    res.status(500).send("Error loading booking page");
  }
});

app.post("/listings/:id", (req, res) => {
  try {
    const { id } = req.params;
    const booking = req.body.booking;
    console.log("New booking received:", booking);

    // Here you would normally save the booking to your database

    req.flash("success", "Booking confirmed!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Booking error:", err);
    req.flash("error", "Failed to process booking");
    res.redirect(`/listings/${id}`);
  }
});

// Add this route to check what listings are available
app.get("/debug/listings", (req, res) => {
  res.json(sampleListings);
});

// Add this debug route to verify your data
app.get("/debug/data", (req, res) => {
  res.json({
    totalListings: sampleListings.length,
    listings: sampleListings,
  });
});

// Comment out Razorpay initialization
/*
const razorpay = new Razorpay({
  key_id: "rzp_test_YourTestKeyId",
  key_secret: "YourTestKeySecret",
});
*/

// Comment out payment routes
/*
app.post("/listings/:id/pay", async (req, res) => {
  // ... payment code ...
});

app.post("/verify-payment", async (req, res) => {
  // ... verification code ...
});
*/

// Add this new route near your other routes
app.get("/test-data", (req, res) => {
  res.json({
    success: true,
    count: sampleListings.length,
    data: sampleListings,
    isArray: Array.isArray(sampleListings),
    firstItem: sampleListings[0],
  });
});

// Basic error handling
app.all("*", (req, res) => {
  res.status(404).send("Page Not Found!");
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
