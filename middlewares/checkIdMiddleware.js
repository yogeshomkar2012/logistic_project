const asyncWrapper = require("../utils/asynWrapper");
const CustomError = require("../utils/customError");

const checkIdMiddleware = asyncWrapper(async (req, res, next) => {
  const id = req.body.id || req.query.id || req.params.id;
  if (!id) {
    throw new CustomError("Id Is Required..!", 400);
  }
  req.id = id;
  next();
});

module.exports = checkIdMiddleware;
