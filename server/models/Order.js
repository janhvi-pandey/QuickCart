// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  customer: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  product: {
    id: String,
    title: String,
    variant: String,
    quantity: Number,
    price: Number,
     image: String,
    subtotal: Number,
    total: Number
  },
  transactionStatus: {
    type: String,
    enum: ["Approved", "Declined", "Failed"],
    required: true
  },
  cardInfo: {
    cardNumber: String,
    expiryDate: String,
    cvv: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
