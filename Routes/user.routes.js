import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", (req, res) => {
  res.send({ Title: "Create new user" });
});
userRouter.put("/users/:id", (req, res) => {
  res.send({ Title: "Update user details" });
});
userRouter.delete("/users/:id", (req, res) => {
  res.send({ Title: "Delete user" });
});

export default userRouter;
