export const generateOrderId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `ORD-${timestamp}-${random}`;
};
