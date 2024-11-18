const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      unique: true,
    }, //admin manager
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Role", roleSchema);
