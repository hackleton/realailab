import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "../../../utils/database";
import User from "../../../models/user";
import Order from "../../../models/order";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { orderId, razorpayPaymentId, email, credits, amount } = data;

    // Fetch payment details from Razorpay API
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    const auth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64');

    const paymentResponse = await axios.get(
      `https://api.razorpay.com/v1/payments/${razorpayPaymentId}`,
      {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      }
    );

    const payment = paymentResponse.data;

    // Verify payment details
    if (
      payment.id !== razorpayPaymentId ||
      payment.order_id !== orderId ||
      payment.status !== 'captured'
    ) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
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
    let orderDoc = await Order.findOne({ orderId });

    if (!orderDoc) {
      // Create a new order if it doesn't exist
      orderDoc = new Order({
        orderId,
        userId: user._id,
        amount,
      });
    } else {
      // Update the order status and amount if it exists
      orderDoc.amount = amount;
      orderDoc.updatedAt = Date.now();
    }

    await orderDoc.save();

    return NextResponse.json(
      { message: "Payment verified successfully", isOk: true },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred", isOk: false },
      { status: 500 }
    );
  }
}