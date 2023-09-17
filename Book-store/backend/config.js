import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const PORT = 5353;

export const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.LocalUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log({ msg: "cannot connect to db", error: error.message });
    process.exit(1);
  }
};
