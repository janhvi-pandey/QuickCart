

# 🛒 QuickCart

### Shop Smart. Shop Fast.

## Project Overview
QuickCart is a full-stack e-commerce platform built with Next.js on the frontend and Express.js on the backend. It offers a fast, modern, and reliable shopping experience where users can browse trendy products, view detailed product pages, and securely complete purchases with real-time order summaries. After checkout, users receive a confirmation page and an automated email summarizing their order.

The project focuses on clean UI, form validation, email notifications, and efficient order handling, ensuring both performance and user convenience.

---

##  Folder Structure

```
QuickCart/
├── client/   # Frontend - built with Next.js
└── server/   # Backend - built with Express.js
```

---

## ⚙ Client Setup (Next.js)

```bash
cd client
npm install
npm run dev
```

### Routes

* **`app/page.jsx`**
  Displays the landing page of the application.

* **`app/products`**
  Shows all products fetched from the database using cards.

* **`app/checkout`**
  Checkout page where users enter:

  * Card details (card number, expiry date, CVV)
  * Address, phone, and other info
  * Also displays an **order summary** (image, description, size, quantity, total price)

* **`app/thankyou`**
  Displays:

  * Thank you message
  * Order number
  * Customer info
  * Order summary
  * Status: `Approved`

---

## ⚙️ Server Setup (Express.js)

### File Structure Overview

```
server/
├── config/
│   └── db.js
├── middleware/
│   └── checkoutValidation.js
├── models/
│   ├── Order.js
│   └── Product.js
├── routes/
│   ├── checkout.js
│   ├── order.js
│   └── productRoutes.js
├── utils/
│   └── emailService.js
├── index.js
└── seed.js
```

---

###  `config/db.js`

Establishes MongoDB connection.

---

### `middleware/checkoutValidation.js`

Validates the checkout form using `express-validator`. Ensures:

* Full name, email, phone, address, city, state, zip code are valid.
* Card number (16 digits), expiry date (future date), and CVV (3 digits) are correctly formatted.
* Product ID and quantity are required and valid.

---

###  `Models`

* **`models/Order.js`**
  Defines order schema: includes product, customer, payment, transaction status.

* **`models/Product.js`**
  Defines product schema: includes title, description, price, stock, and image.

---

###  `Routes`

* **`routes/checkout.js`**

  * `POST /api/checkout`
    Handles order placement:

    * Validates input
    * Checks product availability
    * Saves order with a unique `orderId`
    * Deducts stock
    * Sends confirmation email

* **`routes/order.js`**

  * `GET /api/order/:id`
    Fetches order details by order ID.

* **`routes/productRoutes.js`**

  * `GET /api/products`
    Fetches all products
  * `GET /api/products/:id`
    Fetches product by ID

---

###  `utils/emailService.js`

Sends a well-styled order confirmation email using **nodemailer** and **Mailtrap**.
Dynamic content includes:

* Product details (image, title, description, price)
* Customer information
* Order summary
* Transaction status:  Approved or  Failed

---

###  `index.js`

Main entry point of the Express server.

---

###  `seed.js`

Seeds the database with product data.

---



##  Contact

If you have any questions, suggestions, or would like to contribute, feel free to reach out:

**[shivipandey993@gmail.com](mailto:shivipandey993@gmail.com)**

Pull requests and feedback are always welcome.

---

### Thankyou 💫

