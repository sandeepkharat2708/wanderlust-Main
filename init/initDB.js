require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");

const MONGO_URL = process.env.ATLASDB_URL;

async function initDB() {
  try {
    if (!process.env.ATLASDB_URL) {
      throw new Error("MongoDB connection string is missing!");
    }

    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("Connected to MongoDB!");

    // Add this to see the actual connection string (remove in production)
    console.log("Using MongoDB URL:", process.env.ATLASDB_URL);

    // Check if we can access the database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    // First create a user
    await User.deleteMany({});
    const user = new User({
      email: "admin@wanderlust.com",
      username: "admin",
    });
    await user.save();
    console.log("Created default user with ID:", user._id);

    // Delete existing listings
    await Listing.deleteMany({});
    console.log("Cleared existing listings");

    const sampleListings = [
      {
        title: "Cozy Beach Villa",
        description: "Beautiful beachfront villa with stunning views",
        image: {
          url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
          filename: "beach_villa",
        },
        price: 15000,
        location: "Goa",
        country: "India",
        category: "Trending",
        geometry: {
          type: "Point",
          coordinates: [73.7898, 15.4909],
        },
        owner: user._id,
        email: "beach.villa@example.com",
        phone: "9876543210",
      },
      {
        title: "Mountain Retreat",
        description: "Peaceful mountain cabin with panoramic views",
        image: {
          url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
          filename: "mountain_retreat",
        },
        price: 12000,
        location: "Manali",
        country: "India",
        category: "Mountains",
        geometry: {
          type: "Point",
          coordinates: [77.1892, 32.2432],
        },
        owner: user._id,
        email: "mountain.retreat@example.com",
        phone: "9876543211",
      },
      {
        title: "Luxury Apartment",
        description: "Modern apartment in the heart of the city",
        image: {
          url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          filename: "city_apartment",
        },
        price: 20000,
        location: "Mumbai",
        country: "India",
        category: "Hotel",
        geometry: {
          type: "Point",
          coordinates: [72.8777, 19.076], // Longitude, Latitude for Mumbai
        },
        capacity: 2,
        rooms: 1,
        phone: "9876543212",
        email: "luxury.apartment@example.com",
      },
      {
        title: "Historic Castle",
        description: "Experience royal living in this restored castle",
        image: {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
          filename: "castle",
        },
        price: 35000,
        location: "Udaipur",
        country: "India",
        category: "Camping",
        geometry: {
          type: "Point",
          coordinates: [73.7125, 24.5854], // Longitude, Latitude for Udaipur
        },
        capacity: 10,
        rooms: 5,
        phone: "9876543213",
        email: "historic.castle@example.com",
      },
      {
        title: "Pool Villa",
        description: "Luxury villa with infinity pool",
        image: {
          url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          filename: "pool_villa",
        },
        price: 25000,
        location: "Kerala",
        country: "India",
        category: "Hotel",
        geometry: {
          type: "Point",
          coordinates: [76.2711, 10.8505], // Longitude, Latitude for Kerala
        },
        capacity: 8,
        rooms: 4,
        phone: "9876543214",
        email: "pool.villa@example.com",
      },
      {
        title: "Treehouse Adventure",
        description: "Unique treehouse experience in the wilderness",
        image: {
          url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
          filename: "treehouse",
        },
        price: 18000,
        location: "Wayanad",
        country: "India",
        category: "Camping",
        geometry: {
          type: "Point",
          coordinates: [76.0856, 11.6854],
        },
        capacity: 3,
        rooms: 1,
        phone: "9876543215",
        email: "treehouse.adventure@example.com",
      },
    ];

    // Add owner to all listings
    const listingsWithOwner = sampleListings.map((listing) => ({
      ...listing,
      owner: user._id,
    }));

    // Log a sample listing to verify the structure
    console.log("Sample listing structure:", listingsWithOwner[0]);

    // Insert all listings
    const insertedListings = await Listing.insertMany(listingsWithOwner);
    console.log(`Added ${insertedListings.length} sample listings`);
    console.log(
      "Sample listing IDs:",
      insertedListings.map((l) => l._id)
    );
    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Detailed Error:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      // Add more debug information
      details: err.errors
        ? Object.keys(err.errors).map((key) => ({
            field: key,
            message: err.errors[key].message,
          }))
        : [],
    });
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

// Run the initialization
initDB()
  .then(() => {
    console.log("Initialization complete!");
  })
  .catch((err) => {
    console.error("Initialization failed:", err);
  });
