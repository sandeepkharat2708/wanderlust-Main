require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
// Comment out Razorpay
// const Razorpay = require("razorpay");
const { sampleListings } = require("./data.js");

// Import routes
const listingRoutes = require("./routes/listing");
const userRoutes = require("./routes/user");

// MongoDB connection
mongoose
  .connect(process.env.ATLASDB_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB Error:", err));

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration - MUST come before passport
const sessionConfig = {
  secret: process.env.SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash and user middleware
app.use((req, res, next) => {
  console.log("Current user:", req.user); // Debug log
  res.locals.currUser = req.user;
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

// Routes
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// Use user routes
app.use("/", userRoutes);

// Use listing routes
app.use("/listings", listingRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  req.flash("error", "Something went wrong!");
  res.redirect("/listings");
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Handle process termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
    process.exit(1);
  }
});

// Add this to your app configuration
app.locals.mapToken = process.env.MAP_TOKEN;
