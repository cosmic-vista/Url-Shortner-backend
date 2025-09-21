import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const saltedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: username,
      email,
      password: saltedPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email " });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "wrong password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({ "login sucessful": token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const Logout = (req, res) => {
  res.clearCookie("token");
  //i want to destroy the token
  res.status(200).json({ message: "logout successfully" });
};
