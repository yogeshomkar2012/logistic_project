const asynWrapper = require("../utils/asynWrapper");
const customError = require("../utils/customError");
const { sendSuccessResponse } = require("../utils/sendResponse");
const permissionModel = require("../models/permissionModel");

const permission = {
  getPermissions: asynWrapper(async (req, res) => {
    const permission = await permissionModel.find({});
    return sendSuccessResponse(res, 200, "Fetched Successfully", permission);
  }),
};
module.exports = permission;
