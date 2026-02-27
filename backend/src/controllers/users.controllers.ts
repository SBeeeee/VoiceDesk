import { registerUser, loginUser } from "../services/user.services.js";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await registerUser(req.body);

    // 1️⃣ Set cookie first
    res.cookie(process.env.COOKIE_NAME as string, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    // 2️⃣ Send response
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginUser(req.body);

    res.cookie(process.env.COOKIE_NAME as string, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};