import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullname, email, password: hashedPassword });

    // ✅ Log JWT_SECRET before using
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      }
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {


    const { email, password } = req.body;

    // Strong validation for missing or empty strings
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Look up user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return token and user info
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Login error", error: err.message });
  }
};


export const logout = (req, res) => {

  return res.status(200).json({
    message: "Logout successful. Please remove the token from client storage."
  });
};

