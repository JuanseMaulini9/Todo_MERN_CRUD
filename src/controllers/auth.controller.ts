import { Request, Response } from "express";
import { Authrequest, UserFound } from "../types";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt";
import User, { UserDocument } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["the email already exist"]);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token),
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({
        message: "User not found",
      });

    const { password: userPassword } = userFound;

    if (typeof password === "string" && typeof userPassword === "string") {
      const isMatch = await bcrypt.compare(password, userPassword);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect password",
        });
    } else {
      return res.status(500).json({
        message: "Unexpected password type",
      });
    }

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token),
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req: Authrequest, res: Response) => {
  const userFound: UserDocument | null = await User.findById(req.user?.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  const userObject = userFound.toObject();

  return res.json({
    id: userObject._id,
    username: userObject.username,
    email: userObject.email,
    createdAt: userObject.createdAt,
    updatedAt: userObject.updatedAt,
  });
};
