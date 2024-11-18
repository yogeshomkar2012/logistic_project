const express = require("express");
const adminRoutes = express.Router();
// controllers
const roleController = require("../controllers/roleController");
const permissionController = require("../controllers/permissionControler");
const { createUser, getAllUsers } = require("../controllers/userController");
// controllers

// middlewares
const validate = require("../middlewares/validateMiddleware");
const rolesValidation = require("../utils/validation/rolesValidation");
const userValidation = require("../utils/validation/userValidation");
const checkIdMiddleware = require("../middlewares/checkIdMiddleware");

// middlewares
adminRoutes.get("/get_all_permissions", permissionController.getPermissions);
// rolesRoutes
adminRoutes.post(
  "/role_creation",
  rolesValidation.roleCreationValiDation,
  validate,
  roleController.createRole
);
adminRoutes.get("/get_all_roles", roleController.getAllRoles);
adminRoutes.get(
  "/get_role_id",
  checkIdMiddleware,
  rolesValidation.getRoleByIdValiDation,
  roleController.getRoleId
);
adminRoutes.put(
  "/get_role_id",
  checkIdMiddleware,
  rolesValidation.UpdateRoleByIdValiDation,
  validate,
  roleController.UpdateRoleId
);
// rolesRoutes
// userRoutes
adminRoutes.post(
  "/userCreate",
  userValidation.useCreationValiDation,
  validate,
  createUser
);
adminRoutes.get("/get_all_users", getAllUsers);
// userRoutes

module.exports = adminRoutes;
