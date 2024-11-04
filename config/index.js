const dotenv = require("dotenv");
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

module.exports = {
  port: process.env.PORT || 5000,
  dbUri:
    process.env.NODE_ENV === "production"
      ? process.env.DB_URI_PROD
      : process.env.DB_URI_DEV,
  jwtSecrete:
    process.env.NODE_ENV === "production"
      ? process.env.JWT_SECRET_PRO
      : process.env.JWT_SECRET_DEV,
};
