const log = (message, type = "info") => {
  const time = new Date().toISOString();
  console[type](`[${time}] ${message}`);
};

module.exports = { log };
