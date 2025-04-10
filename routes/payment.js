const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { isLoggedIn } = require("../middleware");

// Initialize Razorpay with test keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order route
router.post("/create-order", isLoggedIn, async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: "order_" + Date.now(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating order");
  }
});

// Payment verification route
router.post("/verify-payment", isLoggedIn, async (req, res) => {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } = req.body;

    // Add verification logic here if needed
    res.json({
      msg: "success",
      orderId: orderCreationId,
      paymentId: razorpayPaymentId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error verifying payment");
  }
});

module.exports = router;
