import mongoose from "mongoose";
import { Users } from "../models/mongose.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRY } from "../config/env.js";

export const signUp = async (req, res, next) => {
  //Implement sign up logic
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //logic to create new user
    const { name, email, password } = req.body;
    //Check if user already exists
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    //Strong Password validation
    const passwordRegex =
      /(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[@#$%^&*()<>?.,_":;/]).{8,}$/;

    if (!passwordRegex.test(password)) {
      const error = new Error(
        "Password must contain at least one lowercase, one uppercase, one number, one special character, and be at least 8 characters long."
      );
      error.statusCode = 400;
      throw error;
    }
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //Save user
    const newUsers = await Users.create(
      [{ name, email, password: hashPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, ACCESS_TOKEN, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  //Implement sign in logic

  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid) {
      const error = new Error("Incorrect password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, ACCESS_TOKEN, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      success: true,
      message: "Sign in successful",
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  //Implement sign out logic
};
