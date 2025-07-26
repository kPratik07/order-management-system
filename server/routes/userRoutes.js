const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

// Only admin can manage users
router.get("/", verifyToken, isAdmin, userController.getAllUsers);
router.get("/:id", verifyToken, isAdmin, userController.getUserById);
router.post("/", verifyToken, isAdmin, userController.createUser);
router.put("/:id", verifyToken, isAdmin, userController.updateUser);
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
