const { check } = require("express-validator");
const userModel = require("../../models/userModel");

const userValidation = {
  useCreationValiDation: [
    check("name", "Name Is Required..!").not().isEmpty(),
    check("contact", "Contact Is Required..!").not().isEmpty(),
    check("password", "Password Is Required..!").not().isEmpty(),
    check("email", "Email Is Required")
      .isEmail()
      .normalizeEmail({ gmail_lowercase: true })
      .custom(async (value) => {
        const exist = await userModel.findOne({ email: value });
        if (exist) {
          throw new Error("Email Already In Use..!");
        }
      }),
  ],
};

module.exports = userValidation;
