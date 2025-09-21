import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("mongodb connected successfully");
  } catch (err) {
    console.error("mongodb connection error", err.message);
  }
};

export default connectDB;
