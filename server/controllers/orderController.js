const Order = require("../models/Order");
const Product = require("../models/Product");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.send(orders);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch orders" });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send({ error: "Order not found" });
    res.send(order);
  } catch (err) {
    res.status(500).send({ error: "Error retrieving order" });
  }
};

// Create order (multi-item, inventory lock)
const createOrder = async (req, res) => {
  try {
    const { customerName, items, paymentCollected } = req.body;
    // Check and lock inventory for each item
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product)
        return res
          .status(404)
          .send({ error: `Product not found: ${item.productId}` });
      if (product.stock < item.quantity)
        return res
          .status(400)
          .send({ error: `Insufficient stock for product: ${product.name}` });
    }
    // Decrement stock
    for (const item of items) {
      const product = await Product.findById(item.productId);
      product.stock -= item.quantity;
      await product.save();
    }
    const order = new Order({ customerName, items, paymentCollected });
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send({ error: "Invalid order data" });
  }
};

// Update order (except status)
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) return res.status(404).send({ error: "Order not found" });
    res.send(order);
  } catch (err) {
    res.status(400).send({ error: "Invalid update data" });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).send({ error: "Order not found" });
    res.send({ message: "Order deleted" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete order" });
  }
};

// Status pipeline enforcement
const allowedTransitions = {
  PENDING: ["PAID", "CANCELLED"],
  PAID: ["FULFILLED", "CANCELLED"],
  FULFILLED: [],
  CANCELLED: [],
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send({ error: "Order not found" });

    if (!allowedTransitions[order.status].includes(status)) {
      return res
        .status(400)
        .send({
          error: `Cannot change status from ${order.status} to ${status}`,
        });
    }

    order.status = status;
    await order.save();

    // Emit WebSocket event if needed
    req.server.io.to(order._id.toString()).emit("orderStatusUpdate", {
      orderId: order._id,
      status: order.status,
    });

    res.send(order);
  } catch (err) {
    res.status(500).send({ error: "Error updating order status" });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
};
