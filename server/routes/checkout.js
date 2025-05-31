const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");
const checkoutValidation = require("../middleware/checkoutValidation");

router.post("/", checkoutValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { form, productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.stock < quantity)
      return res.status(400).json({ error: "Insufficient stock" });

    const order = new Order({
      orderId: uuidv4(),
      customer: form,
      product: {
        id: product._id,
        title: product.title,
        variant: form.variant || "",
        quantity: quantity,
        price: product.price,
        image: product.images?.[0] || "",
        subtotal: product.price * quantity,
        total: product.price * quantity,
      },
      transactionStatus: "Approved",
      cardInfo: {
        cardNumber: form.cardNumber,
        expiryDate: form.expiryDate,
        cvv: form.cvv,
      },
    });
    console.log(order);
    await order.save();

    product.stock -= quantity;
    await product.save();

    res.status(201).json({
      message: "Order created successfully",
      orderId: order.orderId,
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error("Checkout error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
