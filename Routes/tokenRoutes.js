const express = require("express");

const router = express.Router();

const { generateToken } = require("../Controllers/tokenController");
const { initiateSTKPush } = require("../Controllers/InitiateMpesaController");
const {
  checkMpesaTransaction,
} = require("../Controllers/checkMpesaTransaction");

router.get("/token", generateToken);
router.post("/stkPush", initiateSTKPush);
router.post("/check-payment", checkMpesaTransaction);

// routes/authRoutes.js (or your existing route file)

const sendEmail = require("../utils/sendMail"); // adjust path if needed

// 👇 Contact form route

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // if (!name || !email || !message) {
  //   return res.status(400).json({ error: "All fields are required." });
  // }

  if (!name) {
    return res.status(400).json({ error: "name field is required." });
  }

  if (!email) {
    return res.status(400).json({ error: "email field is required." });
  }

  if (!message) {
    return res.status(400).json({ error: "message field is required." });
  }

  const subject = `New message from ${name}`;
  const adminEmail = process.env.ADMIN_EMAIL;

  const emailBody = `
You have a new message from your website contact form:

Name: ${name}
Email: ${email}

Message:
${message}

  `;

  // HTML email template
  const htmlBody = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Contact Form Submission - Patos Clothes Shop</title>
   </head>
   <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
       <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
           <tr>
               <td align="center">
                   <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                       <tr>
                           <td style="padding: 20px; background-color: #28a745; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                               <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Patos Clothes Shop</h1>
                               <h2 style="color: #ffffff; margin: 10px 0; font-size: 20px;">New Contact Form Submission</h2>
                           </td>
                       </tr>
                       <tr>
                           <td style="padding: 20px;">
                               <p style="color: #333333; font-size: 16px; margin: 0 0 20px;">You have received a new message from your website contact form:</p>
                               <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
                                   <tr>
                                       <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Name:</td>
                                       <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${name}</td>
                                   </tr>
                                   <tr>
                                       <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Email:</td>
                                       <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${email}</td>
                                   </tr>
                                   <tr>
                                       <td style="padding: 10px; font-weight: bold; color: #555555;">Message:</td>
                                       <td style="padding: 10px; color: #333333;">${message}</td>
                                   </tr>
                               </table>
                               <p style="color: #333333; font-size: 16px; margin: 0 0 20px;">Please respond to this inquiry at your earliest convenience. You can reach the sender at <a href="mailto:${email}" style="color: #28a745; text-decoration: none;">${email}</a>.</p>
                           </td>
                       </tr>
                       <tr>
                           <td style="padding: 20px; background-color: #f8f9fa; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                               <p style="color: #666666; font-size: 14px; margin: 0;">© 2025 Patos Clothes Shop. All rights reserved.</p>
                               <p style="color: #666666; font-size: 14px; margin: 5px 0 0;">
                                   <a href="https://www.patosclothesshop.com" style="color: #28a745; text-decoration: none;">Visit our website</a>
                               </p>
                           </td>
                       </tr>
                   </table>
               </td>
           </tr>
       </table>
   </body>
   </html>
       `;

  try {
    await sendEmail(adminEmail, subject, emailBody, htmlBody);
    res.status(200).json({ message: "Message sent to admin!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// order emails
// order emails
router.post("/order", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name field is required." });
  }
  if (!email) {
    return res.status(400).json({ error: "email field is required." });
  }
  if (
    !message ||
    !message.customerName ||
    !message.status ||
    !message.payment ||
    !message.PhoneNumber ||
    !message.email ||
    !message.items ||
    !message.order_number ||
    !message.totalAmount ||
    !message.deliveryInfo
  ) {
    return res.status(400).json({ error: "All message fields are required." });
  }

  const subject = `New Order from Patos Clothes Shop`;

  // Fallback text for email clients that don't support HTML
  const textBody = `
You have a new message for an order you placed:

Name: ${name}
Email: ${email}

Message:
Customer Name: ${message.customerName}
Order Status: ${message.status}
Payment Method: ${message.payment}
Phone Number: ${message.PhoneNumber}
Email: ${message.email}
Items Ordered: ${message.items}
Order Number: ${message.order_number}
Total Amount: ${message.totalAmount}
Delivery Info: ${message.deliveryInfo}
  `;

  // HTML email template
  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Patos Clothes Shop</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
          <td align="center">
              <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                      <td style="padding: 20px; background-color: #28a745; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Patos Clothes Shop</h1
                          <h2 style="color: #ffffff; margin: 10px 0; font-size: 20px;">Order Confirmation</h2>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 20px;">
                          <p style="color: #333333; font-size: 16px; margin: 0 0 20px;">Dear ${name},</p>
                          <p style="color: #333333; font-size: 16px; margin: 0 0 20px;">Thank you for your order! Below are the details of your purchase:</p>
                          <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
                              <tr>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Customer Name:</td>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${message.customerName}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Order Status:</td>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${message.status}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Payment Method:</td>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${message.payment}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Phone Number:</td>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${message.PhoneNumber}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Email:</td>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${message.email}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Items Ordered:</td>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${message.items}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Order Number:</td>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${message.order_number}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Total Amount:</td>
                                  <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #333333;">${message.totalAmount}</td>
                              </tr>
                              <tr>
                                  <td style="padding: 10px; font-weight: bold; color: #555555;">Delivery Info:</td>
                                  <td style="padding: 10px; color: #333333;">${message.deliveryInfo}</td>
                              </tr>
                          </table>
                          <p style="color: #333333; font-size: 16px; margin: 0 0 20px;">We will notify you once your order status changes. If you have questions, please contact us at <a href="mailto:support@patosclothesshop.com" style="color: #28a745; text-decoration: none;">support@patosclothesshop.com</a>.</p>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 20px; background-color: #f8f9fa; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                          <p style="color: #666666; font-size: 14px; margin: 0;">© 2025 Patos Clothes Shop. All rights reserved.</p>
                          <p style="color: #666666; font-size: 14px; margin: 5px 0 0;">
                              <a href="https://www.patosclothesshop.com" style="color: #28a745; text-decoration: none;">Visit our website</a>
                          </p>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
</body>
</html>
  `;

  try {
    await sendEmail(email, subject, textBody, htmlBody);
    res.status(200).json({ message: "Message sent to your email!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});
module.exports = router;
