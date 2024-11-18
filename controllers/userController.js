const UserModel = require("../models/userModel");
const RoleModel = require("../models/roleModel");
const asyncWrapper = require("../utils/asynWrapper");
const customError = require("../utils/customError");
const { sendSuccessResponse } = require("../utils/sendResponse");
const permissionModel = require("../models/permissionModel");
const mongoose = require("mongoose");
// create user by admin

const createUser = asyncWrapper(async (req, res) => {
  const { name, email, contact, password } = req.body;
  const isExist = await UserModel.findOne({ email: email });

  if (isExist) {
    throw new customError("Email Already Exist", 400);
  }
  const userObj = {
    name: name,
    email: email,
    contact: contact,
    password: password,
  };

  if (!req.body.role && req.body.role == null) {
    const roleId = await RoleModel.findOne({ role_name: "user" });
    userObj.role = roleId._id;
  } else if (req.body.role && req.body.role != null) {
    userObj.role = req.body.role;
  }
  const permissionsId = req.body.permissions;
  if (!permissionsId) {
    const permissions = await permissionModel.find({ permission_name: "read" });
    userObj.permissions = permissions.map((el) => el._id);
  } else if (permissionsId.length == 0) {
    const permlist = await permissionModel.find({ permission_name: "read" });
    userObj.permissions = permlist.map((el) => el._id);
  } else if (permissionsId.length > 0) {
    const permlist = await permissionModel.find({
      _id: { $in: permissionsId },
    });
    userObj.permissions = permlist.map((el) => el._id);
  }
  const newUser = new UserModel(userObj);
  const userData = await newUser.save();
  return sendSuccessResponse(res, 200, "User Created Successfully", userData);
});
const getAllUsers = asyncWrapper(async (req, res) => {
  // const userListData = await UserModel.find({ role: { $ne: "admin" } });
  const userListData = await UserModel.find()
    .populate("role")
    .populate("permissions", "permission_name");
  // const userListData = await UserModel.aggregate([
  //   {
  //     $lookup: {
  //       from: "roles",
  //       localField: "role",
  //       foreignField: "_id",
  //       as: "roles",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "permissions",
  //       localField: "permissions",
  //       foreignField: "_id",
  //       as: "permissions",
  //     },
  //   },
  //   {
  //     $project: {
  //       name: 1,
  //       email: 1,
  //       contact: 1,
  //       password: 1,
  //       roles: {
  //         role_name: 1,
  //       },
  //       permissions: {
  //         permission_name: 1,
  //       },
  //     },
  //   },
  // ]);

  return sendSuccessResponse(
    res,
    200,
    "User list  Fetched Successfully",
    userListData
  );
});
const updateUser = asyncWrapper(async (req, res) => {});
module.exports = { createUser, getAllUsers, updateUser };
