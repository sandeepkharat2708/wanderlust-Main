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

// Import routes
const listingRoutes = require("./routes/listing");

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
  res.redirect("/listings");
});

// Use listing routes
app.use("/listings", listingRoutes);

// Basic error handling
app.all("*", (req, res) => {
  res.status(404).send("Page Not Found!");
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
