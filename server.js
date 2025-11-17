import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { PORT } from "./config/env.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import subscriptionRouter from "./Routes/subscription.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { connectMongoDB } from "./config/mongose.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import cors from "cors";
import workflowRouter from "./Routes/workflow.routes.js";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectMongoDB();
});
