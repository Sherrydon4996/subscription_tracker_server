🔐 Authentication & User Management

* Register and log in users securely
* JWT-based authentication
* Admin & user roles
* Middleware-protected routes

🗃 Subscription Management

* Create new subscriptions
* Renew or update existing subscriptions
* Cancel subscription (policy-based, optional)
* Store all subscription data in MongoDB
* Auto-calculate next renewal date
* Track subscription status (active, pending renewal, expired)

 ⚠️ Refunds & cancellation policy

 * No refunds after payment
 * Allow cancellation only for **next billing cycle**
 * Disallow deleting records that have financial history
 This avoids fraud and keeps billing history consistent.

📬 Email Notifications (Brevo)

* Sends confirmation emails on new subscriptions
* Sends renewal reminders before expiry
* Sends expiration warnings
* Fully customizable email templates

⏰ Automated Reminders via Upstash
Uses **Upstash Scheduled Jobs** to automatically:

* Check upcoming expiring subscriptions
* Trigger reminder emails
* Run background renewal checks
* Keep your server lightweight and efficient

🛡 Arcjet Rate Limiting

* Protects against abusive traffic
* Limits number of API requests per user/IP
* Helps secure authentication and payment endpoints
* Prevents DDoS & brute-force attempts

🧱 Tech Stack

| Area       | Tech                   |
| ---------- | ---------------------- |
| Backend    | Node.js, Express       |
| Database   | MongoDB (Mongoose ORM) |
| Email      | Brevo API              |
| Automation | Upstash Scheduler      |
| Security   | Arcjet middleware      |
| Auth       | JWT                    |
| Deployment | Render / Local dev     |


