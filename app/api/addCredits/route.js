import User from "../../../models/user";
import stripeInit from "stripe";
const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  const { userId, defaultPrice, credits } = await req.json();
  console.log(userId, defaultPrice, credits);
  const lineItems = [
    {
      price: defaultPrice,
      quantity: 1,
    },
  ];
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      payment_intent_data: {
        metadata: {
          userId: userId,
          credits: credits,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/generate`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    });
    // const userProfile = await User.updateOne(
    //   { _id: userId },
    //   {
    //     $inc: {
    //       credits: 30,
    //     },
    //     $setOnInsert: {
    //       _id: userId,
    //     },
    //   },
    //   {
    //     upsert: true,
    //   }
    // );
    return new Response(JSON.stringify({ session: checkoutSession }), {
      status: 200,
    });
  } catch (error) {
    return new Response("You've got an error", {
      status: 403,
    });
  }
};
