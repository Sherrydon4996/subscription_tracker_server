import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/env.js";
import { Users } from "../models/mongose.js";

const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    const new_token = req.cookies.token;
    if (new_token) {
      token = new_token;
    }
    console.log("Token available", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: "No token found" });
    }
    jwt.verify(token, ACCESS_TOKEN, async (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: err.message || "Invalid token" });
      const user = await Users.findById(decoded.userId);
      if (!user)
        return res
          .status(401)
          .json({ message: "Unauthorized", error: "No user found" });

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
    next(error);
  }
};

export default authorize;
