const roleModel = require("../models/roleModel");
const asynWrapper = require("../utils/asynWrapper");
const customError = require("../utils/customError");
const { sendSuccessResponse } = require("../utils/sendResponse");

const rolecontroller = {
  createRole: asynWrapper(async (req, res) => {
    const { role_name } = req.body;
    await roleModel.findOne({ role_name });

    const roleDataObj = {
      role_name: role_name.toLowerCase(),
    };
    if (req.body.description && req.body.description != null) {
      const description = req.body.description;
      roleDataObj.description = description.toLowerCase();
    }
    const objData = new roleModel(roleDataObj);
    const data = await objData.save();
    sendSuccessResponse(res, 200, "Role Created Successfully", data);
  }),
  getAllRoles: asynWrapper(async (req, res) => {
    const allRoles = await roleModel.find({});
    sendSuccessResponse(res, 200, "Role Created Successfully", allRoles);
  }),

  getRoleId: asynWrapper(async (req, res) => {
    const id = req.id;
    const roleData = await roleModel.findById({ _id: id });
    sendSuccessResponse(res, 200, "Role Created Successfully", roleData);
  }),
  UpdateRoleId: asynWrapper(async (req, res) => {
    const id = req.id;
    const { role_name } = req.body;
    const roleObj = {
      role_name,
    };
    if (req.body.description && req.body.description != null) {
      roleObj.description = req.body.description;
    }
    const roleData = await roleModel.findByIdAndUpdate(
      { _id: id },
      { $set: roleObj }
    );
    sendSuccessResponse(res, 200, "Role Updated Successfully", roleData);
  }),
};

module.exports = rolecontroller;
