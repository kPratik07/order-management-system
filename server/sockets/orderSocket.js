function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join a specific room for an order
    socket.on("joinOrderRoom", (orderId) => {
      socket.join(orderId);
    });

    // Leave the room
    socket.on("leaveOrderRoom", (orderId) => {
      socket.leave(orderId);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket };
