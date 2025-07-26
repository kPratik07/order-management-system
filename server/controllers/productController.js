const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ error: "Product not found" });
    res.send(product);
  } catch (err) {
    res.status(500).send({ error: "Error retrieving product" });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send({ error: "Invalid product data" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).send({ error: "Product not found" });
    res.send(updated);
  } catch (err) {
    res.status(500).send({ error: "Failed to update product" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).send({ error: "Product not found" });
    res.send({ message: "Product deleted" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
