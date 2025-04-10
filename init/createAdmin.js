require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("Connected to MongoDB!");

    // Create admin user if doesn't exist
    const adminUser = await User.findOne({ username: "admin" });
    if (!adminUser) {
      const newAdmin = new User({
        email: "admin@wanderlust.com",
        username: "admin",
        isAdmin: true,
      });
      await User.register(newAdmin, "admin123"); // Replace with secure password
      console.log("Admin user created successfully");
    } else {
      // Update existing admin user
      adminUser.isAdmin = true;
      await adminUser.save();
      console.log("Admin user updated successfully");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin().then(() => {
  console.log("Admin setup complete");
});
