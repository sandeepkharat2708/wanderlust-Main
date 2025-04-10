const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { isLoggedIn } = require("../middleware");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post("/listings/:id/pay", isLoggedIn, async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      amount: options.amount,
      orderId: order.id,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
});

// Verify payment
router.post("/verify-payment", isLoggedIn, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // Here you can update your database to mark the booking as confirmed
      res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    });
  }
});

module.exports = router;
