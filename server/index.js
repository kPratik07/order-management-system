const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const http = require("http");
const { setupSocket } = require("./sockets/orderSocket");
const errorHandler = require("./middlewares/errorHandler");
const pino = require("pino");
const logger = pino();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error(err));

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
setupSocket(io);

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

// Swagger setup (basic example, you can expand this)
const swaggerDocument = {
  openapi: "3.0.0",
  info: { title: "Order Management API", version: "1.0.0" },
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Health check endpoint
app.get("/healthz", (req, res) => res.send("OK"));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
