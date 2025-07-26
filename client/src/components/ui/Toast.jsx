import { useEffect } from "react";

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    info: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed top-6 right-6 px-4 py-2 rounded text-white shadow-lg ${colors[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
