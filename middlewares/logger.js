const morgan = require("morgan");

if (process.env.NODE_ENV === "development") {
  const logger = morgan("dev");
  module.exports = logger; // Logs more detailed output in development
} else {
  const logger = morgan("combined"); // Standard Apache format logs for production
  module.exports = logger;
}
