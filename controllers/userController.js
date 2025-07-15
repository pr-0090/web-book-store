import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Handle User Login
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Handle User Registration
const handleUserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    // Create user
    const newUser = new userModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate token
    const token = createToken(savedUser._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Handle Admin Login
const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  handleUserLogin,
  handleUserRegister,
  handleAdminLogin
};
