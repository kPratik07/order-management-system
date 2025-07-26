const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
