const { check } = require("express-validator");
const roleModel = require("../../models/roleModel");

const rolesValidation = {
  UpdateRoleByIdValiDation: [
    check("id", "id name required").not().isEmpty(),
    check("role_name", "role name required")
      .not()
      .isEmpty()
      .custom(async (value) => {
        const exist = await roleModel.findOne({ role_name: value });
        if (exist) {
          throw new Error("role Name already use..!");
        }
      }),
  ],
  roleCreationValiDation: [
    check("role_name", "role name required")
      .not()
      .isEmpty()
      .custom(async (value) => {
        const exist = await roleModel.findOne({ role_name: value });
        if (exist) {
          throw new Error("role Name already use..!");
        }
      }),
  ],
  getRoleByIdValiDation: [check("id", "id name required").not().isEmpty()],
};
module.exports = rolesValidation;
