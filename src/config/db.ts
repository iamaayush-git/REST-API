import mongoose from "mongoose";
import { config } from "./config";
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to database successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error in connection to database", err);
    });
    await mongoose.connect(config.databaseUrl as string);
  } catch (error) {
    console.log("failed to connect to database");
    process.exit(1);
  }
};

export default connectDB;
