const mongoose = require("mongoose");
const { dbUri, port, jwtSecrete } = require("./index");

const connectDb = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log('Database connected successfully');
  } catch (error) {
    console.log("data base connection error", error.message);
  }
};
module.exports = connectDb;
