import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerUser, findUserByEmail, validatePassword } from "../models/userModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const user = await registerUser(username, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await validatePassword(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const logout = async (req, res) => {
  // Client-side can simply remove token; for demo we send message
  res.json({ message: "Logout successful" });
};
