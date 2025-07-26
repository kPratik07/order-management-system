const errorHandler = (error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).send({ error: "Internal server error" });
};

module.exports = errorHandler;
