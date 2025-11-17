// brevoEmail.ts (or similar)

import dayjs from "dayjs";
import {
  ADMIN_EMAIL,
  BREVO_SENDER_EMAIL,
  BREVO_SENDER_NAME,
} from "../config/env.js";
import { generateEmailtemplate } from "../utils/email-templates.js";

export async function sendBrevoEmail(
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  daysLeft
) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: BREVO_SENDER_NAME || "Website Contact Form",
        email: BREVO_SENDER_EMAIL,
      },
      to: [
        {
          email: ADMIN_EMAIL,
          name: "Admin",
        },
      ],
      subject: `New Enquiry: ${"General Inquiry"} from ${BREVO_SENDER_EMAIL}`,
      htmlContent: generateEmailtemplate(
        userName || "edwin",
        subscriptionName || "netflix",
        renewalDate || dayjs(),
        planName || "netfrix 1 month",
        price || 400,
        paymentMethod || "mpesa",
        daysLeft || "7"
      ),
    }),
  });

  const result = await response.json();
  console.log("email sent successfully");

  if (!response.ok) {
    console.error("Brevo error:", result);
    throw new Error(result.message || "Failed to send email");
  }

  return result;
}
