import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscription,
} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();
subscriptionRouter.get("/", authorize, getAllSubscriptions);
subscriptionRouter.get("/user/:id", authorize, getUserSubscription);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "update a subscription" });
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete subscription" });
});
subscriptionRouter.get("/users/:id", (req, res) => {
  res.send({ title: "Get all subscription of a user" });
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "cancel subscription" });
});
subscriptionRouter.put("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET upcoming renewals" });
});
export default subscriptionRouter;
