import { useEffect, useState } from "react";
import { getAllOrders } from "../services/orderService";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .catch(() => setError("Failed to fetch orders"))
      .finally(() => setLoading(false));
  }, []);

  return { orders, loading, error };
};

export default useOrders;
