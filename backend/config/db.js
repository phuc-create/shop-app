require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connection success");
  } catch (error) {
    console.log(`mongoDB connection fail with ${error}`);
    process.exit(1);
  }
};
module.exports = connectDB;
