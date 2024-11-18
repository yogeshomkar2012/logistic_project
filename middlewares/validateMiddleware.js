const { validationResult } = require("express-validator");
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      status: "error",
      statusCode: 400,
      errors: errors.array(),
      // .map((err) => ({ path: err.path, message: err.msg })),
    });
  }
  next();
};

module.exports = validate;
