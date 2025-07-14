const SibApiV3Sdk = require("sib-api-v3-sdk");

// Configure Brevo API
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendEmail(to, subject, textContent, htmlContent) {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.textContent = textContent;
    sendSmtpEmail.htmlContent = htmlContent; // Add HTML content

    // Set sender - use your verified domain/email
    sendSmtpEmail.sender = {
      name: "Pato Clothes Store",
      email: process.env.SENDER_EMAIL || "noreply@harrytechservices.com",
    };

    // Set recipient
    sendSmtpEmail.to = [{ email: to }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return data;
  } catch (error) {
    console.error("Brevo error:", error);
    throw error;
  }
}

module.exports = sendEmail;
