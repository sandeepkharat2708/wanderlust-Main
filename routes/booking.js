const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

router.post("/bookings/create", isLoggedIn, async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests, totalAmount, paymentId } =
      req.body;

    // For testing, always return success
    const booking = {
      id: "BK" + Date.now(),
      listingId,
      userId: req.user._id,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      paymentId,
      status: "confirmed",
    };

    res.json({
      success: true,
      booking: booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
