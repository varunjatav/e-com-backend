import mongoose from "mongoose";
const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};
export default DBconnection;
