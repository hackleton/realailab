import User from "../models/user";
import Room from "../models/room";

import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "realailab",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;

    // await User.updateMany({}, { $set: { role: "customer" } });
    // await Room.updateMany({}, { $set: { name: "default" } });
    // await Room.deleteMany({});
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
