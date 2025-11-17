import { workflowClient } from "../config/apstash.js";
import { SERVER_URL } from "../config/env.js";
import Subscriptions from "../models/mongose.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscriptions.create({
      ...req.body,
      user: req.user.id,
    });
    const result = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: { subscriptionId: String(subscription._id) },
      retries: 0,
    });

    const { workflowRunId } = result;

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error(
        "Permission denied, Account might be compromised"
      );
      error.status = 401;
      throw error;
    }

    const subscription = await Subscriptions.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    if (!req.user.id) {
      const error = new Error(
        "Permission denied, Account might be compromised"
      );
      error.status = 401;
      throw error;
    }

    const subscription = await Subscriptions.find();

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
