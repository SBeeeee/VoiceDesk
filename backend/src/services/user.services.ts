import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

type Role = "user" | "shopkeeper";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  role: Role;
}

interface LoginInput {
  username: string;
  password: string;
}

const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  return jwt.sign(
    { id: userId },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "3d" } as jwt.SignOptions
  );
};

/* =========================
   REGISTER
========================= */

export const registerUser = async ({
  username,
  email,
  password,
  role,
}: RegisterInput) => {
  // 1️⃣ Check existing username
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Username already taken");
  }

  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  // 4️⃣ Generate token
  const token = generateToken(user._id.toString());

  // 5️⃣ Convert to object (password already hidden)
  const safeUser = user.toObject();

  return {
    user: safeUser,
    token,
  };
};

/* =========================
   LOGIN
========================= */

export const loginUser = async ({
  username,
  password,
}: LoginInput) => {
  // 1️⃣ Fetch user INCLUDING password
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    throw new Error("Invalid username or password");
  }

  // 2️⃣ Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // 3️⃣ Generate token
  const token = generateToken(user._id.toString());

  // 4️⃣ Remove password manually
  const safeUser = user.toObject();
  delete (safeUser as any).password;

  return {
    user: safeUser,
    token,
  };
};

/* =========================
   GET USER BY ID
========================= */

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
