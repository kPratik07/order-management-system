const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch users" });
  }
};

// Get user by ID (excluding password)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send({ error: "User not found" });
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "Error retrieving user" });
  }
};

// Create user (with password hashing)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send({ error: "Email already in use" });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();
    res.status(201).send({ ...user.toObject(), password: undefined });
  } catch (err) {
    res.status(400).send({ error: "Invalid user data" });
  }
};

// Update user (with optional password hashing)
const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    let update = { ...rest };
    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select("-password");
    if (!user) return res.status(404).send({ error: "User not found" });
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: "Invalid update data" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ error: "User not found" });
    res.send({ message: "User deleted" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
