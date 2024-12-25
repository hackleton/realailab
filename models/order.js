import { Schema, model, models } from "mongoose";

// Order Schema
const OrderSchema = new Schema({
  orderId: {
    type: String,
    unique: [true, "Order ID already exists!"],
    required: [true, "Order ID is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"],
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

const Order = models.Order || model("Order", OrderSchema);
export default Order;