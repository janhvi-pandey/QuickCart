const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  product: {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    size: String,
    quantity: Number,
    price: Number
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String
  },
  payment: {
    card: String,
    expiry: String,
    cvv: String
  },
  status: {
    type: String,
    enum: ["approved", "declined", "error"],
    default: "approved"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
