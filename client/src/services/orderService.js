import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/orders";

export const getAllOrders = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createOrder = async (orderData) => {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
};

export const getOrderById = async (orderId) => {
  const res = await fetch(`/api/orders/lookup/${orderId}`);
  if (!res.ok) throw new Error("Order not found");
  return res.json();
};

export const updateOrderStatus = async (id, status) => {
  const response = await axios.patch(`${API}/${id}/status`, { status });
  return response.data;
};

export const exportOrdersCSV = async () => {
  const res = await fetch("/api/orders/export/csv");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "orders.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};
