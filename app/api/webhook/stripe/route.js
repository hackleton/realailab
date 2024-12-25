import User from "../../../../models/user";
import Order from "../../../../models/order";

import { headers } from "next/headers";
import stripeInit from "stripe";
import { connectToDB } from "../../../../utils/database";

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  let event;
  const body = await req.text();
  const signature = headers().get("stripe-signature");
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Error constructing webhook event", error);
    return new Response(`Webhook error: ${error.message}`, { status: 500 });
  }

  console.log("Event:", event.type);

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      const userId = paymentIntent.metadata.userId;
      const credits = paymentIntent.metadata.credits;
      await connectToDB();
      await Order.create({
        customer: userId,
        status: "success",
        method: paymentIntent.payment_method_types[0],
        price: paymentIntent.amount > 0 ? paymentIntent.amount / 100 : 0,
      });

      const userProfile = await User.updateOne(
        { _id: userId },
        {
          $inc: {
            credits: credits,
          },
          $setOnInsert: {
            _id: userId,
          },
        },
        {
          upsert: true,
        }
      );

    default:
      console.log("Unhandled event:".event.type);
      return new Response(`Unhandled event: ${event.type}`, { status: 200 });
  }
  return new Response(null, { status: 200 });
};
