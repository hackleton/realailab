import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  original_photo: {
    type: String,
    required: [true, "original photo is required"],
  },
  generated_photo: {
    type: String,
    required: [true, "generated photo is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = models.Room || model("Room", RoomSchema);

export default Room;
