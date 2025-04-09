const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

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

// Default image for fallback
const DEFAULT_IMAGE = {
  url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  filename: "default_property",
};

const SAMPLE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    filename: "modern_house",
  },
  {
    url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    filename: "luxury_villa",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    filename: "beach_house",
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    filename: "cozy_home",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    filename: "modern_interior",
  },
  {
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    filename: "luxury_interior",
  },
  {
    url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
    filename: "beach_villa",
  },
  {
    url: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    filename: "mountain_cabin",
  },
];

// Sample static data with embedded images
const listings = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    description: "Stunning modern villa with infinity pool",
    price: 550,
    location: "Beverly Hills",
    country: "United States",
    image: {
      url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      filename: "modern_house",
    },
    category: "Luxury Villa",
    rooms: {
      bedrooms: 4,
      bathrooms: 3,
    },
    capacity: {
      adults: 8,
      children: 4,
      total: 12,
    },
    contact: {
      phone: "+1 234-567-8900",
      email: "beverly.villa@example.com",
      host: "John Smith",
    },
  },
  {
    id: 2,
    title: "Beachfront Paradise",
    description: "Direct beach access with private sundeck",
    price: 450,
    location: "Maldives",
    country: "Maldives",
    image: {
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      filename: "luxury_villa",
    },
    category: "Beach Resort",
    rooms: {
      bedrooms: 2,
      bathrooms: 2,
      livingRoom: true,
      kitchen: true,
    },
    capacity: {
      adults: 4,
      children: 2,
      total: 6,
    },
    contact: {
      phone: "+960 123-4567",
      email: "maldives.paradise@example.com",
      host: "Sarah Johnson",
    },
  },
  {
    id: 3,
    title: "Mountain View Chalet",
    description: "Cozy chalet with breathtaking mountain views",
    price: 300,
    location: "Swiss Alps",
    country: "Switzerland",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      filename: "mountain_chalet",
    },
    category: "Mountain Retreat",
    rooms: {
      bedrooms: 3,
      bathrooms: 2,
      livingRoom: true,
      kitchen: true,
    },
    capacity: {
      adults: 6,
      children: 3,
      total: 9,
    },
    contact: {
      phone: "+41 123 456 789",
      email: "swiss.chalet@example.com",
      host: "Marco Mueller",
    },
  },
  {
    id: 4,
    title: "Urban Penthouse",
    description: "Luxurious penthouse with city skyline views",
    price: 600,
    location: "Manhattan",
    country: "United States",
    image: {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      filename: "urban_penthouse",
    },
  },
  {
    id: 5,
    title: "Tropical Villa Resort",
    description: "Private villa with tropical garden and pool",
    price: 400,
    location: "Bali",
    country: "Indonesia",
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      filename: "tropical_villa",
    },
  },
  {
    id: 6,
    title: "Historic Castle Suite",
    description: "Elegant suite in restored medieval castle",
    price: 750,
    location: "Edinburgh",
    country: "Scotland",
    image: {
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      filename: "castle_suite",
    },
  },
  {
    id: 7,
    title: "Seaside Cottage",
    description: "Charming cottage with ocean views",
    price: 280,
    location: "Cornwall",
    country: "United Kingdom",
    image: {
      url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      filename: "seaside_cottage",
    },
  },
  {
    id: 8,
    title: "Desert Oasis Villa",
    description: "Luxury villa with private pool in the desert",
    price: 520,
    location: "Dubai",
    country: "UAE",
    image: {
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      filename: "desert_villa",
    },
  },
];

// Debug middleware to check listings data
app.use((req, res, next) => {
  console.log(`Number of listings: ${listings.length}`);
  console.log("First listing sample:", listings[0]);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("listings/index", { listings });
});

app.get("/listings", (req, res) => {
  res.render("listings/index", { listings });
});

app.get("/listings/:id", (req, res) => {
  const listing =
    listings.find((l) => l.id === parseInt(req.params.id)) || listings[0];
  res.render("listings/show", { listing });
});

// Search route
app.get("/search", (req, res) => {
  const searchTerm = req.query.country || "";
  const filteredListings = listings.filter((listing) =>
    listing.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.render("results", { listings: filteredListings, search: searchTerm });
});

// Example of using flash messages
app.get("/test-flash", (req, res) => {
  req.flash("success", "This is a test success message!");
  res.redirect("/listings");
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
