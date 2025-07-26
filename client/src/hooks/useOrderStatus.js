import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL); // Make sure the backend supports socket.io

const useOrderStatus = (orderId) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    socket.emit("joinOrderRoom", orderId); // join a room for this order

    socket.on("orderStatusUpdate", (update) => {
      if (update.orderId === orderId) {
        setStatus(update.status);
      }
    });

    return () => {
      socket.emit("leaveOrderRoom", orderId);
      socket.off("orderStatusUpdate");
    };
  }, [orderId]);

  return status;
};

export default useOrderStatus;
