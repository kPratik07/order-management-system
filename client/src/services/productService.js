import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/products";

export const getAllProducts = async () => {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};
