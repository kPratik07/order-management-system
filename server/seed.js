const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
  await Product.insertMany([
    { name: "Product A", stock: 100 },
    { name: "Product B", stock: 50 },
  ]);
  await User.insertMany([
    {
      name: "Admin",
      email: "admin@example.com",
      password: "hashed",
      role: "admin",
    },
    // Add password hashing as needed
  ]);
  console.log("Seeded!");
  process.exit();
});
