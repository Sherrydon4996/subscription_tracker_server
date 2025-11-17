export const generateEmailtemplate = (
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  daysLeft,
  accountSettingsLink = "http://localhost:5500/api/v1/sign-up",
  supportLink = "http://localhost:5500/api/v1/sign-up"
) =>
  `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f7f7f7; padding:20px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">

    <!-- Header -->
    <tr>
      <td style="background:#4a90e2; padding:24px; text-align:center; color:#ffffff;">
        <h1 style="margin:0; font-size:24px; font-weight:600;">
          Subscription Renewal Reminder
        </h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:24px; color:#333333; font-size:16px; line-height:1.6;">
        <p>Hi <strong>${userName}</strong>,</p>

        <p>
          This is a friendly reminder that your subscription to
          <strong>${subscriptionName}</strong> is renewing soon.
        </p>

        <div style="background:#f0f7ff; padding:16px; margin:20px 0; border-left:4px solid #4a90e2; border-radius:4px;">
          <p style="margin:0;">
            <strong>Renewal Date:</strong> ${renewalDate}<br>
            <strong>Days Left:</strong> ${daysLeft} day(s)
          </p>
        </div>

        <h3 style="margin-top:30px; margin-bottom:10px; font-size:18px; color:#4a90e2;">Your Plan Details</h3>

        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;"><strong>Plan:</strong></td>
            <td style="padding:8px 0;">${planName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>Price:</strong></td>
            <td style="padding:8px 0;">${price}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>Payment Method:</strong></td>
            <td style="padding:8px 0;">${paymentMethod}</td>
          </tr>
        </table>

        <p style="margin-top:24px;">
          If you'd like to manage your subscription or update your billing details,
          you can do so here:
        </p>

        <p>
          <a href="${accountSettingsLink}"
             style="display:inline-block; background:#4a90e2; color:#ffffff; padding:12px 20px; border-radius:6px; text-decoration:none; font-weight:600;">
            Manage Account
          </a>
        </p>

        <p>
          Need help? Visit our support page:
          <a href="${supportLink}" style="color:#4a90e2; text-decoration:underline;">
            Support Center
          </a>
        </p>

        <p style="margin-top:30px;">
          Thank you for being a valued member!
        </p>

        <p style="margin-bottom:0;">— The Team</p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="text-align:center; padding:16px; font-size:13px; color:#777777; background:#fafafa;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </td>
    </tr>

  </table>
</div>
`;
