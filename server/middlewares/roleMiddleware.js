const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send({ error: "Admin access required" });
  }
  next();
};

const isStaff = (req, res, next) => {
  if (!["admin", "staff"].includes(req.user?.role)) {
    return res.status(403).send({ error: "Staff access required" });
  }
  next();
};

module.exports = { isAdmin, isStaff };
