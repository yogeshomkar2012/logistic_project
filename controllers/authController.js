const UserModel = require("../models/userModel");
const RoleModel = require("../models/roleModel");
const asynWrapper = require("../utils/asynWrapper");
const customError = require("../utils/customError");

const { sendSuccessResponse } = require("../utils/sendResponse");
const auctController = {
  registerUser: asynWrapper(async (req, res) => {
    const { name, email, contact, password } = req.body;
  }),
};
module.exports = auctController;
