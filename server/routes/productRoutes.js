const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin, isStaff } = require("../middlewares/roleMiddleware");

// Public: get all products, get by id
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Admin/Staff: create, update, delete
router.post("/", verifyToken, isStaff, productController.createProduct);
router.put("/:id", verifyToken, isStaff, productController.updateProduct);
router.delete("/:id", verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
