import { Router } from "express";
import { sendBrevoEmail } from "../controllers/brevoMail.controller.js";

const emailRouter = Router();

emailRouter.post("/", sendBrevoEmail);

export default emailRouter;
