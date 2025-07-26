const Order = require("../models/Order");

const getOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

const getOrderById = async (id) => {
  return await Order.findById(id);
};

const createOrder = async (orderData) => {
  const order = new Order(orderData);
  await order.save();
  return order;
};

const updateStatus = async (id, status) => {
  const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
  return updated;
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateStatus,
};
