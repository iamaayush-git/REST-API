import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import jwt, { Secret, sign } from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // validation
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }
    // database call
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User already exists with this email");
      return next(error);
    }
    // password hash
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    // token generation in jwt
    const token = sign({ sub: newUser._id }, config.jwtSecret as string);
    // response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Internal server error"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createHttpError(400, "All fields are mandatory"));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(createHttpError(400, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      return next(createHttpError(400, "Email or password doesn't match"));
    }
    const token = sign({ sub: user._id }, config.jwtSecret as string);
    res.status(200).json({
      accessToken: token,
    });
  } catch (error) {
    return next(createHttpError(500, "Internal server error"));
  }
};

export { createUser, loginUser };
