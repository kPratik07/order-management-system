const User = require("../models/User");

const getAllUsers = async () => {
  return await User.find().select("-password");
};

module.exports = { getAllUsers };
