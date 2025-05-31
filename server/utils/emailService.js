const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderEmail = async (order) => {
  const {
    customer: { fullName, email },
    product,
    product: { title, image, description, price, quantity, total },
    transactionStatus,
    createdAt,
  } = order;

  const isApproved = transactionStatus?.toLowerCase() === "approved";

  const subject = isApproved
    ? "Your QuickCart Order is Confirmed!😀"
    : "Your QuickCart Order Failed!😢";

  const heading = isApproved
    ? "Thank You for Shopping with QuickCart!"
    : "Transaction Failed";

  const message = isApproved
    ? `<p>Your order has been successfully placed. Here are the details:</p>`
    : `<p>Unfortunately, your transaction could not be processed.</p>
       <p>Please try again or contact our <a href="mailto:support@quickcart.com">support team</a>.</p>`;

  const emailHTML = `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f7fb; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <div style="text-align: center;">
          <img src="${image || "https://via.placeholder.com/120"}" alt="${title}" style="max-width: 120px; border-radius: 8px; margin-bottom: 10px;" />
          <h2 style="color: ${isApproved ? "#2e7d32" : "#d32f2f"};">${heading}</h2>
        </div>
        <p>Hi <strong>${fullName}</strong>,</p>
        ${message}

        ${
          isApproved
            ? `
          <h3 style="margin-top: 20px; color: #1e3a8a;">Order Summary</h3>
          <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
            <tr><td style="padding: 8px;"><strong>Product</strong></td><td>${title}</td></tr>
            <tr><td style="padding: 8px;"><strong>Description</strong></td><td>${description || "N/A"}</td></tr>
            <tr><td style="padding: 8px;"><strong>Quantity</strong></td><td>${quantity}</td></tr>
            <tr><td style="padding: 8px;"><strong>Unit Price</strong></td><td>$${price.toFixed(2)}</td></tr>
            <tr><td style="padding: 8px;"><strong>Total</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr>
            <tr><td style="padding: 8px;"><strong>Status</strong></td><td style="color: green;">${transactionStatus}</td></tr>
            <tr><td style="padding: 8px;"><strong>Order Date</strong></td><td>${new Date(createdAt).toLocaleString()}</td></tr>
          </table>

          <h3 style="margin-top: 20px; color: #1e3a8a;">Customer Info</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
        `
            : ""
        }

        <p style="margin-top: 30px;">Thanks for choosing <strong>QuickCart</strong>.</p>
        <hr style="margin: 30px 0;" />
        <p style="font-size: 12px; color: #777;">This is an automated message from QuickCart. Do not reply directly to this email.</p>
      </div>
    </div>
  `;

  try {
    await transport.sendMail({
      from: `QuickCart <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: emailHTML,
    });

    console.log("Email sent to:", email);
    return true;
  } catch (err) {
    console.error("Email sending failed:", err.message);
    return false;
  }
};

module.exports = sendOrderEmail;
