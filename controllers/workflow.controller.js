import { createRequire } from "module";
import Subscriptions from "../models/mongose.js";
import dayjs from "dayjs";
import { sendBrevoEmail } from "./brevoMail.controller.js";
const require = createRequire(import.meta.url);

const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`
    );
    return;
  }
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }
    if (dayjs().isSame(reminderDate, "day")) {
      await trigerReminder(
        context,
        subscription,
        `Reminder ${daysBefore} days before`
      );
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return await Subscriptions.findById(subscriptionId).populate(
      "user",
      "name email"
    );
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const trigerReminder = async (context, subscription, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);

    //send email, sms, push notification
    sendBrevoEmail(
      subscription.user.name,
      subscription.name,
      dayjs(subscription.renewalDate).format("MMM D, YYYY"),
      subscription.name,
      `${subscription.currency} ${subscription.price} ${subscription.frequencey}`,
      subscription.paymentMethod,
      dayjs(subscription.renewalDate).diff(dayjs(), "day")
    );
  });
};
