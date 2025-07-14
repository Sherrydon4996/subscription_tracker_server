// async function sendEmail(sendToemail) {
//   const { name, email, message } = req.body;

//   // if (!name || !email || !message) {
//   //   return res.status(400).json({ error: "All fields are required." });
//   // }

//   if (!name) {
//     return res.status(400).json({ error: "name field is required." });
//   }

//   if (!email) {
//     return res.status(400).json({ error: "email field is required." });
//   }

//   if (!message) {
//     return res.status(400).json({ error: "message field is required." });
//   }

//   const subject = `New message from ${name}`;
//   const adminEmail = process.env.ADMIN_EMAIL;

//   const emailBody = `
//       You have a new message from your website contact form:

//       Name: ${name}
//       Email: ${email}

//       Message:
//       ${message}
//         `;

//   try {
//     await sendEmail(adminEmail, subject, emailBody);
//     res.status(200).json({ message: "Message sent to admin!" });
//   } catch (error) {
//     console.error("Email sending error:", error);
//     res.status(500).json({ error: "Failed to send message." });
//   }
// }
