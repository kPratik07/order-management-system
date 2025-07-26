const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { Parser } = require("json2csv");

// CRUD
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.patch("/:id/status", orderController.updateOrderStatus);

// Customer self-service endpoint
router.get("/lookup/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).send({ error: "Order not found" });
    res.send({
      orderId: order._id,
      status: order.status,
      items: order.items,
      createdAt: order.createdAt,
    });
  } catch (err) {
    res.status(500).send({ error: "Error fetching order" });
  }
});

// CSV export endpoint
router.get("/export/csv", async (req, res) => {
  try {
    const orders = await Order.find();
    const fields = [
      "_id",
      "customerName",
      "items",
      "paymentCollected",
      "status",
      "createdAt",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(orders);
    res.header("Content-Type", "text/csv");
    res.attachment("orders.csv");
    return res.send(csv);
  } catch (err) {
    res.status(500).send({ error: "Error exporting orders" });
  }
});

module.exports = router;
