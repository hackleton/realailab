import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import { connectToDB } from "../../../utils/database";
import User from "../../../models/user";
import Order from "../../../models/order";
const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  const { orderId, razorpayPaymentId, razorpaySignature, email, credits, amount } =
    await request.json();

  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }
    // Connect to the database
    await connectToDB();

    // Fetch the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", isOk: false },
        { status: 404 }
      );
    }

    // Update user credits
    user.credits += parseInt(credits, 10);
    await user.save();

     // Check if the order already exists
     let order = await Order.findOne({ orderId });

     if (!order) {
       // Create a new order if it doesn't exist
       order = new Order({
         orderId,
         userId: user._id,
         amount,
       });
     } else {
       // Update the order status and amount if it exists
       order.amount = amount;
       order.updatedAt = Date.now();
     }
 
     await order.save();
 
  // Probably some database calls here to update order or add premium status to user
  return NextResponse.json(
    { message: "payment verified successfully", isOk: true },
    { status: 200 }
  );
}