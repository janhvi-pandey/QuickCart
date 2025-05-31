const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const productRoutes=require("./routes/productRoutes");
const checkoutRoutes= require("./routes/checkout");
const orderRoutes=require("./routes/Order");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRoutes);



app.get("/", (req, res) => {
  res.send("Server is running...");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
