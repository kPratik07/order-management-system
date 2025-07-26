import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/auth";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API}/login`, credentials);
  return response.data;
};

export const registerUser = async (credentials) => {
  const response = await axios.post(`${API}/register`, credentials);
  return response.data;
};
