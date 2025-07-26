import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import PageWrapper from "../components/layout/PageWrapper";
import { getOrderById } from "../services/orderService";

const OrderStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
      setError("");
    } catch (err) {
      setOrder(null);
      setError("Order not found");
    }
  };

  return (
    <PageWrapper>
      <div className="flex items-center justify-center items-start min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
          <div className="flex gap-2 max-w-md mb-6 border-2 mx-auto">
            <Input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {order && (
            <div className="border p-4 rounded bg-gray-50 max-w-md mx-auto text-left">
              <p>
                <strong>Order ID:</strong> {order.orderId || order._id}
              </p>
              <p>
                <strong>Customer:</strong> {order.customerName}
              </p>
              <div>
                <strong>Items:</strong>
                <ul className="ml-4 list-disc">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.productName || item.productId} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                <strong>Status:</strong>{" "}
                <Badge label={order.status} color="blue" />
              </p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderStatus;
