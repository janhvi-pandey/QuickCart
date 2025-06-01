const { body } = require("express-validator");

const checkoutValidation = [
  body("form.fullName").notEmpty().withMessage("Full name is required"),
  body("form.email").isEmail().withMessage("Invalid email format"),
  body("form.phone")
    .matches(/^\d{10}$/)
    .withMessage("Phone must be 10 digits"),
  body("form.address").notEmpty().withMessage("Address is required"),
  body("form.city").notEmpty().withMessage("City is required"),
  body("form.state").notEmpty().withMessage("State is required"),
  body("form.zipCode")
    .matches(/^\d{6}$/)
    .withMessage("Zip must be 6 digits"),
  //   body("form.cardNumber")
  //     .isCreditCard()
  //     .withMessage("Invalid card")
  //     .isLength({ min: 16, max: 16 })
  //     .withMessage("Card must be 16 digits"),

  body("form.cardNumber")
    .matches(/^\d{16}$/)
    .withMessage("Card must be 16 digits"),

  body("form.expiryDate")
    .isISO8601()
    .withMessage("Expiry format YYYY-MM-DD")
    .custom((value) => {
      const today = new Date();
      const expiry = new Date(value);
      if (expiry < today) throw new Error("Expiry must be future date");
      return true;
    }),
  body("form.cvv")
    .matches(/^\d{3}$/)
    .withMessage("CVV must be 3 digits"),
  body("productId").notEmpty().withMessage("Product ID required"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be ≥ 1"),
];

module.exports = checkoutValidation;
