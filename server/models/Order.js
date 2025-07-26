const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    items: [orderItemSchema], // Array of order items
    paymentCollected: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FULFILLED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
