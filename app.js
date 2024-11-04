const connectDb = require("./config/db");

const express = require("express");
const app = express();

connectDb();
// middlewares
// protecting DoS
const helmet = require("helmet");
app.use(helmet());
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  window: 15 * 16 * 1000, //15 minute
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// protecting DoS
// cros config
const cors = require("cors");
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not Allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// cros config

// parsing application json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parsing application json

//helpful to see more detailed logs during development and only critical logs in production.

// middlewares
app.get("/", (req, res) => {
  res.send("hi");
});
const logger = require("./middlewares/logger");
app.use(logger);
const CustomError = require("./utils/customError");
app.use((req, res, next) => {
  const err = new CustomError("page not found", 404);
  next(err);
});

const errorHandler = require("./middlewares/errorHandling");

app.use(errorHandler);
module.exports = app;
