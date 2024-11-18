const mongoose = require("mongoose");
const permissionSchema = new mongoose.Schema(
  {
    permission_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Permission", permissionSchema);