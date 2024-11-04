const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  // log the error detailes
  logger(req, res, () => {
    // Only log the error stack in development
    if (process.env.NOD_ENV === "development") {
      console.log(err);
    }
    const stattucode = err.status || 500;
    const messgae = err.message || "Internal Server Error";
    res.json({
      status: "error",
      stattucode,
      messgae,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace in development
    });
  });
};
module.exports = errorHandler;
